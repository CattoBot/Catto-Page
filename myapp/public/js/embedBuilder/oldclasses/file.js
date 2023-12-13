class oldCattoFile {
  #_name
  #_type
  #_content
  #_extension
  #_encrypted = false
  static types = {
    "Plain text": {
      type: "text/plain",
      extension: ".txt",
      encrypted: false
    },
    "Catto plain text": {
      type: "text/plain",
      extension: ".catto.txt",
      encrypted: false
    },
    "Catto encrypted text": {
      type: "text/plain",
      extension: ".catto",
      encrypted: true
    },
    "JSON": {
      type: "text/plain",
      extension: ".json",
      encrypted: false
    }
  }
  constructor(name, extension, content) {
    this.name = name
    this.extension = extension.startsWith(".") ? extension : `.${extension}`
    this.content = content
  }

  get content() {
    return this.#_content
  }

  set content(text) {
    if (typeof text != "string" || text.length == 0) throw new Error("Invalid text")
    this.#_content = text
  }

  get name() {
    return this.#_name
  }

  set name(name) {
    if (typeof name != "string" || name.length == 0) throw new Error("Invalid text")
    let invalidChars = "./\\{}[]%$"
    for (let i = 0; i < invalidChars.length; i++) {
      if (name.includes(invalidChars[i])) throw new Error("Invalid name")
    }
    this.#_name = name
  }

  get extension() {
    return this.#_extension
  }

  get type() {
    return this.#_type
  }

  set extension(extension) {
    if (!extension || extension.length <= 1) throw new Error("Extension is required")
    let provisionalType, provisionalEncrypted
    Object.keys(CattoFile.types).forEach(key => {
      if (CattoFile.types[key].extension == extension) {
        provisionalType = CattoFile.types[key].type
        provisionalEncrypted = CattoFile.types[key].encrypted
      }
    })
    if (!provisionalType) throw new Error("Invalid extension")
    this.#_encrypted = provisionalEncrypted
    this.#_type = provisionalType
    this.#_extension = extension
  }

  download() {
    if (typeof this.#_name != "string" || this.#_name.length == 0) throw new Error("Invalid text")
    if (typeof this.#_content != "string" || this.#_content.length == 0) throw new Error("Invalid text")
    if (typeof this.#_extension != "string" || this.#_extension.length == 0) throw new Error("Invalid text")
    var content = this.#_content
    if (this.#_extension == ".json") {
      try {
        JSON.parse(this.#_content);
      } catch {
        throw new Error("Invalid JSON")
      }
    }
    if (this.#_encrypted) content = encrypt(content, "catto", 69, "text", "text", "encrypt")
    const file = new File([content], `${this.#_name}${this.#_extension}`, {
      type: this.#_type,
    })
    const link = document.createElement('a')
    const url = URL.createObjectURL(file)
    link.href = url
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
}