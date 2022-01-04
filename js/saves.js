function E(x){return new Decimal(x)};

Decimal.prototype.softcap = function (start, power, mode) {
    var x = E(this)
    if (x.gte(start)) {
        if ([0, "pow"].includes(mode)) x = x.div(start).pow(power).mul(start)
        if ([1, "mul"].includes(mode)) x = x.sub(start).div(power).add(start)
        if ([2, "exp"].includes(mode)) x = expMult(x.div(start), power).mul(start)
    }
    return x
}

function expMult(a,b,base=10) { return E(a).gte(1) ? E(base).pow(E(a).log(base).pow(b)) : E(0) }

function getPlayerData() {
    let x = {
        spacetime: E(0),
        uniTime: E(0),
        story: 0,
        upgs: {
            st: [],
        },
        inflation: E(1),
        susy: {
            particles: E(0),
            powers: [E(0),E(0),E(0)],
            times: 0,
        }
    }
    return x
}

function wipe() {
    player = getPlayerData()
}

function loadPlayer(load) {
    const DATA = getPlayerData()
    player = deepNaN(load, DATA)
    player = deepUndefinedAndDecimal(player, DATA)
}

function deepNaN(obj, data) {
    for (let x = 0; x < Object.keys(obj).length; x++) {
        let k = Object.keys(obj)[x]
        if (typeof obj[k] == 'string') {
            if ((obj[k] == "NaNeNaN" || obj[k] == null) && Object.getPrototypeOf(data[k]).constructor.name == "Decimal") obj[k] = data[k]
        } else {
            if (typeof obj[k] != 'object' && isNaN(obj[k])) obj[k] = data[k]
            if (typeof obj[k] == 'object' && data[k] && obj[k] != null) obj[k] = deepNaN(obj[k], data[k])
        }
    }
    return obj
}

function deepUndefinedAndDecimal(obj, data) {
    if (obj == null) return data
    for (let x = 0; x < Object.keys(data).length; x++) {
        let k = Object.keys(data)[x]
        if (obj[k] === null) continue
        if (obj[k] === undefined) obj[k] = data[k]
        else {
            if (Object.getPrototypeOf(data[k]).constructor.name == "Decimal") obj[k] = E(obj[k])
            else if (typeof obj[k] == 'object') deepUndefinedAndDecimal(obj[k], data[k])
        }
    }
    return obj
}

function save(){
    if (localStorage.getItem("universeTimeSave") == '') wipe()
    localStorage.setItem("universeTimeSave",btoa(JSON.stringify(player)))
}

function load(x){
    if(typeof x == "string" & x != ''){
        loadPlayer(JSON.parse(atob(x)))
    } else {
        wipe()
    }
}

function exporty() {
    save();
    let file = new Blob([btoa(JSON.stringify(player))], {type: "text/plain"})
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(file)
    a.download = "Test Save.txt"
    a.click()
}

function importy() {
    let loadgame = prompt("Paste in your save WARNING: WILL OVERWRITE YOUR CURRENT SAVE")
    if (loadgame != null) {
        let keep = player
        try {
            wipe()
            JSON.parse(atob(loadgame))
            load(loadgame)
            save()
            location.reload()
        } catch (error) {
            
        }
        player = keep
    }
}

function export_copy() {
    let copyText = document.getElementById('copy')
    copyText.value = btoa(JSON.stringify(player))
    copyText.style.visibility = "visible"
    copyText.select();
    document.execCommand("copy");
    copyText.style.visibility = "hidden"
}

function loadGame() {
    wipe()
    load(localStorage.getItem("universeTimeSave"))
    updateTemp()
    setupHTML()
    setInterval(save,60000)
    setInterval(loop, 50)
}