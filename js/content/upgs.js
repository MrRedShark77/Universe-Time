const UPGS = {
    st: {
        res: "Spacetime",
        id: "st",
        canBuy(x) {
            return player.spacetime.gte(this.ctn[x].cost)
        },
        buy(x) {
            if (this.canBuy(x) && !player.upgs[this.id].includes(x)) {
                player.spacetime = player.spacetime.sub(this.ctn[x].cost)
                player.upgs[this.id].push(x)
            }
        },
        ctn: [
            {
                desc: `Start to generate spacetime each time.`,
                cost: E(0),
            },{
                desc: `Spacetime boost its gain.`,
                cost: E(15),
                effect() {
                    let x = player.spacetime.add(1).root(4).softcap(1e5,0.5,0)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                desc: `Gain 20x more Spacetime.`,
                cost: E(300),
            },{
                unl() { return player.story >= 1 },
                desc: `Spacetime adds to Inflation growth's base.`,
                cost: E(1e5),
                effect() {
                    let x = player.spacetime.add(1).log10().pow(0.75).div(2)
                    return x
                },
                effDesc(x) { return "+"+format(x)+"x" },
            },{
                unl() { return player.story >= 1 },
                desc: `Inflation adds its base at a reduced rate. The inflation effect is raised by 2`,
                cost: E(1e6),
                effect() {
                    let x = player.inflation.add(1).log10().pow(2/3).div(20)
                    return x
                },
                effDesc(x) { return "+"+format(x)+"x" },
            },{
                unl() { return player.story >= 1 },
                desc: `Universe time formula is multiplied by spacetime.`,
                cost: E(1e8),
                effect() {
                    let x = player.spacetime.add(1).log10().add(1).pow(2)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story >= 2 && player.susy.times > 1 },
                desc: `Raise Inflation's effect based on Slepton.`,
                cost: E(1e11),
                effect() {
                    let x = player.susy.powers[1].add(1).log10().add(1).root(6)
                    if (hasUpg("ft",4)) x = x.pow(2)
                    return x//.softcap(4,0.5,0)
                },
                effDesc(x) { return "^"+format(x) },
            },{
                unl() { return player.story >= 2 && player.susy.times > 2 },
                desc: `Universe time boost Supersymmetry particles gain.`,
                cost: E(1e16),
                effect() {
                    let x = player.uniTime.mul(1e44).add(1).log10().root(1.5)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story>=3 },
                desc: `The fabric of time gain's exponent is increased by 2.`,
                cost: E(1e60),
            },{
                unl() { return hasUpg("st",9) },
                desc: `haha you found a secret before quark version<br><img src="images/hidden1.png">`,
                cost: E(1/0),
            },{
                unl() { return player.story >= 4 },
                desc: `Gain more quarks based on spacetime.`,
                cost: E('e8100'),
                effect() {
                    let x = player.spacetime.add(1).log10().add(1).pow(0.8)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story >= 5 },
                desc: `Gain more atoms based on spacetime.`,
                cost: E('e37000'),
                effect() {
                    let x = player.spacetime.add(1).log10().add(1).pow(0.75)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story>=6 },
                desc: `Neutrons are 10% stronger.`,
                cost: E('e111111'),
            },
        ],
    },
    inf: {
        res: "Inflation",
        id: "inf",
        canBuy(x) {
            return player.inflation.gte(this.ctn[x].cost)
        },
        buy(x) {
            if (this.canBuy(x) && !player.upgs[this.id].includes(x)) {
                player.inflation = player.inflation.div(this.ctn[x].cost)
                player.upgs[this.id].push(x)
            }
        },
        ctn: [
            {
                unl() { return player.susy.times > 1 },
                desc: `Universe time boost spacetime gain at a reduced rate.`,
                cost: E("e3600"),
                effect() {
                    let x = player.uniTime.mul(1e44).add(1).log10().add(1).pow(1.25)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.susy.times > 1 },
                desc: `Keep ^0.5 of Inflation gained on reset.`,
                cost: E("e7200"),
            },{
                unl() { return player.susy.times > 1 },
                desc: `Universe time's formula softcap is weaker based on Inflation.`,
                cost: E("e1e7"),
                effect() {
                    let x = E(0.9).pow(player.inflation.log10().add(1).log10().root(2)).toNumber();
                    return x
                },
                effDesc(x) { return format((1-x)*100)+"% weaker" },
            },{
                unl() { return player.story>=3 },
                desc: `Inflation boost the fabric of time gain.`,
                cost: E("ee16"),
                effect() {
                    let x = player.inflation.log10().add(1).root(4)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story >= 6 },
                desc: `Protons are 25% stronger.`,
                cost: E("ee460"),
            },
        ],
    },
    ft: {
        res: "Fabric of time",
        id: "ft",
        canBuy(x) {
            return player.fabricTime.gte(this.ctn[x].cost)
        },
        buy(x) {
            if (this.canBuy(x) && !player.upgs[this.id].includes(x)) {
                player.fabricTime = player.fabricTime.sub(this.ctn[x].cost)
                player.upgs[this.id].push(x)
            }
        },
        ctn: [
            {
                desc: `Gain more spacetime based on the fabric of time.`,
                cost: E(50),
                effect() {
                    let x = player.fabricTime.add(1).pow(0.75)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                desc: `Gain more fabric of time based on supersymmetry particles.`,
                cost: E(100),
                effect() {
                    let x = player.susy.particles.add(1).log10().add(1).pow(1.5)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                desc: `Supersymmetry's effect exponent is increased based on the fabric of time.`,
                cost: E(1000),
                effect() {
                    let x = player.fabricTime.add(1).log10().root(3)
                    return x
                },
                effDesc(x) { return "^2 → ^"+format(x.add(2)) },
            },{
                desc: `Gain 10% of Supersymmetry particles gained on reset.`,
                cost: E(10000),
            },{
                desc: `Spacetime Upgrade 7 is twice as effective.`,
                cost: E(1e6),
            },{
                desc: `Raise Spacetime & Supersymmetry particles gains to the 1.1th power.`,
                cost: E(1e11),
            },{
                unl() { return player.story >= 4 },
                desc: `Reward's requirement is cheaper based on the fabric of time.`,
                cost: E(1e38),
                effect() {
                    let x = E(1.01).pow(player.fabricTime.add(1).log10().root(2))
                    return x
                },
                effDesc(x) { return format(x)+"x cheaper" },
            },{
                unl() { return player.story >= 4 },
                desc: `Raise Quarks gain to the 1.025th power.`,
                cost: E(1e100),
            },
        ],
    },
    qu: {
        res: "Quarks",
        id: "qu",
        canBuy(x) {
            return player.quarks.gte(this.ctn[x].cost)
        },
        buy(x) {
            if (this.canBuy(x) && !player.upgs[this.id].includes(x)) {
                player.quarks = player.quarks.sub(this.ctn[x].cost)
                player.upgs[this.id].push(x)
            }
        },
        ctn: [
            {
                desc: `Gain more quarks based on Inflation.`,
                cost: E(300),
                effect() {
                    let x = player.inflation.add(1).log10().add(1).log10().add(1)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                desc: `Triple quarks gain for each upgrade bought.`,
                cost: E(5e4),
                effect() {
                    let x = E(3).pow(player.upgs.qu.length)
                    return x
                },
            },{
                desc: `Gain more quarks based on supersymmetry particles.`,
                cost: E(2.5e7),
                effect() {
                    let x = player.susy.particles.add(1).log10().add(1)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                desc: `Raise inflation's exponent to the 1.1th power.`,
                cost: E(1e18),
            },{
                desc: `Speed inflation growth based on rewards.`,
                cost: E(1e38),
                effect() {
                    let x = E(1.25).pow(player.rewards)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story >= 5 },
                desc: `Gain more atoms based on Universe Time.`,
                cost: E(1e54),
                effect() {
                    let x = player.uniTime.mul(1e44).add(1).root(15)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story >= 5 },
                desc: `Gain more atoms based on quarks.`,
                cost: E(1e100),
                effect() {
                    let x = player.quarks.add(1).log10().add(1).pow(2)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },
        ],
    },
    at: {
        res: "Atoms",
        id: "at",
        canBuy(x) {
            return player.atoms.gte(this.ctn[x].cost)
        },
        buy(x) {
            if (this.canBuy(x) && !player.upgs[this.id].includes(x)) {
                player.atoms = player.atoms.sub(this.ctn[x].cost)
                player.upgs[this.id].push(x)
            }
        },
        ctn: [
            {
                desc: `Gain more quarks based on atoms.`,
                cost: E(3e4),
                effect() {
                    let x = player.atoms.add(1).root(3)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                desc: `Spacetime gain softcap is weaker based on atoms.`,
                cost: E(2e8),
                effect() {
                    let x = E(0.9).pow(player.atoms.add(1).log10().root(2))
                    return x.toNumber()
                },
                effDesc(x) { return format((1-x)*100)+"% weaker" },
            },{
                desc: `Raise the fabric of time to the 1.1th power.`,
                cost: E(1e13),
            },{
                unl() { return player.story >= 6 },
                desc: `Electrons are 2.5% stronger.`,
                cost: E(1e19),
            },
        ],
    },
    /*
    inf: {
        res: "Inflation",
        id: "inf",
        canBuy(x) {
            return player.inflation.gte(this.ctn[x].cost)
        },
        buy(x) {
            if (this.canBuy(x) && !player.upgs[this.id].includes(x)) {
                player.inflation = player.inflation.sub(this.ctn[x].cost)
                player.upgs[this.id].push(x)
            }
        },
        ctn: [

        ],
    },
    /*
    {
        desc: `Placeholder.`,
        cost: E(1/0),
        effect() {
            let x = E(1)
            return x
        },
        effDesc(x) { return format(x)+"x" },
    },
    */
}

function hasUpg(x,c) { return player.upgs[x].includes(c) }

function updateUpgsHTML(x) {
    let us = UPGS[x]
    for (let c = 0; c < us.ctn.length; c++) {
        let u = us.ctn[c]
        let unl = u.unl?u.unl():true
        let id = `upg_${x}_${c}`

        tmp.el[id+"_div"].setDisplay(unl)
        if (unl) {
            tmp.el[id+"_div"].setClasses({upg_btn: true, locked: !us.canBuy(c) && !player.upgs[x].includes(c), bought: player.upgs[x].includes(c)})
            tmp.el[id+"_cost"].setTxt(format(u.cost,0))
            if (u.effDesc) tmp.el[id+"_eff"].setHTML(u.effDesc(tmp.upgs_eff[x][c]))
        }
    }
}

el.update.upgs = _=>{
    if (tmp.tab == 0) {
        if (tmp.stab[0] == 0) updateUpgsHTML("st")
        if (tmp.stab[0] == 1) updateUpgsHTML("inf")
        if (tmp.stab[0] == 2) updateUpgsHTML("ft")
    }
    if (tmp.tab == 2) {
        if (tmp.stab[2] == 1) updateUpgsHTML("qu")
        if (tmp.stab[2] == 2) updateUpgsHTML("at")
    }
}

el.setup.upgs = _=>{
    for (let x in UPGS) {
        let table = new Element('upgs_'+x+"_table")
        if (table.el) {
            let us = UPGS[x]
            let inner = ""
            for (let c = 0; c < us.ctn.length; c++) {
                let u = us.ctn[c]
                let id = `upg_${x}_${c}`
                inner += `
                <button class="upg_btn" id="${id}_div" onclick="UPGS.${x}.buy(${c})">
                    ${u.desc}<br>
                    ${u.effDesc?`Currently: <span id="${id}_eff">???</span><br>`:""}
                    Cost: <span id="${id}_cost">???</span> ${us.res}
                </button>
                `
            }
            table.setHTML(inner)
        }
    }
}

tmp_update.push(_=>{
    for (let x in UPGS) {
        let us = UPGS[x]
        for (let c = 0; c < us.ctn.length; c++) {
            let u = us.ctn[c]
            if (u.effect) tmp.upgs_eff[x][c] = u.effect()
        }
    }
})