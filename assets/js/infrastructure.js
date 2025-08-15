// /assets/js/infrastructure.js

document.addEventListener("DOMContentLoaded", function() {
  const SERVICES = [
    { name: "Application", icon: "fa-solid fa-clipboard", link: "https://apply.itcpr.org", desc: "Application portal for ITCPR internship program." },
    { name: "Portal", icon: "fa-solid fa-door-open", link: "https://portal.itcpr.org", desc: "Login portal for ITCPR members to access resources and services." },
    { name: "Webmail", icon: "fa-solid fa-envelope", link: "https://webmail.itcpr.org", desc: "Access your @mail.itcpr.org inbox via our custom webmail interface." },
    { name: "Terminal", icon: "fa-solid fa-laptop-code", link: "https://terminal.itcpr.org", desc: "Online terminal for secure command-line access to ITCPR resources." },
    { name: "Server", icon: "fa-solid fa-server", link: "https://server.itcpr.org", desc: "Server portal for network access, Zero Trust configuration, and management." },
    { name: "Library", icon: "fa-solid fa-book-open-reader", link: "https://library.itcpr.org", desc: "Digital library with research papers, books, and learning resources." },
    { name: "CodeLab", icon: "fa-solid fa-atom", link: "https://code.itcpr.org", desc: "Collaborative coding environment for research and development." },
    { name: "JupyterLab", icon: "fa-brands fa-python", link: "https://jupyter.itcpr.org", desc: "Interactive computational notebooks for data analysis and simulation." },
    { name: "Overleaf", icon: "fas fa-superscript", link: "https://overleaf.itcpr.org", desc: "Collaborative LaTeX platform for academic writing and publishing." },
    { name: "LaTeX Editor", icon: "fa-solid fa-file-code", link: "https://latex.itcpr.org", desc: "Custom online LaTeX editor for quick document creation." },
    { name: "BuildBox", icon: "fa-solid fa-gamepad", link: "https://buildbox.itcpr.org", desc: "Sandbox for practicing programming languages and syntax." },
    { name: "Forum", icon: "fa-solid fa-comments", link: "https://forum.itcpr.org", desc: "Community discussion forum for researchers and collaborators." },
    { name: "Events", icon: "fa-solid fa-calendar", link: "https://events.itcpr.org", desc: "Event management platform for ITCPR workshops, seminars, and talks." },
    { name: "News", icon: "fa-solid fa-newspaper", link: "https://news.itcpr.org", desc: "Latest updates, announcements, and research highlights of physics." },
    { name: "Physics Engine", icon: "fa-solid fa-gear", link: "https://physics.itcpr.org", desc: "Custom-built physics engine for basic simulations." },
    { name: "Free Time", icon: "fa-solid fa-calendar-check", link: "https://free.itcpr.org", desc: "Meeting scheduler and availability tracker for team coordination." },
    { name: "GitHub", icon: "fa-brands fa-github", link: "https://github.com/ITCPR", desc: "Explore our open-source projects and repositories on GitHub." },
    { name: "PaperPort", icon: "fa-brands fa-chrome", link: "https://library.itcpr.org/extension", desc: "Browser extension for quick access to academic papers and resources." }
  ];

  const TOOLS = [
    { name: "Python", icon: "fa-brands fa-python", link: "https://www.python.org", desc: "General-purpose language for data analysis, automation, and scientific computing." },
    { name: "MATLAB", icon: "fa-solid fa-square-root-variable", link: "https://www.mathworks.com/products/matlab.html", desc: "Numerical computing environment used for prototyping and analysis." },
    { name: "Bash", icon: "fa-solid fa-terminal", link: "https://www.gnu.org/software/bash/", desc: "Shell scripting for automation, clusters, and pipelines." },
    { name: "CUDA", icon: "fa-solid fa-microchip", link: "https://developer.nvidia.com/cuda-zone", desc: "GPU programming for accelerated simulations and numerics." },

    { name: "Quantum ESPRESSO", icon: "fa-solid fa-cubes", link: "https://www.quantum-espresso.org", desc: "Plane-wave DFT suite for electronic-structure and materials modeling." },
    { name: "CASTEP", icon: "fa-solid fa-cube", link: "https://www.castep.org", desc: "First-principles DFT code for properties and spectroscopy." },

    { name: "MuMax3", icon: "fa-solid fa-microchip", link: "https://mumax.github.io", desc: "GPU-accelerated micromagnetic simulations." },
    { name: "Vampire", icon: "fa-solid fa-atom", link: "https://vampire.york.ac.uk/", desc: "Atomistic spin dynamics for magnetic materials." },
    { name: "Spirit", icon: "fa-solid fa-atom", link: "https://spirit-code.github.io", desc: "Spin dynamics and magnetism simulations with advanced features." },
  ];

  const grid = document.getElementById("grid");

  function render(needle = "") {
    grid.innerHTML = "";
    const q = needle.trim().toLowerCase();
    SERVICES.filter(s => !q || s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)).forEach(s => {
      const card = document.createElement("div");
      card.className = "card fancy-card";
      card.innerHTML = `
        <div class="card-header">
          <div class="icon-circle"><i class="${s.icon}"></i></div>
          <h3 class="name">${s.name}</h3>
        </div>
        <p class="desc">${s.desc}</p>
        <div class="card-footer">
          <a href="${s.link}" target="_blank" rel="noopener" class="btn btn-accent">Open →</a>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  const gridTools = document.getElementById("grid-tools");

  function renderTools(needle = "") {
    gridTools.innerHTML = "";
    const q = needle.trim().toLowerCase();
    TOOLS.filter(t => !q || t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)).forEach(t => {
      const card = document.createElement("div");
      card.className = "card fancy-card";
      card.innerHTML = `
        <div class="card-header">
          <div class="icon-circle"><i class="${t.icon}"></i></div>
          <h3 class="name">${t.name}</h3>
        </div>
        <p class="desc">${t.desc}</p>
        <div class="card-footer">
          <a href="${t.link}" target="_blank" rel="noopener" class="btn btn-accent">Open →</a>
        </div>
      `;
      gridTools.appendChild(card);
    });
  }

  render();
  renderTools();
});
