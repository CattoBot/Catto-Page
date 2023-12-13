class Proyect {
  #_id = "";
  #_pages = [];
  actualPage;
  constructor(proyectId) {
    if (!proyectId || typeof proyectId != "string" || proyectId.length <=0) throw new Error("Invalid proyect id");
    this.#_id = proyectId;
  }

  load() {
    return new Promise(async (resolve, reject) => {
      await this.#_loadpages();
      let index = 0
      if (this.actualPage && this.actualPage.index && this.actualPage.index > 0) index = this.actualPage.index
      this.loadPage(index);
      resolve(this)
    })
  }

  #_loadpages() {
    return new Promise(async (resolve, reject) => {
      this.#_pages = await myDB.getAllItems("pages")
      this.#_pages = this.#_pages.filter(x => x.proyect == this.#_id)
      if (this.#_pages.length == 0) {
        this.#_pages.push(new Page("New page", this.#_id))
      }
      resolve(this);
    })

/*

      - Agregar función que cargue sobre el array "this.#_pages" una
        a una todas las páginas desde la DB.

*/
  }

  #_loadprevisualization() {
    this.actualPage.previsualization.build();
    return this;
  }

  loadPage(index) {
    this.actualPage = this.#_pages[index];
    this.#_loadprevisualization();
    return this;
  }

  static firstProyect() {
    let proyecto = new Proyect("test");
    return proyecto;
  }

  static get defaultProyect() {
    return new Proyect("New proyect")
  }

  static loadOnList(proyect) {

  }

  static saveOnDB(proyect) {

  }
}