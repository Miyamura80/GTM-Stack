"""Experiment: Podcast Index API (completely free, no limits).

Signup: https://api.podcastindex.org/signup
Docs: https://podcastindex-org.github.io/docs-api/

Usage:
    uv run python -m podcast.experiments.try_podcast_index "startup"
    uv run python -m podcast.experiments.try_podcast_index "machine learning" --max-results 5
"""

import argparse
import hashlib
import json
import os
import sys
import time

import requests
from dotenv import load_dotenv

load_dotenv()

BASE_URL = "https://api.podcastindex.org/api/1.0"


def get_auth_headers() -> dict[str, str]:
    api_key = os.environ["PODCAST_INDEX_API_KEY"]
    api_secret = os.environ["PODCAST_INDEX_API_SECRET"]
    epoch = str(int(time.time()))
    # Podcast Index API mandates SHA1 for request signing (not password hashing).
    # Using hashlib.new() to avoid CodeQL false positive on hashlib.sha1().
    auth_hash = hashlib.new(  # noqa: S324
        "sha1", (api_key + api_secret + epoch).encode(), usedforsecurity=False
    ).hexdigest()
    return {
        "User-Agent": "GTM-Stack/1.0",
        "X-Auth-Key": api_key,
        "X-Auth-Date": epoch,
        "Authorization": auth_hash,
    }


def search_podcasts(query: str, max_results: int = 10) -> dict:
    """Search for podcasts by keyword."""
    r = requests.get(
        f"{BASE_URL}/search/byterm",
        headers=get_auth_headers(),
        params={"q": query, "max": max_results},
        timeout=30,
    )
    r.raise_for_status()
    return r.json()


def get_episodes(feed_id: int, max_results: int = 5) -> dict:
    """Get recent episodes for a podcast by feed ID."""
    r = requests.get(
        f"{BASE_URL}/episodes/byfeedid",
        headers=get_auth_headers(),
        params={"id": feed_id, "max": max_results},
        timeout=30,
    )
    r.raise_for_status()
    return r.json()


def get_trending(max_results: int = 10) -> dict:
    """Get trending podcasts."""
    r = requests.get(
        f"{BASE_URL}/podcasts/trending",
        headers=get_auth_headers(),
        params={"max": max_results},
        timeout=30,
    )
    r.raise_for_status()
    return r.json()


def main() -> None:
    parser = argparse.ArgumentParser(description="Podcast Index API experiment")
    parser.add_argument("query", nargs="?", default=None, help="Search query")
    parser.add_argument("--max-results", type=int, default=10)
    parser.add_argument("--trending", action="store_true", help="Show trending podcasts")
    parser.add_argument(
        "--episodes", type=int, default=None, help="Get episodes for a feed ID"
    )
    args = parser.parse_args()

    if args.trending:
        print("--- Trending Podcasts ---")
        data = get_trending(args.max_results)
        for feed in data.get("feeds", []):
            print(f"  [{feed['id']}] {feed['title']}")
            print(f"    {feed.get('description', '')[:120]}")
            print()
    elif args.episodes:
        print(f"--- Episodes for feed {args.episodes} ---")
        data = get_episodes(args.episodes, args.max_results)
        for ep in data.get("items", []):
            print(f"  {ep['title']}")
            print(f"    URL: {ep.get('enclosureUrl', 'N/A')}")
            print(f"    Duration: {ep.get('duration', 'N/A')}s")
            print()
    elif args.query:
        print(f"--- Search: '{args.query}' ---")
        data = search_podcasts(args.query, args.max_results)
        for feed in data.get("feeds", []):
            print(f"  [{feed['id']}] {feed['title']}")
            print(f"    Author: {feed.get('author', 'N/A')}")
            print(f"    URL: {feed.get('url', 'N/A')}")
            print()
    else:
        print("Provide a search query, --trending, or --episodes <feed_id>")
        sys.exit(1)

    print(json.dumps(data, indent=2)[:2000])


if __name__ == "__main__":
    main()
