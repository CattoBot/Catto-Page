class Translation {
    #_json = {}
    lang = "en-en"
    constructor(lang) {
        this.lang = lang ? lang : "en-en"
    }
    getAllTranslations() {
        return new Promise(async (resolve, reject) => {
            this.#_json = await requireJSON(`/json/translations/${this.lang}.json`, true)
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
            resolve()
        })
    }

    static detectChangesOnLanguage() {
        if (!(user.config.translation.lang === user.config.lang)) {
            user.config.translation = new Translation(user.config.lang);
            data.establecer("lang", user.config.translation.lang)
            user.config.translation.translateAll()
        }
        setTimeout(Translation.detectChangesOnLanguage, 50);
    }

    static initTranslate() {
        return new Promise(async (resolve, reject) => {
            user.config.translation = new Translation(user.config.lang)
            Translation.detectChangesOnLanguage(user.config.translation)
            user.config.translation.translateAll()
            resolve()
        })
    }
}