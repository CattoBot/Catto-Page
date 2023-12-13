class Translation {
  #_json = {}
  lang = "en"
  constructor(lang) {
    this.lang = lang ? lang : "en"
  }
  getAllTranslations() {
    return new Promise(async (resolve, reject) => {
      this.#_json = await requireJSON(`/json/embeds/translations/${this.lang}.json`, true)
      resolve(this.#_json)
    })
  }
  translateAll() {
    return new Promise(async (resolve, reject) => {
      await this.getAllTranslations()
      let ids = Object.keys(this.#_json)
      ids.forEach(id => {
        var filter = Array.prototype.filter,
          result = document.querySelectorAll('*'),
          filtered = filter.call(result, function (x) {
            return x.attributes["translation"] && x.attributes["translation"].value && x.attributes["translation"].value == id
          });
        if (filtered[0]) {
          filtered.forEach(e => {
            e.innerHTML = this.#_json[id]
          })
        }
      })
      loadLists()
      switch (this.lang) {
        case "es":
          document.querySelector("div#selectLang > div.select-selected").innerHTML = "(es) Español"
          break;
        case "en":
          document.querySelector("div#selectLang > div.select-selected").innerHTML = "(en) English"
          break;
        case "pt":
          document.querySelector("div#selectLang > div.select-selected").innerHTML = "(pt) Português"
          break;
        default:
          break;
      }
      resolve()
    })
  }

  static detectChangesOnLanguage() {
    user.config.lang = document.querySelector("#selectLang > div.select-selected").innerHTML.slice(1, 3)
    if (!(user.config.translation.lang === user.config.lang)) {
      user.config.translation = new Translation(user.config.lang);
      data.establecer("lang", user.config.translation.lang)
      user.config.translation.translateAll()
    }
    setTimeout(Translation.detectChangesOnLanguage, 50);
  }

  static initTranslate() {
    return new Promise(async (resolve, reject) => {
      if (data.existe("lang")) {
        user.config.lang = data.obtener("lang")
      }
      if (document.querySelector("#selectLang > div.select-selected").innerHTML.slice(1, 3) != user.lang) {
        switch(user.config.lang) {
          case "es":
            document.querySelector("#selectLang > div.select-selected").innerHTML = "(es) Español"
            break
          case "en":
            document.querySelector("#selectLang > div.select-selected").innerHTML = "(en) English"
            break
          case "pt":
            document.querySelector("#selectLang > div.select-selected").innerHTML = "(pt) Português"
            break
          default:
            throw new Error("Invalid lang")
            break
        }
      }
      user.config.translation = new Translation(user.config.lang)
      user.config.translation = new Translation(user.config.lang)
      Translation.detectChangesOnLanguage(user.config.translation)
      user.config.translation.translateAll()
      resolve()
    })
  }
}