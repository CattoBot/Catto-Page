class user {

  #_loaded = false

  config = {
    devMode: false,
    lang: data.obtener("lang") || "en",
    translation: undefined
  }

  proyects = {
    list: [],
    actualProyectIndex: 0
  }

  get actualProyect() {
    return this.proyects.list[this.proyects.actualProyectIndex]
  }

  constructor() {
    this.translation = new translation(this.config.lang);
    document.oncontextmenu = user.preventRigthClick;
  }

  load() {
    return new Promise(async (resolve, reject) => {
      await translation.initTranslate();
      if (this.proyects.list.length == 0) {
        this.proyects.list.push(proyect.defaultProyect)
      }
      this.#init.all();
      resolve();
    })
  }

  addProyect(id) {
    if (!loaded) throw new Error("User must be loaded before initialization")
    this.proyects.list.push(new proyect(id))
    return this
  }

  removeProyect(id) {
    if (!loaded) throw new Error("User must be loaded before initialization")
    this.proyects.list
  }

  #init = {
    all() {
      this.JSONviewer();
      this.autosave();
    },
    JSONviewer: () => {
      setInterval(function () {
        document.getElementById("codeTextarea").innerHTML = JSON.stringify(User.actualProyect.actualPage.embed.json, undefined, 2);
      }, 100)
    },
    autosave: () => {
      setInterval(this.#saveActualPage, 100);
    }
  }
  #saveActualPage() {
    if (typeof User.actualProyect.actualPage != 'undefined') {
      User.actualProyect.actualPage.previsualization.save();
    }
  }

  static preventRigthClick() {
    if (!User.config.devMode) {
      return false;
    }
  }

  static saveOnDB(user) {

  }
}