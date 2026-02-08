
// ===== SERVER LIST =====
const servers = [
    { name:"Server 1", url:"https://xd2test-9672c3e51c70.herokuapp.com/" },
    { name:"Server 2", url:"https://app2.herokuapp.com" },
    { name:"Server 3", url:"https://xd2test3-e815d7199e16.herokuapp.com" },
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

    const area = document.getElementById("serverArea");
    if(!area) return;

    // 👉 BUILD BOXES ONLY ONCE
    if(area.innerHTML === ""){

        for(let i = 1; i <= servers.length; i++){

            let srv = servers[i-1];

            area.innerHTML += `
            <div class="server-box">

                <div class="rgb-bar"></div>
                <div class="server-name">${srv.name}</div>
                <div class="rgb-bar"></div>

                <div class="server-info">
                    Using:
                    <span id="u${i}">--</span> /
                    <span id="l${i}">5</span><br>

                    Status:
                    <span id="s${i}" class="stopped">Loading</span>
                </div>

                <a href="#" onclick="pairClick(${i}, '${srv.url}')" class="pair-btn">
                    PAIR BOT
                </a>

                <div class="rgb-bar"></div>

            </div>`;
        }
    }

    // 👉 UPDATE STATUS ONLY
    for(let i = 1; i <= servers.length; i++){

        let srv = servers[i-1];

let users = 0;
let limit = 5;
let status = "Stopped";
let cls = "stopped";

try {

    const r = await fetch(srv.url + "/status");

    if (!r.ok) throw new Error("Server down");

    const d = await r.json();

    users = d.totalActive ?? d.users ?? 0;

    if (users >= limit) {
        status = "Active / Full";
        cls = "active";
    } else {
        status = "Active";
        cls = "active";
    }

} catch (err) {

    status = "Stopped";
    cls = "stopped";

}

// UI update
document.getElementById("u"+i).innerText = users;
document.getElementById("l"+i).innerText = limit;

let s = document.getElementById("s"+i);
s.innerText = status;
s.className = cls;
    }
}

// first load
loadServers();

// auto refresh
setInterval(loadServers, 15000);
async function pairClick(id, url) {

    try {

        const r = await fetch(url + "/status");
        const d = await r.json();

        let users = d.totalActive ?? d.users ?? 0;
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
