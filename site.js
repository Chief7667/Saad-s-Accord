(function(){
  const mods = Array.isArray(window.MODS) ? window.MODS : [];
  const grid = document.getElementById("modsGrid");
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Modal elements
  const modal = document.getElementById("linkModal");
  const modalSubtitle = document.getElementById("modalSubtitle");
  const modalButtons = document.getElementById("modalButtons");

  let lastFocused = null;

  function safeText(s){
    return (s ?? "").toString();
  }

  function normalizeLinks(mod){
    if (Array.isArray(mod.links) && mod.links.length) return mod.links.filter(x => x && x.url);
    if (typeof mod.link === "string" && mod.link.trim()) return [{ label: "Open link", url: mod.link.trim() }];
    return [];
  }

  function openModalFor(mod){
    const links = normalizeLinks(mod);
    if (links.length === 0) return;

    // If only 1 link, open directly (no prompt)
    if (links.length === 1) {
      window.open(links[0].url, "_blank", "noopener,noreferrer");
      return;
    }

    if (!modal || !modalButtons) {
      window.open(links[0].url, "_blank", "noopener,noreferrer");
      return;
    }

    lastFocused = document.activeElement;

    modalButtons.innerHTML = "";
    modalSubtitle.textContent = safeText(mod.modName || "");

    links.forEach((l) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choicebtn";
      btn.innerHTML = `
        <span class="choicebtn__label">
          <span>${safeText(l.label || "Open")}</span>
          <small>Opens in a new tab</small>
        </span>
        <span class="choicebtn__arrow">↗</span>
      `;
      btn.addEventListener("click", () => {
        closeModal();
        window.open(l.url, "_blank", "noopener,noreferrer");
      });
      modalButtons.appendChild(btn);
    });

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    const firstBtn = modalButtons.querySelector("button");
    if (firstBtn) firstBtn.focus();

    document.addEventListener("keydown", onKeyDown);
  }

  function closeModal(){
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    if (modalButtons) modalButtons.innerHTML = "";
    document.removeEventListener("keydown", onKeyDown);
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    lastFocused = null;
  }

  function onKeyDown(e){
    if (e.key === "Escape") closeModal();
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      const t = e.target;
      if (t && t.dataset && t.dataset.close === "1") closeModal();
    });
  }

  if (!grid) return;

  function makeCard(mod){
    const a = document.createElement("a");
    a.className = "card";
    a.role = "listitem";
    a.href = "#";
    a.setAttribute("aria-label", `${safeText(mod.modName)} — choose where to open`);

    const img = document.createElement("img");
    img.className = "thumb";
    img.loading = "lazy";
    img.src = mod.image || "assets/placeholder.svg";
    img.alt = safeText(mod.modName || "Accord modification");
    img.onerror = () => { img.src = "assets/placeholder.svg"; };

    const body = document.createElement("div");
    body.className = "card__body";

    const vt = document.createElement("p");
    vt.className = "vtitle";
    vt.textContent = safeText(mod.videoTitle);

    const mn = document.createElement("p");
    mn.className = "mname";
    mn.textContent = safeText(mod.modName);

    const badge = document.createElement("div");
    badge.className = "badge";
    badge.innerHTML = `
      <span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3z"/><path d="M5 5h6v2H7v10h10v-4h2v6H5V5z"/></svg>
        Choose link
      </span>
    `;

    body.appendChild(vt);
    body.appendChild(mn);
    body.appendChild(badge);

    a.appendChild(img);
    a.appendChild(body);

    a.addEventListener("click", (ev) => {
      ev.preventDefault();
      openModalFor(mod);
    });

    return a;
  }

  if (mods.length === 0){
    const p = document.createElement("p");
    p.className = "muted";
    p.textContent = "No mods yet. Edit mods.js to add your first mod.";
    grid.appendChild(p);
    return;
  }

  mods.forEach(mod => grid.appendChild(makeCard(mod)));
})();