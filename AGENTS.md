# rohanbuilds.com

Rohan's portfolio site. Treat this as the source of truth for portfolio positioning and visual guardrails before changing the site or resume link.

## Current Positioning

- Primary title: **Applied AI Engineer**.
- Meaning: Rohan applies AI, n8n, LLM tooling, and automation to ship practical products, workflows, and systems.
- Preferred hero framing: "I apply AI to ship practical systems."
- Do not write "I build AI systems that ship" as the main positioning. It is too broad and can imply every project is an AI system.
- Be precise by project:
  - ClipShip: AI-native/local AI video repurposing desktop app.
  - LastSend: production SaaS/app with n8n-powered backend workflows. Not an AI product.
  - VendorIQ: multi-agent AI due-diligence workflow.
  - CaseDrop: AI document extraction/intake pipeline.
  - Hire Rohan Bot: RAG chatbot.
- Voice: honest, direct, practical builder/operator. No traditional software-engineer inflation.

## Visual Guardrails

- Preserve the current dark grainy palette and restrained neon accents.
- Use real product screenshots over logos or generic brand cards.
- ClipShip should show the process/product screenshot, not the stacked logo/brand card.
- LastSend should use the Google Play listing screenshots from the LastSend project folder.
- Avoid forced hero line breaks. Let the headline wrap responsively.
- Avoid "window inside window" layouts or any centered narrow canvas with dead browser space.
- Nav must not flash borders or jump size on scroll. Keep transitions smooth and stable.
- Do not introduce a new color palette during minor refreshes unless Rohan explicitly asks for a full redesign.

## Deployment

- Run `npm run build` before pushing.
- Start or reuse the local dev server and open the preview in the browser before asking Rohan to approve.
- This repo deploys from `main` through the existing GitHub deployment pipeline.
