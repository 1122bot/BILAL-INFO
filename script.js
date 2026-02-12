function fancyNum(n){
    const map = ["𝟬","𝟭","𝟮","𝟯","𝟰","𝟱","𝟲","𝟳","𝟴","𝟵"];
    return n.toString().split("").map(d => map[d]).join("");
}

const rgbBorderFix = document.createElement("style");

rgbBorderFix.innerHTML = `

.server-box{
  position: relative;
  background: #111;
  border-radius: 18px;
  padding: 14px;
  z-index: 0;
}

/* RGB border layer */
.server-box::before{
  content:"";
  position:absolute;
  inset:-2px;
  border-radius:20px;

  background: linear-gradient(
    90deg,
    red,
    orange,
    yellow,
    lime,
    cyan,
    blue,
    magenta,
    red
);

  background-size:400%;
  animation: rgbBorderFlow 3s linear infinite;

  z-index:-1;
}

/* animation */
@keyframes rgbBorderFlow{
  0%{background-position:0%}
  100%{background-position:400%}
}

`;

document.head.appendChild(rgbBorderFix);

/* ===== RGB BORDER ONLY ===== */

const pairstyle = document.createElement("style");

pairstyle.innerHTML = `

.server-box{
    position: relative;
    overflow: hidden;
}

/* moving RGB border */
.server-box::before{
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 18px;

    background: linear-gradient(
        90deg,
        #00ffff,
        #ff00ff,
        #00ffff
    );

    background-size: 300%;
    animation: rgbBorderMove 3s linear infinite;
    z-index: -1;
}

/* inner mask (so border dikhe sirf edge pe) */
.server-box::after{
    content: "";
    position: absolute;
    inset: 2px;
    background: inherit;
    border-radius: 16px;
    z-index: -1;
}

/* animation */
@keyframes rgbBorderMove{
    0%{ background-position: 0% }
    100%{ background-position: 300% }
}

`;

document.head.appendChild(pairstyle);

const centerStyle = document.createElement("style");

centerStyle.innerHTML = `
.server-info{
    text-align: center;
    font-weight: 700;
    margin-top: 8px;
    line-height: 1.6;
}

.server-info span{
    font-weight: 900;
}
`;

document.head.appendChild(centerStyle);

const style = document.createElement("style");

style.innerHTML = `
.pair-btn{
    position: relative;
    display: block;
    width: 100%;
    padding: 14px;
    border-radius: 14px;
    background: #ffffff;
    color: #000;
    font-weight: 900;
    text-align: center;
    text-decoration: none;
    overflow: hidden;
    z-index: 1;
}

.pair-btn::before{
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 16px;
    background: linear-gradient(
        90deg,
        #00ffff,
        #ff00ff,
        #00ffff
    );
    background-size: 300%;
    animation: rgbMove 3s linear infinite;
    z-index: -1;
}

@keyframes rgbMove{
    0%{ background-position:0% }
    100%{ background-position:300% }
    }
`;

document.head.appendChild(style);

// ===== FULL RGB SERVER STYLE BLOCK =====
const style2 = document.createElement("style");

style2.innerHTML = `

/* SERVER TITLE */
.server-name{
  text-align: center;
  font-size: 22px;
  font-weight: 900;
  margin: 8px 0;
}

/* USING + STATUS CENTER */
.center-info{
  text-align: center;
  font-weight: 700;
  margin-top: 6px;
}

/* RGB BRACKETS */
.rgb-bracket{
  font-weight: 900;
  font-size: 26px;
  padding: 0 6px;

  background: linear-gradient(
    90deg,
    #00ffff,
    #ff00ff,
    #00ffff
  );

  background-size: 300%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  animation: rgbMove 3s linear infinite;
}

/* RGB BAR STYLE */
.rgb-bar{
  height: 4px;
  width: 100%;
  border-radius: 10px;

  background: linear-gradient(
    90deg,
    #ff0000,
    #ff8800,
    #ffff00,
    #00ff00,
    #00ffff,
    #0000ff,
    #ff00ff,
    #ff0000
  );

  background-size: 400%;
  margin: 6px 0;
}

/* TOP RGB → LEFT move */
.server-box .rgb-bar:first-child{
  animation: rgbLeft 3s linear infinite;
}

/* BOTTOM RGB → RIGHT move */
.server-box .rgb-bar:last-child{
  animation: rgbRight 3s linear infinite;
}

/* ANIMATIONS */
@keyframes rgbMove{
  0%{ background-position: 0% }
  100%{ background-position: 300% }
}

@keyframes rgbRight{
  0%{ background-position: 0% }
  100%{ background-position: 300% }
}

@keyframes rgbLeft{
  0%{ background-position: 300% }
  100%{ background-position: 0% }
}

`;

document.head.appendChild(style2);

// ===== SERVER LIST =====
const servers = [
    { name:"Server 1", url:"https://rjuxmini-aeee02c7e2b9.herokuapp.com" },
    { name:"Server 2", url:"https://rjumini-e5652e891766.herokuapp.com" },
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

function formatLiveUptime(sec){

    const s = Math.floor(sec % 60);
    const m = Math.floor(sec / 60) % 60;
    const h = Math.floor(sec / 3600) % 24;
    const d = Math.floor(sec / 86400);

    return `${d}d ${h}h ${m}m ${s}s`;
}

// ===== LOAD SERVERS =====

async function loadServers(){

    const area = document.getElementById("serverArea");
    if(!area) return;

    if(area.innerHTML === ""){

        for(let i = 1; i <= servers.length; i++){

            let srv = servers[i-1];

            area.innerHTML += `
<div class="server-box">

    <div class="rgb-bar"></div>

    <div class="server-name">
        <span class="rgb-bracket">[</span>
       𝗕𝗜𝗟𝗔𝗟-𝗠𝗗 𝗦𝗘𝗥𝗩𝗘𝗥 ${fancyNum(i)}
        <span class="rgb-bracket">]</span>
    </div>

    <div class="rgb-bar"></div>

    <div class="server-info">

LIMIT : 
<span id="l${i}">5</span><br>

USERS : 
<span id="u${i}">--</span><br>
    Remaining:
    <span id="r${i}">--</span><br>

    STATUS : 
    <span id="s${i}" class="stopped">LOADING</span>
    

    UPTIME : 
    <span id="up${i}">--</span><br>

</div>

    <button class="pair-btn"
        data-url="${srv.url}"
        onclick="pairClick(this)">
      𝗣𝗔𝗜𝗥 𝗕𝗢𝗧 𝗪𝗜𝗧𝗛 𝗦𝗘𝗥𝗩𝗘𝗥 ${fancyNum(i)}
    </button>

    <div class="rgb-bar"></div>

</div>`;
        }
    }

 for (let i = 1; i <= servers.length; i++) {

    let srv = servers[i-1];

    let users = 0;
    let limit = 5;
    let remaining = 0;
    let serverUptime = 0;

    let status = "Stopped";
    let cls = "stopped";

    try {

        const r = await fetch(srv.url + "/status");

        if (!r.ok) throw new Error();

        const d = await r.json();

        users = Number(d.totalActive || 0);
        limit = Number(d.limit || 5);
        remaining = Number(d.available || (limit - users));
        serverUptime = Number(d.uptime || 0);

        if (users >= limit) {
            status = "Active / Full";
            cls = "active";
        } else {
            status = "Active";
            cls = "active";
        }

    } catch {

        status = "Stopped";
        cls = "stopped";

    }

    // ===== UI UPDATE =====

    const u = document.getElementById("u" + i);
    const l = document.getElementById("l" + i);
    const rEl = document.getElementById("r" + i);
    const up = document.getElementById("up" + i);
    const s = document.getElementById("s" + i);

    if (u) u.innerText = users;
    if (l) l.innerText = limit;
    if (rEl) rEl.innerText = remaining;
    if (up){

    // old timer band karo
    if(up._timer) clearInterval(up._timer);

    let live = serverUptime;

    up.innerText = formatLiveUptime(live);

    // live counter start
    up._timer = setInterval(()=>{
        live++;
        up.innerText = formatLiveUptime(live);
    },1000);
}

    if (s) {
        s.innerText = status;
        s.className = cls;
    }
}
}
// first load
loadServers();

// auto refresh
setInterval(loadServers, 15000);
async function pairClick(btn) {
    
    const url = btn.dataset.url.replace(/\/$/, "");

    try {

        const r = await fetch(url + "/status");

        if (!r.ok) throw new Error();

        const d = await r.json();

const users = Number(d.totalActive || 0);
const limit = Number(d.limit || 5);

if (users >= limit) {
    alert("🚫 Server FULL!");
    return;
}
        
        // open pair page
        window.location.href = url + "/pair";

    } catch (err) {

        console.log("FETCH ERROR:", err);
        alert("⚠ Server not responding");

    }
}
