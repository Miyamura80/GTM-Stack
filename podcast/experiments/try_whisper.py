"""Experiment: OpenAI Whisper local transcription (completely free).

Prerequisites:
    brew install ffmpeg
    uv pip install openai-whisper

Usage:
    uv run python -m podcast.experiments.try_whisper "path/to/episode.mp3"
    uv run python -m podcast.experiments.try_whisper "path/to/episode.mp3" --model base
    uv run python -m podcast.experiments.try_whisper "path/to/episode.mp3" --model turbo --timestamps
"""

import argparse
import json
import sys
from pathlib import Path
from typing import Any

try:
    import whisper  # type: ignore[unresolved-import]
except ImportError:
    print("Whisper not installed. Run: uv pip install openai-whisper")
    print("Also ensure ffmpeg is installed: brew install ffmpeg")
    sys.exit(1)


def transcribe(file_path: str, model_name: str = "base") -> dict[str, Any]:
    """Transcribe a local audio file using Whisper."""
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    print(f"Loading model '{model_name}'...")
    model = whisper.load_model(model_name)

    print(f"Transcribing {path.name}...")
    result = model.transcribe(str(path))
    return result


def main() -> None:
    parser = argparse.ArgumentParser(description="Whisper local transcription experiment")
    parser.add_argument("file", help="Path to audio file")
    parser.add_argument(
        "--model",
        default="base",
        choices=["tiny", "base", "small", "medium", "large", "turbo"],
        help="Whisper model size (default: base)",
    )
    parser.add_argument(
        "--timestamps", action="store_true", help="Show timestamped segments"
    )
    parser.add_argument("--raw", action="store_true", help="Print raw JSON output")
    args = parser.parse_args()

    result = transcribe(args.file, args.model)

    if args.raw:
        # Segments contain numpy types, so serialize carefully
        output = {"text": result["text"], "language": result.get("language")}
        if args.timestamps:
            output["segments"] = [
                {
                    "start": s["start"],
                    "end": s["end"],
                    "text": s["text"],
                }
                for s in result.get("segments", [])
            ]
        print(json.dumps(output, indent=2, default=str))
    elif args.timestamps:
        print("--- Timestamped Transcript ---\n")
        for seg in result.get("segments", []):
            start = seg["start"]
            end = seg["end"]
            mins, secs = divmod(start, 60)
            end_mins, end_secs = divmod(end, 60)
            print(f"  [{int(mins):02d}:{secs:05.2f} -> {int(end_mins):02d}:{end_secs:05.2f}] {seg['text'].strip()}")
        print(f"\n--- Language: {result.get('language', 'unknown')} ---")
    else:
        print("--- Transcript ---\n")
        print(result["text"])
        print(f"\n--- Language: {result.get('language', 'unknown')} ---")


if __name__ == "__main__":
    main()
