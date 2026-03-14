"""Experiment: Taddy GraphQL API (free tier: 500 req/mo, includes transcripts).

Signup: https://taddy.org/signup/developers
Docs: https://taddy.org/developers/intro-to-taddy-graphql-api

Usage:
    uv run python -m podcast.experiments.try_taddy "Lex Fridman"
    uv run python -m podcast.experiments.try_taddy "My First Million" --with-transcript
"""

import argparse
import json
import os

import requests
from dotenv import load_dotenv

load_dotenv()

TADDY_URL = "https://api.taddy.org"


def get_headers() -> dict[str, str]:
    return {
        "Content-Type": "application/json",
        "X-USER-ID": os.environ["TADDY_USER_ID"],
        "X-API-KEY": os.environ["TADDY_API_KEY"],
    }


def search_podcast(name: str, with_transcript: bool = False) -> dict:
    """Search for a podcast by name and optionally fetch transcripts."""
    transcript_field = "transcript" if with_transcript else ""
    query = f"""
    {{
        searchForTerm(term: "{name}", filterForType: PODCASTSERIES) {{
            searchId
            podcastSeries {{
                uuid
                name
                itunesId
                description
                totalEpisodesCount
                episodes(first: 3) {{
                    uuid
                    name
                    datePublished
                    audioUrl
                    duration
                    {transcript_field}
                }}
            }}
        }}
    }}
    """

    r = requests.post(
        TADDY_URL,
        headers=get_headers(),
        json={"query": query},
        timeout=30,
    )
    r.raise_for_status()
    return r.json()


def get_podcast_by_id(itunes_id: int, with_transcript: bool = False) -> dict:
    """Get a podcast by iTunes ID."""
    transcript_field = "transcript" if with_transcript else ""
    query = f"""
    {{
        getPodcastSeries(itunesId: {itunes_id}) {{
            uuid
            name
            description
            totalEpisodesCount
            episodes(first: 5) {{
                uuid
                name
                datePublished
                audioUrl
                duration
                {transcript_field}
            }}
        }}
    }}
    """

    r = requests.post(
        TADDY_URL,
        headers=get_headers(),
        json={"query": query},
        timeout=30,
    )
    r.raise_for_status()
    return r.json()


def main() -> None:
    parser = argparse.ArgumentParser(description="Taddy API experiment")
    parser.add_argument("query", help="Podcast name to search for")
    parser.add_argument(
        "--with-transcript", action="store_true", help="Include episode transcripts"
    )
    parser.add_argument(
        "--itunes-id", type=int, default=None, help="Lookup by iTunes ID instead"
    )
    args = parser.parse_args()

    if args.itunes_id:
        print(f"--- Lookup iTunes ID: {args.itunes_id} ---")
        data = get_podcast_by_id(args.itunes_id, args.with_transcript)
        series = data.get("data", {}).get("getPodcastSeries", {})
    else:
        print(f"--- Search: '{args.query}' ---")
        data = search_podcast(args.query, args.with_transcript)
        results = data.get("data", {}).get("searchForTerm", {})
        series_list = results.get("podcastSeries", [])
        if not series_list:
            print("No results found.")
            return
        series = series_list[0]

    print(f"  Name: {series.get('name')}")
    print(f"  Total episodes: {series.get('totalEpisodesCount')}")
    print(f"  Description: {str(series.get('description', ''))[:200]}")
    print()

    for ep in series.get("episodes", []):
        print(f"  Episode: {ep.get('name')}")
        print(f"    Date: {ep.get('datePublished')}")
        print(f"    Duration: {ep.get('duration')}s")
        print(f"    Audio: {ep.get('audioUrl', 'N/A')}")
        if args.with_transcript and ep.get("transcript"):
            print(f"    Transcript preview: {str(ep['transcript'])[:300]}...")
        print()

    print("--- Raw response (truncated) ---")
    print(json.dumps(data, indent=2)[:2000])


if __name__ == "__main__":
    main()
