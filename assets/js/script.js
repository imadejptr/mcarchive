let rand = Math.floor(Math.random() * 20) + 1;
document.getElementById("logo").src = "https://cdn.glitch.me/a65741ca-e4a3-4b9c-9f87-1568672f0160/dmoon-" + rand + ".png";
document.getElementById("num").innerHTML = "Number #" + rand;


function recent() {
    let dates = '{ "dates" : [' +
        '{ "num":"1" , "date":"11/14/23" },' +
        '{ "num":"2" , "date":"11/15/23" },' +
        '{ "num":"3" , "date":"11/16/23" } ]}';
    let setad = JSON.parse(dates);
    let day = document.getElementById("day");
    let opt = document.createElement("option");
    let PUTNUMBERHERE = 3;
    opt.value = PUTNUMBERHERE;
    opt.innerHTML = setad.dates[PUTNUMBERHERE - 1].date + ' <span class="current">(current)</span>';
    opt.selected = true;
    day.appendChild(opt);
    poop();

    for (let i = 0; i < PUTNUMBERHERE; i++) {
        let rest = document.createElement("option");
        rest.value = i + 1;
        rest.innerHTML = setad.dates[i].date;
        day.appendChild(rest);
    }
}

window.onload = function () {
    recent();
};

function poop() {
    let e = document.getElementById("mclb");
    e.innerHTML = ""; // clear out old options 
    let day = document.getElementById("day").value;
    fetch("/assets/json/slope/" + day + ".json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            mclb(data);
        })
        .catch(function (err) {
            console.log("error: " + err);
        });

    function mclb(data) {
        document.getElementById("total").innerHTML = "Total amount particiapted: " + data.length;
        var mainContainer = document.getElementById("mclb");
        data.sort(function (a, b) {
            return b.score - a.score
        })
        for (var i = 0; i <= data.length; i++) {
            if (data[i].img == "0") {
                let rand = Math.floor(Math.random() * 20) + 1;
                var div = document.createElement("li");
                div.className = "mclb-list";
                div.innerHTML = '<img src="https://cdn.glitch.me/a65741ca-e4a3-4b9c-9f87-1568672f0160/dmoon-' + rand + '.png"><span class="mcname">' + data[i].name + '</span><span class="score">' + data[i].score + "</span>";
                mainContainer.appendChild(div);
            } else {
                var div = document.createElement("li");
                div.className = "mclb-list";
                div.innerHTML = '<img src="https://cdn.glitch.me/a65741ca-e4a3-4b9c-9f87-1568672f0160/' + data[i].name + '-d' + data[i].img + "." + data[i].ext + '"><span class="mcname">' + data[i].name + '</span><span class="score">' + data[i].score + "</span>";
                mainContainer.appendChild(div);
            }
        }
    }
}
