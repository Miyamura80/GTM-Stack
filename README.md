# GTM-Stack

<p align="center">
  <img src="media/banner.png" alt="GTM-Stack" width="400">
</p>

<p align="center">
<b>Go-To-Market automation stack, built with Claude Code.</b>
</p>

<p align="center">
  <a href="#automations">Automations</a> •
  <a href="#integrations">Integrations</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#configuration">Configuration</a>
</p>

---

## Automations

| Automation | Description | Status |
|------------|-------------|--------|
| **Podcast Aggregation** | Aggregate and process podcast information for research and outreach | Planned |
| **Morning Brief** | Daily digest of key GTM signals and priorities | Planned |
| **Task Manager & Prioritiser** | Intelligent task management with automatic prioritisation | Planned |
| **Ad Creation** | Automated ad copy and creative generation | Planned |
| **Images & Diagram Creation** | Generate images and diagrams for marketing and sales collateral | Planned |
| **Content Repurposing** | Clip and repurpose YouTube video segments | Planned |
| **Marketing Copy** | Generate marketing copy for campaigns and collateral | Planned |

## Integrations

| Integration | Purpose |
|-------------|---------|
| **Telegram** | Messaging and notifications |
| **Email** | Newsletter distribution |
| **PhantomBuster** | LinkedIn and social media automation |
| **logo.dev** | Company logo fetching |
| **Apify** | Web scraping and data extraction |
| **Apollo API** | Sales intelligence and prospecting |
| **Million Verifier API** | Email verification and validation |
| **GWS (Google Workspace CLI)** | Google Workspace automation |

## Quick Start

```bash
make onboard       # Interactive onboarding CLI (rename, deps, env, hooks, media)
make all           # Sync deps and run main.py
make fmt           # Run ruff format + JSON formatting
make test          # Run all tests in tests/
make ci            # Run all CI checks (ruff, vulture, ty, etc.)
```

## Configuration

```python
from common import global_config

# Access config values from common/global_config.yaml
global_config.example_parent.example_child

# Access secrets from .env
global_config.OPENAI_API_KEY
```

[Full configuration docs](manual_docs/configuration.md)

## Tech Stack

- **Python >= 3.12** with `uv` for dependency management
- **LLM inference** via DSPY + LangFuse observability
- **CI/Linters**: Ruff, Vulture, ty
- **Pre-commit hooks** via prek

## Credits

- [Claude Code](https://claude.ai/code)
- [uv](https://docs.astral.sh/uv/)
- [prek: Rust-based pre-commit framework](https://github.com/j178/prek)
- [DSPY: Pytorch for LLM Inference](https://dspy.ai/)
- [LangFuse: LLM Observability Tool](https://langfuse.com/)
