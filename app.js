/* JF Payroll Desk rebuild mock-up. All data below is made up. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  /* ---------- 1. before / after bars ---------- */
  const before = [
    [9, "Desk rebuilt live", "#DCD5FC", "10:53", "Calendar view rebuilt while you waited; Xero sign-in check failed"],
    [14, "One trainer, evidence asked for 3 times", "#FCDCA6", "11:02", "Paid no-shows cut overnight; finished client and moved sessions dug out by hand"],
    [15, "Six rules re-explained", "#FCE6BF", "11:16", "Split padding, paid no-shows, admin trims, 1:1 splits, late cancels, support packs"],
    [17, "The clean trainers, quick", "#D6F0BC", "11:31", "This part worked: about a minute each"],
    [8, "Xero checks stuck", "#FFCFC2", "11:48", "Push fine; status reads blocked 2 and 4.6 min by a watchdog restart"],
    [11, "Trainee hours, commissions redo", "#C9E2FF", "11:56", "Training blocks dug out of a calendar; commissions rejected and redone"],
    [42, "Xero include step", "#FFA690", "12:07", "Four browser attempts, 9 of 18, phone approval mid-way. A script then did the rest in 32 s"],
    [5, "Pay list in pieces", "#E7EBF2", "12:49", "Partial table, full table, then \"only the new ones\""],
    [8, "Post, STP, super", "#FFCFC2", "12:54", "WDA start looked up live, SMS code read off the phone"]
  ];
  const after = [
    [2, "Brief", "#C9E2FF"],
    [10, "Trainer cards: 13 green in one yes, 3 flagged", "#D6F0BC"],
    [2, "Commissions", "#C9E2FF"],
    [4, "Xero path", "#D6F0BC"],
    [2, "STP, super", "#D6F0BC"]
  ];
  const bb = $("#barBefore"), ba = $("#barAfter"), sinks = $("#sinks");
  before.forEach(([m, label, c, t, why]) => {
    const s = el("div", "seg", `<span>${m >= 7 ? label : ""}</span>`);
    s.style.flex = m; s.style.background = c; s.title = `${t} · ${m} min · ${label}. ${why}`;
    bb.appendChild(s);
    const k = el("div", "sink", `<span class="sw" style="background:${c}"></span><span class="t">${m} min</span><span><b>${label}</b><span class="ink2">${t} · ${why}</span></span>`);
    sinks.appendChild(k);
  });
  after.forEach(([m, label, c]) => {
    const s = el("div", "seg", `<span>${m >= 4 ? label : m + "m"}</span>`);
    s.style.flex = m; s.style.background = c; s.title = `${m} min · ${label}`;
    ba.appendChild(s);
  });

  /* ---------- 2. trainer card data ---------- */
  const DAYS = ["Sat 3", "Sun 4", "Mon 5", "Tue 6", "Wed 7", "Thu 8", "Fri 9"];
  const H0 = 6, H1 = 21, PX = 46; // 6am to 9pm
  const t2m = t => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const fmt = m => { let h = Math.floor(m / 60), mm = m % 60; const ap = h >= 12 ? "pm" : "am"; h = h % 12 || 12; return mm ? `${h}:${String(mm).padStart(2, "0")}${ap}` : `${h}${ap}`; };
  const Y = t => (t2m(t) - H0 * 60) / 60 * PX;

  const A = [
    { id: "r1", d: 2, s: "07:00", m: 45, c: "Ruben Ashford", k: "on", cf: 3, verdict: "Almost certainly didn't happen",
      yes: ["Ruben opened his own app at 6:05am (55 min before)"],
      no: ["Ruben finished on 4 Oct; final debit 30 Sep, no makeups owed", "Weekly series set up 22 Aug, never switched off", "No workout logged", "Holly never opened Ruben on iPad or iPhone in the slot", "No messages either way, no note", "Holly's first app activity Monday was 4:31pm"] },
    { id: "j0", d: 2, s: "16:45", m: 45, c: "Jasmine Tate", k: "on", cf: 96, ghost: true, half: "l", verdict: "Happened, but not on the calendar",
      yes: ["Jasmine texted \"on my way\" at 4:34pm", "PT workout logged 4:56pm, entered by Holly on iPad", "Holly offered this new Monday slot by message on Sun"],
      no: ["Not on the calendar (added by Holly on her Friday sign-off)"] },
    { id: "o1", d: 2, s: "17:00", m: 45, c: "Owen Pell", k: "on", cf: 4, half: "r", verdict: "Moved by message, didn't happen here",
      yes: ["Regular fortnightly Monday slot"],
      no: ["Holly moved Owen to Wed 5:45pm by message on Sun and Mon", "Holly was with Jasmine at this time (workout 4:56pm)", "No workout, no client app activity"] },
    { id: "c1", d: 2, s: "18:00", m: 45, c: "Carla Mendez", k: "on", cf: 97, verdict: "Happened",
      yes: ["PT workout logged 6:38pm", "Holly opened Carla on iPad at 6:02pm", "Carla texted \"running 2 min late\" 5:57pm", "Ticked on Holly's sign-off"], no: [] },
    { id: "k1", d: 2, s: "19:00", m: 30, c: "Rhys Okafor", k: "ks", cf: 88, verdict: "Happened",
      yes: ["Free session; pre-screen form done Sun", "Holly's JF Note at 7:34pm: \"Great first session\"", "Ticked on sign-off"], no: ["No workout logged (normal for a free session)"] },
    { id: "f1", d: 3, s: "08:45", m: 60, c: "Freya Doyle", k: "on", cf: 92, verdict: "Happened",
      yes: ["PT workout logged 9:31am", "Holly active on iPhone 8:40 to 9:50am", "Ticked on sign-off"], no: [] },
    { id: "t1", d: 4, s: "08:00", m: 30, c: "Theo Marsh", k: "ks", cf: 91, verdict: "Happened",
      yes: ["Theo texted \"here\" at 7:58am", "Holly's note 8:31am", "Bought a Kickstart at 8:36am on Holly's phone"], no: [] },
    { id: "n1", d: 4, s: "08:30", m: 30, c: "Ines Calder", k: "ks", cf: 100, ns: true, verdict: "Genuine no-show. Paid",
      yes: ["Ines texted \"not able to make it today\" at 7:23am", "Holly's note \"No show\" 8:42am", "Late notice, so paid under your rule"], no: [] },
    { id: "j1", d: 4, s: "09:00", m: 45, c: "Jasmine Tate", k: "on", cf: 99, verdict: "Happened",
      yes: ["PT workout logged 9:36am", "Holly opened Jasmine on iPad 9:01am", "Ticked on sign-off"], no: [] },
    { id: "nf", d: 4, s: "18:15", m: 45, c: "Nico Ferris", k: "on", cf: 94, verdict: "Happened",
      yes: ["PT workout logged 6:52pm", "Nico's app open 6:10 to 7:05pm", "Ticked on sign-off"], no: [] },
    { id: "n2", d: 4, s: "19:00", m: 30, c: "Pia Lowe", k: "ks", cf: 100, ns: true, verdict: "Genuine no-show. Paid",
      yes: ["Holly's note \"No show\" 7:12pm", "Reminder SMS sent the day before, no reply", "Holly was in the app at the gym 6:55 to 7:20pm"], no: [] },
    { id: "ms", d: 5, s: "06:30", m: 45, c: "Mae Sutton", k: "on", cf: 95, verdict: "Happened",
      yes: ["PT workout logged 7:09am", "Holly on iPad 6:28am", "Ticked on sign-off"], no: [] },
    { id: "ab", d: 5, s: "07:15", m: 45, c: "Ari Black", k: "on", cf: 90, verdict: "Happened",
      yes: ["Ari's app open 7:12am", "Holly opened Ari on iPad 7:16am", "Ticked on sign-off"], no: ["No workout logged (Ari usually logs his own)"] },
    { id: "n3", d: 5, s: "16:15", m: 30, c: "Hal Becker", k: "ks", cf: 100, ns: true, verdict: "Genuine no-show. Paid",
      yes: ["Office texted Hal 4:21pm that Holly was running late", "Hal replied 4:31pm: \"Sorry, I forgot, can't make it\"", "Holly's note \"No show\" 4:23pm"], no: [] },
    { id: "sm", d: 5, s: "16:45", m: 30, c: "Sky Mercer", k: "ks", cf: 93, verdict: "Happened",
      yes: ["Holly's note 5:18pm", "Sky booked a second session on Holly's phone", "Ticked on sign-off"], no: [] },
    { id: "o2", d: 5, s: "18:15", m: 45, c: "Owen Pell", k: "on", cf: 41, verdict: "Not sure. Holly says yes",
      yes: ["Ticked on Holly's sign-off", "Owen pays for this week and has no cancel"], no: ["Owen never replied to the reschedule message", "No workout in the slot; only a solo workout Fri 5:28pm", "Holly didn't open Owen in the app"] },
    { id: "j2", d: 5, s: "19:00", m: 45, c: "Jasmine Tate", k: "on", cf: 6, verdict: "Didn't happen. Replaced by Monday",
      yes: ["Regular Thursday slot"], no: ["Jasmine's Thursdays moved to mornings by message", "Her second session this week was Mon 4:45pm", "No workout, no app activity", "Unticked on Holly's sign-off"] },
    { id: "r2", d: 6, s: "06:30", m: 45, c: "Ruben Ashford", k: "on", cf: 2, verdict: "Almost certainly didn't happen",
      yes: [], no: ["Ruben finished on 4 Oct", "Same weekly series, never switched off", "No workout, no note, no messages", "Only the background app check every client's phone makes", "Holly's first activity Friday was 7:58am"] },
    { id: "sd", d: 6, s: "08:00", m: 45, c: "Sid Moran", k: "on", cf: 89, verdict: "Happened",
      yes: ["PT workout logged 8:41am", "Ticked on sign-off"], no: ["Holly used her iPhone, not the gym iPad"] },
    { id: "aq", d: 6, s: "08:45", m: 30, c: "Ada Quinn", k: "ks", cf: 90, verdict: "Happened",
      yes: ["Pre-screen done", "Holly's note 9:20am", "Ticked on sign-off"], no: [] },
    { id: "bw", d: 6, s: "12:00", m: 60, c: "Bea Walsh", k: "on", cf: 96, verdict: "Happened",
      yes: ["PT workout logged 12:48pm", "Bea texted \"on my way\" 11:41am", "Holly on iPad 11:58am"], no: [] },
    { id: "oo", d: 6, s: "15:00", m: 60, c: "1:1 with Grace", k: "oo", cf: 100, verdict: "Happened",
      yes: ["Calendar invite accepted", "Recorded call 3:00 to 3:52pm"], no: ["Never makes a split shift (your rule)"] }
  ];
  const G = [
    { d: 2, s: "07:45", e: "16:45", t: "split", l: "Split $20<br>9h gap", dep: ["r1"] },
    { d: 2, s: "17:45", e: "18:00", t: "admin", l: "Admin 15m" },
    { d: 2, s: "18:45", e: "19:00", t: "brk", l: "Paid break" },
    { d: 4, s: "09:45", e: "18:15", t: "split", l: "Split $20<br>8h 30m gap" },
    { d: 5, s: "08:00", e: "16:15", t: "split", l: "Split $20<br>8h 15m gap" },
    { d: 5, s: "17:15", e: "18:15", t: "unpaid", l: "Unpaid 1h" },
    { d: 6, s: "07:15", e: "08:00", t: "unpaid", l: "Unpaid 45m" },
    { d: 6, s: "09:15", e: "12:00", t: "unpaid", l: "Unpaid 2h 45m" },
    { d: 6, s: "13:00", e: "15:00", t: "admin", l: "Admin 1h", w: 60 }
  ];
  // admin gap on Fri is capped at 1 h of the 2 h gap
  const removed = new Set();
  const cfClass = v => v >= 75 ? "g" : v >= 40 ? "a" : "r";
  const cfColor = v => v >= 75 ? "#8BD42A" : v >= 40 ? "#F5A524" : "#FF5E3A";

  function totals() {
    const lines = { on: Array(7).fill(0), ks: Array(7).fill(0), oo: Array(7).fill(0), admin: Array(7).fill(0), brk: Array(7).fill(0), split: Array(7).fill(0) };
    A.forEach(a => { if (removed.has(a.id) || a.ghost) return; lines[a.k][a.d] += a.m / 60; });
    // ghost Jasmine replaces Thu Jasmine only after the swap; keep calendar truth for now
    G.forEach(g => {
      if (g.dep && g.dep.some(id => removed.has(id))) return;
      const mins = g.w || (t2m(g.e) - t2m(g.s));
      if (g.t === "admin") lines.admin[g.d] += mins / 60;
      if (g.t === "brk") lines.brk[g.d] += 0.33;
      if (g.t === "split") lines.split[g.d] += 1;
    });
    return lines;
  }
  const LINES = [["on", "Ongoing"], ["ks", "Kickstart, free"], ["oo", "1:1"], ["admin", "Admin"], ["brk", "Paid break"], ["split", "Split ($20 = 1 h)"]];
  const r2 = n => Math.round(n * 100) / 100;
  const f2 = n => n ? r2(n).toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1") : "";
  let T0 = null;

  function renderGrid() {
    const L = totals();
    const dayTot = Array(7).fill(0);
    LINES.forEach(([k]) => L[k].forEach((v, i) => dayTot[i] += v));
    const wk = dayTot.reduce((a, b) => a + b, 0);
    if (T0 == null) T0 = wk;
    const tb = $("#hgrid");
    let h = `<thead><tr><th>Line</th><th>Week</th>${DAYS.map(d => `<th>${d}</th>`).join("")}</tr></thead><tbody>`;
    LINES.forEach(([k, n]) => {
      const w = L[k].reduce((a, b) => a + b, 0);
      h += `<tr data-k="${k}"><td>${n}</td><td class="wk">${f2(w) || "0"}</td>${L[k].map(v => `<td>${f2(v)}</td>`).join("")}</tr>`;
    });
    h += `</tbody><tfoot><tr><td>Total</td><td class="wk">${r2(wk).toFixed(2)}</td>${dayTot.map(v => `<td>${f2(v) || "off"}</td>`).join("")}</tr></tfoot>`;
    tb.innerHTML = h;
    $("#tcTotal").innerHTML = `${r2(wk).toFixed(2)}<small> h</small>`;
    const subl = $("#tcTotal").nextElementSibling;
    subl.innerHTML = removed.size ? `Engine ${r2(T0).toFixed(2)} h · <span class="b">you removed ${r2(T0 - wk).toFixed(2)} h</span>` : `Engine ${r2(T0).toFixed(2)} h · <span class="r">2 sessions waiting on you</span>`;
    tb.querySelectorAll("tbody tr").forEach(tr => tr.addEventListener("click", () => {
      const on = tr.classList.contains("sel");
      tb.querySelectorAll("tr").forEach(x => x.classList.remove("sel"));
      document.querySelectorAll(".ap,.gap").forEach(x => x.classList.remove("dim", "lit"));
      if (on) return;
      tr.classList.add("sel");
      const k = tr.dataset.k;
      document.querySelectorAll(".ap").forEach(x => x.classList.add(x.dataset.k === k ? "lit" : "dim"));
      document.querySelectorAll(".gap").forEach(x => { if (x.dataset.t !== k) x.classList.add("dim"); });
      if (["admin", "brk", "split"].includes(k)) document.querySelectorAll(".ap").forEach(x => x.classList.replace("lit", "dim"));
    }));
    // day headers
    DAYS.forEach((d, i) => {
      const hh = document.querySelector(`.dh[data-d="${i}"] .h`);
      const xx = document.querySelector(`.dh[data-d="${i}"] .x`);
      if (!hh) return;
      const hrs = dayTot[i] - L.split[i];
      hh.textContent = hrs ? `${f2(hrs)} h` : "off"; hh.classList.toggle("off", !hrs);
      xx.textContent = L.split[i] ? "+$20 split" : L.brk[i] ? "+20m break" : "";
    });
  }

  function renderCal() {
    const cal = $("#cal");
    const H = (H1 - H0) * PX;
    cal.innerHTML = "";
    cal.appendChild(el("div", ""));
    DAYS.forEach((d, i) => {
      const dh = el("div", "dh", `<div class="d">${d}</div><div class="h">off</div><div class="x"></div>`);
      dh.dataset.d = i;
      dh.addEventListener("click", () => {
        const c = document.querySelector(`.col[data-d="${i}"]`); const on = c.classList.contains("hl");
        document.querySelectorAll(".col").forEach(x => x.classList.remove("hl")); if (!on) c.classList.add("hl");
      });
      cal.appendChild(dh);
    });
    const hours = el("div", "hours"); hours.style.height = H + "px";
    for (let h = H0 + 1; h < H1; h++) { const t = el("div", "", fmt(h * 60)); t.style.top = (h - H0) * PX + "px"; hours.appendChild(t); }
    cal.appendChild(hours);
    DAYS.forEach((d, i) => {
      const col = el("div", "col" + (i < 2 ? " wkend" : "")); col.dataset.d = i; col.style.height = H + "px";
      for (let h = H0 + 1; h < H1; h++) { const g = el("div", "gridline"); g.style.top = (h - H0) * PX + "px"; col.appendChild(g); }
      G.filter(g => g.d === i).forEach(g => {
        const x = el("div", "gap " + g.t, (t2m(g.e) - t2m(g.s)) >= 30 ? g.l : "");
        x.dataset.t = g.t; if (g.dep) x.dataset.dep = g.dep.join(",");
        x.style.top = Y(g.s) + 1 + "px"; x.style.height = (t2m(g.e) - t2m(g.s)) / 60 * PX - 2 + "px";
        col.appendChild(x);
      });
      A.filter(a => a.d === i).forEach(a => {
        const cls = ["ap", a.k, a.ghost ? "ghost" : "", a.ns ? "ns" : "", a.cf < 40 ? "low" : ""].join(" ");
        const e = new Date(0, 0, 0, 0, t2m(a.s) + a.m);
        const lbl = a.ns ? "No-show" : a.ghost ? "Not on cal" : "";
        const x = el("div", cls, `<b>${a.c}</b><span class="tm">${fmt(t2m(a.s))}, ${a.m}m${lbl ? " · " + lbl : ""}</span><span class="cf ${a.ns ? "b" : cfClass(a.cf)}">${a.ns ? "Paid" : a.cf + "%"}</span>`);
        x.dataset.id = a.id; x.dataset.k = a.k;
        x.style.top = Y(a.s) + 1 + "px"; x.style.height = a.m / 60 * PX - 2 + "px";
        x.style.borderLeftColor = a.ns ? "#4DA3FF" : cfColor(a.cf);
        if (a.half === "l") { x.style.right = "50%"; x.style.marginRight = "2px"; }
        if (a.half === "r") { x.style.left = "50%"; x.style.marginLeft = "2px"; }
        if (a.m <= 30) x.querySelector(".tm").style.display = "none";
        x.addEventListener("mouseenter", ev => showTip(ev, apTip(a)));
        x.addEventListener("mousemove", moveTip);
        x.addEventListener("mouseleave", hideTip);
        col.appendChild(x);
      });
      cal.appendChild(col);
    });
  }

  function apTip(a) {
    const end = fmt(t2m(a.s) + a.m);
    const kind = { on: "Ongoing", ks: "Kickstart / free session", oo: "1:1" }[a.k];
    return `<div class="tt"><b>${a.c}</b><span class="num ${a.ns ? "b" : cfClass(a.cf)}" ${a.ns ? 'style="font-size:20px"' : ""}>${a.ns ? "No-show, paid" : a.cf + "%"}</span></div>
      <div class="meta">${DAYS[a.d]} · ${fmt(t2m(a.s))} to ${end} · ${kind}</div>
      <div class="verdict ${a.ns ? "b" : cfClass(a.cf)}">${a.verdict}</div>
      ${a.yes.length ? `<h5>Why yes</h5><ul class="yes">${a.yes.map(x => `<li>${x}</li>`).join("")}</ul>` : ""}
      ${a.no.length ? `<h5>Why not</h5><ul class="no">${a.no.map(x => `<li>${x}</li>`).join("")}</ul>` : ""}`;
  }

  /* tooltip */
  const tip = $("#tip");
  function showTip(ev, html) { tip.innerHTML = html; tip.classList.add("show"); moveTip(ev); }
  function moveTip(ev) {
    const w = tip.offsetWidth, h = tip.offsetHeight;
    let x = ev.clientX + 18, y = ev.clientY + 14;
    if (x + w > innerWidth - 12) x = ev.clientX - w - 18;
    if (y + h > innerHeight - 12) y = innerHeight - h - 12;
    tip.style.left = x + "px"; tip.style.top = Math.max(12, y) + "px";
  }
  function hideTip() { tip.classList.remove("show"); }

  /* ---------- heat map ---------- */
  function rnd(seed) { let x = Math.sin(seed * 9301 + 49297) * 233280; return x - Math.floor(x); }
  function buildHeat() {
    const heat = $("#heat");
    const H = (H1 - H0) * PX;
    heat.innerHTML = "";
    heat.appendChild(el("div", "", ""));
    const hdrs = DAYS.map(d => { const x = el("div", "dh", `<div class="d">${d}</div><div class="h" style="font-size:13px;color:var(--muted);font-weight:600"></div>`); heat.appendChild(x); return x; });
    const hours = el("div", "hours"); hours.style.height = H + "px";
    for (let h = H0 + 1; h < H1; h++) { const t = el("div", "", fmt(h * 60)); t.style.top = (h - H0) * PX + "px"; hours.appendChild(t); }
    heat.appendChild(hours);
    const colors = ["#F3F5F9", "#FDE7C0", "#F9C46B", "#F5A524", "#D98A00"];
    DAYS.forEach((d, i) => {
      const col = el("div", "hcol" + (i < 2 ? " wkend" : "")); col.style.height = H + "px";
      let dayActs = 0;
      for (let b = 0; b < (H1 - H0) * 2; b++) {
        const start = H0 * 60 + b * 30, end = start + 30;
        const inA = A.filter(a => a.d === i && !removed.has(a.id) && t2m(a.s) < end && t2m(a.s) + a.m > start);
        let tr = 0, cl = 0, ms = 0; const notes = [];
        inA.forEach(a => {
          if (a.k === "oo") { notes.push("1:1 call with Grace (recorded)"); tr += 2; return; }
          if (a.cf >= 75 && !a.ns) { tr += 9 + Math.round(rnd(i * 50 + b) * 10); cl += 3 + Math.round(rnd(b * 7 + i) * 5); notes.push(`${a.c}: ${a.yes[0]}`); }
          else if (a.ns) { tr += 3; notes.push(`${a.c}: no-show note written by Holly`); }
          else if (a.cf >= 40) { tr += 1; notes.push(`${a.c}: no workout, Holly didn't open the client`); }
          else { notes.push(`${a.c}: nothing. No trainer activity, no workout, no messages`); }
        });
        // light admin activity: Sunday evening planning, lunch-time messages on work days
        if (i === 1 && start >= 18 * 60 && start < 19 * 60) { tr += 6; notes.push("Holly planning her week on iPhone (calendar, client notes)"); }
        if (i >= 2 && start >= 12 * 60 + 30 && start < 13 * 60 + 30 && i !== 6) { ms += 2; notes.push("Holly replying to client messages"); }
        if (i === 2 && start === 16 * 60 + 30) { ms += 3; notes.push("Jasmine: \"on my way\" 4:34pm"); }
        if (i === 6 && start === 6 * 60 + 30) { notes.push("Ruben's phone: background check only (every client app does this)"); }
        if (i === 2 && start === 6 * 60) { cl += 1; notes.push("Ruben opened his own app 6:05am"); }
        const score = tr + cl + ms * 2;
        dayActs += tr;
        const lvl = score === 0 ? 0 : score < 4 ? 1 : score < 9 ? 2 : score < 16 ? 3 : 4;
        const c = el("div", "hcell"); c.style.top = b * PX / 2 + 1 + "px"; c.style.height = PX / 2 - 2 + "px"; c.style.background = colors[lvl];
        const dev = (i === 6 && start < 12 * 60) || i === 1 ? "iPhone" : "gym iPad";
        const html = `<div class="tt"><b>${d} · ${fmt(start)} to ${fmt(end)}</b><span class="num" style="font-size:20px">${score ? score : "quiet"}</span></div>
          <div class="meta">${tr ? `Trainer app: ${tr} actions on ${dev}` : "Trainer app: nothing"} · ${cl ? `client app: ${cl}` : "client app: nothing"} · ${ms ? `messages: ${ms}` : "no messages"}</div>
          ${notes.length ? `<ul class="${inA.some(a => a.cf < 40) && !tr ? "no" : "yes"}">${notes.map(n => `<li>${n}</li>`).join("")}</ul>` : `<div class="small">No sessions booked. No activity.</div>`}`;
        c.addEventListener("mouseenter", ev => showTip(ev, html)); c.addEventListener("mousemove", moveTip); c.addEventListener("mouseleave", hideTip);
        col.appendChild(c);
      }
      A.filter(a => a.d === i && !removed.has(a.id)).forEach(a => {
        const o = el("div", "hap" + (a.cf < 40 ? " low" : ""), `<span>${a.c.split(" ")[0]} ${a.ns ? "no-show" : a.cf + "%"}</span>`);
        o.style.top = Y(a.s) + "px"; o.style.height = a.m / 60 * PX + "px";
        if (a.half === "l") o.style.right = "50%"; if (a.half === "r") o.style.left = "50%";
        col.appendChild(o);
      });
      hdrs[i].querySelector(".h").textContent = dayActs ? `${dayActs} trainer actions` : "no activity";
      heat.appendChild(col);
    });
  }

  renderCal(); renderGrid(); buildHeat();

  $("#viewCtl").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    document.querySelectorAll("#viewCtl button").forEach(x => x.classList.toggle("on", x === b));
    const heat = b.dataset.v === "heat";
    $("#calWrap").style.display = heat ? "none" : ""; $("#heatWrap").style.display = heat ? "" : "none";
    $("#legCal").style.display = heat ? "none" : ""; $("#legHeat").style.display = heat ? "" : "none";
  });

  $("#btnRemove").addEventListener("click", () => {
    if (removed.size) return;
    removed.add("r1"); removed.add("r2");
    ["r1", "r2"].forEach(id => { const x = document.querySelector(`.ap[data-id="${id}"]`); x.style.transition = "opacity .6s, transform .6s"; x.style.opacity = "0"; x.style.transform = "scale(.9)"; });
    document.querySelectorAll('.gap[data-dep]').forEach(g => { g.style.transition = "opacity .6s"; g.style.opacity = "0"; });
    setTimeout(() => { renderGrid(); buildHeat(); }, 450);
    $("#decide .btns").style.display = "none"; $("#decDone").style.display = "block";
  });
  $("#btnKeep").addEventListener("click", () => {
    $("#decide .btns").style.display = "none"; const d = $("#decDone"); d.textContent = "Kept. Both stay paid as the calendar shows."; d.style.display = "block";
  });

  /* ---------- nav + reveal ---------- */
  const links = [...document.querySelectorAll(".nav a")];
  const secs = links.map(a => document.querySelector(a.getAttribute("href")));
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  secs.forEach(s => s && io.observe(s));
  const rv = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); rv.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".rv").forEach(x => { const d = x.style.getPropertyValue("--d"); if (d) x.style.transitionDelay = d; rv.observe(x); });
  if (location.search.includes("static")) document.querySelectorAll(".rv").forEach(x => x.classList.add("in"));
})();
