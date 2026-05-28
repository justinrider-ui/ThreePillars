# Pack 369 — Scout Oath Challenge App

A simple, self-contained web app for tracking Cub Scout progress across the three-phase Scout Oath Challenge program. No server required — runs entirely in the browser.

## Program Structure

The year is divided into three 90-day phases based on the Scout Oath:

| Phase | Period | Color |
|-------|--------|-------|
| 💪 Physically Strong | September – November | Green |
| 🧠 Mentally Awake | December – February | Blue |
| ⭐ Morally Straight | March – May | Red |

Each phase has tiered goals:
- 🥉 **30 days** — Bronze tier
- 🥈 **60 days** — Silver tier
- 🥇 **90 days** — Gold tier

## Pages

| Page | Purpose |
|------|---------|
| `index.html` | Landing page, phase overview, load data |
| `scout.html` | Daily activity logging for scouts |
| `leader.html` | Pack leader dashboard — all scouts, roster management |
| `print.html` | Print-ready tracker sheets with logged days pre-filled |

## Getting Started

### 1. Set up the roster

Edit `data/scouts.json` to add your pack's scouts:

```json
{
  "pack": "Pack 369",
  "location": "New Hampshire",
  "season": "2026-2027",
  "scouts": [
    {
      "id": "scout-001",
      "name": "Scout Name",
      "den": "Wolf Den",
      "rank": "Wolf",
      "parent": "Parent Name",
      "logs": {}
    }
  ]
}
```

### 2. Host or open locally

**Option A — Open locally (simplest):**
Just open `index.html` in a browser. No server needed.

**Option B — GitHub Pages:**
1. Push this repo to GitHub
2. Go to Settings → Pages
3. Set source to `main` branch, root folder
4. Your app will be live at `https://yourusername.github.io/pack369/`

**Option C — Any static host:**
Upload the folder to Netlify, Vercel, or any web server.

### 3. Distribute to scouts

- Share the URL (if hosted) or the folder
- Each scout loads `scouts.json` on first visit
- Progress is saved to their browser's localStorage
- They export updated JSON to share back with the leader

## Data Flow

```
Leader creates/edits scouts.json
        ↓
Scouts load scouts.json in the app
        ↓
Scouts log daily activities (saved to localStorage)
        ↓
Scouts export updated scouts.json
        ↓
Leader imports all files in the Leader Dashboard
        ↓
Leader exports a merged scouts.json to redistribute
```

## Scout's Honor Weekly Rule

Each week, scouts must complete at least one activity from **every category** in their current phase. This is enforced on the honor system — parent initials confirm compliance.

## File Structure

```
pack369/
├── index.html          ← Landing page
├── scout.html          ← Scout daily log
├── leader.html         ← Leader dashboard
├── print.html          ← Print-ready sheets
├── css/
│   └── style.css       ← All styles
├── js/
│   └── app.js          ← Shared data & logic
├── data/
│   └── scouts.json     ← Roster file (edit this)
└── README.md
```

## Printing

Go to `print.html`, select a scout and phase, then use **Print / Save PDF** (or Ctrl+P). The print stylesheet hides all navigation and controls — only the tracker sheet prints. Logged days appear pre-filled in the grid.

For best results: Letter size, minimum margins, background graphics enabled.

## Notes

- All data stays in the browser — nothing is sent to any server
- `localStorage` is per-device; scouts need to export/import JSON to sync across devices
- The app works offline once loaded
- No npm, no build step, no dependencies — just HTML, CSS, and vanilla JS
