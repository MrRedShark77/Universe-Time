const QUARKS = {
    gain() {
        let x = E(1).mul(tmp.quarks.effs[2])
        return x
    },
    calcRewards() {
        if (player.quarks.lt(10)) return E(0)
        let x = player.quarks.div(10).max(1).log2().max(0).root(1.1).add(1)
        return x.floor()
    },
    nextReward() {
        let x = E(2).pow(tmp.quarks.rewards.pow(1.1)).mul(10)
        return x
    },
    effects(i) {
        let q = player.quarks
        let r = tmp.quarks.types[i]
        let x = E(1)
        if (i == 0) {
            x = q.add(1).pow(r.mul(1/4))
        }
        if (i == 1) {
            x = expMult(q.add(1),r.root(2)).div(10)
        }
        if (i == 2) {
            x = q.max(1).log10().add(1).pow(r)
        }
        return x
    },
}

tmp_update.push(_=>{
    tmp.quarks.rewards = QUARKS.calcRewards()
    tmp.quarks.nextReward = QUARKS.nextReward()
    tmp.quarks.types = [tmp.quarks.rewards.add(2).div(3).floor(),tmp.quarks.rewards.add(1).div(3).floor(),tmp.quarks.rewards.div(3).floor()]
    for (let x = 0; x < 3; x++) tmp.quarks.effs[x] = QUARKS.effects(x)
    tmp.quarks.gain = QUARKS.gain()
})

el.update.quarks = _=>{
    if (tmp.tab == 2) {
        tmp.el.quarkAmt.setTxt(format(player.quarks,1)+" "+formatGain(player.quarks,tmp.quarks.gain))
        if (tmp.stab[2] == 0) {
            tmp.el.rewards.setTxt(format(tmp.quarks.rewards,0))
            tmp.el.next_rewards.setTxt(format(tmp.quarks.nextReward,1))

            for (let x = 0; x < 3; x++) {
                tmp.el['reward'+x].setTxt(format(tmp.quarks.types[x],0))
                tmp.el['rewardEff'+x].setTxt(format(tmp.quarks.effs[x],1))
            }
        }
    }
}