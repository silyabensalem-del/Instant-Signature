/* INSTANT SIGNATURE — configurateur de demande personnalisée (démo, sans paiement) */
(function () {
  const TYPES = [
    { id: "mariage", label: "Mariage", d: "Parcours dédié · devis personnalisé", crm: "Mariage" },
    { id: "anniversaire", label: "Anniversaire", d: "Adulte, enfant, surprise", crm: "Anniversaire" },
    { id: "demande", label: "Demande en mariage", d: "Moment romantique", crm: "Demande en mariage" },
    { id: "baby", label: "Baby shower", d: "Célébrer bébé", crm: "Baby shower" },
    { id: "gender", label: "Gender reveal", d: "Révélation personnalisée", crm: "Gender reveal" },
    { id: "evjf", label: "EVJF / EVG", d: "Entre amies ou entre amis", crm: "EVJF / EVG" },
    { id: "prive", label: "Événement privé", d: "Dîner, soirée, fête de famille", crm: "Événement privé" },
  ];
  const LIEUX = [
    { id: "oui", label: "Oui, j'ai un lieu" },
    { id: "domicile", label: "À domicile" },
    { id: "non", label: "Pas encore", d: "Nous vous aidons" },
  ];
  const AMBIANCES = ["Chic", "Romantique", "Bohème", "Moderne", "Minimaliste", "Festive", "Champêtre"].map(a => ({ id: a, label: a }));
  const FORMULES = [
    { id: "essentielle", label: "Essentielle", base: 390, incl: 25, extra: 8, d: "Conseil, décoration personnalisée, mise en place de la scénographie" },
    { id: "signature", label: "Signature", base: 790, incl: 50, extra: 10, d: "Conception, déco & scénographie, recherche de prestataires, coordination des principaux éléments" },
    { id: "prestige", label: "Prestige", base: 1490, incl: 80, extra: 12, d: "Organisation complète, gestion des prestataires, personnalisation avancée, coordination" },
  ];
  const WEDDING = [
    { id: "coordination", label: "Coordination jour J", base: 1490, d: "Reprise du dossier 2 mois avant, coordination le jour J" },
    { id: "partielle", label: "Organisation partielle", base: 2900, d: "Prestataires clés, scénographie, suivi + jour J" },
    { id: "complete", label: "Organisation complète", base: 4900, d: "De la recherche du lieu au lendemain du mariage" },
  ];
  const OPTIONS = [
    { id: "photographe", label: "Photographe", fixed: 350, pg: 0 },
    { id: "fleuriste", label: "Fleuriste", fixed: 150, pg: 3 },
    { id: "traiteur", label: "Traiteur", fixed: 0, pg: 25 },
    { id: "patisserie", label: "Pâtisserie personnalisée", fixed: 120, pg: 3 },
    { id: "animations", label: "Animations", fixed: 250, pg: 0 },
    { id: "mobilier", label: "Location de mobilier", fixed: 100, pg: 4 },
    { id: "deco", label: "Décoration supplémentaire", fixed: 80, pg: 1 },
  ];
  const STEPS = ["Événement", "Date & invités", "Budget & ambiance", "Accompagnement", "Coordonnées"];

  const params = new URLSearchParams(location.search);
  const state = {
    step: 0,
    type: TYPES.some(t => t.id === params.get("type")) ? params.get("type") : null,
    lieu: null, invites: 30, budget: 2000, ambiance: null,
    formule: FORMULES.some(f => f.id === params.get("formule")) ? params.get("formule") : null,
    acc: WEDDING.some(w => w.id === params.get("acc")) ? params.get("acc") : null,
    options: new Set(),
  };
  const isWedding = () => state.type === "mariage";
  const $ = (id) => document.getElementById(id);

  // ---------- rendu des options ----------
  function renderOpts(containerId, list, isSelected, onPick, extra) {
    const el = $(containerId);
    el.innerHTML = list.map(o => `
      <button type="button" class="opt ${isSelected(o) ? "selected" : ""}" data-id="${o.id}" aria-pressed="${isSelected(o)}">
        <span class="tick">✓</span>
        <span class="t">${o.label}</span>
        ${o.d ? `<span class="d">${o.d}</span>` : ""}
        ${extra ? `<span class="p">${extra(o)}</span>` : ""}
      </button>`).join("");
    el.querySelectorAll(".opt").forEach(b => b.addEventListener("click", () => { onPick(b.dataset.id); }));
  }

  function renderAll() {
    renderOpts("opt-type", TYPES, o => o.id === state.type, id => {
      state.type = id;
      if (id === "mariage") { state.budget = Math.max(state.budget, 15000); state.invites = Math.max(state.invites, 80); }
      else if (state.budget > 10000) state.budget = 3000;
      syncRanges(); renderAll(); setTimeout(() => go(1), 220);
    });
    renderOpts("opt-lieu", LIEUX, o => o.id === state.lieu, id => { state.lieu = id; renderAll(); });
    renderOpts("opt-ambiance", AMBIANCES, o => o.id === state.ambiance, id => { state.ambiance = id; $("err-ambiance").style.display = "none"; renderAll(); });

    if (isWedding()) {
      $("acc-title").textContent = "Quel accompagnement pour votre mariage ?";
      $("acc-sub").textContent = "Honoraires de départ, hors prestataires. Le montant final est fixé dans votre devis personnalisé.";
      renderOpts("opt-formule", WEDDING, o => o.id === state.acc, id => { state.acc = id; renderAll(); }, o => "Honoraires dès " + fmtEUR(o.base));
    } else {
      const rec = recommended();
      $("acc-title").textContent = "Quel niveau d'accompagnement ?";
      $("acc-sub").innerHTML = `Pour ${state.invites} invités et ${fmtEUR(state.budget)}, nous vous suggérons la formule <b>${rec.label}</b>. Vous restez libre.`;
      renderOpts("opt-formule", FORMULES, o => o.id === state.formule, id => { state.formule = id; renderAll(); },
        o => "À partir de " + fmtEUR(o.base) + (o.id === rec.id ? " · recommandée" : ""));
    }
    renderOpts("opt-options", OPTIONS, o => state.options.has(o.id), id => {
      state.options.has(id) ? state.options.delete(id) : state.options.add(id); renderAll();
    }, o => isWedding() ? "Prestataire partenaire" : "≈ " + fmtEUR(optionCost(o)));

    const t = TYPES.find(x => x.id === state.type);
    if (isWedding()) {
      $("cfg-title").innerHTML = 'Votre devis <em class="gold">mariage personnalisé.</em>';
      $("cfg-lead").textContent = "Un parcours dédié : date, invités, budget global, ambiance et niveau d'accompagnement. Nous revenons vers vous sous 24 h pour un rendez-vous découverte offert.";
    }
    renderRecap(t);
    renderProgress();
  }

  // ---------- calculs ----------
  function optionCost(o) { return o.fixed + o.pg * state.invites; }
  function recommended() {
    if (state.invites > 50 || state.budget >= 4000) return FORMULES[2];
    if (state.invites > 25 || state.budget >= 1500) return FORMULES[1];
    return FORMULES[0];
  }
  function estimate() {
    if (isWedding()) {
      const w = WEDDING.find(x => x.id === state.acc);
      if (!w) return null;
      const fee = w.base + Math.max(0, state.invites - 100) * 10;
      return { fee, low: fee, high: Math.round(fee * 1.25 / 10) * 10, presta: state.invites * 215 };
    }
    const f = FORMULES.find(x => x.id === state.formule);
    if (!f) return null;
    const fee = f.base + Math.max(0, state.invites - f.incl) * f.extra;
    const opts = [...state.options].reduce((s, id) => s + optionCost(OPTIONS.find(o => o.id === id)), 0);
    const low = fee + opts;
    return { fee, opts, low, high: Math.round(low * 1.2 / 10) * 10 };
  }

  function renderRecap(t) {
    const e = estimate();
    const rows = [
      ["Événement", t ? t.label : "—"],
      ["Date", $("f-date").value ? fmtDate($("f-date").value) : "—"],
      ["Lieu", $("f-ville").value || "—"],
      ["Invités", state.invites],
      ["Budget max.", fmtEUR(state.budget)],
      ["Ambiance", state.ambiance || "—"],
      [isWedding() ? "Accompagnement" : "Formule", isWedding() ? (WEDDING.find(w => w.id === state.acc) || {}).label || "—" : (FORMULES.find(f => f.id === state.formule) || {}).label || "—"],
      ["Options", state.options.size ? [...state.options].map(id => OPTIONS.find(o => o.id === id).label).join(", ") : "—"],
    ];
    $("r-title").textContent = t ? (isWedding() ? "Votre mariage" : t.label) : "Votre événement";
    $("r-list").innerHTML = rows.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join("");

    const g = $("r-gauge"), gt = $("r-gauge-txt");
    if (!e) {
      $("r-est").textContent = "—";
      $("r-est-detail").textContent = isWedding() ? "Choisissez un accompagnement pour voir les honoraires indicatifs." : "Choisissez une formule pour obtenir une estimation.";
      g.style.width = "0"; gt.textContent = "";
      return;
    }
    if (isWedding()) {
      $("r-est-label").textContent = "Honoraires indicatifs";
      $("r-est").textContent = fmtEUR(e.low) + " – " + fmtEUR(e.high);
      $("r-est-detail").innerHTML = `Devis personnalisé après rendez-vous. Prestataires (lieu, traiteur…) en sus : repère national ≈ ${fmtEUR(e.presta)} pour ${state.invites} invités (215 €/invité, Mariages.net 2026).`;
      const total = e.low + e.presta, ratio = total / state.budget;
      g.style.width = Math.min(100, ratio * 100) + "%";
      g.style.background = ratio <= 1 ? "var(--ok)" : ratio <= 1.15 ? "var(--warn)" : "var(--ko)";
      gt.textContent = ratio <= 1 ? "Votre budget global semble cohérent avec ce projet." : "Budget serré : nous vous proposerons des arbitrages (invités, saison, prestataires).";
    } else {
      $("r-est-label").textContent = "Estimation indicative";
      $("r-est").textContent = fmtEUR(e.low) + " – " + fmtEUR(e.high);
      $("r-est-detail").textContent = `Accompagnement ${fmtEUR(e.fee)}` + (e.opts ? ` + options ≈ ${fmtEUR(e.opts)}` : "");
      const ratio = e.low / state.budget;
      g.style.width = Math.min(100, ratio * 100) + "%";
      g.style.background = ratio <= .9 ? "var(--ok)" : ratio <= 1.05 ? "var(--warn)" : "var(--ko)";
      gt.textContent = ratio <= .9 ? `Dans votre budget : il reste ≈ ${fmtEUR(state.budget - e.low)} de marge.` :
        ratio <= 1.05 ? "À la limite de votre budget : nous ajusterons ensemble." :
        "Au-delà de votre budget : retirez une option ou choisissez une formule plus légère.";
    }
  }

  function renderProgress() {
    $("progress").innerHTML = STEPS.map((s, i) => `<div class="seg ${i < state.step ? "done" : i === state.step ? "current" : ""}"><div class="bar"><i></i></div><span class="lbl">${i + 1}. ${s}</span></div>`).join("");
    document.querySelectorAll(".cstep").forEach(s => s.classList.toggle("active", +s.dataset.step === state.step));
    $("prev").style.visibility = state.step === 0 ? "hidden" : "visible";
    $("next").textContent = state.step === STEPS.length - 1 ? (isWedding() ? "Envoyer ma demande de devis" : "Envoyer ma demande") : "Continuer →";
    $("next").classList.toggle("gold", state.step === STEPS.length - 1);
  }

  // ---------- ranges ----------
  function syncRanges() {
    const b = $("f-budget");
    if (isWedding()) { b.min = 3000; b.max = 60000; b.step = 500; $("b-min").textContent = "3 000 €"; $("b-max").textContent = "60 000 €"; $("budget-hint").textContent = "(budget global du mariage, prestataires compris)"; }
    else { b.min = 300; b.max = 10000; b.step = 50; $("b-min").textContent = "300 €"; $("b-max").textContent = "10 000 €"; $("budget-hint").textContent = "(tout compris : accompagnement + prestataires)"; }
    state.budget = Math.min(Math.max(state.budget, +b.min), +b.max);
    b.value = state.budget; $("f-invites").value = state.invites;
    updateRangeLabels();
  }
  function updateRangeLabels() {
    $("v-invites").textContent = state.invites + (state.invites >= 250 ? "+" : "");
    $("v-budget").textContent = fmtEUR(state.budget);
    const pg = Math.round(state.budget / Math.max(1, state.invites));
    $("per-guest").textContent = `Soit ≈ ${fmtEUR(pg)} par invité` + (isWedding() ? " · moyenne nationale ≈ 215 €/invité (Mariages.net, 2026)." : ".");
  }
  $("f-invites").addEventListener("input", e => { state.invites = +e.target.value; updateRangeLabels(); renderAll(); });
  $("f-budget").addEventListener("input", e => { state.budget = +e.target.value; updateRangeLabels(); renderAll(); });
  ["f-date", "f-ville"].forEach(id => $(id).addEventListener("input", () => { $(id).closest(".field").classList.remove("invalid"); renderAll(); }));

  // ---------- validation & navigation ----------
  function setInvalid(id, bad) { $(id).closest(".field").classList.toggle("invalid", bad); return !bad; }
  function validate(step) {
    if (step === 0) { if (!state.type) { toast("Choisissez un type d'événement."); return false; } return true; }
    if (step === 1) {
      const d = $("f-date").value;
      const okDate = setInvalid("f-date", !d || d < Store.today());
      const okVille = setInvalid("f-ville", !$("f-ville").value.trim());
      return okDate && okVille;
    }
    if (step === 2) { if (!state.ambiance) { $("err-ambiance").style.display = "block"; return false; } return true; }
    if (step === 3) {
      if (isWedding() ? !state.acc : !state.formule) { toast(isWedding() ? "Choisissez un niveau d'accompagnement." : "Choisissez une formule."); return false; }
      return true;
    }
    if (step === 4) {
      const a = setInvalid("f-prenom", !$("f-prenom").value.trim());
      const b = setInvalid("f-nom", !$("f-nom").value.trim());
      const c = setInvalid("f-email", !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($("f-email").value.trim()));
      const r = $("f-rgpd").checked; $("err-rgpd").style.display = r ? "none" : "block";
      return a && b && c && r;
    }
    return true;
  }
  function go(n) {
    state.step = Math.max(0, Math.min(STEPS.length - 1, n));
    renderAll();
    const top = document.querySelector(".config-wrap").getBoundingClientRect().top + scrollY - 130;
    if (scrollY > top) window.scrollTo({ top, behavior: "smooth" });
  }
  $("prev").addEventListener("click", () => go(state.step - 1));
  $("next").addEventListener("click", () => {
    if (!validate(state.step)) return;
    if (state.step < STEPS.length - 1) return go(state.step + 1);
    submit();
  });

  function submit() {
    const t = TYPES.find(x => x.id === state.type);
    const e = estimate();
    const optLabels = [...state.options].map(id => OPTIONS.find(o => o.id === id).label);
    const formuleLabel = isWedding() ? "Devis mariage" : FORMULES.find(f => f.id === state.formule).label;
    const accLabel = isWedding() ? WEDDING.find(w => w.id === state.acc).label : formuleLabel;
    const lieu = (LIEUX.find(l => l.id === state.lieu) || {}).label || "Non précisé";
    const c = Store.addLead({
      prenom: $("f-prenom").value.trim(), nom: $("f-nom").value.trim(),
      email: $("f-email").value.trim(), tel: $("f-tel").value.trim(),
      ville: $("f-ville").value.trim(), type: t.crm, date: $("f-date").value,
      invites: state.invites, budget: state.budget, ambiance: state.ambiance,
      formule: formuleLabel, accompagnement: accLabel, options: optLabels, lieu,
      estimation: e ? { low: e.low, high: e.high } : null,
      source: "Site web – configurateur", acquisition: $("f-source").value,
      message: $("f-msg").value.trim(),
      historyNote: `Configurateur : ${t.label}, ${state.invites} invités, budget ${fmtEUR(state.budget)}, ambiance ${state.ambiance}, ${accLabel}` +
        (optLabels.length ? `, options : ${optLabels.join(", ")}` : "") + (e ? `. Estimation ${fmtEUR(e.low)} – ${fmtEUR(e.high)}.` : "."),
    });
    location.href = "confirmation.html?id=" + encodeURIComponent(c.id);
  }

  // ---------- init ----------
  $("f-date").min = Store.today();
  if (state.type === "mariage") { state.budget = 15000; state.invites = 80; }
  syncRanges();
  state.step = state.type ? 1 : 0;
  renderAll();
})();
