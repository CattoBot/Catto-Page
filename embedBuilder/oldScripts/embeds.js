/*

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
    erase() {
      this.title = " "
      this.description = " "
      this.color = "#000000"
      this.footer = " "
      this.fields = []
      this.image = " "
      this.thumbnail = " "
      this.timestamp = " "
      return this
    }
  }

*/