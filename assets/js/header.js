function myHeader() {
  document.getElementById("header").innerHTML = `<div class="menu">
        <i class="fa-solid fa-bars bars" onclick="handleMenu('o')"></i>
        <div class="head" onclick="goTo('./../../../')">
            <img src="./../../../assets/image/icon.png" alt="">
        </div>
        <div class="pc-menu">
            <div class="menu-item about">About <i class="fa-solid fa-chevron-down"></i>
                <div class="about-items">
                    <div onclick="goTo('./../../../story')">Our Story</div>
                    <div onclick="goTo('./../../../charter')">Institutional Charter</div>
                    <div onclick="goTo('./../../../facilities')">Research Facilities</div>
                </div>
            </div>
            <div class="menu-item research">Research <i class="fa-solid fa-chevron-down"></i>
                <div class="research-items">
                    <div onclick="goTo('./../../../groups')">Research Groups</div>
                    <div onclick="goTo('./publications')">Publications</div>
                </div>
            </div>
            <div class="menu-item" onclick="goTo('./../../../outreach')">Outreach</div>
            <div class="menu-item" onclick="goTo('./../../../people')">People</div>
            <div class="menu-item" onclick="goTo('./../../../support')">Support</div>
            <div class="menu-item" onclick="goTo('./../../../contact')">Contact</div>
        </div>
    </div>
    <div class="moblie-menu" id="moblie-menu">
        <i class="fa-solid fa-xmark cross" onclick="handleMenu('c')"></i>
        <div class="menu-item">About</div>
        <div class="menu-item1" onclick="goTo('./../../../story')">Our Story</div>
        <div class="menu-item1" onclick="goTo('./../../../charter')">Institutional Charter</div>
        <div class="menu-item1" onclick="goTo('./../../../facilities')">Research Facilities</div>
        <div class="menu-item">Research</div>
        <div class="menu-item1" onclick="goTo('./../../../groups')">Research Groups</div>
        <div class="menu-item1" onclick="goTo('./../../../publications')">Publications</div>
        <div class="menu-item" onclick="goTo('./../../../outreach')">Outreach</div>
        <div class="menu-item" onclick="goTo('./../../../people')">People</div>
        <div class="menu-item" onclick="goTo('./../../../support')">Support</div>
        <div class="menu-item" onclick="goTo('./../../../contact')">Contact</div>
    </div>`;
}

function handleMenu(val) {
    if (val === 'o')  {
        document.getElementById('moblie-menu').style.left = '0px';
    } else {
        document.getElementById('moblie-menu').style.left = '-450px';
    }
}
function goTo(path) {
  window.location.assign(path);
}

function goToExternal(path) {
  window.open(path, "_blank");
}

myHeader();
