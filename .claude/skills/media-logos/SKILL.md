---
name: media-logos
description: Manage company/product logo images in media/. Auto-fetch missing logos from logo.dev API.
user_invocable: false
triggers:
  - when the user mentions a company or product that needs a logo
  - when adding or referencing images in media/
---

# Media Logo Management

When a company or product is mentioned and no corresponding image exists in `media/`, automatically fetch its logo using the logo.dev API.

## Directory Structure

```
media/Technology/
  agents/        # AI agents and coding tools
  b2b products/  # B2B SaaS products
  b2c products/  # Consumer-facing products
  company/       # Company logos
  open-source/   # Open-source project logos
```

## Workflow

### 1. Check if image already exists

Search `media/Technology/` subdirectories for an existing image matching the company/product name (case-insensitive, any image extension).

### 2. Fetch missing logos from logo.dev

If no image exists, use the logo.dev API to fetch it:

```bash
curl -o "media/Technology/<category>/<name>.png" \
  "https://img.logo.dev/<domain>?token=$LOGO_DEV_API_KEY&size=200&format=png"
```

- `<domain>`: The company's primary domain (e.g., `openai.com`, `salesforce.com`)
- `$LOGO_DEV_API_KEY`: Stored in `.env` as `LOGO_DEV_API_KEY`
- Default size: 200px, format: PNG

### 3. Category selection

Place logos in the appropriate subdirectory:
- **agents/**: AI agents, coding assistants, dev tools (e.g., Cursor, Claude Code, ChatGPT)
- **b2b products/**: Enterprise/B2B SaaS (e.g., Salesforce, Snowflake, Splunk)
- **b2c products/**: Consumer products (e.g., Google Drive, Outlook, Gemini)
- **company/**: Parent company logos (e.g., OpenAI, Okta)
- **open-source/**: Open-source projects (e.g., PostgreSQL, Linux)

### 4. Naming convention

- Use the product/company display name with spaces (e.g., `Claude Code AI Logo.jpg`)
- Keep existing naming patterns consistent with what's already in the directory
- Prefer `.png` format for new downloads

## Error Handling

- If logo.dev returns a 404 or empty image, inform the user and ask them to provide the image manually
- If `LOGO_DEV_API_KEY` is not set in `.env`, warn the user to add it
