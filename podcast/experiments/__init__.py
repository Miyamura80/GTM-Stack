import os
import sys


def require_env(key: str) -> str:
    """Get a required environment variable or exit with a helpful message."""
    value = os.environ.get(key)
    if not value:
        print(f"Error: {key} not set. Copy .env.example to .env and fill it in.")
        sys.exit(1)
    return value
