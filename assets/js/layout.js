/* INSTANT SIGNATURE — gabarit commun (bandeau démo, en-tête, pied de page) */
(function () {
  const space = document.body.dataset.space || "commercial";
  const page = document.body.dataset.page || "";

  const spaces = [
    { id: "commercial", label: "Espace commercial", href: "index.html" },
    { id: "crm", label: "CRM", href: "crm.html" },
    { id: "strategie", label: "Stratégie", href: "strategie.html" },
    { id: "communication", label: "Communication", href: "communication.html" },
  ];

  const nav = [
    { id: "prestations", label: "Prestations", href: "prestations.html" },
    { id: "mariages", label: "Mariages", href: "mariages.html" },
    { id: "evenements", label: "Événements privés", href: "evenements-prives.html" },
    { id: "formules", label: "Formules", href: "formules.html" },
    { id: "methode", label: "Méthode", href: "methode.html" },
    { id: "faq", label: "FAQ", href: "faq.html" },
    { id: "contact", label: "Contact", href: "contact.html" },
  ];

  const demoBar = `
    <div class="demo-bar" role="note">
      <div class="container">
        <span class="demo-flag"><i class="dot"></i><b>Projet étudiant INSEEC, démo sans vente réelle</b></span>
        <nav class="spaces" aria-label="Espaces du site">
          ${spaces.map(s => `<a href="${s.href}" class="${s.id === space ? "active" : ""}">${s.label}</a>`).join("")}
        </nav>
      </div>
    </div>`;

  const header = `
    <header class="site-header">
      <div class="container">
        <a class="brand" href="index.html" aria-label="Accueil INSTANT SIGNATURE">
          <span class="brand-name">INSTANT <span>·</span> SIGNATURE</span>
          <span class="brand-sub">Événements privés · Lyon</span>
        </a>
        <nav class="main-nav" id="main-nav" aria-label="Navigation principale">
          ${nav.map(n => `<a href="${n.href}" class="${n.id === page ? "active" : ""}">${n.label}</a>`).join("")}
          <a href="configurateur.html" class="btn gold sm">Composer mon événement</a>
        </nav>
        <button class="nav-toggle" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="main-nav"><span></span><span></span><span></span></button>
      </div>
    </header>`;

  const footer = `
    <footer class="site-footer">
      <div class="container">
        <p class="footer-motto">Chaque moment mérite <em>sa&nbsp;signature.</em></p>
        <div class="footer-grid">
          <div>
            <span class="brand-name">INSTANT <span class="gold">·</span> SIGNATURE</span>
            <p style="margin-top:16px;max-width:340px;opacity:.85">Agence d'événements privés sur mesure à Lyon et dans sa région.</p>
            <span class="student-note">◆ Projet étudiant INSEEC, démo sans vente réelle</span>
          </div>
          <div>
            <h5>L'agence</h5>
            <ul>
              <li><a href="prestations.html">Prestations</a></li>
              <li><a href="mariages.html">Mariages</a></li>
              <li><a href="evenements-prives.html">Événements privés</a></li>
              <li><a href="formules.html">Formules & tarifs</a></li>
              <li><a href="methode.html">Notre méthode</a></li>
            </ul>
          </div>
          <div>
            <h5>Votre projet</h5>
            <ul>
              <li><a href="configurateur.html">Configurateur</a></li>
              <li><a href="configurateur.html?type=mariage">Devis mariage</a></li>
              <li><a href="faq.html">FAQ</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5>Espaces démo</h5>
            <ul>
              ${spaces.map(s => `<li><a href="${s.href}">${s.label}</a></li>`).join("")}
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 INSTANT SIGNATURE — entreprise fictive. Coordonnées, contacts et témoignages fictifs.</span>
          <span>Aucun paiement ni vente réelle · Photos : Unsplash</span>
        </div>
      </div>
    </footer>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>`;

  document.body.insertAdjacentHTML("afterbegin", demoBar + header);
  document.body.insertAdjacentHTML("beforeend", footer);

  // Menu mobile
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("main-nav");
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
  });

  // Ombre de l'en-tête au défilement
  const hdr = document.querySelector(".site-header");
  const onScroll = () => hdr.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Apparition au défilement
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 })
    : null;
  window.observeReveal = (root = document) => root.querySelectorAll(".reveal:not(.in)").forEach(el => io ? io.observe(el) : el.classList.add("in"));
  window.observeReveal();

  // Barres horizontales animées
  document.querySelectorAll(".hbar .fill[data-w]").forEach(el => {
    requestAnimationFrame(() => setTimeout(() => (el.style.width = el.dataset.w + "%"), 150));
  });

  // Notification
  window.toast = (msg) => {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(window.__toastT);
    window.__toastT = setTimeout(() => t.classList.remove("show"), 2800);
  };
})();
