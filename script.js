// ===== SERVER LIST =====
const servers = [
    { name:"Server 1", url:"https://xd2test-bcdc85100e0f.herokuapp.com/" },
    { name:"Server 2", url:"https://app2.herokuapp.com" },
    { name:"Server 3", url:"https://app3.herokuapp.com" },
    { name:"Server 4", url:"https://app4.herokuapp.com" },
    { name:"Server 5", url:"https://app5.herokuapp.com" },
    { name:"Server 6", url:"https://app6.herokuapp.com" },
    { name:"Server 7", url:"https://app7.herokuapp.com" },
    { name:"Server 8", url:"https://app8.herokuapp.com" },
    { name:"Server 9", url:"https://app9.herokuapp.com" },
    { name:"Server 10", url:"https://app10.herokuapp.com" }
];


// ===== BATTERY =====
navigator.getBattery().then(b => {
    const updateBattery = () => {
        document.getElementById("bat").innerText =
            Math.round(b.level * 100) + "%";
    };

    updateBattery();
    b.onlevelchange = updateBattery;
});


// ===== UPTIME =====
let uptime = 0;
setInterval(() => {
    uptime++;
    document.getElementById("uptime").innerText = uptime + "s";
}, 1000);


// ===== LOAD SERVERS =====

async function loadServers(){
const scrollPos = window.scrollY;
    const area = document.getElementById("serverArea");
    if(!area) return;

    if(area.innerHTML !== "") return;

    for(let srv of servers){

let users = 0;
let limit = 5;
        let status="Stopped";
        let cls="stopped";

        try{
            const r = await fetch(srv.url + "/status");
            const d = await r.json();

            users = d.totalActive || d.users || 0;
limit = 5; // max users

if(users >= limit){
    status = "Full";
    cls = "stopped";
}
else if(users > 0){
    status = "Active";
    cls = "active";
}
else{
    status = "Stopped";
    cls = "stopped";
}

        } catch {}

        area.innerHTML += `
        <div class="server-box">

            <div class="rgb-bar"></div>
            <div class="server-name">${srv.name}</div>
            <div class="rgb-bar"></div>

            <div class="server-info">Using:
<span id="u${servers.indexOf(srv)+1}">${users}</span> /
<span id="l${servers.indexOf(srv)+1}">${limit}</span><br>

Status: <span class="${cls}">${status}</span>
            </div>

            <a href="${srv.url}" class="pair-btn">PAIR BOT</a>

            <div class="rgb-bar"></div>

        </div>`;
    }
    window.scrollTo(0, scrollPos);
}

loadServers();
setInterval(loadServers, 15000);

async function pairClick(id, url) {

    try {

        const r = await fetch(url + "/status");
        const d = await r.json();

        const users = d.totalActive || d.users || 0;
        const limit = 5;

        if (users >= limit) {
            alert("Server is FULL!\nUse another server.");
            return;
        }

        window.location.href = url;

    } catch {
        alert("⚠ Server not responding");
    }
}
