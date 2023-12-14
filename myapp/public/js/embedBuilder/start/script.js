var user

window.onload = async () => {
  try {
    await myDB.initDB("database")
    await refreshData()
    user = new User()
    randomFlag()
    document.getElementById("langLatamSpanish").addEventListener("mouseenter", randomFlag)
  } catch (e) {
    console.error(e)
  } finally {
    loader.disable()
  }
}

function randomFlag() {
  flag = ["ar","cl","co","cr","do","ec","gt","hn","ht","mx","ni","pa","pe","py","uy","ve"]
  rand = Math.floor(Math.random()*flag.length)
  document.getElementById("flagLatamSpanish").src = `./images/flags/es_${flag[rand]}.png`
}