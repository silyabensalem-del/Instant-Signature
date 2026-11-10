/* INSTANT SIGNATURE — contenus de l'espace communication */
(function () {
  const IMG = (id, w = 800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
  const NET = { Instagram: "net-ig", TikTok: "net-tt", LinkedIn: "net-li" };

  const POSTS = [
    {
      net: "Instagram", date: "2026-11-16", format: "Carrousel (6 visuels)", theme: "Lancement de la marque",
      img: "1519225421980-715cb0215aed", overlay: "Chaque moment mérite sa signature.",
      visuel: "Slide 1 : table dressée en lumière dorée + logo. Slides 2–5 : un univers par slide (mariage, anniversaire, demande, baby shower). Slide 6 : « Composez votre événement » + flèche vers le lien en bio.",
      objectif: "Notoriété — présenter la marque et l'offre",
      text: `Bienvenue chez INSTANT SIGNATURE ✨

Nous sommes une nouvelle agence d'événements privés à Lyon. Notre conviction : un bel événement ne doit pas être réservé aux gros budgets.

Mariage, 40 ans, demande en mariage, baby shower, EVJF ou dîner entre amis : vous choisissez l'ambiance, le niveau d'accompagnement et les prestations dont vous avez vraiment besoin. Nous construisons le reste, dans votre budget.

👉 Swipez pour découvrir nos univers
👉 Formules dès 390 € (mariages sur devis)
👉 Configurateur en 3 minutes : lien en bio

Chaque moment mérite sa signature.

#Lyon #EvenementLyon #WeddingPlannerLyon #AnniversaireLyon #DecorationEvenement #InstantSignature`,
    },
    {
      net: "TikTok", date: "2026-11-17", format: "Vidéo verticale 30 s (accéléré)", theme: "Coulisses : installation express",
      img: "1478146896981-b80fe463b330", overlay: "Une table d'anniversaire en 60 secondes",
      visuel: "Plan fixe en plongée, accéléré x8 : table nue → nappe en lin → vaisselle → fleurs → bougies allumées. Texte à l'écran : « 2 h d'installation… en 30 secondes ». Son tendance doux.",
      objectif: "Notoriété — portée organique et viralité locale",
      text: `POV : tu as 2 heures pour transformer une table vide en table d'anniversaire chic pour 30 invités 🕯️

Nappe en lin, vaisselle louée (pas achetée 😉), fleurs de saison, 40 bougies.
Budget déco de cette table : 180 €.

Tu veux la même pour tes 30, 40 ou 50 ans à Lyon ? Lien en bio.

#coulisses #decorationdetable #anniversaire #lyon #eventplanner #tablescape #instantsignature`,
    },
    {
      net: "LinkedIn", date: "2026-11-18", format: "Publication classique (texte + photo)", theme: "Histoire de la fondatrice",
      img: "1561593367-66c79c2294e6", overlay: "Pourquoi j'ai créé INSTANT SIGNATURE",
      visuel: "Photo de la fondatrice dans l'atelier, devant un moodboard (ou à défaut une table dressée). Lumière naturelle, tons ivoire.",
      objectif: "Crédibilité — attirer partenaires et premiers clients du réseau",
      text: `J'ai créé INSTANT SIGNATURE, une agence d'événements privés à Lyon. Voici pourquoi.

En étudiant le marché, un chiffre m'a marquée : 51 % des couples mariés en 2025 ont dépassé leur budget initial (Mariages.net, 2026). Et pour les autres événements — 40 ans, baby showers, demandes en mariage — l'offre professionnelle est rare, ou pensée pour le très haut de gamme.

Notre parti pris :
→ des formules lisibles, à partir de 390 €
→ un configurateur qui donne une estimation avant tout rendez-vous
→ un réseau de prestataires lyonnais, coordonnés par un interlocuteur unique

Je cherche maintenant à rencontrer des fleuristes, photographes, traiteurs, pâtissiers et lieux de réception lyonnais qui partagent cette vision. Un café cette semaine ?

#Entrepreneuriat #Lyon #Evenementiel #INSEEC #Partenariats`,
    },
    {
      net: "Instagram", date: "2026-11-20", format: "Réel 20 s (avant / après)", theme: "Transformation baby shower",
      img: "1487530811176-3780de880c2d", overlay: "Avant / après : un salon devenu baby shower",
      visuel: "Transition au claquement de doigts : salon vide → arche de ballons sauge et ivoire, sweet table, fleurs séchées. Texte : « Formule Essentielle · 18 invitées ».",
      objectif: "Engagement — démontrer la formule Essentielle",
      text: `Avant ➝ après 🤍

Un salon de 25 m², 18 invitées, un thème « sauge & ivoire » et 3 heures d'installation.
C'est notre formule Essentielle : conseil, décoration personnalisée et mise en place de la scénographie, à partir de 390 €.

Et vous, vous choisiriez quelle palette pour une baby shower ?
🌿 Sauge & ivoire
🌸 Rose poudré & doré
☁️ Bleu ciel & lin

Dites-le-nous en commentaire 👇

#BabyShowerLyon #AvantApres #DecoBabyShower #Lyon #FormuleEssentielle #InstantSignature`,
    },
    {
      net: "TikTok", date: "2026-11-24", format: "Vidéo face caméra 45 s", theme: "Transparence des prix",
      img: "1649615644622-6d83f48e69c5", overlay: "Combien coûte vraiment des 40 ans pour 30 personnes ?",
      visuel: "Face caméra dans l'atelier, chiffres qui s'affichent un à un à l'écran (lieu, traiteur, déco, gâteau, accompagnement), total final en grand.",
      objectif: "Considération — générer du trafic vers le configurateur",
      text: `Combien coûte VRAIMENT un anniversaire de 40 ans pour 30 personnes à Lyon ? 💸

Exemple réel de devis type :
🍽️ Traiteur cocktail dînatoire : 30 × 28 € = 840 €
🎂 Gâteau personnalisé : 150 €
💐 Fleurs : 240 €
✨ Accompagnement Signature (conception, déco, prestataires, coordination) : 790 €
= environ 2 000 €, hors lieu

Le secret pour ne pas exploser : fixer ton budget max AVANT de choisir quoi que ce soit.
Notre configurateur te fait l'estimation en 3 min (lien en bio).

#budget #anniversaire40ans #lyon #organisation #astuce #instantsignature`,
    },
    {
      net: "Instagram", date: "2026-11-26", format: "Carrousel (7 visuels)", theme: "Conseils mariage & budget",
      img: "1465495976277-4387d4b0b4c6", overlay: "5 erreurs qui font exploser le budget d'un mariage",
      visuel: "Slides typographiques ivoire et chocolat, une erreur par slide avec un petit visuel. Dernière slide : « Parlons de votre mariage » + bouton devis.",
      objectif: "Génération de leads mariage (cible Yasmine)",
      text: `5 erreurs qui font exploser le budget d'un mariage 💍

1. Choisir le lieu avant d'avoir fixé le nombre d'invités
2. Oublier les « petites » lignes : vestiaire, navettes, frais de service
3. Acheter la décoration au lieu de la louer
4. Multiplier les prestataires sans coordination
5. Ne pas garder 10 % de marge pour les imprévus

Le traiteur peut représenter jusqu'à 40 % du budget d'un mariage : c'est souvent là que se joue l'équilibre.

Vous préparez votre mariage à Lyon ? Notre parcours mariage commence par un rendez-vous découverte offert. Lien en bio 🤍

#MariageLyon #FutureMariee #BudgetMariage #WeddingPlannerLyon #Mariage2027 #InstantSignature`,
    },
    {
      net: "LinkedIn", date: "2026-12-02", format: "Carrousel PDF (5 pages)", theme: "Appel aux partenaires",
      img: "1590683673322-0f3fabd72169", overlay: "Prestataires lyonnais : rejoignez notre réseau",
      visuel: "Document PDF aux couleurs de la marque : 1. Qui sommes-nous 2. Nos clients 3. Ce que nous apportons 4. Ce que nous attendons 5. Contact.",
      objectif: "Partenariats — signer 5 partenaires d'ici fin janvier",
      text: `Fleuristes, photographes, traiteurs, pâtissiers, lieux de réception lyonnais : nous construisons notre réseau de partenaires 🤝

Ce que nous vous apportons :
• des clients qualifiés, avec un budget défini et un brief clair
• un interlocuteur unique côté organisation (moins d'allers-retours pour vous)
• de la visibilité sur nos réseaux et notre site, avec vos crédits photo
• des recommandations croisées : vos clients ont aussi des anniversaires 😉

Ce que nous recherchons :
• des artisans locaux, fiables et créatifs
• une sensibilité au travail de saison et au local
• des conditions claires et transparentes pour nos clients

Le détail dans le document ci-dessous. Intéressé·e ? Commentez « réseau » ou écrivez-moi.

#Lyon #Evenementiel #Partenariat #Fleuriste #Photographe #Traiteur`,
    },
    {
      net: "TikTok", date: "2026-12-08", format: "Vidéo tutoriel 35 s", theme: "Gender reveal écoresponsable",
      img: "1530103862676-de8c9debad1d", overlay: "3 idées de gender reveal sans fumigène",
      visuel: "Trois mini-séquences : gâteau coupé (intérieur coloré), box qui s'ouvre et libère des ballons réutilisables, lettres lumineuses qui s'allument. Texte récapitulatif final.",
      objectif: "Engagement — positionner la marque sur l'écoresponsabilité",
      text: `3 idées de gender reveal SANS fumigène (ta planète et tes voisins te remercient 🌍)

1️⃣ Le gâteau surprise : l'intérieur révèle la couleur
2️⃣ La box à ballons réutilisables
3️⃣ Les lettres lumineuses « IT'S A… » qui s'allument au compte à rebours

Bonus : confettis biodégradables pour la photo finale 📸

Tu préfères laquelle ? 1, 2 ou 3 en commentaire 👇

#genderreveal #genderrevealideas #ecoresponsable #lyon #babyshower #instantsignature`,
    },
    {
      net: "LinkedIn", date: "2026-12-10", format: "Publication classique (texte + infographie)", theme: "Bilan du lancement",
      img: "1559373098-518914f1c315", overlay: "4 semaines après le lancement : ce que nous avons appris",
      visuel: "Infographie simple : nombre de demandes, partenaires rencontrés, premier avis client, réseau qui a le mieux fonctionné.",
      objectif: "Crédibilité — preuve de traction, fidéliser le réseau",
      text: `4 semaines après le lancement d'INSTANT SIGNATURE, voici notre bilan, en toute transparence.

📩 Les demandes arrivent surtout via le configurateur du site : les clients aiment avoir une estimation avant de parler à quelqu'un.
🤝 Les partenaires sont le canal le plus qualifié : un client recommandé par un traiteur signe plus vite.
🎥 Sur TikTok, les vidéos « combien ça coûte vraiment » performent mieux que les belles images seules.
💡 La première question des clients n'est pas « que proposez-vous ? » mais « est-ce que ça rentre dans mon budget ? ».

Prochaine étape : salon du mariage en janvier et 5 partenaires signés.

Merci à toutes celles et ceux qui ont partagé, commenté et recommandé. 🙏

#Entrepreneuriat #Lyon #Evenementiel #Bilan #INSEEC`,
    },
  ];

  // Contenus complémentaires du calendrier (non numérotés)
  const EXTRA = [
    ["2026-11-19", "Instagram", "Stories", "Sondage : quelle ambiance pour vos 40 ans ?", "Engagement"],
    ["2026-11-21", "Instagram", "Stories", "Coulisses du shooting vitrine", "Proximité"],
    ["2026-11-25", "LinkedIn", "Commentaires", "Interaction avec 10 prestataires lyonnais", "Réseau"],
    ["2026-11-27", "TikTok", "Vidéo 15 s", "Unboxing de la nouvelle vaisselle de location", "Notoriété"],
    ["2026-11-30", "Instagram", "Réel 15 s", "Idées de déco pour un dîner de fin d'année", "Inspiration"],
    ["2026-12-01", "TikTok", "Vidéo 20 s", "Une journée avec une organisatrice d'événements", "Proximité"],
    ["2026-12-03", "Instagram", "Carrousel", "Demande en mariage : 4 lieux lyonnais pour dire oui", "Leads demandes en mariage"],
    ["2026-12-05", "Instagram", "Stories", "Questions / réponses budget", "Considération"],
    ["2026-12-07", "Instagram", "Publication classique", "Avis client (premier avis Google)", "Preuve sociale"],
    ["2026-12-11", "Instagram", "Réel 25 s", "Table de Noël en famille, formule Essentielle", "Conversion fêtes"],
    ["2026-12-12", "TikTok", "Vidéo 30 s", "3 erreurs de déco pour un EVJF", "Engagement"],
  ];

  // ---------- publications ----------
  const postsEl = document.getElementById("posts");
  postsEl.innerHTML = POSTS.map((p, i) => `
    <article class="post reveal" data-net="${p.net}">
      <div class="post-head"><span class="av">IS</span><div><b>instant.signature</b><span class="muted">${fmtDate(p.date)}</span></div><span class="pill ${NET[p.net]} net">${p.net}</span></div>
      <div class="post-visual ${p.net === "TikTok" ? "tall" : ""}"><img loading="lazy" src="${IMG(p.img)}" alt="Proposition de visuel : ${esc(p.theme)}"><span class="fmt">${esc(p.format)}</span><div class="overlay">${esc(p.overlay)}</div></div>
      <div class="post-body">
        <span class="small" style="font-weight:700;color:var(--gold)">Publication ${i + 1} · ${esc(p.theme)}</span>
        <div class="post-text">${esc(p.text)}</div>
        <dl class="post-meta">
          <dt>Réseau</dt><dd>${p.net}</dd>
          <dt>Date</dt><dd>${fmtDate(p.date)}</dd>
          <dt>Format</dt><dd>${esc(p.format)}</dd>
          <dt>Visuel</dt><dd>${esc(p.visuel)}</dd>
          <dt>Objectif</dt><dd><b>${esc(p.objectif)}</b></dd>
        </dl>
      </div>
    </article>`).join("");
  document.querySelectorAll("#post-filter .chip").forEach(b => b.addEventListener("click", () => {
    document.querySelectorAll("#post-filter .chip").forEach(x => x.classList.toggle("active", x === b));
    postsEl.querySelectorAll(".post").forEach(p => p.style.display = (b.dataset.net === "all" || p.dataset.net === b.dataset.net) ? "" : "none");
  }));

  // ---------- calendrier ----------
  const items = POSTS.map((p, i) => ({ date: p.date, net: p.net, format: p.format, sujet: "★ " + p.theme, obj: p.objectif, star: true, n: i + 1 }))
    .concat(EXTRA.map(([date, net, format, sujet, obj]) => ({ date, net, format, sujet, obj })))
    .sort((a, b) => a.date.localeCompare(b.date));
  const colors = { Instagram: "background:#F3E3D3;color:#8A4B3D", TikTok: "background:#E9E6E3;color:#2A2320", LinkedIn: "background:#E1E8F0;color:#3C5876" };
  const cal = document.getElementById("cal");
  const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  let html = "";
  const start = new Date("2026-11-16T12:00:00");
  for (let w = 0; w < 4; w++) {
    html += `<div class="week-lbl">Semaine ${w + 1}</div>` + days.map(d => `<div class="dh">${d}</div>`).join("");
    for (let d = 0; d < 7; d++) {
      const day = new Date(start); day.setDate(start.getDate() + w * 7 + d);
      const iso = day.toISOString().slice(0, 10);
      const evs = items.filter(x => x.date === iso);
      html += `<div class="day ${evs.length ? "" : "empty-day"}"><span class="n">${day.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })}</span>${evs.map(e => `<span class="ev" style="${colors[e.net]}">${e.star ? "<b>★ P" + e.n + "</b> " : ""}${esc(e.format)}</span>`).join("")}</div>`;
    }
  }
  cal.innerHTML = html;
  document.getElementById("cal-table").innerHTML = items.map(e => `<tr><td style="white-space:nowrap">${fmtDate(e.date)}</td><td><span class="pill ${NET[e.net]}">${e.net}</span></td><td>${esc(e.format)}</td><td>${e.star ? "<b>" + esc(e.sujet) + "</b>" : esc(e.sujet)}</td><td>${esc(e.obj)}</td></tr>`).join("");

  // ---------- partenariats ----------
  const PARTNERS = [
    { type: "Fleuriste", profil: "Artisan fleuriste lyonnais travaillant les fleurs de saison et locales", img: "1490750967868-88aa4486c946",
      interet: "La décoration florale est présente dans presque tous nos événements ; un fleuriste partenaire garantit la qualité et un prix maîtrisé.",
      apporte: "Compositions sur mesure, conseils de saison, tarifs négociés, livraison et installation coordonnées.",
      recoit: "Un volume régulier de commandes qualifiées, des briefs clairs, des photos professionnelles de ses créations et la mention sur nos réseaux.",
      valeur: "Des créations plus ambitieuses à budget égal pour les clients, et un canal commercial stable pour le fleuriste." },
    { type: "Photographe", profil: "Photographe d'événements et de mariages basé à Lyon", img: "1502635385003-ee1e6a1a742d",
      interet: "Les photos sont le premier souvenir de l'événement… et notre principal contenu marketing.",
      apporte: "Reportages pour nos clients, droits d'utilisation des images pour notre portfolio, présence discrète lors des demandes en mariage.",
      recoit: "Des contrats réguliers, des lieux et décors déjà soignés (des photos plus belles pour son propre portfolio), des recommandations croisées.",
      valeur: "Un portfolio commun de qualité, alimentant la communication des deux marques." },
    { type: "Traiteur", profil: "Traiteur local proposant cocktails dînatoires et buffets pour 10 à 150 invités", img: "1414235077428-338989a2e8c0",
      interet: "Le traiteur peut représenter jusqu'à 40 % du budget d'un mariage : un partenaire fiable sécurise la qualité et le budget global.",
      apporte: "Menus adaptés à chaque budget, dégustations pour nos clients mariage, flexibilité sur les petits volumes.",
      recoit: "Des clients avec un budget défini, une coordination logistique assurée le jour J, des recommandations sur les événements privés de petite taille qu'il ne prospecte pas lui-même.",
      valeur: "Une offre clé en main plus attractive et un taux de transformation plus élevé pour les deux." },
    { type: "Pâtissier·ère", profil: "Pâtissière créatrice de gâteaux personnalisés (layer cakes, wedding cakes, sweet tables)", img: "1559373098-518914f1c315",
      interet: "Le gâteau est la pièce maîtresse des anniversaires, baby showers et gender reveals, nos événements les plus fréquents.",
      apporte: "Gâteaux assortis à la palette de l'événement, gâteaux de révélation, sweet tables photogéniques.",
      recoit: "Des commandes anticipées avec un thème déjà défini, une mise en valeur dans la scénographie, du contenu vidéo pour ses réseaux.",
      valeur: "Des événements plus cohérents visuellement et une visibilité accrue sur TikTok et Instagram pour les deux marques." },
    { type: "Lieu de réception", profil: "Domaine ou salle de réception de 50 à 150 places dans les Monts d'Or ou l'Ouest lyonnais", img: "1469371670807-013ccf25f16a",
      interet: "Trouver le lieu est l'étape la plus stressante pour nos clients mariage et grandes réceptions.",
      apporte: "Disponibilités en priorité, conditions préférentielles, visites facilitées, connaissance technique du lieu.",
      recoit: "Des réservations supplémentaires, notamment hors saison (anniversaires, dîners de fin d'année), et une organisatrice qui connaît parfaitement le lieu.",
      valeur: "Un meilleur taux de remplissage pour le lieu et une offre « lieu + organisation » rassurante pour les clients." },
  ];
  document.getElementById("partners").innerHTML = PARTNERS.map((p, i) => `
    <article class="card partner reveal">
      <img loading="lazy" src="${IMG(p.img, 600)}" alt="${esc(p.type)}">
      <div>
        <span class="eyebrow" style="margin-bottom:6px">Partenaire ${i + 1}</span>
        <h3>${esc(p.type)}</h3>
        <p class="muted small" style="margin-bottom:8px">${esc(p.profil)}</p>
        <p><b>Intérêt du partenariat :</b> ${esc(p.interet)}</p>
        <div class="exchange">
          <div><h5>Ce que le partenaire apporte</h5>${esc(p.apporte)}</div>
          <div><h5>Ce qu'INSTANT SIGNATURE lui apporte</h5>${esc(p.recoit)}</div>
        </div>
        <div class="next-action" style="margin-top:12px"><b>Valeur créée pour les deux :</b> ${esc(p.valeur)}</div>
      </div>
    </article>`).join("");

  window.observeReveal && window.observeReveal();
})();
