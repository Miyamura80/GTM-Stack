# Podcast Data & Transcript APIs - Research

## Podcast Data APIs

| API | Data Provided | Pricing | Transcripts? | Pros | Cons |
|-----|--------------|---------|-------------|------|------|
| **Listen Notes** | Search, metadata for 3.7M+ podcasts, 193M+ episodes. 25 endpoints. | Free tier, Pro $20/mo (100K req), Enterprise | No (pair with transcription service) | Largest independent search engine; excellent docs; SDKs for Python/Node/Go/etc | No transcripts; overage costs at scale |
| **Podcast Index** | Open directory, search, categories, Podcasting 2.0 namespace | 100% free | <1% (creator-provided only) | Completely free; open source; no vendor lock-in | Basic search; rate limits not transparent; no transcription |
| **Podchaser** | Ratings, reviews, 11M+ creator credits, demographics, sponsors. GraphQL API | Free tier, Plus/Pro (contact sales) | ~24K podcasts | Richest metadata (guests, demographics, sponsors); GraphQL | Points-based rate limiting; opaque Pro pricing; limited transcripts |
| **Taddy** | 4M+ podcasts, 200M+ episodes, search, webhooks. GraphQL API | Free (500 req/mo), Pro $75/mo (100K req), Business $150/mo | Yes - 3 sources: creator-provided, auto (top 5000), on-demand ($0.05/each) | Built-in transcripts; GraphQL; webhooks; competitive pricing | Auto-transcription limited to top 5000; on-demand costs extra |
| **Pod Engine** | 377K+ podcasts, 109M+ episodes, entity extraction, chart tracking, social metrics | Starts $100/mo | Yes - with timestamps + speaker detection | AI-enriched data; MCP server; speaker diarization; chart tracking | Expensive entry; smaller catalog; relatively new |

## Transcript-Focused Services

| Service | Data Provided | Pricing | Pros | Cons |
|---------|--------------|---------|------|------|
| **Podscan.fm** | 4.4M+ podcasts, 51M+ episodes with transcripts. REST + Firehose API, full-text search, brand monitoring | $19-$499/mo | Massive transcript DB; real-time monitoring; AI context detection; MCP server | Focused on monitoring rather than raw data |
| **Tapesearch** | 4M+ transcripts, boolean search, timestamp linking | $60/mo (2000 req/day) | Large open transcript DB; boolean search; timestamp jumping | No podcast metadata enrichment; no free API tier |
| **Podsqueeze** | Podcast-optimized transcription with speaker detection | Free tier, pay-per-minute | Free to start; speaker detection; webhooks | Transcription-only (no directory/search) |
| **Podscribe** | Transcripts, sponsor detection, audience data, ad attribution | Enterprise (contact sales) | Sponsor detection; brand safety; attribution | Advertising-focused; enterprise pricing |

## Speech-to-Text APIs (self-transcription)

| API | Pricing | Pros | Cons |
|-----|---------|------|------|
| **Deepgram** | $0.0043/min ($0.26/hr) | Cheapest; real-time support; volume discounts | Fewer audio intelligence features |
| **AssemblyAI** | $0.0062/min ($0.37/hr) + add-ons | Rich features (diarization, entity detection, summarization) | Add-on costs stack up |
| **OpenAI Whisper** | API: $0.006/min. Self-host: free | Self-hostable; good accuracy; simple API | No speaker diarization in base API; GPU needed for self-hosting |

## MCP Servers

| MCP Server | Description | Notes |
|------------|-------------|-------|
| **Podscan MCP** | Search 4M+ podcasts, 45M+ transcripts | OAuth auth. Works with Claude Desktop/Code/ChatGPT |
| **Pod Engine MCP** | Podcasts, transcripts, charts, contacts, social metrics | First podcast-specific MCP server |
| **MCP Podcast Scraper** | Scrapes and transcribes episodes via Deepgram Nova-2 | Community-built, for Claude Desktop/Code |
| **podcast-transcriber-mcp** | Transcription via OpenAI Whisper API | GitHub open source |
| **Transcribe MCP** | YouTube/podcast transcription via YouTube Transcript API + Gemini Flash | GitHub open source |

## Platform APIs (Spotify, Apple)

| Platform | What You Get | Pricing | Limitations |
|----------|-------------|---------|-------------|
| **Spotify Web API** | Search 5M+ podcasts, show/episode metadata | Free (OAuth required) | No transcripts; no audio download URLs |
| **Apple iTunes Search API** | Lookup by ID, keyword search, basic metadata | Free (no auth) | Very limited data; no transcripts; no episode detail |
| **Apify Scrapers** | Pre-built scrapers for Apple, Spotify, YouTube podcasts | $5/mo free credit, then pay-as-you-go | Can break if platform UI changes; not official APIs |

## Cheapest & Easiest Ways to Experiment

### Priority order for trying things out

| Priority | Service | Cost | Setup Time | What You Get |
|----------|---------|------|------------|-------------|
| 1 | **Podcast Index** | Free, no limits | ~2 min (email signup) | Podcast search & metadata |
| 2 | **Listen Notes test server** | Free, no signup | 0 min (fake data) | Test API structure with mock data |
| 3 | **Taddy** | Free (500 req/mo) | ~2 min (signup) | Podcast search + transcripts via GraphQL |
| 4 | **Whisper (local)** | Free | ~5 min (install + model download) | Transcribe any audio file locally |
| 5 | **Deepgram** | $200 free credits (~700 hrs) | ~3 min (signup) | Cloud transcription with speaker detection |
| 6 | **Podscan MCP** | Paid subscription required | N/A | Skip for now unless we subscribe |

### Quickstart: Podcast Index (free, no limits)

**Signup:** https://api.podcastindex.org/signup (email only, instant key)

```python
import hashlib, time, requests

API_KEY = "YOUR_KEY"
API_SECRET = "YOUR_SECRET"

epoch = str(int(time.time()))
auth_hash = hashlib.sha1((API_KEY + API_SECRET + epoch).encode()).hexdigest()

headers = {
    "User-Agent": "GTM-Stack/1.0",
    "X-Auth-Key": API_KEY,
    "X-Auth-Date": epoch,
    "Authorization": auth_hash,
}

r = requests.get("https://api.podcastindex.org/api/1.0/search/byterm?q=startup", headers=headers)
print(r.json())
```

### Quickstart: Taddy (free tier, transcripts included)

**Signup:** https://taddy.org/signup/developers (grab `X-USER-ID` and `X-API-KEY` from dashboard)

```bash
curl -X POST https://api.taddy.org \
  -H "Content-Type: application/json" \
  -H "X-USER-ID: YOUR_USER_ID" \
  -H "X-API-KEY: YOUR_API_KEY" \
  -d '{"query": "{ getPodcastSeries(name: \"This American Life\") { uuid name totalEpisodesCount episodes { uuid name datePublished audioUrl transcript } } }"}'
```

### Quickstart: Listen Notes (zero-setup test server)

No signup needed - uses fake data for testing API structure:

```bash
curl "https://listen-api-test.listennotes.com/api/v2/search?q=javascript"
```

For real data, sign up at https://www.listennotes.com/api/pricing/ (free tier) and add header `X-ListenAPI-Key: YOUR_KEY`.

### Quickstart: Whisper (free, local)

```bash
brew install ffmpeg
uv pip install openai-whisper
```

```python
import whisper

model = whisper.load_model("turbo")  # options: tiny, base, small, medium, large, turbo
result = model.transcribe("episode.mp3")
print(result["text"])
```

### Quickstart: Deepgram ($200 free credits, no expiry)

**Signup:** https://console.deepgram.com/signup (no credit card, $200 free = ~700 hours)

```bash
curl -X POST "https://api.deepgram.com/v1/listen?model=nova-3&smart_format=true" \
  -H "Authorization: Token YOUR_DEEPGRAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/podcast-episode.mp3"}'
```

### Suggested experiment plan

1. **Day 1:** Sign up for Podcast Index + Taddy (both free, 5 min total). Search for target podcasts, pull metadata, test Taddy transcript retrieval.
2. **Day 2:** Try Deepgram with free credits on a real podcast episode MP3. Compare transcript quality vs Taddy's built-in transcripts.
3. **Day 3:** If transcription quality matters, install Whisper locally and compare against Deepgram on the same episode.
4. **Decide:** Pick the stack that fits - likely Podcast Index (discovery) + Taddy or Deepgram (transcripts).

## Recommendations

| Use Case | Best Option(s) |
|----------|---------------|
| Podcast search & discovery | Listen Notes (best search), Podcast Index (free) |
| Pre-existing transcripts at scale | Podscan (51M episodes), Taddy, Pod Engine |
| On-demand transcription | Deepgram (cheapest), AssemblyAI (richest features), Whisper (self-hostable) |
| Rich metadata (guests, credits) | Podchaser |
| Claude/AI agent integration (MCP) | Podscan MCP, Pod Engine MCP |
| Budget-conscious MVP | Podcast Index (free) + Taddy free tier + Deepgram ($200 free credits) |

## Conclusion (2026-04-06)

**Final stack chosen:**

- **Discovery/metadata:** Podcast Index (free, no limits)
- **Transcription:** Deepgram Nova-3 ($0.0043/min, $200 free credits = ~700 hrs)

**Why Deepgram over alternatives:**

- Whisper (local) was too slow on CPU for practical use - a 60-min episode took far too long
- AssemblyAI is 60-90x more expensive than Deepgram ($0.37/min vs $0.0043/min) with negligible accuracy difference on clean podcast audio
- OpenAI Whisper API lacks speaker diarization
- Deepgram is the cheapest cloud option, fastest, and includes diarization out of the box

**Dropped:** Whisper self-hosted (removed from dependencies to also drop torch/pytorch bloat).
