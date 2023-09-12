const loader = {
  principal: {
    enable() {
      document.getElementById("loader").classList.remove("invisible")
      this.active = true
    },
    disable() {
      document.getElementById("loader").classList.add("invisible")
      this.active = false
    },
    active: true
  },
  enable(text, clase) {
    text ? text : text = "Loading..."
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

async function throwError(e) {
  return new Promise(async (resolve, reject) => {
    loader.enable("error", "error")
    if (e) console.error(e)
    await Proyect.build()
    await sleep(3000)
    resolve()
  })
}