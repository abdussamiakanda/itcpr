import { supabase } from "./footer.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const { data, error } = await supabase
      .from("itcpr_people")
      .select("id,name,position,role,group,institute,image,url");

    if (error) throw error;
    const all = Array.isArray(data) ? data : [];

    const sortByName = (a, b) =>
      (a.name || "").localeCompare(b.name || "", undefined, { sensitivity: "base" });

    const teamRoleOrder = [
      "Executive Director",
      "Director of Operations",
      "Director of Research",
      "Director of Policy",
      "Director of Outreach",
      "Director of Finance",
      "Internship Coordinator",
    ];
    const teamRoleIndex = new Map(teamRoleOrder.map((r, i) => [r, i]));
    const roleRank = pos => (teamRoleIndex.has(pos) ? teamRoleIndex.get(pos) : Number.POSITIVE_INFINITY);

    const advisors = all.filter(p => p.position === "Advisor").sort(sortByName);
    const team = all
      .filter(p => p.position !== null && p.position !== "Advisor")
      .sort((a, b) => {
        const ai = roleRank(a.position);
        const bi = roleRank(b.position);
        return ai === bi ? sortByName(a, b) : ai - bi;
      });

    const byRole = role =>
      all.filter(p => p.role === role).sort(sortByName);

    const leads = byRole("Lead");
    const members = byRole("Member");
    const collaborators = byRole("Collaborator");
    const interns = byRole("Intern");

    const byId = id => document.getElementById(id);
    const safeImg = url => (url && String(url).trim()) || "/assets/image/placeholder-avatar.png";
    const safeUrl = url => (url && String(url).trim()) || "#";

    const renderCards = (areaOrId, list, makeEl) => {
      const area = typeof areaOrId === "string" ? byId(areaOrId) : areaOrId;
      if (!area) return;
      const frag = document.createDocumentFragment();
      list.forEach(p => frag.appendChild(makeEl(p)));
      area.textContent = "";
      area.appendChild(frag);
    };

    const teamCard = person => {
      const el = document.createElement("div");
      el.className = "team-card";
      el.innerHTML = `
        <img src="${safeImg(person.image)}" alt="${person.name || "Member"}" />
        <div class="team-info">
          <h3>${person.name || ""}</h3>
          <p>${person.position || ""}</p>
          <a href="${safeUrl(person.url)}" target="_blank" class="team-link" rel="noopener noreferrer">
            Google Scholar <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      `;
      return el;
    };

    const advisorCard = person => {
      const el = document.createElement("div");
      el.className = "team-card";
      el.innerHTML = `
        <img src="${safeImg(person.image)}" alt="${person.name || "Advisor"}" />
        <div class="team-info">
          <h3>${person.name || ""}</h3>
          <p>${person.institute || ""}</p>
          <a href="${safeUrl(person.url)}" target="_blank" class="team-link" rel="noopener noreferrer">
            Google Scholar <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      `;
      return el;
    };

    const leadCard = person => {
      const el = document.createElement("div");
      el.className = "team-card";
      el.innerHTML = `
        <img src="${safeImg(person.image)}" alt="${person.name || "Lead"}" />
        <div class="team-info">
          <h3>${person.name || ""}</h3>
          <p>${person.group ? `${person.group} Group Lead` : "Group Lead"}</p>
          <a href="${safeUrl(person.url)}" target="_blank" class="team-link" rel="noopener noreferrer">
            Google Scholar <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      `;
      return el;
    };

    const overlayCard = person => {
      const el = document.createElement("div");
      el.className = "member-card";
      el.onclick = () => window.open(safeUrl(person.url), "_blank", "noopener");
      el.innerHTML = `
        <img src="${safeImg(person.image)}" alt="${person.name || "Member"}" />
        <div class="member-overlay">
          <span class="member-name">${person.name || ""}</span>
        </div>
      `;
      return el;
    };

    // 5) Render all sections
    renderCards("teamGrid", team, teamCard);
    renderCards("advisorGrid", advisors, advisorCard);
    renderCards("leadsGrid", leads, leadCard);
    renderCards("membersGrid", members, overlayCard);
    renderCards("collaboratorsGrid", collaborators, overlayCard);

    const internsArea = byId("internsGrid");
    if (internsArea) {
      if (interns.length === 0) {
        internsArea.innerHTML = "<p>Interns data not found!</p>";
      } else {
        renderCards(internsArea, interns, overlayCard);
      }
    }
  } catch (err) {
    console.error("Error building people grids:", err);
  }
});
