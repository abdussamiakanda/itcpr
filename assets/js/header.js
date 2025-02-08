function myHeader() {
  document.getElementById("header").innerHTML = `<div class="menu">
  <div class="menu-top">
    <div onclick="goTo('./../../../internships')">APPLY</div>
    <div onclick="goTo('./../../../support')">SUPPORT</div>
    <div class="bar"></div>
    <div onclick="goToExternal('https://portal.itcpr.org')">LOGIN</div>
  </div>
  <div class="menu-bar">
    <div class="icon" onclick="goTo('./../../../')">
      ITCPR
    </div>
    <div id="headerbtn">
      <i class="fa-solid fa-bars bars" onclick="handleMenu('o')"></i>
    </div>
    <div class="pc-menu">
      <div class="menu-item about">
        ABOUT
        <div class="about-items">
          <div onclick="goTo('./../../../story')">Our Story</div>
          <div onclick="goTo('./../../../charter')">
            Institutional Charter
          </div>
          <div onclick="goTo('./../../../facilities')">
            Research Facilities
          </div>
        </div>
      </div>
      <div class="menu-item research">
        RESEARCH
        <div class="research-items">
          <div onclick="goTo('./../../../groups')">Research Groups</div>
          <div onclick="goTo('./../../../publications')">Publications</div>
        </div>
      </div>
      <div class="menu-item" onclick="goTo('./../../../outreach')">
        OUTREACH
      </div>
      <div class="menu-item" onclick="goTo('./../../../people')">
        PEOPLE
      </div>
    </div>
  </div>

</div>
<div class="moblie-menu" id="moblie-menu">
  <div class="menu-item">About</div>
  <div class="menu-item1" onclick="goTo('./../../../story')">
    Our Story
  </div>
  <div class="menu-item1" onclick="goTo('./../../../charter')">
    Institutional Charter
  </div>
  <div class="menu-item1" onclick="goTo('./../../../facilities')">
    Research Facilities
  </div>
  <div class="menu-item">Research</div>
  <div class="menu-item1" onclick="goTo('./../../../groups')">
    Research Groups
  </div>
  <div class="menu-item1" onclick="goTo('./../../../publications')">
    Publications
  </div>
  <div class="menu-item" onclick="goTo('./../../../outreach')">
    Outreach
  </div>
  <div class="menu-item" onclick="goTo('./../../../people')">People</div>
  <div class="menu-item" onclick="goTo('./../../../contact')">
    Contact
  </div>
</div>`;
}

function handleMenu(val) {
    if (val === 'o')  {
        document.getElementById('moblie-menu').style.top = '0px';
        document.getElementById('headerbtn').innerHTML = `<i class="fa-solid fa-xmark cross" onclick="handleMenu('c')"></i>`;
    } else {
        document.getElementById('moblie-menu').style.top = '-2000px';
        document.getElementById('headerbtn').innerHTML = `<i class="fa-solid fa-bars bars" onclick="handleMenu('o')"></i>`;
    }
}
function goTo(path) {
  window.location.assign(path);
}

function goToExternal(path) {
  window.open(path, "_blank");
}

myHeader();
