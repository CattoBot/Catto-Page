var user

window.onload = async () => {
  try {
    console.groupCollapsed("⚠️ Iniciando página")
    await myDB.initDB("database")
    await refreshData()
    user = new User()
    randomFlag()
    document.getElementById("langLatamSpanish").addEventListener("mouseenter", randomFlag)
  } catch (e) {
    console.error(e)
  } finally {
    loader.disable()
    info()
    console.groupEnd()
  }
}

function randomFlag() {
  flag = ["ar","cl","co","cr","do","ec","gt","hn","ht","mx","ni","pa","pe","py","uy","ve"]
  rand = Math.floor(Math.random()*flag.length)
  document.getElementById("flagLatamSpanish").src = `./images/flags/es_${flag[rand]}.png`
}

function info() {
  console.groupCollapsed("#️⃣ Info")
  console.log("©2024 Catto Dev Team\n\nDesarrollado por:\n  gacarbla - https://github.com/gacarbla")
  console.groupEnd()
  return "Poto"
}