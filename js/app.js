// ── PACK 369 SHARED APP LOGIC ──

const APP = {
  version: '1.0.0',

  phases: {
    'physically-strong': {
      id:    'physically-strong',
      label: 'Physically Strong',
      short: 'Phys. Strong',
      emoji: '💪',
      months: ['September', 'October', 'November'],
      monthDays: [30, 31, 29],
      period: 'Sept–Nov',
      color:  'green',
      oathLine: '"…to keep myself Physically Strong"',
      categories: [
        { id: 'S',  label: 'Strength',         emoji: '💪',
          items: ['Push-ups — 5 (younger) / 10 (older)', 'Jumping jacks — 25', 'Squats — 15', 'Wall sit — 20 sec', 'Bear crawl — 2× across room'] },
        { id: 'E',  label: 'Endurance',         emoji: '🏃',
          items: ['Walk/run/bike — 10 min', 'Swim — 15 min', 'Active outdoor play — 20 min'] },
        { id: 'B',  label: 'Balance & Flex',    emoji: '🧘',
          items: ['One-foot balance — 30 sec each', 'Stretching routine — 5 min', 'Yoga — 3 poses, 15 sec each'] },
        { id: 'NH', label: 'NH Bonus',          emoji: '🍂',
          items: ['Rake leaves — 15 min', 'Hike a trail — 20 min', 'Shovel early snow — 10 min'] },
      ],
      tiers: [
        { days: 30, name: 'Trail Blazer',   level: 'Bronze', emoji: '🥉', reward: 'Small patch' },
        { days: 60, name: 'Peak Climber',   level: 'Silver', emoji: '🥈', reward: 'Larger patch + certificate' },
        { days: 90, name: 'Summit Scout',   level: 'Gold',   emoji: '🥇', reward: 'Special patch + Pack honor recognition' },
      ],
    },
    'mentally-awake': {
      id:    'mentally-awake',
      label: 'Mentally Awake',
      short: 'Mentally Awake',
      emoji: '🧠',
      months: ['December', 'January', 'February'],
      monthDays: [31, 31, 28],
      period: 'Dec–Feb',
      color:  'blue',
      oathLine: '"…to keep myself Mentally Awake"',
      categories: [
        { id: 'W',  label: 'Wonder',              emoji: '💡',
          items: ['Ask "why?" & find the answer together', 'Do a simple science experiment', 'Visit a library or bookstore', 'Look up something you\'ve always wondered'] },
        { id: 'L',  label: 'Learning',             emoji: '📚',
          items: ['15 min independent reading', 'Puzzles, brain teasers, chess, Sudoku', 'Build from instructions (LEGO, recipe)', 'Practice a new skill (knot, instrument)'] },
        { id: 'A',  label: 'Awareness',            emoji: '👀',
          items: ['Sit outside & draw/write 5 things you notice', 'Identify a bird, tree, cloud, or constellation', 'Memorize a poem, fact, or map', 'Play a memory or observation game'] },
        { id: 'C',  label: 'Think & Create',       emoji: '🔬',
          items: ['Draw, paint, or make something original', 'Write a story, journal, or letter', 'Build freely with LEGO or found materials', 'Solve a logic puzzle, maze, or riddle'] },
        { id: 'NH', label: 'NH Bonus',             emoji: '🍂',
          items: ['Visit a museum, nature center, or historical site', 'ID 3 things on a nature walk', 'Find a constellation & learn its story', 'Watch a nature/science video + tell someone one thing you learned'] },
      ],
      tiers: [
        { days: 30, name: 'Trailhead Thinker', level: 'Bronze', emoji: '🥉', reward: 'Small patch' },
        { days: 60, name: 'Ridge Reader',      level: 'Silver', emoji: '🥈', reward: 'Larger patch + certificate' },
        { days: 90, name: 'Summit Scholar',    level: 'Gold',   emoji: '🥇', reward: 'Special patch + Pack honor recognition' },
      ],
    },
    'morally-straight': {
      id:    'morally-straight',
      label: 'Morally Straight',
      short: 'Morally Straight',
      emoji: '⭐',
      months: ['March', 'April', 'May'],
      monthDays: [31, 30, 29],
      period: 'Mar–May',
      color:  'red',
      oathLine: '"…to keep myself Morally Straight"',
      categories: [
        { id: 'G',  label: 'Good Turns',   emoji: '🤲',
          items: ['Hold a door or carry something for someone', 'Help with household chores unprompted', 'Write a thank-you note or kind letter', 'Do something nice without being asked'] },
        { id: 'C',  label: 'Community',    emoji: '🏘️',
          items: ['Participate in a town or school event', 'Help at a food pantry or collection drive', 'Pick up litter in your neighborhood', 'Thank a veteran, firefighter, or first responder'] },
        { id: 'S',  label: 'Stewardship', emoji: '🌿',
          items: ['Pick up litter on a trail or park', 'Care for a plant, garden, or animal', 'Reduce, reuse, or recycle something', 'Leave a place cleaner than you found it'] },
        { id: 'Ch', label: 'Character',    emoji: '📖',
          items: ['Read/discuss a story about honesty or courage', 'Practice a Scout Law point — talk about it', 'Tell the truth even when it\'s hard', 'Apologize sincerely if you made a mistake'] },
        { id: 'NH', label: 'NH Bonus',     emoji: '🍂',
          items: ['Shovel a neighbor\'s walk or rake their yard', 'Help at a town meeting or local event', 'Participate in Memorial Day Parade', 'Plant something native to NH'] },
      ],
      tiers: [
        { days: 30, name: 'Town Steward',         level: 'Bronze', emoji: '🥉', reward: 'Small patch' },
        { days: 60, name: 'Granite Scout',         level: 'Silver', emoji: '🥈', reward: 'Larger patch + certificate' },
        { days: 90, name: 'White Mountain Citizen',level: 'Gold',   emoji: '🥇', reward: 'Special patch + Pack honor recognition' },
      ],
    },
  },

  // ── DATA MANAGEMENT ──
  _data: null,

  getData() {
    if (this._data) return this._data;
    const raw = localStorage.getItem('pack369_data');
    if (raw) { this._data = JSON.parse(raw); return this._data; }
    return null;
  },

  saveData(data) {
    this._data = data;
    localStorage.setItem('pack369_data', JSON.stringify(data));
  },

  getScout(id) {
    const d = this.getData();
    if (!d) return null;
    return d.scouts.find(s => s.id === id) || null;
  },

  getLogs(scoutId, phaseId) {
    const scout = this.getScout(scoutId);
    if (!scout || !scout.logs) return {};
    return scout.logs[phaseId] || {};
  },

  logDay(scoutId, phaseId, dayNum, categoryId) {
    const data = this.getData();
    const scout = data.scouts.find(s => s.id === scoutId);
    if (!scout) return;
    if (!scout.logs) scout.logs = {};
    if (!scout.logs[phaseId]) scout.logs[phaseId] = {};
    if (scout.logs[phaseId][dayNum]) {
      delete scout.logs[phaseId][dayNum]; // toggle off
    } else {
      scout.logs[phaseId][dayNum] = { cat: categoryId, ts: Date.now() };
    }
    this.saveData(data);
    return scout.logs[phaseId][dayNum];
  },

  // ── COMPUTED ──
  getDayCount(scoutId, phaseId) {
    return Object.keys(this.getLogs(scoutId, phaseId)).length;
  },

  getTier(scoutId, phaseId) {
    const count = this.getDayCount(scoutId, phaseId);
    const tiers = this.phases[phaseId].tiers;
    let tier = null;
    for (const t of tiers) { if (count >= t.days) tier = t; }
    return tier;
  },

  getTierClass(scoutId, phaseId) {
    const tier = this.getTier(scoutId, phaseId);
    if (!tier) return 'tier-none';
    return 'tier-' + tier.level.toLowerCase();
  },

  // Check which categories have been done in a given week (days 1-7, 8-14, etc.)
  getWeekCoverage(scoutId, phaseId, weekNum) {
    const logs = this.getLogs(scoutId, phaseId);
    const start = (weekNum - 1) * 7 + 1;
    const end   = Math.min(weekNum * 7, 90);
    const done  = new Set();
    for (let d = start; d <= end; d++) {
      if (logs[d]) done.add(logs[d].cat);
    }
    return done;
  },

  getMissingCategories(scoutId, phaseId, weekNum) {
    const phase = this.phases[phaseId];
    const done  = this.getWeekCoverage(scoutId, phaseId, weekNum);
    return phase.categories.filter(c => !done.has(c.id));
  },

  getCurrentWeek(phaseId) {
    // Simple: based on day count logged (which week are they up to)
    return 1; // Placeholder; real apps would use calendar date
  },

  // ── HELPERS ──
  phaseCSSVar(phaseId) {
    const c = this.phases[phaseId].color;
    document.documentElement.style.setProperty('--phase-color', `var(--${c})`);
    document.documentElement.style.setProperty('--phase-light', `var(--${c}-l)`);
    document.documentElement.style.setProperty('--phase-bg',    `var(--${c}-bg)`);
  },

  tierFromCount(count, phaseId) {
    const tiers = this.phases[phaseId].tiers;
    let tier = null;
    for (const t of tiers) { if (count >= t.days) tier = t; }
    return tier;
  },

  progressColor(phaseId) {
    return { 'physically-strong': 'progress-green', 'mentally-awake': 'progress-blue', 'morally-straight': 'progress-red' }[phaseId];
  },

  // Import JSON from file input
  importJSON(file, callback) {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target.result);
        this._data = data;
        localStorage.setItem('pack369_data', JSON.stringify(data));
        callback(null, data);
      } catch(err) { callback(err); }
    };
    reader.readAsText(file);
  },

  // Export JSON as download
  exportJSON() {
    const data = this.getData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'scouts.json';
    a.click();
  },
};
