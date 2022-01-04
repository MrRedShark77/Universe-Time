function calc(dt) {
    player.spacetime = player.spacetime.add(tmp.stGain.mul(dt))
    player.uniTime = player.uniTime.max(tmp.calcUniTime)

    player.inflation = player.inflation.mul(tmp.inflationGain.pow(dt))

    if (player.uniTime.gte(STORY.progress[player.story+1]||E(1/0))) player.story++
    if (player.story > 1) for (let x = 0; x < 3; x++) if (player.susy.times > x) player.susy.powers[x] =player.susy.powers[x].add(tmp.susy.powerGain[x].mul(dt))
}