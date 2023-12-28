function myHeader() {
    document.getElementById('header').innerHTML = `<div class="menu">
        <div class="head" id="myHead">
            ITCPR
        </div>
        <div class="center-menu">
        <div class="menu-item" id="menu-academic" onclick="showAcademic()">About</div>
        <div class="menu-item" id="menu-personal" onclick="showPersonal()">Research</div>
        <div class="menu-item" id="menu-personal" onclick="showPersonal()">Outreach</div>
        <div class="menu-item" id="menu-personal" onclick="showPersonal()">Support</div>
        <div class="menu-item" id="menu-personal" onclick="showPersonal()">Documentation</div>
        </div>
    </div>`
}

myHeader();