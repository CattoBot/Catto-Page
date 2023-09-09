function generateRandomColor() {
  let maxVal = 0xFFFFFF;
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);
  return `#${randColor.toUpperCase()}`
}

function loadEmbedHTML() {
  embedHTML.title = document.getElementById("titleInput") ? document.getElementById("titleInput").innerHTML.replace(/\<div\>/g, " ").replace(/\<\/div\>/, "").replace(/\<br\>/, "") : undefined
  embedHTML.description = document.getElementById("descriptionInput") ? document.getElementById("descriptionInput").innerHTML.replace(/\<div\>/g, "\n").replace(/\<\/div\>/, "").replace(/\<br\>/, "") : undefined
  embedHTML.color = document.getElementById("colorInput") ? document.getElementById("colorInput").value : undefined
  embedHTML.timestamp = document.getElementById("timestampInput") ? document.getElementById("timestampInput").value : undefined
  embedHTML.thumbnail = document.getElementById("thumbnailInput") ? document.getElementById("thumbnailInput").value : undefined
  embedHTML.image = document.getElementById("imageInput") ? document.getElementById("imageInput").value : undefined
  embedHTML.footer = document.getElementById("footerInput") ? document.getElementById("footerInput").innerHTML : undefined
  embedHTML.fields = []
  document.querySelectorAll(".field").forEach(field => {
    var element = { name: "", value: "", inline: false }
    field.childNodes.forEach(child => {
      if (!child.classList) return
      if (child.classList.contains("title")) {
        element.name = child.innerHTML.replace(/\<div\>/g, " ").replace(/\<\/div\>/, "").replace(/\<br\>/, "")
      }
      if (child.classList.contains("value")) {
        element.value = child.innerHTML.replace(/\<div\>/g, "\n").replace(/\<\/div\>/, "").replace(/\<br\>/, "")
      }
      if (child.classList.contains("cfieldLabel")) {
        element.inline = document.getElementById("cfield-" + child.id.split(/-/g)[1]).checked
      }
    })
    embedHTML.fields.push(element)
  })
}

const embedHTML = {
  title: undefined,
  description: undefined,
  color: undefined,
  footer: undefined,
  timestamp: undefined,
  thumbnail: undefined,
  image: undefined,
  fields: []
}

function buildProyectHTML(name) {
  let saveButton = '<div class="save" title="guardar" id="sButton"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.65 3H4.35A1.35 1.35 0 0 0 3 4.35v15.3c0 .746.604 1.35 1.35 1.35h15.3A1.35 1.35 0 0 0 21 19.65V4.35A1.35 1.35 0 0 0 19.65 3Z"></path><path d="M16 3v9H7.5V3H16Z"></path><path d="M13 6.5v2"></path><path d="M5.498 3H18"></path></svg></div>'
  let deleteButton = '<div class="delete" title="eliminar" id="dButton"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 5v17h15V5h-15Z"></path><path d="M10 10v6.5"></path><path d="M14 10v6.5"></path><path d="M2 5h20"></path><path d="m8 5 1.645-3h4.744L16 5H8Z"></path></svg></div>'
  let copyButton = '<div class="copy" title="duplicar" id="cButton"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 6.216v-2.31c0-.776.63-1.406 1.406-1.406h12.188c.776 0 1.406.63 1.406 1.406v12.188c0 .776-.63 1.406-1.406 1.406h-2.336"></path><path d="M16.094 6.5H3.906C3.13 6.5 2.5 7.13 2.5 7.906v12.188c0 .776.63 1.406 1.406 1.406h12.188c.776 0 1.406-.63 1.406-1.406V7.906c0-.776-.63-1.406-1.406-1.406Z"></path></svg></div>'
  let buttons = '<div class="buttons">' + saveButton + deleteButton + copyButton + '</div>'
  let proyectBase = '<div class="proyect ' + `${name == actualProyectID ? "active" : ""}` + '"><div class="icon"><p>' + name.charAt(0).toUpperCase() + '</p></div><div class="name"><p ' + `${name == actualProyectID ? 'contenteditable="true"' : ""}` + ' id="editProyectName">' + name + '</p></div>' + `${name == actualProyectID ? buttons : ""}` + '</div>'
  return proyectBase
}

function buildFieldHTML(name, value, inline, index) {
  let fieldBase = '<div class="field" id="field-' + index + '"><button title="Eliminar campo" class="substract dfield" id="dField-' + index + '"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.25 12h14"></path></svg></button><span class="textarea title" contenteditable="true">' + name + '</span><span class="textarea value" contenteditable="true">' + value + '</span><label class="cfieldLabel" id="cfieldLabel-' + index + '"><input type="checkbox" class="option cfield"' + `${inline ? ' checked="true"' : ''}` + ' id="cfield-' + index + '"></input><p>Mostrar en línea</p></label></div>'
  return fieldBase
}

class embed {
  fields = []
  title = ""
  description = ""
  color = ""
  footer = ""
  constructor() {
    return this
  }
  setTitle(text) {
    this.title = text.substring(0, 256)
    return this
  }
  setDescription(text) {
    this.description = text.substring(0, 4096)
    return this
  }
  setColor(hexColor) {
    if (hexColor.startsWith("#")) {
      this.color = hexColor
    } else {
      this.color = `#${hexColor}`
    }
    return this
  }
  setFields(fields) {
    this.fields = fields
    return this
  }
  addField(field) {
    this.fields.push(field)
    return this
  }
  setFooter(text) {
    this.footer = text
    return this
  }
  setTimestamp(timestamp) {
    this.timestamp = timestamp
    return this
  }
  setImage(url) {
    this.image = url
    return this
  }
  setThumbnail(url) {
    this.thumbnail = url
    return this
  }
  build() {
    if (this.title && document.getElementById("titleInput")) {
      document.getElementById("titleInput").innerHTML = this.title
    }
    if (this.description && document.getElementById("descriptionInput")) {
      document.getElementById("descriptionInput").innerHTML = this.description
    }
    if (this.color && document.getElementById("colorInput")) {
      document.getElementById("colorInput").value = this.color
      document.getElementById("colorLine").style.backgroundColor = this.color
    }
    if (this.footer && document.getElementById("footerInput")) {
      document.getElementById("footerInput").innerHTML = this.footer
    }
    if (this.fields) {
      var fieldRows = []
      var row = 0;
      for (let field = 0; field < this.fields.length; field++) {
        if (!fieldRows[row]) fieldRows[row] = []
        fieldRows[row].push(this.fields[field])
        if (fieldRows[row].length > 2 || !this.fields[field].inline || (this.fields[field + 1] && !this.fields[field + 1].inline)) {
          row++
        }
      }
      var fieldsInnerHTML = ""
      fieldRows.forEach(row => {
        var innerHTML = ""
        row.forEach(field => {
          innerHTML += (buildFieldHTML(field.name, field.value, field.inline, this.fields.indexOf(field)))
        })
        fieldsInnerHTML += '<div class="fieldrow">' + innerHTML + '</div>'
      })
      if (this.fields.length < 25) {
        fieldsInnerHTML += '<div class="buttons"><button title="Nuevo campo" class="add" id="addField"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.03 5-.018 14"></path><path d="M5 12h14"></path></svg><p>Nuevo campo</p></button></div>'
        document.getElementById("fields").innerHTML = fieldsInnerHTML
        document.getElementById("addField").addEventListener("click", function () {
          Embed.addField({ name: "", value: "", inline: false }).build()
        })
      } else {
        document.getElementById("fields").innerHTML = fieldsInnerHTML
      }
      document.querySelectorAll(".dfield").forEach(element => {
        element.addEventListener("click", function () {
          let fields = Embed.fields
          fields.splice(parseInt(element.id.split(/-/g)[1]), 1);
          Embed.setFields(fields).build()
        })
      })
      document.querySelectorAll(".cfield").forEach(element => {
        element.addEventListener("click", function () {
          Embed.get().build()
        })
      })
    }
    var ce = document.querySelectorAll('.embed [contenteditable]')
    ce.forEach(cee => {
      cee.addEventListener('paste', function (e) {
        e.preventDefault()
        var text = e.clipboardData.getData('text/plain')
        document.execCommand('insertText', false, text)
      })
    })
    if (this.image && document.getElementById("imageImage")) {
      document.getElementById("imageImage").src = this.image
      document.getElementById("imageImage").classList.add("active")
    }
    if (this.thumbnail && document.getElementById("thumbnailImage")) {
      document.getElementById("thumbnailImage").src = this.thumbnail
      document.getElementById("thumbnailImage").classList.add("active")

    }
    if (this.timestamp && document.getElementById("timestampInput")) {
      document.getElementById("timestampInput").value = this.timestamp
    }
  }
  updateColor() {
    if (this.color && document.getElementById("colorInput")) {
      document.getElementById("colorInput").value = this.color
      document.getElementById("colorLine").style.backgroundColor = this.color
    }
  }
  get() {
    loadEmbedHTML()
    embedHTML.title ? this.title = embedHTML.title : this.title ? this.title = undefined : undefined
    embedHTML.description ? this.description = embedHTML.description : this.description ? this.description = undefined : undefined
    embedHTML.color ? this.color = embedHTML.color : generateRandomColor()
    embedHTML.footer ? this.footer = embedHTML.footer : this.footer ? this.footer = undefined : undefined
    embedHTML.fields ? this.fields = embedHTML.fields : this.fields ? this.fields = undefined : undefined
    embedHTML.image ? this.image = embedHTML.image : this.image ? this.image = undefined : undefined
    embedHTML.thumbnail ? this.thumbnail = embedHTML.thumbnail : this.thumbnail ? this.thumbnail = undefined : undefined
    embedHTML.timestamp ? this.timestamp = embedHTML.timestamp : this.timestamp ? this.timestamp = undefined : undefined
    return this
  }
  getFromJSON(JSON) {
    JSON.title ? this.title = JSON.title : undefined
    JSON.description ? this.description = JSON.description : undefined
    JSON.color ? this.color = JSON.color : undefined
    JSON.footer ? this.footer = JSON.footer : undefined
    JSON.fields ? this.fields = JSON.fields : undefined
    JSON.image ? this.image = JSON.image : undefined
    JSON.thumbnail ? this.thumbnail = JSON.thumbnail : undefined
    JSON.timestamp ? this.timestamp = JSON.timestamp : undefined
    return this
  }
}

class proyect {
  constructor() { }
  async load() {
    return new Promise(async resolve => {
      proyectsData = await myIndexedDB.displayData("proyects")
      embedsData = await myIndexedDB.displayData("embeds")
      await sleep(1000)
      this.proyects = proyectsData
      this.embeds = embedsData
      resolve()
    })
  }
  async build() {
    return new Promise(async resolve => {
      var proyects = ''
      this.proyects.forEach(e => {
        proyects += buildProyectHTML(e.id)
      })
      document.getElementById("proyects").innerHTML = proyects
      document.getElementById("editProyectName").addEventListener("change", function(){
        console.log(1)
      })
      document.getElementById("sButton").addEventListener("click", async function () {
        var permited = true
        let permitedChars = "abcdefghijklmnñopqrstuvwxyzçáàéèíìóòäëïöüâêîôû_- "
        let newName = document.getElementById("editProyectName").innerHTML
        for (let i = 0;i<newName.length;i++) {
          if (!permitedChars.includes(newName.toLowerCase().charAt(i))) permited = false
        }
        if (!permited) return
        if (await myIndexedDB.has("proyects", newName)) return
        var renamed = Proyect.proyects.filter(x => x.id==actualProyectID)[0]
        renamed.id = newName
        myIndexedDB.addElement("proyects", renamed)
        myIndexedDB.deleteItem("proyects", [actualProyectID])
        actualProyectID = newName
      })
      document.getElementById("dButton").addEventListener("click", function () {

      })
      document.getElementById("cButton").addEventListener("click", function () {
        
      })
      var ce = document.querySelectorAll('.proyects [contenteditable]')
      ce.forEach(cee => {
        cee.addEventListener('paste', function (e) {
          e.preventDefault()
          var text = e.clipboardData.getData('text/plain')
          document.execCommand('insertText', false, text)
        })
      })
      resolve()
    })
  }
  getEmbeds() {

  }
  buildEmbedsList() {

  }
}