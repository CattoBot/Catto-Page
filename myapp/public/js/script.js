window.onload = async () => {

  const sideMenu = {
    home: document.getElementById("homeItem"),
    tools: document.getElementById("toolsItem"),
    news: document.getElementById("newsItem"),
    terms: document.getElementById("termsItem"),
    policy: document.getElementById("policyItem")
  }
  const sideMenuArray = [
    document.getElementById("homeItem"),
    document.getElementById("toolsItem"),
    document.getElementById("newsItem"),
    document.getElementById("termsItem"),
    document.getElementById("policyItem")
  ]
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  var page = fragment.get('page') || "home"
  if (!sideMenu[page]) page = "home"
  document.querySelector(".item.active").classList.remove("active")
  sideMenu[page].classList.add("active")
  document.querySelector(".sideinfo > div.visible").classList.remove("visible")
  document.querySelector(`.sideinfo > .${page}`).classList.add("visible")
  const objectPage = document.getElementById(page + "Item")
  switch (sideMenuArray.indexOf(objectPage)) {
    case 0:
      document.getElementById("floatingElement").className = "first"
      break
    case 1:
      document.getElementById("floatingElement").className = "second"
      break
    case 2:
      document.getElementById("floatingElement").className = "third"
      break
    case 3:
      document.getElementById("floatingElement").className = "fourth"
      break
    case 4:
      document.getElementById("floatingElement").className = "fifth"
      break
  }
  if (page && fragment.get('pinned')) {
    const pinned = fragment.get('pinned')
    if (pinned == "true") {
      var old = document.querySelector(".fix")
      document.querySelector(".sideinfo > div.visible").classList.remove("visible")
      document.querySelector(`.sideinfo > .${page}`).classList.add("visible")
      page = sideMenu[page]
      if (old && (old == page)) {
        page.classList.toggle("fix")
      } else if (old) {
        old.classList.remove("fix")
        old.classList.remove("active")
        page.classList.add("fix")
        page.classList.add("active")
        switch (sideMenuArray.indexOf(page)) {
          case 0:
            document.getElementById("floatingElement").className = "first"
            break
          case 1:
            document.getElementById("floatingElement").className = "second"
            break
          case 2:
            document.getElementById("floatingElement").className = "third"
            break
          case 3:
            document.getElementById("floatingElement").className = "fourth"
            break
          case 4:
            document.getElementById("floatingElement").className = "fifth"
            break
        }
      } else {
        page.classList.add("fix")
      }
    }
  }

  sideMenuArray.forEach(page => {
    page.addEventListener("mouseover", function () {
      var fixed = document.querySelector(".fix")
      if (!fixed) {
        document.querySelector(".item.active").classList.remove("active")
        page.classList.add("active")
        document.querySelector(".sideinfo > div.visible").classList.remove("visible")
        document.querySelector(`.sideinfo > .${page.id.slice(0, page.id.length - 4)}`).classList.add("visible")
        switch (sideMenuArray.indexOf(page)) {
          case 0:
            document.getElementById("floatingElement").className = "first"
            break
          case 1:
            document.getElementById("floatingElement").className = "second"
            break
          case 2:
            document.getElementById("floatingElement").className = "third"
            break
          case 3:
            document.getElementById("floatingElement").className = "fourth"
            break
          case 4:
            document.getElementById("floatingElement").className = "fifth"
            break
        }
      }
    })
    page.addEventListener("click", function () {
      var old = document.querySelector(".fix")
      document.querySelector(".sideinfo > div.visible").classList.remove("visible")
      document.querySelector(`.sideinfo > .${page.id.slice(0, page.id.length - 4)}`).classList.add("visible")
      if (old && (old == page)) {
        page.classList.toggle("fix")
      } else if (old) {
        old.classList.remove("fix")
        old.classList.remove("active")
        page.classList.add("fix")
        page.classList.add("active")
        switch (sideMenuArray.indexOf(page)) {
          case 0:
            document.getElementById("floatingElement").className = "first"
            break
          case 1:
            document.getElementById("floatingElement").className = "second"
            break
          case 2:
            document.getElementById("floatingElement").className = "third"
            break
          case 3:
            document.getElementById("floatingElement").className = "fourth"
            break
          case 4:
            document.getElementById("floatingElement").className = "fifth"
            break
        }
      } else {
        page.classList.add("fix")
      }
    })
  })

  setInterval(function () {
    let einput = document.getElementById("emailinput")
    let econfirm = document.getElementById("emailconfirm")
    let einputv = document.getElementById("emailinput").value
    let econfirmv = document.getElementById("emailconfirm").value
    let errorText = document.getElementById("ErroFormText")
    if (!einputv || !econfirmv || einputv == "" || econfirmv == "" || !einputv.includes("@") || !econfirmv.includes("@") || !einputv.includes(".") || !econfirmv.includes(".")) {
      document.getElementById("send").classList.add("inactive")
      document.getElementById("send").disabled = true
      einput.classList.toggle("error", false)
      econfirm.classList.toggle("error", false)
      errorText.classList.add("hidden")
    } else {
      var einput_error = !validateEmail(einputv) || einputv != econfirmv
      var econfirm_error = !validateEmail(econfirmv) || einputv != econfirmv
      einput.classList.toggle("error", einput_error)
      econfirm.classList.toggle("error", econfirm_error)
      if (!validateEmail(einputv) || !validateEmail(econfirmv)) {
        errorText.innerHTML = "e-mail no válido"
        errorText.classList.remove("hidden")
      } else if (einputv != econfirmv) {
        errorText.innerHTML = "Los e-mail no coinciden"
        errorText.classList.remove("hidden")
      } else {
        errorText.classList.add("hidden")
      }
      if (!einput_error && !econfirm_error) {
        document.getElementById("send").classList.remove("inactive")
        document.getElementById("send").disabled = false
      } else {
        document.getElementById("send").classList.add("inactive")
        document.getElementById("send").disabled = true
      }
    }
  }, 100)

  const newsJSON = await requireJSON("./json/news.json")
  newsJSON.forEach(article => {
    new card()
      .setTitle(article.title)
      .setDate(article.time)
      .setOnClik(article.links.click)
      .setVersion(article.version)
      .setColor(article.colors[0], article.colors[1])
      .setLabel(article.label)
      .setImage(article.image)
      .setLink("ig", article.links.instagram)
      .setLink("twt", article.links.twitter)
      .setLink("gg", article.links.discord)
      .build()
  })
}

function validateEmail(mail) {
  const eMailRegEx = /[A-Za-z0-9._%+-]+@[A-Za-z0-9]+\.[A-Za-z]{2,}/g
  return eMailRegEx.test(mail)
}

async function requireJSON(url, canonical) {
  var response = await fetch(`${canonical ? `${document.querySelector("link[rel='canonical']").getAttribute("href")}${url}` : `${url}`}`);
  if (window.location.href.startsWith("http://127.0.0.1:8080/")) response = await fetch(`${canonical ? `http://127.0.0.1:8080/${url}` : `${url}`}`);
  const json = await response.json();
  return json
}