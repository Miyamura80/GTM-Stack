"""Experiment: Listen Notes API (free tier + mock test server).

Signup: https://www.listennotes.com/api/pricing/
Docs: https://www.listennotes.com/api/docs/

The test server (no API key needed) returns fake data but lets you explore the API structure.

Usage:
    # Test server (no key needed, fake data):
    uv run python -m podcast.experiments.try_listen_notes "javascript" --test

    # Real data (needs LISTEN_NOTES_API_KEY in .env):
    uv run python -m podcast.experiments.try_listen_notes "javascript"
    uv run python -m podcast.experiments.try_listen_notes "AI" --type episode --max-results 5
"""

import argparse
import json
import os
from typing import Any

import requests
from dotenv import load_dotenv

load_dotenv()

REAL_URL = "https://listen-api.listennotes.com/api/v2"
TEST_URL = "https://listen-api-test.listennotes.com/api/v2"


def get_headers(use_test: bool) -> dict[str, str]:
    if use_test:
        return {}
    return {"X-ListenAPI-Key": os.environ["LISTEN_NOTES_API_KEY"]}


def search(
    query: str,
    search_type: str = "podcast",
    max_results: int = 10,
    use_test: bool = False,
) -> dict[str, Any]:
    """Search for podcasts or episodes."""
    base = TEST_URL if use_test else REAL_URL
    r = requests.get(
        f"{base}/search",
        headers=get_headers(use_test),
        params={"q": query, "type": search_type, "page_size": max_results},
        timeout=30,
    )
    r.raise_for_status()
    return r.json()


def get_best_podcasts(genre_id: int = 93, use_test: bool = False) -> dict[str, Any]:
    """Get best/popular podcasts by genre. Genre 93 = Business."""
    base = TEST_URL if use_test else REAL_URL
    r = requests.get(
        f"{base}/best_podcasts",
        headers=get_headers(use_test),
        params={"genre_id": genre_id, "page": 1},
        timeout=30,
    )
    r.raise_for_status()
    return r.json()


def main() -> None:
    parser = argparse.ArgumentParser(description="Listen Notes API experiment")
    parser.add_argument("query", nargs="?", default=None, help="Search query")
    parser.add_argument(
        "--test", action="store_true", help="Use test server (no API key, fake data)"
    )
    parser.add_argument(
        "--type",
        choices=["podcast", "episode"],
        default="podcast",
        help="Search type",
    )
    parser.add_argument("--max-results", type=int, default=10)
    parser.add_argument(
        "--best", action="store_true", help="Show best podcasts (business genre)"
    )
    args = parser.parse_args()

    mode = "TEST (fake data)" if args.test else "LIVE"
    print(f"--- Mode: {mode} ---\n")

    if args.best:
        print("--- Best Business Podcasts ---")
        data = get_best_podcasts(use_test=args.test)
        for pod in data.get("podcasts", [])[:args.max_results]:
            print(f"  {pod['title']}")
            print(f"    Publisher: {pod.get('publisher', 'N/A')}")
            print(f"    Episodes: {pod.get('total_episodes', 'N/A')}")
            print()
    elif args.query:
        print(f"--- Search '{args.query}' (type={args.type}) ---")
        data = search(args.query, args.type, args.max_results, args.test)
        for result in data.get("results", []):
            title = result.get("title_original", result.get("title", "N/A"))
            print(f"  {title}")
            if args.type == "podcast":
                print(f"    Publisher: {result.get('publisher_original', 'N/A')}")
                print(f"    Episodes: {result.get('total_episodes', 'N/A')}")
            else:
                print(f"    Podcast: {result.get('podcast', {}).get('title_original', 'N/A')}")
                print(f"    Duration: {result.get('audio_length_sec', 'N/A')}s")
            print()
    else:
        print("Provide a search query or --best")
        return

    print("--- Raw response (truncated) ---")
    print(json.dumps(data, indent=2)[:2000])


if __name__ == "__main__":
    main()
