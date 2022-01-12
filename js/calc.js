function calc(dt) {
    player.spacetime = player.spacetime.add(tmp.stGain.mul(dt))
    player.uniTime = player.uniTime.max(tmp.calcUniTime)

    player.inflation = player.inflation.mul(tmp.inflationGain.pow(dt))

    if (player.uniTime.gte(STORY.progress[player.story+1]||E(1/0))) player.story++
    if (player.story > 1) for (let x = 0; x < 3; x++) if (player.susy.times > x) player.susy.powers[x] =player.susy.powers[x].add(tmp.susy.powerGain[x].mul(dt))
    if (player.uniTime.gte(1e-21)) player.fabricTime = player.fabricTime.add(tmp.ftGain.mul(dt))
    if (hasUpg("ft",3)) player.susy.particles = player.susy.particles.add(tmp.susy.resetGain.mul(dt/10))
}