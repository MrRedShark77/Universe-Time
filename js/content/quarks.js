const QUARKS = {
    gain() {
        let x = E(1).mul(tmp.quarks.effs[2])
        if (hasUpg("qu",0)) x = x.mul(tmp.upgs_eff.qu[0])
        if (hasUpg("qu",1)) x = x.mul(tmp.upgs_eff.qu[1])
        if (hasUpg("qu",2)) x = x.mul(tmp.upgs_eff.qu[2])
        if (hasUpg("st",10)) x = x.mul(tmp.upgs_eff.st[10])
        if (hasUpg("at",0)) x = x.mul(tmp.upgs_eff.at[0])

        if (hasUpg("ft",7)) x = x.pow(1.025)
        return x
    },
    getFT() {
        let x = E(1)
        if (hasUpg("ft",6)) x = x.mul(tmp.upgs_eff.ft[6]||1)
        return x
    },
    calcRewards() {
        if (player.quarks.lt(10)) return E(0)
        let x = player.quarks.div(10).max(1).log2().max(0).root(1.25).mul(tmp.quarks.ft).add(1)
        return x.floor()
    },
    nextReward() {
        let x = E(2).pow(player.rewards.div(tmp.quarks.ft).pow(1.25)).mul(10)
        return x
    },
    effects(i) {
        let q = player.quarks
        let r = tmp.quarks.types[i]
        if (hasUpg("inf",4) && i == 0) r = r.mul(1.25)
        if (hasUpg("st",12) && i == 1) r = r.mul(1.1)
        if (hasUpg("at",3) && i == 2) r = r.mul(1.025)
        let x = E(1)
        if (i == 0) {
            x = q.add(1).pow(r.mul(1/6)).softcap(1e10,0.5,2)
        }
        if (i == 1) {
            x = expMult(q.add(1),r.softcap(35,0.5,0).root(2)).div(10).softcap(1e100,0.5,2).softcap('e15000',0.75,2).softcap('e45000',0.75,2)
        }
        if (i == 2) {
            x = q.max(1).log10().add(1).pow(r)
        }
        return x
    },
    atomGain() {
        let x = E(1.1).pow(player.rewards)
        if (hasUpg("qu",5)) x = x.mul(tmp.upgs_eff.qu[5])
        if (hasUpg("qu",6)) x = x.mul(tmp.upgs_eff.qu[6])
        if (hasUpg("st",11)) x = x.mul(tmp.upgs_eff.st[11])
        return x
    },
}

tmp_update.push(_=>{
    tmp.quarks.atomGain = QUARKS.atomGain()

    tmp.quarks.ft = QUARKS.getFT()
    player.rewards = player.rewards.max(QUARKS.calcRewards())
    tmp.quarks.nextReward = QUARKS.nextReward()
    tmp.quarks.types = [player.rewards.add(2).div(3).floor(),player.rewards.add(1).div(3).floor(),player.rewards.div(3).floor()]
    for (let x = 0; x < 3; x++) tmp.quarks.effs[x] = QUARKS.effects(x)
    tmp.quarks.gain = QUARKS.gain()
})

el.update.quarks = _=>{
    if (tmp.tab == 2) {
        tmp.el.quarkAmt.setTxt(format(player.quarks,1)+" "+formatGain(player.quarks,tmp.quarks.gain))
        if (tmp.stab[2] == 0) {
            tmp.el.rewards.setTxt(format(player.rewards,0))
            tmp.el.next_rewards.setTxt(format(tmp.quarks.nextReward,1))

            for (let x = 0; x < 3; x++) {
                tmp.el['reward'+x].setTxt(format(tmp.quarks.types[x],0))
                tmp.el['rewardEff'+x].setTxt(format(tmp.quarks.effs[x],1))
            }
        }
        if (tmp.stab[2] == 2) {
            tmp.el.atoms.setTxt(format(player.atoms,1)+" "+formatGain(player.atoms,tmp.quarks.atomGain))
        }
    }
}