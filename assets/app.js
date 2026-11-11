(function () {
  "use strict";

  const STORAGE_KEY = "zelda64-quest-tracker:v1";
  const FIRST_ADULT = PHASES.findIndex((p) => p.age === "adult");
  const HEART_TOTAL = 36;
  const SKULL_TOTAL = 100;

  const CAT_LABEL = { main: "Histoire", song: "Chant", gear: "Équipement", side: "Quête annexe", mini: "Mini-jeu" };
  const AGE_LABEL = { child: "Enfant", adult: "Adulte", both: "Enfant + adulte" };

  /* ───────── État & stockage ───────── */

  const defaults = () => ({ phase: 0, done: {}, steps: {}, hearts: 0, skulls: 0, view: "now" });
  let storageOk = true;
  let state = load();
  const open = new Set();
  const filters = { cat: "", age: "", status: "", q: "" };

  function sanitize(raw) {
    const s = defaults();
    if (!raw || typeof raw !== "object") return s;
    const clamp = (n, max) => Math.min(max, Math.max(0, Math.round(Number(n) || 0)));
    s.phase = clamp(raw.phase, PHASES.length - 1);
    s.hearts = clamp(raw.hearts, HEART_TOTAL);
    s.skulls = clamp(raw.skulls, SKULL_TOTAL);
    if (["now", "all", "collect"].includes(raw.view)) s.view = raw.view;
    for (const q of QUESTS) {
      if (raw.done && raw.done[q.id]) s.done[q.id] = true;
      const st = raw.steps && raw.steps[q.id];
      if (Array.isArray(st)) {
        const ok = [...new Set(st.filter((i) => Number.isInteger(i) && i >= 0 && i < q.steps.length))];
        if (ok.length) s.steps[q.id] = ok;
      }
    }
    return s;
  }

  function load() {
    try {
      const txt = localStorage.getItem(STORAGE_KEY);
      return txt ? sanitize(JSON.parse(txt)) : defaults();
    } catch (e) {
      storageOk = false;
      return defaults();
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      storageOk = true;
    } catch (e) {
      storageOk = false;
    }
    document.getElementById("storage-note").textContent = storageOk
      ? "Ta progression est enregistrée dans ce navigateur (stockage local). Elle n'est envoyée nulle part."
      : "Attention : le stockage local est indisponible (navigation privée ?). Ta progression ne sera pas conservée — utilise l'export.";
  }

  /* ───────── Logique ───────── */

  const isDone = (q) => !!state.done[q.id];
  const stepsOf = (q) => state.steps[q.id] || [];

  function setDone(q, value) {
    if (value) {
      state.done[q.id] = true;
      state.steps[q.id] = q.steps.map((_, i) => i);
    } else {
      delete state.done[q.id];
      delete state.steps[q.id];
    }
  }

  function toggleStep(q, i) {
    const set = new Set(stepsOf(q));
    set.has(i) ? set.delete(i) : set.add(i);
    if (set.size) state.steps[q.id] = [...set].sort((a, b) => a - b);
    else delete state.steps[q.id];
    if (set.size === q.steps.length) state.done[q.id] = true;
    else delete state.done[q.id];
  }

  /* Changer d'étape : les quêtes d'histoire des étapes passées sont considérées comme faites. */
  function setPhase(i) {
    state.phase = i;
    for (const q of QUESTS) {
      if (q.cat === "main" && q.best < i && !isDone(q)) setDone(q, true);
    }
  }

  const needsChildTrip = (q) => q.age === "child" && state.phase >= FIRST_ADULT;

  /* ───────── Rendu ───────── */

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = (id) => document.getElementById(id);

  function renderHeader() {
    const done = QUESTS.filter(isDone).length;
    $("overall-count").textContent = done + " / " + QUESTS.length;
    $("overall-bar").style.width = (100 * done) / QUESTS.length + "%";
  }

  function renderTimeline() {
    let html = "";
    PHASES.forEach((p, i) => {
      if (i === 0) html += '<div class="era"><span class="era-name">Enfant</span><div class="era-steps">';
      if (i === FIRST_ADULT) html += '</div></div><div class="era"><span class="era-name">Adulte</span><div class="era-steps">';
      const cls = i < state.phase ? "past" : i === state.phase ? "current" : "";
      html +=
        '<button type="button" class="step ' + cls + '" role="radio" aria-checked="' + (i === state.phase) +
        '" data-phase="' + i + '" title="' + esc(p.title) + '"><span class="num">' + (i + 1) +
        '</span><span class="name">' + esc(p.title) + "</span></button>";
    });
    html += "</div></div>";
    const tl = $("timeline");
    tl.innerHTML = html;
    /* Centre l'étape courante en ne faisant défiler que la frise, jamais la page. */
    const cur = tl.querySelector(".current");
    if (cur) {
      const a = cur.getBoundingClientRect(), b = tl.getBoundingClientRect();
      tl.scrollLeft += a.left + a.width / 2 - (b.left + b.width / 2);
    }
  }

  function questCard(q) {
    const done = isDone(q);
    const checked = stepsOf(q);
    const isOpen = open.has(q.id);
    const badges = [
      '<span class="badge cat-' + q.cat + '">' + CAT_LABEL[q.cat] + "</span>",
      '<span class="badge">' + AGE_LABEL[q.age] + "</span>"
    ];
    if (q.key && q.cat !== "main") badges.push('<span class="badge key">Indispensable</span>');
    if (!done && needsChildTrip(q)) badges.push('<span class="badge trip">Retour enfant</span>');
    if (!done && q.from > state.phase) badges.push('<span class="badge later">Pas encore accessible</span>');
    const progress = !done && checked.length ? '<span class="steps-count">' + checked.length + "/" + q.steps.length + "</span>" : "";

    let body = "";
    if (isOpen) {
      body =
        '<div class="quest-body">' +
        '<div class="block when"><h4>Quand la faire</h4><p>' + esc(q.when) + "</p>" +
        '<p class="window">Accessible dès l\'étape ' + (q.from + 1) + " · conseillée à l'étape " + (q.best + 1) +
        " (" + esc(PHASES[q.best].title) + ")</p></div>" +
        '<div class="block"><h4>Conditions</h4><ul class="needs">' + q.needs.map((n) => "<li>" + esc(n) + "</li>").join("") + "</ul></div>" +
        '<div class="block"><h4>Étapes</h4><ol class="steps">' +
        q.steps.map((s, i) =>
          '<li><label><input type="checkbox" data-step="' + i + '" data-quest="' + q.id + '"' +
          (checked.includes(i) ? " checked" : "") + "><span>" + esc(s) + "</span></label></li>").join("") +
        "</ol></div>" +
        '<div class="block"><h4>Récompense</h4><p>' + esc(q.reward) + "</p></div>" +
        (q.tip ? '<div class="block tip"><h4>Astuce</h4><p>' + esc(q.tip) + "</p></div>" : "") +
        "</div>";
    }

    return (
      '<article class="quest' + (done ? " done" : "") + (isOpen ? " open" : "") + '">' +
      '<div class="quest-head">' +
      '<input type="checkbox" class="quest-check" data-done="' + q.id + '"' + (done ? " checked" : "") +
      ' aria-label="Terminer : ' + esc(q.title) + '">' +
      '<button type="button" class="quest-toggle" data-toggle="' + q.id + '" aria-expanded="' + isOpen + '">' +
      '<span class="quest-title">' + esc(q.title) + progress + "</span>" +
      '<span class="quest-meta">' + badges.join("") + "</span>" +
      '<span class="quest-reward">' + esc(q.reward) + "</span>" +
      '<span class="chev" aria-hidden="true"></span>' +
      "</button></div>" + body + "</article>"
    );
  }

  function section(title, intro, quests, cls) {
    if (!quests.length) return "";
    return (
      '<section class="group ' + (cls || "") + '"><h3>' + esc(title) + ' <span class="count">' + quests.length + "</span></h3>" +
      (intro ? '<p class="group-intro">' + esc(intro) + "</p>" : "") +
      quests.map(questCard).join("") + "</section>"
    );
  }

  function renderNow() {
    const p = PHASES[state.phase];
    const i = state.phase;
    const todo = QUESTS.filter((q) => !isDone(q));
    const main = QUESTS.filter((q) => q.cat === "main" && q.best === i);
    const late = todo.filter((q) => q.cat !== "main" && q.best < i);
    const now = todo.filter((q) => q.cat !== "main" && q.best === i);
    const early = todo.filter((q) => q.cat !== "main" && q.from <= i && q.best > i);
    const finished = QUESTS.filter((q) => q.cat !== "main" && isDone(q) && q.best === i);
    const blocking = late.length + now.length;
    const isLast = i === PHASES.length - 1;

    let gate;
    if (blocking === 0) {
      gate = '<p class="gate ok">Tout ce qui est conseillé jusqu\'ici est fait. Tu peux avancer l\'esprit tranquille.</p>';
    } else {
      gate = '<p class="gate warn">Il reste <strong>' + blocking + " quête" + (blocking > 1 ? "s" : "") +
        "</strong> conseillée" + (blocking > 1 ? "s" : "") + " avant de poursuivre l'histoire.</p>";
    }

    const lateIntro = i >= FIRST_ADULT && late.some(needsChildTrip)
      ? "Conseillées plus tôt. Celles marquées « Retour enfant » demandent de reposer l'Épée de Légende au Temple du Temps : regroupe-les en un seul voyage."
      : "Conseillées à une étape précédente, toujours faisables.";

    $("view").innerHTML =
      '<section class="phase-card">' +
      '<p class="eyebrow">Étape ' + (i + 1) + " sur " + PHASES.length + " · " + (p.age === "child" ? "Enfant" : "Adulte") + "</p>" +
      "<h2>" + esc(p.title) + "</h2>" +
      '<p class="goal"><strong>Objectif du jeu :</strong> ' + esc(p.goal) + "</p>" +
      '<p class="advice">' + esc(p.advice) + "</p>" + gate +
      "</section>" +
      section("L'histoire", "", main, "g-main") +
      section("En retard", lateIntro, late, "g-late") +
      section("À faire à cette étape", "Le meilleur moment pour ces quêtes, c'est maintenant.", now, "g-now") +
      section("Déjà possible, mais peut attendre", "Tu peux les commencer, mais elles seront plus simples ou plus logiques plus tard.", early, "g-early") +
      section("Terminées à cette étape", "", finished, "g-done") +
      '<div class="next">' +
      (i > 0 ? '<button type="button" data-phase="' + (i - 1) + '">← Étape précédente</button>' : "<span></span>") +
      (isLast ? "" : '<button type="button" class="primary" data-phase="' + (i + 1) + '">J\'ai fini cette étape →</button>') +
      "</div>";
  }

  function renderAll() {
    const opt = (v, l, cur) => '<option value="' + v + '"' + (cur === v ? " selected" : "") + ">" + l + "</option>";
    const q = filters.q.trim().toLowerCase();
    const list = QUESTS.filter((x) => {
      if (filters.cat && x.cat !== filters.cat) return false;
      if (filters.age && x.age !== filters.age && x.age !== "both") return false;
      if (filters.status === "todo" && isDone(x)) return false;
      if (filters.status === "done" && !isDone(x)) return false;
      if (q && !(x.title + " " + x.reward).toLowerCase().includes(q)) return false;
      return true;
    });

    let groups = "";
    PHASES.forEach((p, i) => {
      const qs = list.filter((x) => x.best === i);
      if (qs.length) groups += section("Étape " + (i + 1) + " · " + p.title, "", qs, i === state.phase ? "g-now" : "");
    });

    const controls =
      '<div class="filters">' +
      '<input type="search" id="f-q" placeholder="Rechercher une quête ou une récompense" value="' + esc(filters.q) + '" aria-label="Rechercher">' +
      '<select id="f-cat" aria-label="Catégorie">' + opt("", "Toutes catégories", filters.cat) +
      Object.keys(CAT_LABEL).map((k) => opt(k, CAT_LABEL[k], filters.cat)).join("") + "</select>" +
      '<select id="f-age" aria-label="Âge">' + opt("", "Enfant et adulte", filters.age) + opt("child", "Enfant", filters.age) + opt("adult", "Adulte", filters.age) + "</select>" +
      '<select id="f-status" aria-label="Statut">' + opt("", "Tous statuts", filters.status) + opt("todo", "À faire", filters.status) + opt("done", "Terminées", filters.status) + "</select>" +
      "</div>";

    const host = $("view");
    if (host.querySelector("#all-list")) {
      host.querySelector("#all-list").innerHTML = groups || '<p class="empty">Aucune quête ne correspond à ces filtres.</p>';
    } else {
      host.innerHTML = controls + '<div id="all-list">' + (groups || '<p class="empty">Aucune quête ne correspond à ces filtres.</p>') + "</div>";
    }
  }

  function counter(key, title, total, extra) {
    const v = state[key];
    return (
      '<section class="counter"><h3>' + title + "</h3>" +
      '<div class="counter-row">' +
      '<button type="button" data-count="' + key + '" data-delta="-1" aria-label="Retirer un">−</button>' +
      '<output><strong>' + v + "</strong> / " + total + "</output>" +
      '<button type="button" data-count="' + key + '" data-delta="1" aria-label="Ajouter un">+</button>' +
      "</div>" +
      '<div class="bar"><div class="bar-fill" style="width:' + (100 * v) / total + '%"></div></div>' +
      extra + "</section>"
    );
  }

  function renderCollect() {
    const next = SKULL_REWARDS.find((r) => r.at > state.skulls);
    const skullExtra =
      '<ul class="rewards">' +
      SKULL_REWARDS.map((r) => '<li class="' + (state.skulls >= r.at ? "got" : "") + '"><span class="at">' + r.at + "</span>" + esc(r.label) + "</li>").join("") +
      "</ul>" +
      '<p class="note">' + (next ? "Prochaine récompense dans " + (next.at - state.skulls) + " Skulltula" + (next.at - state.skulls > 1 ? "s" : "") + ". " : "Malédiction levée, bravo ! ") +
      "Les récompenses se réclament à la Maison des Skulltulas de Cocorico. Dehors, les Skulltulas d'or ne sortent que la nuit : le Chant du Soleil fait gagner un temps fou. Vise les 20 avant d'être adulte et les 50 avant le Château de Ganon ; les 100 ne rapportent que des rubis.</p>";

    const containers = Math.floor(state.hearts / 4);
    const heartExtra =
      '<p class="note">' + containers + " réceptacle" + (containers > 1 ? "s" : "") + " de cœur complété" + (containers > 1 ? "s" : "") +
      " grâce aux quarts (" + (state.hearts % 4) + "/4 en cours). Il existe 36 quarts de cœur ; avec les 8 réceptacles de boss, on atteint 20 cœurs. " +
      "Plusieurs quêtes de ce carnet en donnent un : pense à l'ajouter ici quand tu en ramasses.</p>";

    $("view").innerHTML =
      '<div class="counters">' +
      counter("skulls", "Skulltulas d'or", SKULL_TOTAL, skullExtra) +
      counter("hearts", "Quarts de cœur", HEART_TOTAL, heartExtra) +
      "</div>";
  }

  let shownPhase = -1;

  function render() {
    const y = window.scrollY;
    renderHeader();
    if (shownPhase !== state.phase) {
      renderTimeline();
      shownPhase = state.phase;
    }
    document.querySelectorAll(".tabs [role=tab]").forEach((b) => b.setAttribute("aria-selected", b.dataset.view === state.view));
    if (state.view === "now") renderNow();
    else if (state.view === "all") renderAll();
    else renderCollect();
    /* Le contenu vient d'être reconstruit : on garde la position de lecture. */
    if (window.scrollY !== y) window.scrollTo(0, y);
  }

  function commit() {
    save();
    render();
  }

  /* ───────── Événements ───────── */

  const byId = (id) => QUESTS.find((q) => q.id === id);

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-phase], [data-toggle], [data-view], [data-count]");
    if (!t) return;
    if (t.dataset.phase !== undefined) {
      setPhase(Number(t.dataset.phase));
      if (t.closest(".next")) window.scrollTo({ top: 0 });
      commit();
    } else if (t.dataset.toggle) {
      open.has(t.dataset.toggle) ? open.delete(t.dataset.toggle) : open.add(t.dataset.toggle);
      render();
    } else if (t.dataset.view) {
      state.view = t.dataset.view;
      $("view").innerHTML = "";
      commit();
    } else if (t.dataset.count) {
      const key = t.dataset.count;
      const max = key === "hearts" ? HEART_TOTAL : SKULL_TOTAL;
      state[key] = Math.min(max, Math.max(0, state[key] + Number(t.dataset.delta)));
      commit();
    }
  });

  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.dataset.done) {
      setDone(byId(t.dataset.done), t.checked);
      commit();
    } else if (t.dataset.step !== undefined && t.dataset.quest) {
      toggleStep(byId(t.dataset.quest), Number(t.dataset.step));
      commit();
    } else if (t.id === "f-cat" || t.id === "f-age" || t.id === "f-status") {
      filters[t.id.slice(2)] = t.value;
      renderAll();
    }
  });

  document.addEventListener("input", (e) => {
    if (e.target.id === "f-q") {
      filters.q = e.target.value;
      renderAll();
    }
  });

  $("btn-export").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "zelda64-progression.json";
    a.click();
    URL.revokeObjectURL(a.href);
  });

  $("btn-import").addEventListener("click", () => $("file-import").click());
  $("file-import").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!confirm("Remplacer la progression actuelle par celle du fichier ?")) return;
        state = sanitize(data);
        commit();
      } catch (err) {
        alert("Ce fichier n'est pas une sauvegarde valide.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  });

  $("btn-reset").addEventListener("click", () => {
    if (!confirm("Effacer toute ta progression ? Cette action est définitive.")) return;
    state = defaults();
    open.clear();
    commit();
  });

  save();
  render();
})();
