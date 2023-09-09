const Embed = new embed()
const Proyect = new proyect()
var actualProyectID, actualEmbedID, proyectsData, embedsData

window.onload = async function () {

  await myIndexedDB.startDB()
  proyectsData = await myIndexedDB.displayData("proyects")
  embedsData = await myIndexedDB.displayData("embeds")
  await sleep(1000)

  loadLists()

  var pages = document.querySelectorAll(".navigation > .page")
  pages.forEach(page => {
    page.addEventListener("click", function(e) {
      var pageToOpen = document.getElementById(page.id.split(/-/g)[1])
      document.querySelector(".tool.active").classList.remove("active")
      pageToOpen.classList.add("active")
      document.querySelector(".navigation > .page.active").classList.remove("active")
      page.classList.add("active")
    })
  })

  if (proyectsData.length < 1) {
    actualProyectID = "New embed"
    actualEmbedID = "New page"
    myIndexedDB.addElement("proyects", {
      id: "New embed",
      embeds: "New page"
    })
    myIndexedDB.addElement("embeds", {
      json: '{"title":"Título del embed","description":"Descripción del embed","color":"'+generateRandomColor()+'","footer":"Pié del embed","fields":[]}',
      emoji: "",
      proyect: "New embed",
      id: "New page"
    })
    var proyectsData = await myIndexedDB.displayData("proyects")
    var embedsData = await myIndexedDB.displayData("embeds")
    await sleep(1000)
  } else {
    actualProyectID = proyectsData[0].id
    actualEmbedID = proyectsData[0].embeds.split(/,/g)[0]
  }

  if (embedsData.length > 0) {
    Embed.getFromJSON(
      JSON.parse(embedsData.filter(x => x.id == actualEmbedID)[0].json)
    ).build()
  } else {
    document.getElementById("loader").classList.add("error")
    await sleep(100)
    alert("Algunos datos no se han cargado correctamente y podría repercutir en el funcionamiento de la página.\nRecomendamos recargar la página usando F5 o presionando el correspondiente icono en el navegador.\n\nSi el error persiste, por favor contacte con el desarrollador.")
    await sleep(500)
  }

  await Proyect.load()
  await Proyect.build()

  setInterval(function() {
    Embed.get().updateColor()
    myIndexedDB.deleteItem("embeds", [actualEmbedID, actualProyectID])
    myIndexedDB.addElement("embeds", {
      json: JSON.stringify(Embed),
      emoji: "",
      proyect: actualProyectID,
      id: actualEmbedID
    })
    document.getElementById("codeTextarea").innerHTML = JSON.stringify(Embed, undefined, 2)
  }, 250)

  document.getElementById("loader").classList.add("invisible")
}

function loadLists() {
  var x, i, j, l, ll, selElmnt, a, b, c;
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }

  document.addEventListener("click", closeAllSelect);
}