function loadNavigation() {
  var pages = document.querySelectorAll(".navigation > .page")
  pages.forEach(page => {
    page.addEventListener("click", function (e) {
      var pageToOpen = document.getElementById(page.id.split(/-/g)[1])
      document.querySelector(".tool.active").classList.remove("active")
      pageToOpen.classList.add("active")
      document.querySelector(".navigation > .page.active").classList.remove("active")
      page.classList.add("active")
    })
  })
}