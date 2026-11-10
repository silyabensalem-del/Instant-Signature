/* INSTANT SIGNATURE — CRM de démonstration (localStorage, données fictives) */
(function () {
  const $ = (id) => document.getElementById(id);
  const S = Store;
  const initials = (c) => ((c.prenom[0] || "") + (c.nom[0] || "")).toUpperCase();
  const stPill = (st) => `<span class="st st-${st}">${S.statusLabel(st)}</span>`;
  const isLate = (d) => d && d < S.today();

  // ---------- onglets ----------
  const tabs = document.querySelectorAll(".tabs button");
  function showTab(name) {
    if (!["dashboard", "contacts", "pipeline"].includes(name)) name = "dashboard";
    tabs.forEach(b => b.classList.toggle("active", b.dataset.tab === name));
    document.querySelectorAll(".tab-panel").forEach(p => p.classList.toggle("active", p.id === "tab-" + name));
    history.replaceState(null, "", location.pathname + "#" + name);
    render();
  }
  tabs.forEach(b => b.addEventListener("click", () => showTab(b.dataset.tab)));

  // ---------- filtres ----------
  const fill = (sel, list, map = x => [x, x]) => list.forEach(x => { const [v, l] = map(x); sel.insertAdjacentHTML("beforeend", `<option value="${esc(v)}">${esc(l)}</option>`); });
  fill($("f-type"), S.EVENTS);
  fill($("f-statut"), S.STATUSES, s => [s.id, s.label]);
  fill($("f-source"), S.SOURCES);
  ["q", "f-type", "f-statut", "f-source"].forEach(id => $(id).addEventListener("input", renderContacts));

  // ---------- tableau de bord ----------
  function hbar(el, entries, fmt = v => v, max) {
    const m = max || Math.max(1, ...entries.map(e => e[1]));
    el.innerHTML = entries.map(([k, v, color]) => `
      <div class="row"><span>${esc(k)}</span><div class="track"><div class="fill" style="width:0;${color ? "background:" + color : ""}" data-w="${(v / m) * 100}"></div></div><span class="val">${fmt(v)}</span></div>`).join("");
    requestAnimationFrame(() => setTimeout(() => el.querySelectorAll(".fill").forEach(f => (f.style.width = f.dataset.w + "%")), 60));
  }
  function renderDashboard() {
    const all = S.all();
    const by = (st) => all.filter(c => c.statut === st);
    const prospects = all.filter(c => ["nouveau", "contacte", "devis"].includes(c.statut));
    const won = by("gagne"), lost = by("perdu"), quotes = by("devis");
    const ca = won.reduce((s, c) => s + (+c.montant || 0), 0);
    const pending = quotes.reduce((s, c) => s + (+c.montant || 0), 0);
    const closed = won.length + lost.length;
    const conv = closed ? Math.round((won.length / closed) * 100) : 0;
    const convAll = all.length ? Math.round((won.length / all.length) * 100) : 0;
    const fromSite = all.filter(c => c.origin === "site").length;
    const kpis = [
      ["Prospects", prospects.length, `${by("nouveau").length} nouveaux · ${fromSite} via le site`],
      ["Clients", won.length, "Statut « Gagné »"],
      ["CA fictif signé", fmtEUR(ca), "Honoraires des dossiers gagnés"],
      ["Devis en attente", quotes.length, fmtEUR(pending) + " en jeu"],
      ["Taux de conversion", conv + " %", `Gagnés / clôturés · ${convAll} % sur l'ensemble`],
      ["Panier moyen", fmtEUR(won.length ? ca / won.length : 0), "Par client gagné"],
    ];
    $("kpis").innerHTML = kpis.map(([l, v, s]) => `<div class="kpi"><div class="l">${l}</div><div class="v">${v}</div><div class="s">${s}</div></div>`).join("");

    const ev = S.EVENTS.map(e => [e, all.filter(c => c.type === e).length]).filter(e => e[1]).sort((a, b) => b[1] - a[1]);
    hbar($("chart-events"), ev);
    const colors = { nouveau: "#5C6F8C", contacte: "#B07A2C", devis: "#7A4F86", gagne: "#4F7A5A", perdu: "#A2493B" };
    hbar($("chart-pipeline"), S.STATUSES.map(s => [s.label, by(s.id).length, colors[s.id]]));
    const src = S.SOURCES.map(s => [s, all.filter(c => c.source === s).length]).filter(e => e[1]).sort((a, b) => b[1] - a[1]);
    hbar($("chart-sources"), src);

    const todo = all.filter(c => c.prochaineAction && c.prochaineAction.date && !["perdu"].includes(c.statut))
      .sort((a, b) => a.prochaineAction.date.localeCompare(b.prochaineAction.date)).slice(0, 8);
    $("agenda").innerHTML = todo.map(c => `<li data-id="${c.id}"><span><b>${esc(c.prenom)} ${esc(c.nom)}</b> — ${esc(c.prochaineAction.label)}</span><span class="${isLate(c.prochaineAction.date) ? "late" : "muted"}" style="white-space:nowrap">${fmtDate(c.prochaineAction.date)}</span></li>`).join("") || `<li class="muted">Aucune action planifiée.</li>`;
    $("agenda").querySelectorAll("li[data-id]").forEach(li => li.addEventListener("click", () => openModal(li.dataset.id)));
  }

  // ---------- contacts ----------
  function filtered() {
    const q = $("q").value.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const t = $("f-type").value, st = $("f-statut").value, so = $("f-source").value;
    return S.all().filter(c => {
      const hay = [c.prenom, c.nom, c.email, c.ville, c.type, c.tel, c.ref].join(" ").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
      return (!q || hay.includes(q)) && (!t || c.type === t) && (!st || c.statut === st) && (!so || c.source === so);
    });
  }
  function renderContacts() {
    const list = filtered();
    $("count").textContent = `${list.length} contact${list.length > 1 ? "s" : ""} affiché${list.length > 1 ? "s" : ""} sur ${S.all().length}`;
    $("rows").innerHTML = list.map(c => `
      <tr data-id="${c.id}">
        <td><div class="who-cell"><span class="av-sm">${esc(initials(c))}</span><div><b>${esc(c.prenom)} ${esc(c.nom)}${c.unread ? '<span class="new-badge">NOUVEAU</span>' : ""}</b><span>${esc(c.ville || "—")}</span></div></div></td>
        <td>${esc(c.type)}</td>
        <td style="white-space:nowrap">${fmtDate(c.date)}</td>
        <td class="num">${c.invites || "—"}</td>
        <td class="num">${c.budget ? fmtEUR(c.budget) : "—"}</td>
        <td>${esc(c.formule)}</td>
        <td><span class="pill">${esc(c.source)}</span></td>
        <td>${stPill(c.statut)}</td>
        <td class="small"><span class="${isLate(c.prochaineAction?.date) ? "late" : ""}">${fmtDate(c.prochaineAction?.date)}</span><br><span class="muted">${esc(c.prochaineAction?.label || "")}</span></td>
      </tr>`).join("") || `<tr><td colspan="9" class="empty">Aucun contact ne correspond à ces critères.</td></tr>`;
    $("rows").querySelectorAll("tr[data-id]").forEach(tr => tr.addEventListener("click", () => openModal(tr.dataset.id)));
  }

  // ---------- pipeline ----------
  function renderPipeline() {
    const all = S.all();
    $("kanban").innerHTML = S.STATUSES.map(s => {
      const cards = all.filter(c => c.statut === s.id);
      const sum = cards.reduce((t, c) => t + (+c.montant || 0), 0);
      return `<div class="col" data-status="${s.id}">
        <div class="col-head"><b>${stPill(s.id)}</b><span class="count">${cards.length}</span></div>
        <div class="col-sum">${s.id === "gagne" || s.id === "devis" ? fmtEUR(sum) + " d'honoraires" : "Budget clients : " + fmtEUR(cards.reduce((t, c) => t + (+c.budget || 0), 0))}</div>
        ${cards.map(c => `
          <div class="kcard" draggable="true" data-id="${c.id}">
            <b>${esc(c.prenom)} ${esc(c.nom)}${c.unread ? '<span class="new-badge">NEW</span>' : ""}</b>
            <div class="meta">${esc(c.type)} · ${fmtDate(c.date)} · ${c.invites || "?"} inv.</div>
            <div class="foot"><span class="pill">${c.montant ? fmtEUR(c.montant) : fmtEUR(c.budget) + " budget"}</span>
              <select aria-label="Changer le statut">${S.STATUSES.map(o => `<option value="${o.id}" ${o.id === c.statut ? "selected" : ""}>${o.label}</option>`).join("")}</select></div>
          </div>`).join("")}
      </div>`;
    }).join("");

    $("kanban").querySelectorAll(".kcard").forEach(card => {
      card.addEventListener("dragstart", e => { card.classList.add("dragging"); e.dataTransfer.setData("text/plain", card.dataset.id); e.dataTransfer.effectAllowed = "move"; });
      card.addEventListener("dragend", () => card.classList.remove("dragging"));
      card.addEventListener("click", e => { if (e.target.tagName !== "SELECT" && e.target.tagName !== "OPTION") openModal(card.dataset.id); });
      card.querySelector("select").addEventListener("change", e => changeStatus(card.dataset.id, e.target.value));
    });
    $("kanban").querySelectorAll(".col").forEach(col => {
      col.addEventListener("dragover", e => { e.preventDefault(); col.classList.add("over"); });
      col.addEventListener("dragleave", e => { if (!col.contains(e.relatedTarget)) col.classList.remove("over"); });
      col.addEventListener("drop", e => { e.preventDefault(); col.classList.remove("over"); changeStatus(e.dataTransfer.getData("text/plain"), col.dataset.status); });
    });
  }

  function changeStatus(id, status) {
    const c = S.get(id);
    if (!c || c.statut === status) return;
    const from = S.statusLabel(c.statut);
    const patch = { statut: status, unread: false };
    if ((status === "devis" || status === "gagne") && !c.montant) {
      const est = c.estimation ? c.estimation.low : ({ Essentielle: 390, Signature: 790, Prestige: 1490, "Devis mariage": 2900 }[c.formule] || 790);
      patch.montant = est;
    }
    S.update(id, patch);
    S.addHistory(id, { canal: "Pipeline", note: `Statut modifié : ${from} → ${S.statusLabel(status)}${patch.montant ? ` (montant fixé à ${fmtEUR(patch.montant)})` : ""}.` });
    toast(`${c.prenom} ${c.nom} → ${S.statusLabel(status)}`);
    render();
    if ($("modal").classList.contains("open") && current === id) openModal(id);
  }

  // ---------- fiche contact ----------
  let current = null;
  function openModal(id) {
    const c = S.get(id);
    if (!c) return;
    current = id;
    if (c.unread) { S.update(id, { unread: false }); render(); }
    $("m-ref").textContent = (c.ref ? c.ref + " · " : "") + "Créé le " + fmtDate(c.createdAt) + (c.origin === "site" ? " · via le site" : "");
    $("m-title").textContent = `${c.prenom} ${c.nom}`;
    $("m-status-pill").innerHTML = stPill(c.statut);
    $("m-body").innerHTML = `
      <div>
        <h4>Coordonnées <span class="muted small">(fictives)</span></h4>
        <dl class="info-list">
          <dt>E-mail</dt><dd>${esc(c.email) || "—"}</dd>
          <dt>Téléphone</dt><dd>${esc(c.tel) || "—"}</dd>
          <dt>Ville</dt><dd>${esc(c.ville) || "—"}</dd>
        </dl>
        <h4 style="margin-top:22px">Projet</h4>
        <dl class="info-list">
          <dt>Événement</dt><dd>${esc(c.type)}</dd>
          <dt>Date</dt><dd>${fmtDate(c.date)}</dd>
          <dt>Invités</dt><dd>${c.invites || "—"}</dd>
          <dt>Budget estimé</dt><dd>${c.budget ? fmtEUR(c.budget) : "—"}</dd>
          <dt>Ambiance</dt><dd>${esc(c.ambiance) || "—"}</dd>
          <dt>Formule souhaitée</dt><dd>${esc(c.accompagnement && c.accompagnement !== c.formule ? c.formule + " · " + c.accompagnement : c.formule)}</dd>
          ${c.options && c.options.length ? `<dt>Options</dt><dd>${esc(c.options.join(", "))}</dd>` : ""}
          ${c.lieu ? `<dt>Lieu</dt><dd>${esc(c.lieu)}</dd>` : ""}
          ${c.estimation ? `<dt>Estimation site</dt><dd>${fmtEUR(c.estimation.low)} – ${fmtEUR(c.estimation.high)}</dd>` : ""}
          <dt>Source</dt><dd>${esc(c.source)}${c.acquisition ? " (" + esc(c.acquisition) + ")" : ""}</dd>
        </dl>
        ${c.message ? `<h4 style="margin-top:22px">Message</h4><p class="small" style="background:var(--white);border:1px solid var(--line);border-radius:12px;padding:12px">${esc(c.message)}</p>` : ""}
        <h4 style="margin-top:22px">Suivi commercial</h4>
        <div class="mini-form">
          <div class="r">
            <label class="small">Statut<select id="m-statut">${S.STATUSES.map(s => `<option value="${s.id}" ${s.id === c.statut ? "selected" : ""}>${s.label}</option>`).join("")}</select></label>
            <label class="small">Montant devis (€)<input id="m-montant" type="number" min="0" step="10" value="${+c.montant || 0}"></label>
          </div>
          <label class="small">Formule<select id="m-formule">${S.FORMULES.map(f => `<option ${f === c.formule ? "selected" : ""}>${f}</option>`).join("")}</select></label>
          <button class="btn sm" id="m-save">Enregistrer</button>
        </div>
      </div>
      <div>
        <h4>Prochaine action</h4>
        <div class="next-action">
          <b class="${isLate(c.prochaineAction?.date) ? "late" : ""}">${fmtDate(c.prochaineAction?.date)}</b> — ${esc(c.prochaineAction?.label || "Aucune")}
          <div class="mini-form">
            <div class="r"><input id="m-na-date" type="date" value="${c.prochaineAction?.date || ""}" aria-label="Date de la prochaine action"><input id="m-na-label" value="${esc(c.prochaineAction?.label || "")}" placeholder="Ex. Relance devis" aria-label="Prochaine action"></div>
            <button class="btn ghost sm" id="m-na-save">Planifier</button>
          </div>
        </div>
        <h4 style="margin-top:22px">Historique des échanges</h4>
        <div class="history">${[...c.historique].reverse().map(h => `<div class="h-item"><div class="h-top"><b>${esc(h.canal)}</b><span>${fmtDate(h.date)}</span></div>${esc(h.note)}</div>`).join("")}</div>
        <div class="mini-form">
          <div class="r">
            <select id="m-h-canal" aria-label="Canal"><option>Téléphone</option><option>E-mail</option><option>Rendez-vous</option><option>Instagram</option><option>SMS</option><option>Note</option></select>
            <input id="m-h-date" type="date" value="${S.today()}" aria-label="Date de l'échange">
          </div>
          <textarea id="m-h-note" placeholder="Compte rendu de l'échange…" aria-label="Compte rendu"></textarea>
          <button class="btn ghost sm" id="m-h-add">Ajouter à l'historique</button>
        </div>
        <button class="btn ghost sm" id="m-delete" style="margin-top:22px;border-color:var(--ko);color:var(--ko)">Supprimer ce contact</button>
      </div>`;

    $("m-save").onclick = () => {
      const st = $("m-statut").value;
      const prev = S.get(id);
      S.update(id, { montant: +$("m-montant").value || 0, formule: $("m-formule").value });
      if (st !== prev.statut) changeStatus(id, st); else { toast("Fiche enregistrée"); render(); openModal(id); }
    };
    $("m-na-save").onclick = () => {
      const label = $("m-na-label").value.trim(); const date = $("m-na-date").value;
      if (!label || !date) return toast("Indiquez une date et une action.");
      S.update(id, { prochaineAction: { date, label } });
      toast("Prochaine action planifiée"); render(); openModal(id);
    };
    $("m-h-add").onclick = () => {
      const note = $("m-h-note").value.trim();
      if (!note) return toast("Rédigez un compte rendu.");
      S.addHistory(id, { canal: $("m-h-canal").value, date: $("m-h-date").value || S.today(), note });
      toast("Échange ajouté à l'historique"); openModal(id);
    };
    $("m-delete").onclick = () => {
      if (!confirm(`Supprimer définitivement la fiche de ${c.prenom} ${c.nom} ? (démo)`)) return;
      S.remove(id); closeModal(); render(); toast("Contact supprimé");
    };
    $("modal").classList.add("open");
    $("modal").setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    $("modal").classList.remove("open");
    $("modal").setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    current = null;
  }
  $("m-close").addEventListener("click", closeModal);
  $("modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && current) closeModal(); });

  // ---------- nouveau contact ----------
  $("btn-new").addEventListener("click", () => {
    const prenom = prompt("Prénom du contact (fictif) :"); if (!prenom) return;
    const nom = prompt("Nom :") || "";
    const type = prompt("Type d'événement (" + S.EVENTS.join(", ") + ") :", "Anniversaire") || "Événement privé";
    const c = S.addLead({ prenom: prenom.trim(), nom: nom.trim(), type: S.EVENTS.includes(type) ? type : "Événement privé", source: "Bouche-à-oreille", historyNote: "Contact créé manuellement dans le CRM." });
    S.update(c.id, { origin: "manuel" });
    render(); openModal(c.id);
  });

  // ---------- export / reset ----------
  $("btn-export").addEventListener("click", () => {
    const cols = ["id", "prenom", "nom", "email", "tel", "ville", "type", "date", "invites", "budget", "formule", "source", "statut", "montant"];
    const csv = [cols.join(";")].concat(filtered().map(c => cols.map(k => `"${String(c[k] ?? "").replace(/"/g, '""')}"`).join(";"))).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
    a.download = "crm-instant-signature-demo.csv"; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });
  $("btn-reset").addEventListener("click", () => {
    if (!confirm("Réinitialiser le CRM avec les 22 contacts de démonstration ? Les demandes ajoutées seront effacées.")) return;
    S.reset(); render(); toast("Données de démonstration restaurées");
  });

  // ---------- rendu global ----------
  function render() { renderDashboard(); renderContacts(); renderPipeline(); }

  const params = new URLSearchParams(location.search);
  showTab((location.hash || "#dashboard").slice(1));
  if (params.get("open")) { showTab("contacts"); openModal(params.get("open")); }
  window.addEventListener("storage", render);
})();
