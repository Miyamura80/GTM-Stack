"""Experiment: Deepgram transcription ($200 free credits, ~700 hrs).

Signup: https://console.deepgram.com/signup (no credit card)
Docs: https://developers.deepgram.com/docs/pre-recorded-audio

Usage:
    # Transcribe from URL:
    uv run python -m podcast.experiments.try_deepgram --url "https://example.com/episode.mp3"

    # Transcribe local file:
    uv run python -m podcast.experiments.try_deepgram --file "path/to/episode.mp3"

    # With speaker diarization:
    uv run python -m podcast.experiments.try_deepgram --url "https://example.com/episode.mp3" --diarize
"""

import argparse
import json
import os
from pathlib import Path

import requests
from dotenv import load_dotenv

load_dotenv()

DEEPGRAM_URL = "https://api.deepgram.com/v1/listen"


def get_headers() -> dict[str, str]:
    return {
        "Authorization": f"Token {os.environ['DEEPGRAM_API_KEY']}",
    }


def transcribe_url(
    audio_url: str, diarize: bool = False, smart_format: bool = True
) -> dict:
    """Transcribe audio from a URL."""
    params = {
        "model": "nova-3",
        "smart_format": str(smart_format).lower(),
    }
    if diarize:
        params["diarize"] = "true"

    r = requests.post(
        DEEPGRAM_URL,
        headers={**get_headers(), "Content-Type": "application/json"},
        params=params,
        json={"url": audio_url},
        timeout=300,
    )
    r.raise_for_status()
    return r.json()


def transcribe_file(
    file_path: str, diarize: bool = False, smart_format: bool = True
) -> dict:
    """Transcribe a local audio file."""
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    # Detect content type
    suffix_to_mime = {
        ".mp3": "audio/mpeg",
        ".wav": "audio/wav",
        ".flac": "audio/flac",
        ".m4a": "audio/mp4",
        ".ogg": "audio/ogg",
        ".webm": "audio/webm",
    }
    content_type = suffix_to_mime.get(path.suffix.lower(), "audio/mpeg")

    params = {
        "model": "nova-3",
        "smart_format": str(smart_format).lower(),
    }
    if diarize:
        params["diarize"] = "true"

    with open(path, "rb") as f:
        r = requests.post(
            DEEPGRAM_URL,
            headers={**get_headers(), "Content-Type": content_type},
            params=params,
            data=f,
            timeout=300,
        )
    r.raise_for_status()
    return r.json()


def print_transcript(data: dict, diarize: bool = False) -> None:
    """Pretty-print a Deepgram transcript response."""
    results = data.get("results", {})
    channels = results.get("channels", [])
    if not channels:
        print("No transcript returned.")
        return

    alternatives = channels[0].get("alternatives", [])
    if not alternatives:
        print("No alternatives returned.")
        return

    transcript = alternatives[0]

    if diarize and transcript.get("paragraphs"):
        paragraphs = transcript["paragraphs"].get("paragraphs", [])
        for para in paragraphs:
            speaker = para.get("speaker", "?")
            sentences = " ".join(s["text"] for s in para.get("sentences", []))
            print(f"  [Speaker {speaker}]: {sentences}")
            print()
    else:
        print(transcript.get("transcript", ""))

    metadata = data.get("metadata", {})
    duration = metadata.get("duration", 0)
    print(f"\n--- Duration: {duration:.1f}s ({duration/60:.1f} min) ---")


def main() -> None:
    parser = argparse.ArgumentParser(description="Deepgram transcription experiment")
    source = parser.add_mutually_exclusive_group(required=True)
    source.add_argument("--url", help="URL of audio file to transcribe")
    source.add_argument("--file", help="Local audio file path to transcribe")
    parser.add_argument(
        "--diarize", action="store_true", help="Enable speaker diarization"
    )
    parser.add_argument(
        "--raw", action="store_true", help="Print raw JSON response"
    )
    args = parser.parse_args()

    print("--- Deepgram Transcription ---\n")

    if args.url:
        print(f"Source: {args.url}")
        data = transcribe_url(args.url, diarize=args.diarize)
    else:
        print(f"Source: {args.file}")
        data = transcribe_file(args.file, diarize=args.diarize)

    print()

    if args.raw:
        print(json.dumps(data, indent=2)[:5000])
    else:
        print_transcript(data, diarize=args.diarize)


if __name__ == "__main__":
    main()
