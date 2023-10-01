/*

function buildProyectHTML(name) {
  let saveButton = '<div class="save" title="Guardar nombre" id="sButton"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.65 3H4.35A1.35 1.35 0 0 0 3 4.35v15.3c0 .746.604 1.35 1.35 1.35h15.3A1.35 1.35 0 0 0 21 19.65V4.35A1.35 1.35 0 0 0 19.65 3Z"></path><path d="M16 3v9H7.5V3H16Z"></path><path d="M13 6.5v2"></path><path d="M5.498 3H18"></path></svg></div>'
  let deleteButton = '<div class="delete" title="Eliminar" id="dButton"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 5v17h15V5h-15Z"></path><path d="M10 10v6.5"></path><path d="M14 10v6.5"></path><path d="M2 5h20"></path><path d="m8 5 1.645-3h4.744L16 5H8Z"></path></svg></div>'
  let copyButton = '<div class="copy" title="Duplicar" id="cButton"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 6.216v-2.31c0-.776.63-1.406 1.406-1.406h12.188c.776 0 1.406.63 1.406 1.406v12.188c0 .776-.63 1.406-1.406 1.406h-2.336"></path><path d="M16.094 6.5H3.906C3.13 6.5 2.5 7.13 2.5 7.906v12.188c0 .776.63 1.406 1.406 1.406h12.188c.776 0 1.406-.63 1.406-1.406V7.906c0-.776-.63-1.406-1.406-1.406Z"></path></svg></div>'
  let buttons = '<div class="buttons">' + saveButton + deleteButton + copyButton + '</div>'
  let proyectBase = '<div class="proyect ' + `${name == actualProyectID ? "active" : ""}` + '"' + `${name == actualProyectID ? '' : `onclick="setActualProyect('${name}')"`}` + '><div class="icon"><p>' + name.charAt(0).toUpperCase() + '</p></div><div class="name"><p ' + `${name == actualProyectID ? 'contenteditable="true"' : ""}` + `${name == actualProyectID ? 'id="editProyectName"' : ""}` + '>' + name + '</p></div>' + `${name == actualProyectID ? buttons : ""}` + '</div>'
  return proyectBase
}

function buildDefaultProyect(embedconfig) {
  let json = {
    id: embedconfig.proyect,
    embeds: embedconfig.id
  }
  myIndexedDB.addElement("proyects", json)
  return json
}

function buildDefaultEmbed(proyect) {
  let json = {
    json: '{"title":"Título del embed","description":"Descripción del embed","color":"' + generateRandomColor() + '","footer":"Pié del embed","fields":[]}',
    emoji: "",
    proyect: proyect,
    id: "New page"
  }
  myIndexedDB.addElement("embeds", json)
  return json
}

function buildPageHTML(name, emoji, icon, position, length) {
  let moveLeftButton = `<button title="Mover antes" class="blue${position<1?" disabled":""} movePageLeft" page="${name}"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2.9 12h18"></path><path d="m8.9 18-6-6 6-6"></path></svg></button>`
  let deleteButton = `<button title="Eliminar" class="red${position<1?" disabled":""} deletePage" page="${name}"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 5v17h15V5h-15Z"></path><path d="M10 10v6.5"></path><path d="M14 10v6.5"></path><path d="M2 5h20"></path><path d="m8 5 1.645-3h4.744L16 5H8Z"></path></svg></button>`
  let moveRightButton = `<button title="Mover después" class="blue${position==Math.floor(length-1)?" disabled":""} movePageRight" page="${name}"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 12H3"></path><path d="m15 6 6 6-6 6"></path></svg></button>`
  const icons = {
    default: `<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2Z"></path><path d="M2 8.667h20"></path><path d="M8.667 22V8.667"></path></svg>`
  }
  let nameInput = `<p class="emoji">${emoji?emoji:""}</p><p class="id"${name==actualEmbedID?' contenteditable=""':''}${name==actualEmbedID?' id="renamePageInput"':''}>${name}</p>`
  let page = `<div class="page${name==actualEmbedID?" active":""}">
  <div class="icon">${icons[icon]?icons[icon]:""}</div>
  <div class="name">${nameInput}</div>
  <div class="buttons">${moveLeftButton}${deleteButton}${moveRightButton}</div>
  </div>`
  return page
}

function setActualProyect(id) {
  return new Promise(async (resolve, reject) => {
    loader.enable("Loading")
    actualProyectID = id
    await Proyect.build()
    await sleep(500)
    let proyect = proyectsData.filter(y => y.id == id)[0]
    actualEmbedID = proyect.embeds.split(/\,/g)[0]
    let embedJSON = embedsData.filter(x => x.id == actualEmbedID && x.proyect == actualProyectID)[0]
    Embed.getFromJSON(JSON.parse(embedJSON.json)).build()
    loader.disable()
    resolve()
  })
}

class proyect {
  constructor() { }
  async load() {
    return new Promise(async (resolve, reject) => {
      proyectsData = await myIndexedDB.displayData("proyects")
      embedsData = await myIndexedDB.displayData("embeds")
      await sleep(800)
      resolve()
    })
  }
  build() {
    return new Promise(async (resolve, reject) => {
      var proyects = ''
      proyectsData.forEach(e => {
        proyects += buildProyectHTML(e.id)
      })
      document.getElementById("proyects").innerHTML = proyects
      document.getElementById("editProyectName").addEventListener("change", function () {
        console.log(1)
      })
      try {
        document.getElementById("sButton").addEventListener("click", async function () {
          var permited = true
          let permitedChars = "abcdefghijklmnñopqrstuvwxyzçáàéèíìóòäëïöüâêîôû_- 0123456789()"
          let newName = document.getElementById("editProyectName").innerHTML
          for (let i = 0; i < newName.length; i++) {
            if (!permitedChars.includes(newName.toLowerCase().charAt(i)) || i > 31) permited = false
          }
          if (!permited) return loader.disable()
          loader.enable("Saving...")
          await Proyect.load()
          try {
            if (!proyectsData.filter(x => x.id == newName)[0]) {
              var renamed = proyectsData.filter(x => x.id == actualProyectID)[0]
              renamed.id = newName
              myIndexedDB.addElement("proyects", renamed)
              myIndexedDB.deleteItem("proyects", [actualProyectID])
              embedsData.filter(x => x.proyect == actualProyectID).forEach(e => {
                myIndexedDB.addElement("embeds", { id: e.id, proyect: `${newName}`, json: e.json, emoji: e.emoji, roles: e.roles })
                myIndexedDB.deleteItem("embeds", [e.id, actualProyectID])
              })
              await Proyect.load()
              actualProyectID = newName
              await Proyect.build()
            } else { throwError() }
          }
          catch (e) { throwError(e) }
          finally { loader.disable() }
        })
      } catch {
        console.error("No ha sido posible conectar el botón de guardar nombre")
      }
      try {
        document.getElementById("dButton").addEventListener("click", async function () {
          loader.enable("Deleting...")
          let embeds = embedsData.filter(x => x.proyect == actualProyectID)
          embeds.forEach(e => {
            myIndexedDB.deleteItem("embeds", [e.id, actualProyectID])
          })
          myIndexedDB.deleteItem("proyects", [actualProyectID])
          if (proyectsData.length < 2) {
            let defaultEmbed = buildDefaultEmbed("New embed")
            buildDefaultProyect(defaultEmbed)
            setActualProyect("New embed")
            actualEmbedID = "New page"
            await Proyect.load()
            Proyect.build()
            Embed.getFromJSON(JSON.parse(defaultEmbed.json)).build()
          } else {
            await Proyect.load()
            setActualProyect(proyectsData.filter(x => x.id != actualProyectID)[0].id)
            Proyect.build()
          }
          loader.disable()
        })
      } catch {
        console.error("No ha sido posible conectar el botón de eliminar")
      }
      try {
        document.getElementById("cButton").addEventListener("click", async function () {
          loader.enable("Copying...")
          let proyect = proyectsData.filter(x => x.id == actualProyectID)[0]
          for (let i = 1; i > 0; i++) {
            if (proyectsData.filter(x => x.id == `${proyect.id} - copy (${i})`) == 0) {
              myIndexedDB.addElement("proyects", {
                id: `${proyect.id} - copy (${i})`,
                embeds: proyect.embeds
              })
              embedsData.filter(x => x.proyect == actualProyectID).forEach(e => {
                myIndexedDB.addElement("embeds", {
                  id: e.id,
                  proyect: `${e.proyect} - copy (${i})`,
                  json: e.json,
                  roles: e.roles,
                  emoji: e.emoji
                })
              })
              break
            }
          }
          await Proyect.load()
          Proyect.build()
          loader.disable()
        })
      } catch {
        console.error("No ha sido posible conectar el botón de duplicar")
      }
      var ce = document.querySelectorAll('.proyects [contenteditable]')
      ce.forEach(cee => {
        cee.addEventListener('paste', function (e) {
          e.preventDefault()
          var text = e.clipboardData.getData('text/plain')
          document.execCommand('insertText', false, text)
        })
      })
      this.buildEmbedsList()
      resolve()
    })
  }
  getEmbeds() {
    return new Promise(async (resolve, reject) => {
      await Proyect.load()
      resolve(embedsData.filter(x => x.proyect == actualProyectID))
    })
  }
  buildEmbedsList() {
    return new Promise(async (resolve, reject) => {
      await Proyect.load()
      let embeds = embedsData.filter(x => x.proyect == actualProyectID)
      if (embeds.length == 1) {
        if (embedsData.filter(x => x.proyect == actualProyectID)[0].roles) {
          document.getElementById("proyectTypeText").innerHTML = "Tipo: Selector de roles"
          document.getElementById("proyectDescriptionText").innerHTML = "Un embed simple, pero con la posibilidad de seleccionar roles."  
        } else {
          document.getElementById("proyectTypeText").innerHTML = "Tipo: Embed simple"
          document.getElementById("proyectDescriptionText").innerHTML = "Un embed simple, sin páginas, sin complicaciones."  
        }
      } else {
        document.getElementById("proyectTypeText").innerHTML = "Tipo: Embed compuesto"
        document.getElementById("proyectDescriptionText").innerHTML = "Un embed elaborado, con múltiples páginas e incluso roles."
      }
      embeds.forEach(e => {
        let html = ""
        html += buildPageHTML(e.id, "", "default", 0, 1)
        html += `<div class="add vertical"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.03 5-.018 14"></path><path d="M5 12h14"></path></svg><p>Nueva página</p></div>`
        document.getElementById("pagesGrid").innerHTML = html
      })
      resolve()
    })
  }
}

*/