function requireJSON(url, canonical) {
  return new Promise(async resolve => {
    var response = await fetch(`${canonical ? `${window.location.href.split("/")[0]}//${window.location.href.split("/")[2]}/${url}` : `${url}`}`);
    const json = await response.json();
    resolve(json)
  })
}

function refreshData() {
  return new Promise(async (resolve, reject) => {
    data_proyects = await myDB.getAllItems("proyects")
    data_embeds = await myDB.getAllItems("embeds")
    resolve()
  })
}

function nextStartPage() {
  document.getElementById("q1").classList.remove("active")
  document.getElementById("noDevMode").addEventListener("click", function () {
    Config.devMode = false
    finishStartPages()
  })
  document.getElementById("yesDevMode").addEventListener("click", function () {
    Config.devMode = true
    finishStartPages()
  })
  document.getElementById("q2").classList.add("active")
}

function finishStartPages() {
  document.getElementById("generalSettings").outerHTML = ""
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}