"""Resolve the current quarter directory path for notes storage.

Usage:
    python notes/resolve_quarter.py          # prints the path, e.g. notes/2026/Q1-2026
    python notes/resolve_quarter.py --mkdir  # also creates the directory if missing
"""

import argparse
import math
from datetime import datetime, timezone
from pathlib import Path


def get_quarter_dir() -> Path:
    """Return the notes quarter directory for the current UTC date."""
    now = datetime.now(timezone.utc)
    quarter = math.ceil(now.month / 3)
    return Path("notes") / str(now.year) / f"Q{quarter}-{now.year}"


def main() -> None:
    parser = argparse.ArgumentParser(description="Resolve current quarter notes directory")
    parser.add_argument("--mkdir", action="store_true", help="Create the directory if it doesn't exist")
    args = parser.parse_args()

    quarter_dir = get_quarter_dir()

    if args.mkdir:
        quarter_dir.mkdir(parents=True, exist_ok=True)

    print(quarter_dir)


if __name__ == "__main__":
    main()
