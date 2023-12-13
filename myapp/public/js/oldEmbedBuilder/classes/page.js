class Page {
  #_pageID;
  #_proyectID;
  #_icon;
  #_emoji;
  index;
  embed;
  constructor(pageID, proyectID) {
    if (!pageID || typeof pageID != "string" || pageID.length<=0) throw new Error("Invalid ID");
    if (!proyectID || typeof proyectID != "string" || proyectID.length<=0) throw new Error("Invalid proyect ID");
    this.#_pageID = pageID;
    this.#_proyectID = proyectID;
    this.embed = new Embed([pageID, proyectID]);
  }

  #_htmlBuilder = {
    field: (name, value, inline, index) => '<div class="field" id="field-' + index + '"><button title="Eliminar campo" class="substract dfield" id="dField-' + index + '"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.25 12h14"></path></svg></button><span class="textarea title" contenteditable="true">' + name + '</span><span class="textarea value" contenteditable="true">' + value + '</span><label class="cfieldLabel" id="cfieldLabel-' + index + '"><input type="checkbox" class="option cfield"' + `${inline ? ' checked="true"' : ''}` + ' id="cfield-' + index + '"></input><p>Mostrar en línea</p></label></div>'
  }

  get icon() {
    return this.#_icon
  }

  set icon(x) {
    this.#_icon = x
  }

  get emoji() {
    return this.#_emoji
  }

  set emoji(x) {
    this.#_emoji = x
  }

  previsualization = {
    build: () => {
      Object.keys(Embed.DEFAULT_VALUES).forEach(key => {
        switch(typeof this.embed[key]) {
          case "string":
            switch(key) {
              case "color":
                if (!(document.getElementById("colorInput") && document.getElementById("colorLine"))) return
                document.getElementById("colorInput").value = this.embed.color;
                document.getElementById("colorLine").style.backgroundColor = this.embed.color;
                break;
              case "image":
                if (!document.getElementById("imageImage")) return
                document.getElementById("imageImage").src = this.embed.image
                document.getElementById("imageImage").classList.add("active")
                break
              case "thumbnail":
                if (!document.getElementById("thumbnailImage")) return
                document.getElementById("thumbnailImage").src = this.embed.thumbnail
                document.getElementById("thumbnailImage").classList.add("active")
                break
              case "timestamp":
                if (!document.getElementById("timestampInput")) return
                document.getElementById("timestampInput").value = this.timestamp
                break
              default:
                if (!document.getElementById(`${key}Input`)) return
                document.getElementById(`${key}Input`).innerHTML = this.embed[key];
            }
            break;
          case "object":
            if (Array.isArray(this.embed[key])) {
              this.#_loadFields()
            } else {
              Object.keys(this.embed[key]).forEach(subKey => {
                if (!document.getElementById(`${key}-${subKey}Input`)) return
                document.getElementById(`${key}-${subKey}Input`).innerHTML = this.embed[key][subKey];
              })
            }
            break;
          case "undefined":
            break;
          default:
            throw new Error("Unexpected key type")
        }
      })
      var ce = document.querySelectorAll('.embed [contenteditable]')
      ce.forEach(cee => {
        cee.addEventListener('paste', function (e) {
          e.preventDefault()
          var text = e.clipboardData.getData('text/plain')
          document.execCommand('insertText', false, text)
        })
      })
      document.getElementById("colorInput").addEventListener("change", function() {
        Page.updateColor()
      })
    },
    save: () => {
      document.querySelectorAll('[id$="Input"]').forEach(input => {
        let value = document.querySelector(`#${input.id}`).value || document.querySelector(`#${input.id}`).innerHTML
        let a = input.id.replace(/Input/g, "").split()
        if (a.length == 1) {
          this.embed[a[0]] = value
        } else if (a.length == 2) {
          this.embed[a[0]][a[1]] = value
        }
      })
      if (!this.embed) throw new Error("Embed must be declared")
      let embedFields = []
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
        embedFields.push(element)
      })
      this.embed.fields = embedFields
      return this.embed
    },
  }

  #_loadFields() {
    var fieldRows = []
    var row = 0;
    for (let field = 0; field < this.embed.fields.length; field++) {
      if (!fieldRows[row]) fieldRows[row] = []
      fieldRows[row].push(this.embed.fields[field])
      if (fieldRows[row].length > 2 || !this.embed.fields[field].inline || (this.embed.fields[field + 1] && !this.embed.fields[field + 1].inline)) {
        row++
      }
    }
    var fieldsInnerHTML = ""
    fieldRows.forEach(row => {
      var innerHTML = ""
      row.forEach(field => {
        innerHTML += (this.#_htmlBuilder.field(field.name, field.value, field.inline, this.embed.fields.indexOf(field)))
      })
      fieldsInnerHTML += '<div class="fieldrow">' + innerHTML + '</div>'
    })
    if (this.embed.fields.length < 25) {
      fieldsInnerHTML += '<div class="buttons"><button title="Nuevo campo" class="add" id="addField"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.03 5-.018 14"></path><path d="M5 12h14"></path></svg><p>Nuevo campo</p></button></div>'
      document.getElementById("fields").innerHTML = fieldsInnerHTML
      document.getElementById("addField").addEventListener("click", function () {
        user.actualProyect.actualPage.embed.addField({ name: "", value: "", inline: false })
        user.actualProyect.actualPage.previsualization.build()
      })
    } else {
      document.getElementById("fields").innerHTML = fieldsInnerHTML
    }
    document.querySelectorAll(".dfield").forEach(element => {
      element.addEventListener("click", function () {
        let fields = user.actualProyect.actualPage.embed.fields
        fields.splice(parseInt(element.id.split(/-/g)[1]), 1);
        user.actualProyect.actualPage.embed.setFields(fields)
        user.actualProyect.actualPage.previsualization.build()
      })
    })
    document.querySelectorAll(".cfield").forEach(element => {
      element.addEventListener("click", function () {
        user.actualProyect.actualPage.previsualization.save()
        user.actualProyect.actualPage.previsualization.build()
      })
    })
  }

  static updateColor() {
    if (!(document.getElementById("colorInput") && document.getElementById("colorLine"))) return
    document.getElementById("colorInput").value = user.actualProyect.actualPage.embed.color;
    document.getElementById("colorLine").style.backgroundColor = user.actualProyect.actualPage.embed.color;
  }

  static loadOnList() {

  }
}