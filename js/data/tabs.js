function changeTab(x, stab=false) {
    if (!stab) tmp.tab = x
    else tmp.stab[tmp.tab] = x
}

const TABS = [
    {title: "Main", group:[
        {title: "Spacetime"},
        {title: "Inflation", unl() { return player.story>=1 }},
        {title: "Fabric Time", unl() { return player.story>=3 }},
    ]},
    {title: "Supersymmetry", unl() { return player.story>=2 }},
    {title: "Quarks", unl() { return player.story>=4 }, over: `You have <h2 id="quarkAmt">0</h2> quarks`, group: [
        {title: "Rewards"},
        {title: "Upgrades"},
        {title: "Atoms", unl() { return player.story>=5 }},
    ]},
    {title: "Options"},
]

el.setup.tabs = _=>{
    let table = new Element("tabs_table")
    let inner = ""
    let table2 = new Element("stabs_table")
    let inner2 = ""
    let table3 = new Element("over_stabs_table")
    let inner3 = ""

    for (let x = 0; x < TABS.length; x++) {
        inner += `
        <button onclick="changeTab(${x})" id="tab_${x}" class="tab_btn ${TABS[x].style||""}" style="display: block">${TABS[x].title}</button>
        `
        if (TABS[x].over) inner3 += `<div id="over_stabs_${x}">${TABS[x].over}</div>`
        if (TABS[x].group) {
            inner2 += `<div id="stabs_${x}">`
            for (let y = 0; y < TABS[x].group.length; y++) inner2 += `
            <button onclick="changeTab(${y}, true)" id="stab_${x}_${y}" class="tab_btn stab_btn ${TABS[x].group[y].style||""}">${TABS[x].group[y].title}</button>
            `
            inner2 += "</div>"
        }
    }

    table.setHTML(inner)
    table2.setHTML(inner2)
    table3.setHTML(inner3)
}

el.update.tabs = _=>{
    for (let x = 0; x < TABS.length; x++) {
        tmp.el["tab_"+x].setDisplay(TABS[x].unl?TABS[x].unl():true)
        if (tmp.el["tab_div_"+x]) tmp.el["tab_div_"+x].setDisplay(tmp.tab == x)
        if (tmp.el["stabs_"+x]) tmp.el["stabs_"+x].setDisplay(tmp.tab == x)
    if (tmp.el["over_stabs_"+x]) tmp.el["over_stabs_"+x].setDisplay(tmp.tab == x)
        if (TABS[x].group && tmp.tab == x) {
            for (let y = 0; y < TABS[x].group.length; y++) {
                tmp.el["stab_"+x+"_"+y].setDisplay(TABS[x].group[y].unl?TABS[x].group[y].unl():true)
                if (tmp.el["stab_div_"+x+"_"+y]) tmp.el["stab_div_"+x+"_"+y].setDisplay(tmp.stab[x] == y)
            }
        }
    }
};