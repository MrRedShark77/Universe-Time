var tmp = {
    stGain: E(0),
    stSoftcaps: 0,
    calcUniTime: E(0),
    tab: 0,
    stab: [0],
    story_percent: 0,
    upgs_eff: {
        st: [],
        inf: [],
        ft: [],
    },
    susy: {
        powerGain: [],
        powerEff: [],
    },
    fabricTime: E(0),
}

var tmp_update = []

function updateTemp() {
    for (let x = 0; x < tmp_update.length; x++) tmp_update[x]()
}