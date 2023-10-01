const loader = {
  enable(text, clase) {
    text ? text : text = "Loading"
    document.getElementById("loadericonarea").classList.add("active")
    document.getElementById("loadingText").innerHTML = text
    document.getElementById("loadingText").className = clase
    this.active = true
  },
  disable() {
    document.getElementById("loadericonarea").classList.remove("active")
    this.active = false
  },
  active: false
}

function throwError(e, time) {
  return new Promise(async (resolve, reject) => {
    loader.enable("error", "error")
    if (e) console.error(e)
    if (!time || time > 0) {
      await sleep(time ? time : 3000)
      loader.disable()
    }
    resolve()
  })
}