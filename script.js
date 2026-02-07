// ===== SERVER LIST =====
const servers = [
    { name:"Server 1", url:"https://app1.herokuapp.com" },
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

    const area = document.getElementById("serverArea");
    if(!area) return;

    area.innerHTML = "";

    for(let srv of servers){

        let users="--";
        let limit="--";
        let status="Stopped";
        let cls="stopped";

        try{
            const r = await fetch(srv.url + "/status");
            const d = await r.json();

            users = d.users;
            limit = d.limit;

            if(d.status === "active"){
                status = "Active";
                cls = "active";
            }

        } catch {}

        area.innerHTML += `
        <div class="server-box">

            <div class="rgb-bar"></div>
            <div class="server-name">${srv.name}</div>
            <div class="rgb-bar"></div>

            <div class="server-info">
                Using: ${users}/${limit}<br>
                Status: <span class="${cls}">${status}</span>
            </div>

            <a href="${srv.url}" class="pair-btn">PAIR BOT</a>

            <div class="rgb-bar"></div>

        </div>`;
    }
}

loadServers();
setInterval(loadServers, 5000);
