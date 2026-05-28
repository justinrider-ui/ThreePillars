// ── PACK 369 — CONFIG ──
// Replace these with your actual Supabase project values after setup.
// See README.md for instructions on where to find these.
const SUPABASE_URL = 'https://xgzwgyoyimlycctckqfh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnendneW95aW1seWNjdGNrcWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NjI4NDUsImV4cCI6MjA5NTUzODg0NX0.6PJxApO2-W0C6mHswGZmS8QRaLhX4HXd9WHi-CoFiT8';
const LEADER_PASSWORD = '578080'; // change this to something memorable

// ── SUPABASE CLIENT (lightweight, no npm needed) ──
const sb = {
  url: SUPABASE_URL,
  key: SUPABASE_ANON_KEY,

  headers() {
    return {
      'Content-Type': 'application/json',
      'apikey': this.key,
      'Authorization': `Bearer ${this.key}`,
    };
  },

  async select(table, query = '') {
    const res = await fetch(`${this.url}/rest/v1/${table}?${query}`, {
      headers: this.headers(),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async insert(table, data) {
    const res = await fetch(`${this.url}/rest/v1/${table}`, {
      method: 'POST',
      headers: { ...this.headers(), 'Prefer': 'return=representation' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async update(table, data, query) {
    const res = await fetch(`${this.url}/rest/v1/${table}?${query}`, {
      method: 'PATCH',
      headers: { ...this.headers(), 'Prefer': 'return=representation' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async upsert(table, data) {
    const res = await fetch(`${this.url}/rest/v1/${table}`, {
      method: 'POST',
      headers: { ...this.headers(), 'Prefer': 'return=representation,resolution=merge-duplicates' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async delete(table, query) {
    const res = await fetch(`${this.url}/rest/v1/${table}?${query}`, {
      method: 'DELETE',
      headers: this.headers(),
    });
    if (!res.ok) throw new Error(await res.text());
    return true;
  },
};

// ── SESSION ──
const SESSION = {
  set(type, scoutId) {
    sessionStorage.setItem('p369_type', type);       // 'scout' or 'leader'
    sessionStorage.setItem('p369_scout', scoutId || '');
  },
  get() {
    return {
      type:    sessionStorage.getItem('p369_type'),
      scoutId: sessionStorage.getItem('p369_scout'),
    };
  },
  clear() { sessionStorage.removeItem('p369_type'); sessionStorage.removeItem('p369_scout'); },
  isLeader()  { return this.get().type === 'leader'; },
  isScout()   { return this.get().type === 'scout'; },
  scoutId()   { return this.get().scoutId; },
  requireLeader() { if (!this.isLeader()) { location.href = 'index.html'; } },
  requireAuth()   { if (!this.get().type) { location.href = 'index.html'; } },
};

// ── PHASE DATA ──
const APP = {
  phases: {
    'physically-strong': {
      id: 'physically-strong', label: 'Physically Strong', short: 'Phys. Strong',
      emoji: '💪', months: ['September','October','November'], monthDays: [30,31,29],
      period: 'Sept–Nov', color: 'green',
      oathLine: '"…to keep myself Physically Strong"',
      categories: [
        { id:'S',  label:'Strength',      emoji:'💪', items:['Push-ups — 5 (younger) / 10 (older)','Jumping jacks — 25','Squats — 15','Wall sit — 20 sec','Bear crawl — 2× across room'] },
        { id:'E',  label:'Endurance',     emoji:'🏃', items:['Walk/run/bike — 10 min','Swim — 15 min','Active outdoor play — 20 min'] },
        { id:'B',  label:'Balance & Flex',emoji:'🧘', items:['One-foot balance — 30 sec each','Stretching routine — 5 min','Yoga — 3 poses, 15 sec each'] },
        { id:'NH', label:'NH Bonus',      emoji:'🍂', items:['Rake leaves — 15 min','Hike a trail — 20 min','Shovel early snow — 10 min'] },
      ],
      tiers: [
        { days:30, name:'Trail Blazer',  level:'Bronze', emoji:'🥉', reward:'Small patch' },
        { days:60, name:'Peak Climber',  level:'Silver', emoji:'🥈', reward:'Larger patch + certificate' },
        { days:90, name:'Summit Scout',  level:'Gold',   emoji:'🥇', reward:'Special patch + Pack honor recognition' },
      ],
    },
    'mentally-awake': {
      id: 'mentally-awake', label: 'Mentally Awake', short: 'Mentally Awake',
      emoji: '🧠', months: ['December','January','February'], monthDays: [31,31,28],
      period: 'Dec–Feb', color: 'blue',
      oathLine: '"…to keep myself Mentally Awake"',
      categories: [
        { id:'W',  label:'Wonder',       emoji:'💡', items:['Ask "why?" & find the answer together','Do a simple science experiment','Visit a library or bookstore','Look up something you\'ve always wondered'] },
        { id:'L',  label:'Learning',     emoji:'📚', items:['15 min independent reading','Puzzles, brain teasers, chess, Sudoku','Build from instructions (LEGO, recipe)','Practice a new skill (knot, instrument)'] },
        { id:'A',  label:'Awareness',    emoji:'👀', items:['Sit outside & draw/write 5 things you notice','Identify a bird, tree, cloud, or constellation','Memorize a poem, fact, or map','Play a memory or observation game'] },
        { id:'C',  label:'Think & Create',emoji:'🔬',items:['Draw, paint, or make something original','Write a story, journal, or letter','Build freely with LEGO or found materials','Solve a logic puzzle, maze, or riddle'] },
        { id:'NH', label:'NH Bonus',     emoji:'🍂', items:['Visit a museum, nature center, or historical site','ID 3 things on a nature walk','Find a constellation & learn its story','Watch a nature/science video + tell someone one thing you learned'] },
      ],
      tiers: [
        { days:30, name:'Trailhead Thinker', level:'Bronze', emoji:'🥉', reward:'Small patch' },
        { days:60, name:'Ridge Reader',      level:'Silver', emoji:'🥈', reward:'Larger patch + certificate' },
        { days:90, name:'Summit Scholar',    level:'Gold',   emoji:'🥇', reward:'Special patch + Pack honor recognition' },
      ],
    },
    'morally-straight': {
      id: 'morally-straight', label: 'Morally Straight', short: 'Morally Straight',
      emoji: '⭐', months: ['March','April','May'], monthDays: [31,30,29],
      period: 'Mar–May', color: 'red',
      oathLine: '"…to keep myself Morally Straight"',
      categories: [
        { id:'G',  label:'Good Turns',  emoji:'🤲', items:['Hold a door or carry something for someone','Help with household chores unprompted','Write a thank-you note or kind letter','Do something nice without being asked'] },
        { id:'C',  label:'Community',   emoji:'🏘️', items:['Participate in a town or school event','Help at a food pantry or collection drive','Pick up litter in your neighborhood','Thank a veteran, firefighter, or first responder'] },
        { id:'S',  label:'Stewardship', emoji:'🌿', items:['Pick up litter on a trail or park','Care for a plant, garden, or animal','Reduce, reuse, or recycle something','Leave a place cleaner than you found it'] },
        { id:'Ch', label:'Character',   emoji:'📖', items:['Read/discuss a story about honesty or courage','Practice a Scout Law point — talk about it','Tell the truth even when it\'s hard','Apologize sincerely if you made a mistake'] },
        { id:'NH', label:'NH Bonus',    emoji:'🍂', items:['Shovel a neighbor\'s walk or rake their yard','Help at a town meeting or local event','Participate in Memorial Day Parade','Plant something native to NH'] },
      ],
      tiers: [
        { days:30, name:'Town Steward',          level:'Bronze', emoji:'🥉', reward:'Small patch' },
        { days:60, name:'Granite Scout',          level:'Silver', emoji:'🥈', reward:'Larger patch + certificate' },
        { days:90, name:'White Mountain Citizen', level:'Gold',   emoji:'🥇', reward:'Special patch + Pack honor recognition' },
      ],
    },
  },

  phaseCSSVar(phaseId) {
    const c = this.phases[phaseId].color;
    document.documentElement.style.setProperty('--phase-color', `var(--${c})`);
    document.documentElement.style.setProperty('--phase-light', `var(--${c}-l)`);
    document.documentElement.style.setProperty('--phase-bg',    `var(--${c}-bg)`);
  },

  getTier(count, phaseId) {
    const tiers = this.phases[phaseId].tiers;
    let tier = null;
    for (const t of tiers) { if (count >= t.days) tier = t; }
    return tier;
  },

  progressColor(phaseId) {
    return { 'physically-strong':'progress-green', 'mentally-awake':'progress-blue', 'morally-straight':'progress-red' }[phaseId];
  },

  // Group flat logs array into { [dayNum]: {cat, ts} } per phase
  indexLogs(logsArr, phaseId) {
    const out = {};
    for (const l of logsArr) {
      if (l.phase === phaseId) out[l.day_num] = { cat: l.category, ts: l.logged_at };
    }
    return out;
  },
};

// ── SCHOOL YEAR & PHASE UNLOCK LOGIC ──
//
// School year runs Sept 1 – June 30.
// July 1 – Aug 31 = off-season (all phases locked).
// June 1 – June 30 = grace period (previous season stays open).
//
// Given a date, getSchoolYear() returns the starting year of the active season.
// e.g. Sept 1 2026 → "2026", March 2027 → "2026" (same season), July 2026 → off-season.

APP.getSchoolYear = function(date) {
  const d = date || new Date();
  const month = d.getMonth() + 1; // 1-based
  const year  = d.getFullYear();
  // July–August: off-season, upcoming season starts next September
  if (month >= 7 && month <= 8) return null; // null = off-season
  // September–December: school year just started (year = current)
  if (month >= 9) return year;
  // January–June: we're in the school year that started last September
  return year - 1;
};

APP.schoolYearLabel = function() {
  const sy = this.getSchoolYear();
  if (!sy) {
    const now  = new Date();
    const next = now.getFullYear() + (now.getMonth() >= 8 ? 1 : 0);
    return `${next}–${next + 1}`;
  }
  return `${sy}–${sy + 1}`;
};

APP.isOffSeason = function() {
  return this.getSchoolYear() === null;
};

// Returns the unlock date for a phase in the current school year as a Date object.
// physically-strong: Sept 1 of school year start
// mentally-awake:    Dec 1 of school year start
// morally-straight:  Mar 1 of school year start + 1
APP.getUnlockDate = function(phaseId) {
  const sy = this.getSchoolYear();
  if (sy === null) return null; // off-season, nothing unlocks
  const map = {
    'physically-strong': new Date(sy,     8,  1), // Sept 1
    'mentally-awake':    new Date(sy,    11,  1), // Dec 1
    'morally-straight':  new Date(sy + 1, 2,  1), // Mar 1 next year
  };
  return map[phaseId];
};

APP.isUnlocked = function(phaseId) {
  if (SESSION.isLeader()) return true;  // leaders always see everything
  if (this.isOffSeason()) return false; // July–Aug: nothing unlocked
  const unlock = this.getUnlockDate(phaseId);
  if (!unlock) return false;
  return new Date() >= unlock;
};

APP.unlockDateLabel = function(phaseId) {
  if (this.isOffSeason()) {
    const now  = new Date();
    const yr   = now.getFullYear() + 1;
    return `September 1, ${yr}`;
  }
  const unlock = this.getUnlockDate(phaseId);
  if (!unlock) return 'TBD';
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return `${months[unlock.getMonth()]} ${unlock.getDate()}, ${unlock.getFullYear()}`;
};

// Returns the season string for logging (e.g. "2026-2027")
APP.currentSeason = function() {
  const sy = this.getSchoolYear();
  if (!sy) return null;
  return `${sy}-${sy + 1}`;
};
