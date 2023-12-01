let rand = Math.floor(Math.random() * 20) + 1;
document.getElementById("logo").src = "https://cdn.glitch.me/a65741ca-e4a3-4b9c-9f87-1568672f0160/dmoon-" + rand + ".png";
document.getElementById("num").innerHTML = "Number #" + rand;

let h1M = document.getElementById("moon_h1");
let imgM = document.getElementById("moon_img");
let descM = document.getElementById("moon_desc");
let extM = document.getElementById("moon_ext")
let mID = document.getElementById("moon");


fetch("/assets/json/moons.json")
    .then((res) => res.json())
    .then((data) => {
        moon = data;
        for (let i = 0; i < moon.length; i++) {
            let li = document.createElement("option");
            li.innerHTML = "#" + moon[i].num + " " + moon[i].name;
            li.value = i;
            mID.appendChild(li);
        }
        change();
    })

function change() {
    let val = mID.value;
    console.log(val);
    h1M.innerHTML = "#" + moon[val].num + " " + moon[val].name;
    imgM.src = "https://cdn.glitch.me/a65741ca-e4a3-4b9c-9f87-1568672f0160/dmoon-" + moon[val].num + ".png";
    descM.innerHTML = moon[val].desc;
    if (moon[val].c == "true") {
        extM.innerText = "Primary Color: #" + moon[val].c1 + " \nSecondary Color: #" + moon[val].c2 + "\nBorder Color: #" + moon[val].c3;
    } else if (moon[val].c == "false") {
        extM.innerText = "";
        extM.innerHTML += '<img src="' + moon[val].img + '">';
        extM.innerHTML += "<p>" + moon[val].img + "</p>";
        extM.innerHTML += "<h3>" + moon[val].desc2 + "</h3>";
    }
}

