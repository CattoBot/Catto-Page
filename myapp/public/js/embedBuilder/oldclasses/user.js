class oldUser {

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
    this.translation = new Translation(this.config.lang);
    document.oncontextmenu = User.preventRigthClick;
  }

  load() {
    return new Promise(async (resolve, reject) => {
      this.proyects.list = await myDB.getAllItems("proyects")
      await Translation.initTranslate();
      if (this.proyects.list.length == 0) {
        this.proyects.list.push(Proyect.defaultProyect)
      }
      this.#init.all();
      resolve();
    })
  }

  addProyect(id) {
    this.proyects.list.push(new Proyect(id))
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
        document.getElementById("codeTextarea").innerHTML = JSON.stringify(user.actualProyect.actualPage.embed.json, undefined, 2);
      }, 100)
    },
    autosave: () => {
      setInterval(this.#saveActualPage, 100);
    }
  }
  #saveActualPage() {
    if (typeof user.actualProyect.actualPage != 'undefined') {
      user.actualProyect.actualPage.previsualization.save();
    }
  }

  static preventRigthClick() {
    if (!user.config.devMode) {
      return false;
    }
  }

  static saveOnDB(user) {

  }
}