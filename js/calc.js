function calc(dt) {
    if (tmp.ended) {
        tmp.endTime += dt
    }
    if (tmp.open) tmp.time += dt
    if (tmp.ended) return
    player.time += dt

    player.spacetime = player.spacetime.add(tmp.stGain.mul(dt))
    player.uniTime = player.uniTime.max(tmp.calcUniTime)

    player.inflation = player.inflation.mul(tmp.inflationGain.pow(dt))

    if (player.uniTime.gte(STORY.progress[player.story+1]||E(1/0)) && player.story < 6) player.story++
    if (player.story > 1) for (let x = 0; x < 4; x++) if (x!=3?player.susy.times > x:player.story>=5) player.susy.powers[x] =player.susy.powers[x].add(tmp.susy.powerGain[x].mul(dt))
    if (player.story>=3) player.fabricTime = player.fabricTime.add(tmp.ftGain.mul(dt))
    if (player.story>=4) player.quarks = player.quarks.add(tmp.quarks.gain.mul(dt))
    if (player.story>=5) player.atoms = player.atoms.add(tmp.quarks.atomGain.mul(dt))
    if (hasUpg("ft",3)) player.susy.particles = player.susy.particles.add(tmp.susy.resetGain.mul(dt/10))
}