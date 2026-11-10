/* INSTANT SIGNATURE — stockage local du CRM (démo, données 100 % fictives)
   Téléphones : plage 06 39 98 xx xx réservée par l'Arcep aux œuvres de fiction.
   E-mails : domaine example.com réservé à la documentation (RFC 2606). */
(function () {
  const KEY = "instant-signature-crm-v1";

  const STATUSES = [
    { id: "nouveau", label: "Nouveau prospect" },
    { id: "contacte", label: "Contacté" },
    { id: "devis", label: "Devis envoyé" },
    { id: "gagne", label: "Gagné" },
    { id: "perdu", label: "Perdu" },
  ];
  const EVENTS = ["Mariage", "Anniversaire", "Demande en mariage", "Baby shower", "Gender reveal", "EVJF / EVG", "Événement privé"];
  const FORMULES = ["Essentielle", "Signature", "Prestige", "Devis mariage", "À définir"];
  const SOURCES = ["Instagram", "TikTok", "Site web – configurateur", "Site web – contact", "Bouche-à-oreille", "Partenaire", "Google", "Salon du mariage", "LinkedIn"];

  // [prénom, nom, ville, événement, date évt, invités, budget client, formule, source, statut, montant devis agence, ambiance, historique[], prochaine action [date, libellé]]
  const RAW = [
    ["Claire", "Morel", "Lyon 6e", "Anniversaire", "2027-03-13", 32, 2500, "Signature", "Instagram", "devis", 890, "Chic",
      [["2026-10-14", "Instagram", "Message privé : souhaite fêter ses 40 ans avec ~30 invités."], ["2026-10-17", "Téléphone", "Appel découverte de 30 min, budget global 2 500 €, ambiance chic et chaleureuse."], ["2026-10-28", "E-mail", "Envoi du devis Signature (890 €) + moodboard « Champagne & bougies »."]],
      ["2026-11-12", "Relance devis par téléphone"]],
    ["Yasmine", "Haddad", "Villeurbanne", "Mariage", "2027-06-19", 110, 22000, "Devis mariage", "Salon du mariage", "devis", 3900, "Bohème",
      [["2026-09-27", "Salon", "Rencontre au salon, carte remise. Mariage prévu en juin 2027."], ["2026-10-05", "Rendez-vous", "RDV à l'agence avec son compagnon : organisation partielle + coordination jour J."], ["2026-10-22", "E-mail", "Devis personnalisé mariage envoyé : 3 900 € (hors prestataires)."]],
      ["2026-11-14", "RDV visite du domaine avec les mariés"]],
    ["Inès", "Benali", "Lyon 3e", "Baby shower", "2027-01-24", 18, 900, "Essentielle", "TikTok", "gagne", 420, "Romantique",
      [["2026-10-02", "TikTok", "Commentaire sous la vidéo « Baby shower en 48 h »."], ["2026-10-04", "Téléphone", "Brief : thème sauge et ivoire, 18 invitées."], ["2026-10-09", "E-mail", "Devis Essentielle accepté, acompte fictif enregistré."]],
      ["2026-12-15", "Valider la liste de décoration"]],
    ["Thomas", "Garnier", "Caluire-et-Cuire", "Demande en mariage", "2026-12-12", 2, 1200, "Signature", "Google", "gagne", 790, "Romantique",
      [["2026-10-20", "Site web", "Demande via le formulaire de contact : demande en mariage surprise."], ["2026-10-21", "Téléphone", "Idée retenue : terrasse privatisée, bougies et arche florale."], ["2026-10-30", "E-mail", "Devis Signature signé."]],
      ["2026-11-20", "Repérage du lieu avec le photographe partenaire"]],
    ["Sarah", "Lefèvre", "Lyon 2e", "EVJF", "2027-05-08", 12, 1500, "Essentielle", "Instagram", "contacte", 0, "Festive",
      [["2026-11-03", "Instagram", "Témoin de la mariée, cherche une journée EVJF à Lyon."], ["2026-11-06", "Téléphone", "Premier échange, attend l'avis du groupe sur le budget."]],
      ["2026-11-13", "Envoyer 2 propositions de programme"]],
    ["Julien", "Roux", "Écully", "Anniversaire", "2027-02-20", 60, 4000, "Prestige", "Bouche-à-oreille", "contacte", 0, "Moderne",
      [["2026-10-29", "Téléphone", "Recommandé par une ancienne cliente. 50 ans de son épouse, surprise."], ["2026-11-04", "E-mail", "Questionnaire d'envies envoyé."]],
      ["2026-11-15", "Relancer le questionnaire"]],
    ["Camille", "Dubois", "Lyon 7e", "Gender reveal", "2026-12-06", 25, 800, "Essentielle", "TikTok", "gagne", 450, "Minimaliste",
      [["2026-10-11", "TikTok", "Demande d'infos suite au réel « Gender reveal sans fumigène »."], ["2026-10-13", "Téléphone", "Concept : gâteau révélation + décor pampa et ballons nude."], ["2026-10-18", "E-mail", "Devis accepté."]],
      ["2026-11-25", "Confirmer la commande au pâtissier partenaire"]],
    ["Nadia", "Cherif", "Vénissieux", "Événement privé", "2027-04-10", 45, 3000, "Signature", "Partenaire", "nouveau", 0, "Chic",
      [["2026-11-08", "Partenaire", "Recommandée par le traiteur partenaire : dîner familial pour 45 personnes."]],
      ["2026-11-11", "Premier appel découverte"]],
    ["Antoine", "Mercier", "Lyon 4e", "Mariage", "2027-09-11", 80, 15000, "Devis mariage", "Site web – configurateur", "contacte", 0, "Champêtre",
      [["2026-10-31", "Site web", "Demande via le configurateur : mariage champêtre, 80 invités, 15 000 €."], ["2026-11-05", "Téléphone", "Souhaite une coordination jour J uniquement. RDV à fixer."]],
      ["2026-11-18", "RDV découverte en visio"]],
    ["Léa", "Fontaine", "Tassin-la-Demi-Lune", "Anniversaire", "2027-01-16", 20, 700, "Essentielle", "Instagram", "perdu", 0, "Festive",
      [["2026-09-30", "Instagram", "Anniversaire 30 ans."], ["2026-10-06", "E-mail", "Devis Essentielle envoyé (390 €)."], ["2026-10-20", "Téléphone", "A choisi de tout organiser elle-même. Garder le contact."]],
      ["2027-06-01", "Envoyer la newsletter « Idées d'été »"]],
    ["Mehdi", "Saïdi", "Bron", "Mariage", "2027-07-03", 150, 28000, "Devis mariage", "Bouche-à-oreille", "gagne", 5200, "Chic",
      [["2026-08-25", "Téléphone", "Mariage de 150 invités, organisation complète souhaitée."], ["2026-09-10", "Rendez-vous", "Présentation du rétroplanning et de 3 lieux."], ["2026-09-24", "E-mail", "Devis mariage signé : 5 200 €."]],
      ["2026-11-19", "Dégustation chez le traiteur partenaire"]],
    ["Pauline", "Girard", "Lyon 5e", "Baby shower", "2027-02-07", 15, 600, "Essentielle", "Site web – contact", "nouveau", 0, "Bohème",
      [["2026-11-09", "Site web", "Formulaire de contact : baby shower bohème pour 15 personnes."]],
      ["2026-11-11", "Appeler pour qualifier le besoin"]],
    ["Hugo", "Lambert", "Villeurbanne", "Événement privé", "2026-12-19", 35, 2200, "Signature", "LinkedIn", "devis", 790, "Moderne",
      [["2026-10-25", "LinkedIn", "Contact via post LinkedIn : dîner de fin d'année entre amis, rooftop."], ["2026-10-29", "Téléphone", "Brief validé, 35 personnes."], ["2026-11-02", "E-mail", "Devis Signature envoyé."]],
      ["2026-11-10", "Relance devis (urgent, date proche)"]],
    ["Manon", "Perrin", "Oullins", "EVJF", "2027-06-05", 10, 1100, "Essentielle", "TikTok", "devis", 450, "Festive",
      [["2026-10-19", "TikTok", "Demande via message : EVJF atelier + brunch."], ["2026-10-24", "E-mail", "Proposition : brunch privatisé, atelier couronnes de fleurs."], ["2026-11-01", "E-mail", "Devis Essentielle + options envoyé (450 €)."]],
      ["2026-11-16", "Relance après validation du groupe"]],
    ["Chloé", "Bernard", "Lyon 1er", "Demande en mariage", "2027-02-14", 2, 900, "Essentielle", "Instagram", "nouveau", 0, "Romantique",
      [["2026-11-07", "Instagram", "Message privé : veut organiser une demande pour la Saint-Valentin."]],
      ["2026-11-12", "Proposer un appel découverte"]],
    ["Romain", "Faure", "Sainte-Foy-lès-Lyon", "Anniversaire", "2027-04-24", 80, 5000, "Prestige", "Google", "devis", 1690, "Chic",
      [["2026-10-08", "Google", "Recherche « organisation anniversaire 60 ans Lyon »."], ["2026-10-15", "Rendez-vous", "RDV : réception pour les 60 ans de sa mère, 80 invités."], ["2026-10-27", "E-mail", "Devis Prestige envoyé : 1 690 €."]],
      ["2026-11-13", "Appel pour ajuster les options animation"]],
    ["Emma", "Rousseau", "Lyon 8e", "Mariage", "2027-08-28", 60, 12000, "Devis mariage", "Instagram", "nouveau", 0, "Minimaliste",
      [["2026-11-09", "Instagram", "Demande d'infos sur la coordination du jour J."]],
      ["2026-11-12", "Envoyer la brochure mariage"]],
    ["Lucas", "Blanc", "Décines-Charpieu", "Gender reveal", "2027-01-09", 30, 700, "Essentielle", "TikTok", "contacte", 0, "Festive",
      [["2026-11-02", "TikTok", "Message suite au réel « 3 idées de gender reveal »."], ["2026-11-05", "Téléphone", "Hésite entre box à ballons et gâteau surprise."]],
      ["2026-11-14", "Envoyer le moodboard"]],
    ["Sofia", "Martins", "Lyon 9e", "Baby shower", "2026-12-13", 22, 1000, "Signature", "Partenaire", "gagne", 790, "Chic",
      [["2026-10-01", "Partenaire", "Recommandée par la pâtissière partenaire."], ["2026-10-06", "Rendez-vous", "Thème « Bloom » champagne et pivoines."], ["2026-10-12", "E-mail", "Devis Signature accepté."]],
      ["2026-12-01", "Point final logistique"]],
    ["Alexandre", "Petit", "Limonest", "Événement privé", "2027-03-27", 50, 3500, "Prestige", "Salon du mariage", "perdu", 0, "Chic",
      [["2026-09-27", "Salon", "Anniversaire de mariage (20 ans) au domaine familial."], ["2026-10-10", "E-mail", "Devis Prestige envoyé (1 490 €)."], ["2026-10-26", "Téléphone", "Projet reporté à 2028 pour raisons budgétaires."]],
      ["2027-09-01", "Reprendre contact pour 2028"]],
    ["Amandine", "Leroy", "Lyon 6e", "Anniversaire", "2027-05-22", 25, 1300, "Essentielle", "Bouche-à-oreille", "contacte", 0, "Bohème",
      [["2026-11-01", "Téléphone", "Anniversaire 35 ans dans un jardin privé."], ["2026-11-06", "E-mail", "Envoi de 3 inspirations bohème."]],
      ["2026-11-17", "Fixer un RDV pour le devis"]],
    ["Karim", "Mansour", "Rillieux-la-Pape", "Mariage", "2027-10-02", 120, 20000, "Devis mariage", "Google", "nouveau", 0, "Moderne",
      [["2026-11-10", "Google", "Demande entrante : mariage moderne pour 120 invités."]],
      ["2026-11-12", "Appel découverte"]],
  ];

  function seed() {
    return RAW.map((r, i) => {
      const [prenom, nom, ville, type, date, invites, budget, formule, source, statut, montant, ambiance, hist, next] = r;
      const slug = (prenom + "." + nom).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z.]/g, "");
      return {
        id: "c" + String(i + 1).padStart(3, "0"),
        prenom, nom, ville, type: type === "EVJF" ? "EVJF / EVG" : type, date, invites, budget, formule, source, statut, montant, ambiance,
        email: slug + "@example.com",
        tel: "06 39 98 " + String(10 + i * 3).padStart(2, "0") + " " + String(20 + i * 2).padStart(2, "0"),
        historique: hist.map(([d, canal, note]) => ({ date: d, canal, note })),
        prochaineAction: { date: next[0], label: next[1] },
        createdAt: hist[0][0],
        origin: "seed",
        options: [],
        message: "",
      };
    });
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const data = JSON.parse(raw);
        data.contacts.forEach(c => { if (c.type === "EVJF") c.type = "EVJF / EVG"; });
        return data;
      }
    } catch (e) { /* stockage indisponible : on repart du jeu de démo */ }
    const data = { contacts: seed(), version: 1 };
    save(data);
    return data;
  }
  function save(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* mode privé */ }
  }

  const today = () => new Date().toISOString().slice(0, 10);
  const addDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };

  const Store = {
    STATUSES, EVENTS, FORMULES, SOURCES,
    all() { return load().contacts; },
    get(id) { return load().contacts.find(c => c.id === id); },
    update(id, patch) {
      const data = load();
      const c = data.contacts.find(x => x.id === id);
      if (!c) return null;
      Object.assign(c, patch);
      save(data);
      return c;
    },
    addHistory(id, entry) {
      const data = load();
      const c = data.contacts.find(x => x.id === id);
      if (!c) return;
      c.historique.push({ date: entry.date || today(), canal: entry.canal || "Note", note: entry.note });
      save(data);
    },
    remove(id) {
      const data = load();
      data.contacts = data.contacts.filter(c => c.id !== id);
      save(data);
    },
    /* Ajout d'un prospect depuis l'espace commercial (configurateur ou contact) */
    addLead(lead) {
      const data = load();
      const n = data.contacts.reduce((m, c) => Math.max(m, parseInt(c.id.slice(1), 10) || 0), 0) + 1;
      const id = "c" + String(n).padStart(3, "0");
      const ref = "IS-" + new Date().getFullYear() + "-" + String(n).padStart(4, "0");
      const contact = Object.assign({
        id, ref,
        prenom: "", nom: "", ville: "", type: "Événement privé", date: "", invites: 0, budget: 0,
        formule: "À définir", source: "Site web – configurateur", statut: "nouveau", montant: 0, ambiance: "",
        email: "", tel: "", options: [], message: "",
        historique: [], prochaineAction: { date: addDays(1), label: "Premier appel découverte (sous 24 h)" },
        createdAt: today(), origin: "site", unread: true,
      }, lead);
      contact.historique = [{ date: today(), canal: "Site web", note: lead.historyNote || "Demande reçue depuis le site." }];
      delete contact.historyNote;
      data.contacts.unshift(contact);
      save(data);
      return contact;
    },
    reset() {
      const data = { contacts: seed(), version: 1 };
      save(data);
      return data.contacts;
    },
    statusLabel(id) { return (STATUSES.find(s => s.id === id) || {}).label || id; },
    today, addDays,
  };

  window.Store = Store;
  window.fmtEUR = (n) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n || 0);
  window.fmtDate = (d) => d ? new Date(d + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }) : "—";
  window.esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
})();
