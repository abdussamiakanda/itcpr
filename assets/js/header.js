function myHeader() {
  document.getElementById("header").innerHTML = `<div class="menu">
        <div class="head" onclick="goTo('./')">
            ITCPR
        </div>
        <div class="pc-menu">
            <div class="menu-item about">About <i class="fa-solid fa-chevron-down"></i>
                <div class="about-items">
                    <div onclick="goTo('./story')">Our Story</div>
                    <div onclick="goTo('./charter')">Institutional Charter</div>
                    <div onclick="goTo('./policy')">Research Policy</div>
                    <div onclick="goTo('./collaboration')">Collaboration Agreement</div>
                    <div onclick="goTo('./technology')">Technology and Security Policy</div>
                </div>
            </div>
            <div class="menu-item research">Research <i class="fa-solid fa-chevron-down"></i>
                <div class="research-items">
                    <div onclick="goTo('./groups')">Research Groups</div>
                    <div onclick="goTo('./publications')">Publications</div>
                </div>
            </div>
            <div class="menu-item" onclick="goTo('./outreach')">Outreach</div>
            <div class="menu-item" onclick="goTo('./people')">People</div>
            <div class="menu-item" onclick="goTo('./support')">Support</div>
            <div class="menu-item" onclick="goTo('./contact')">Contact</div>
        </div>
    </div>`;
}

function goTo(path) {
  window.location.assign(path);
}

function goToExternal(path) {
  window.open(path, "_blank");
}

myHeader();
