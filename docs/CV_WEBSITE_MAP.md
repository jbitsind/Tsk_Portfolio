# CV ↔ Website mapping (single source of truth)

This file is the reference checklist to keep the website aligned with the CV PDFs in `docs/`.

## Canonical CV files

- `docs/CV_LATEST_v2.pdf` (website download link)
- Supporting: `docs/RESUME__CV.pdf`, `docs/Resume_JeanRodrigueBitsindaIkuzwe.pdf`

## Website sections to keep in sync

### About

- Name, title, contact info
- 1–2 sentence summary that matches the CV “Summary / Research Interests”

### Education (About → Education)

Match CV order:
- CMU-Africa — MSECE (Applied ML) — 2023–2025
- ICTP–EAIFR — MSc Condensed Matter Physics — 2021–2023
- University of Rwanda — BSc Physics — 2016–2020

### Experience (About → Experience)

Keep reverse-chronological, and ensure role titles/employers match CV wording:
- Upanzi Network (Kigali) — Research Associate — Jul–Dec 2025
- CMU-Africa — Graduate Research Assistant — Sep–Dec 2024
- CMU-Africa — Graduate Summer Research Intern — Jun–Aug 2024
- ICTP–EAIFR — Graduate Researcher — Jan–Jul 2023

(If you want to include community/volunteer work, add it under a separate “Leadership & Service” subsection to avoid mixing with employment.)

### Portfolio (Projects)

Each portfolio item should correspond to a CV project. Current mapping used on the site:
1. Kigali Water Network Digital Twin (GIS) — Upanzi Network
2. 3D Prosthetic Reconstruction (AI/CV) — CMU-Africa
3. Taxi Fare Prediction (GCP + XGBoost) — Cloud Computing capstone
4. Unified Data Aggregation & Visualization Pipeline — DB capstone (Prefect + Dash)
5. Smart Sorter (Edge Waste Classification) — DL capstone (ResNet + synthetic data)
6. Potential Energy Surface Fitting (ML) — ICTP–EAIFR (ANN/KRR/GPR)

Checklist per project:
- Title matches CV wording
- Time range (month/year) present in modal text
- 2–4 bullets: problem → approach → tools → outcome
- Optional links: GitHub / paper / demo (only if public)

## How to use GPT agent to update safely

When you update your CV, do this sequence:
1. Add/replace the PDF in `docs/`.
2. Ask the agent: “extract CV items and show diffs vs website”
3. Approve the suggested edits section-by-section (Education → Experience → Projects).
4. Run `npm run build` to confirm Parcel builds.

## Known theme checks

- Verify dark mode: navbar, section backgrounds, modals, blog cards, and the style switcher panel.
- Verify color skins: switch between color-1..color-5 and refresh; selection should persist.
