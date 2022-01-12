const STORY = {
    eras: ["Time Begins","Inflation","Post-Inflation","Unknown"],
    progress: [E(0),E(1e-39),E(1e-32),E(1e-6),E(Infinity)],
}

function calcStoryPercent() {
    let s = STORY.progress[player.story].max(1e-43)
    let e = STORY.progress[player.story+1]||E(1/0)
    let len = e.div(s)
    let time = player.uniTime.div(s).max(1)

    return time.log10().div(len.log10().max(1)).max(0).min(1).toNumber()
}

tmp_update.push(_=>{
    tmp.story_percent = calcStoryPercent()
})

el.update.bar = _=>{
    tmp.el.barStart.setTxt(formatTime(STORY.progress[player.story]))
    tmp.el.barEnd.setTxt(formatTime(STORY.progress[player.story+1]||E(1/0)))

    tmp.el.era.setTxt(STORY.eras[player.story]+" Era")

    tmp.el.bar_progress.changeStyle("width",tmp.story_percent*100+"%")
}
