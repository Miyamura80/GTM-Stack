---
name: competitor-intel
description: Add or update a competitor profile, signals, and ICP insights in data/competitors/
user_invocable: true
triggers:
  - /competitor-intel
---

# Add / Update Competitor Intel

## Input

User provides a competitor name and any raw context (URL, news, notes). If no context given, ask.

## Steps

1. **Profile** - Create or update `data/competitors/<slug>/profile.yaml`:
   ```yaml
   name: Acme Corp
   category: direct | adjacent | emerging
   positioning: <one-line how they position themselves>
   overlap: 1-5  # market overlap with us
   color: coral | gold | blue | violet | emerald
   ```
   Derive `positioning` from how the competitor describes themselves publicly - not our opinion of them.

2. **Signals** - Add entries to `data/competitors/signals/<YYYY-MM>-H<1|2>.yaml` (H1 = days 1-15, H2 = days 16+). Create file if missing.
   ```yaml
   signals:
     - competitor: <slug>
       type: product | pricing | content | hiring | partnerships | funding
       date: YYYY-MM-DD
       description: >
         What happened, factually.
       action: opportunity | watch | respond
       insight: >
         What this means for us specifically.
   ```
   Every signal **must** have an `insight` - connect it to our GTM position.

3. **ICP & Insights** - Review `data/competitors/icp/segments.yaml` and `insights.yaml`. If this competitor changes the landscape:
   - Add competitor slug to relevant segments
   - Add or update an insight in `insights.yaml` if a new cross-competitor pattern emerges

   Don't add insights that duplicate existing ones - update them instead.

4. **Validate** - Run `cd dashboard && bun run vite build` to confirm YAML loads correctly.
