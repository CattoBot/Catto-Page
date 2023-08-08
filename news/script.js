window.onload = () => {

  const sideMenu = {
    default: document.getElementById("default"),
    error: document.getElementById("error"),
    subscribe: document.getElementById("subscribe"),
    unsubscribe: document.getElementById("unsubscribe"),
    invalid: document.getElementById("invalid")
  }
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const page = fragment.get('status') || "default"
  document.querySelector(".pages > .active").classList.remove("active")
  if (sideMenu[page]) {
    sideMenu[page].classList.add("active")
  } else {
    sideMenu["default"].classList.add("active")
  }
  var href = window.location.href.split(/\/+/g)
  const protocol = href[0]
  href.shift()
  href.pop()
  href.pop()
  const link = `${protocol}//${href.join("/")}`
  document.querySelectorAll(".returnButton").forEach(button => {
    if (history.length > 1) {
      button.addEventListener("click", function () {
        history.back()
      })
    } else {
      button.addEventListener("click", function () {
        window.location = link
      })
    }
  })
}