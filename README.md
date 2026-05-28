# Pack 369 — Scout Oath Challenge App

A web app for tracking Cub Scout progress across three 90-day phases. Families log in with a 4-digit PIN to see only their scout's data. The pack leader sees everyone and manages the roster.

---

## How It Works

- **Families** go to the site URL and enter their 4-digit PIN → see only their scout's tracker
- **Leader** enters a password → sees all scouts, can add/remove scouts, update PINs
- All data is stored in Supabase (a free cloud database) — no JSON files to manage
- The same PIN can be used for future modules (orienteering, events, etc.)

---

## One-Time Setup (about 30 minutes total)

### Step 1 — Create a Supabase account

1. Go to [https://supabase.com](https://supabase.com) and click **Start your project**
2. Sign up with GitHub (easiest) or email
3. Click **New Project**
4. Fill in:
   - **Name:** `pack369` (or anything you like)
   - **Database Password:** choose something strong and save it somewhere
   - **Region:** pick the closest US region (e.g. US East)
5. Click **Create new project** — it takes about 2 minutes to spin up

---

### Step 2 — Create the database tables

Once your project is ready:

1. In the left sidebar, click **SQL Editor**
2. Click **New query**
3. Paste in the following SQL and click **Run**:

```sql
-- Scouts table (you manage this as leader)
create table scouts (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  den        text,
  rank       text,
  parent     text,
  pin        char(4) not null unique,
  created_at timestamptz default now()
);

-- Logs table (one row per scout per day per phase)
create table logs (
  id         uuid primary key default gen_random_uuid(),
  scout_id   uuid references scouts(id) on delete cascade,
  phase      text not null,
  day_num    integer not null,
  category   text not null,
  logged_at  timestamptz default now(),
  unique(scout_id, phase, day_num)
);

-- Allow public read/write (the app handles auth via PINs)
alter table scouts enable row level security;
alter table logs    enable row level security;

create policy "Public read scouts"  on scouts for select using (true);
create policy "Public insert scouts" on scouts for insert with check (true);
create policy "Public update scouts" on scouts for update using (true);
create policy "Public delete scouts" on scouts for delete using (true);

create policy "Public read logs"   on logs for select using (true);
create policy "Public insert logs" on logs for insert with check (true);
create policy "Public update logs" on logs for update using (true);
create policy "Public delete logs" on logs for delete using (true);
```

You should see **Success. No rows returned** at the bottom.

---

### Step 3 — Get your Supabase keys

1. In the left sidebar, click **Project Settings** (gear icon)
2. Click **API**
3. You'll see two values you need:
   - **Project URL** — looks like `https://abcdefghijkl.supabase.co`
   - **anon public** key — a long string starting with `eyJ...`

Keep this tab open for the next step.

---

### Step 4 — Configure the app

Open `js/app.js` in a text editor and find these three lines near the top:

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
const LEADER_PASSWORD = 'YOUR_LEADER_PASSWORD';
```

Replace them with your actual values:

```javascript
const SUPABASE_URL = 'https://abcdefghijkl.supabase.co';  // your Project URL
const SUPABASE_ANON_KEY = 'eyJhbGci...';                  // your anon key
const LEADER_PASSWORD = 'wolves2027';                      // choose your own password
```

Save the file.

---

### Step 5 — Push to GitHub

1. Create a new repository at [https://github.com/new](https://github.com/new)
   - Name it `pack369` (or anything you like)
   - Set it to **Public** (required for free GitHub Pages)
   - Don't initialize with a README
2. Open Terminal and run:

```bash
cd path/to/pack369v2
git init
git add .
git commit -m "Initial Pack 369 app"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/pack369.git
git push -u origin main
```

---

### Step 6 — Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Set branch to `main`, folder to `/ (root)`
5. Click **Save**

After about 1 minute your site will be live at:
```
https://YOURUSERNAME.github.io/pack369/
```

Share this URL with your pack families!

---

## Adding Scouts

Once the site is live:

1. Go to your site URL and sign in as leader
2. Fill in the **Add Scout** form in the sidebar
3. Assign a unique 4-digit PIN — write it down to share with the family
4. The scout appears immediately in the roster

**Tips for PINs:**
- Use something memorable but not obvious (not `1234`, not the scout's birth year)
- You can change a PIN at any time in the Scout Detail panel
- Families can't see or change their own PIN

---

## Day-to-Day Usage

**For families:**
1. Go to the site URL
2. Enter their 4-digit PIN
3. Select the current phase
4. Pick a category, tap a day to log it
5. Sign out when done

**For you as leader:**
1. Sign in with your leader password
2. See all scouts and their progress at a glance
3. The "Behind on Categories" panel flags scouts who haven't covered all categories in the current week
4. Use the Print page to generate tracker sheets for any scout

---

## Printing Tracker Sheets

- **Leader:** Sign in → Print → select scout and phase → Print / Save PDF
- **Families:** Sign in → Print → select phase → Print / Save PDF (they only see their own scout)

For best print results: Letter size, minimum margins, background graphics enabled in browser print dialog.

---

## File Structure

```
pack369v2/
├── index.html       ← PIN login page
├── scout.html       ← Family daily log (PIN-gated)
├── leader.html      ← Leader dashboard (password-gated)
├── print.html       ← Print-ready tracker sheets
├── css/
│   └── style.css
├── js/
│   └── app.js       ← Config + shared logic (edit this first)
└── README.md
```

---

## Adding Future Modules

The PIN system is designed to grow. To add something like an orienteering tracker:

1. Create a new table in Supabase (e.g. `orienteering_logs`)
2. Add a new page (e.g. `orienteering.html`)
3. Families use the same PIN — no new login needed
4. Add a link to it in the nav

---

## Troubleshooting

**"Connection error" on login:**
- Check that `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `app.js` are correct and saved
- Make sure the Supabase project is active (free projects pause after 1 week of inactivity — just visit the Supabase dashboard to wake it up)

**"Incorrect PIN" when you know it's right:**
- Check the scouts table in Supabase: Project → Table Editor → scouts
- PINs are stored as plain text — confirm the value matches

**Site not updating after a code change:**
- GitHub Pages can take 1–2 minutes to rebuild after a push
- Hard-refresh your browser (Ctrl+Shift+R / Cmd+Shift+R)

**Supabase free tier limits:**
- 50,000 database rows (more than enough for a pack)
- Projects pause after 1 week of inactivity on the free plan — just log into Supabase to unpause
- Upgrade to Pro ($25/month) only if you need always-on uptime during off-season
