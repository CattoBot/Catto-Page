function generateRandomColor(){
  let maxVal = 0xFFFFFF;
  let randomNumber = Math.random() * maxVal; 
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);   
  return `#${randColor.toUpperCase()}`
}

function loadEmbedHTML() {
  embedHTML.title = document.getElementById("titleInput")?document.getElementById("titleInput").innerHTML:undefined
  embedHTML.description = document.getElementById("descriptionInput")?document.getElementById("descriptionInput").innerHTML:undefined
  embedHTML.color = document.getElementById("colorInput")?document.getElementById("colorInput").value:undefined
  embedHTML.timestamp = document.getElementById("timestampInput")?document.getElementById("timestampInput").value:undefined
  embedHTML.thumbnail = document.getElementById("thumbnailInput")?document.getElementById("thumbnailInput").value:undefined
  embedHTML.image = document.getElementById("imageInput")?document.getElementById("imageInput").value:undefined
  embedHTML.footer = document.getElementById("footerInput")?document.getElementById("footerInput").innerHTML:undefined
  embedHTML.fields = []
  document.querySelectorAll(".field").forEach(field => {
    var element = {name: "", value: ""}
    field.childNodes.forEach(child => {
      if (!child.classList) return
      if (child.classList.contains("title")) {
        element.name = child.innerHTML
      }
      if (child.classList.contains("value")) {
        element.value = child.innerHTML
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

class embed {
  fields = []
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
      for (var field=0;field<this.fields.length;field++) {
        for (var r=0;r<this.fields.length;r++) {

        }
      }
    }
    if (this.image && document.getElementById("imageInput")) {
      document.getElementById("imageInput").value = this.image
    }
    if (this.thumbnail && document.getElementById("thumbnailInput")) {
      document.getElementById("thumbnailInput").value = this.thumbnail
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
    embedHTML.title?this.title = embedHTML.title:this.title?this.title=undefined:undefined
    embedHTML.description?this.description = embedHTML.description:this.description?this.description=undefined:undefined
    embedHTML.color?this.color = embedHTML.color:generateRandomColor()
    embedHTML.footer?this.footer = embedHTML.footer:this.footer?this.footer=undefined:undefined
    embedHTML.fields?this.fields = embedHTML.fields:this.fields?this.fields=undefined:undefined
    embedHTML.image?this.image = embedHTML.image:this.image?this.image=undefined:undefined
    embedHTML.thumbnail?this.thumbnail = embedHTML.thumbnail:this.thumbnail?this.thumbnail=undefined:undefined
    embedHTML.timestamp?this.timestamp = embedHTML.timestamp:this.timestamp?this.timestamp=undefined:undefined
    return this
  }
  getFromJSON(JSON) {
    JSON.title?this.title = JSON.title:undefined
    JSON.description?this.description = JSON.description:undefined
    JSON.color?this.color = JSON.color:undefined
    JSON.footer?this.footer = JSON.footer:undefined
    JSON.fields?this.fields = JSON.fields:undefined
    JSON.image?this.image = JSON.image:undefined
    JSON.thumbnail?this.thumbnail = JSON.thumbnail:undefined
    JSON.timestamp?this.timestamp = JSON.timestamp:undefined
    return this
  }
}