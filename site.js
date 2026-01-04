(function(){
  const mods = Array.isArray(window.MODS) ? window.MODS : [];
  const grid = document.getElementById("modsGrid");
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (!grid) return;

  function safeText(s){
    return (s ?? "").toString();
  }

  function makeCard(mod){
    const a = document.createElement("a");
    a.className = "card";
    a.role = "listitem";
    a.href = mod.link || "#";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", `${safeText(mod.modName)} — opens link in a new tab`);

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
        Open link
      </span>
    `;

    body.appendChild(vt);
    body.appendChild(mn);
    body.appendChild(badge);

    a.appendChild(img);
    a.appendChild(body);

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