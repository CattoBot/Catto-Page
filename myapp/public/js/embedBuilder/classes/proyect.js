class proyect {
  #_id = "";
  #_pages = [];
  actualPage;
  constructor(proyectId) {
    if (!proyectId || typeof proyectId != "string" || proyectId.length <=0) throw new Error("Invalid proyect id");
    this.#_id = proyectId;
    this.load();
  }

  load() {
    this.#_loadpages();
    let index = 0
    if (this.actualPage && this.actualPage.index && this.actualPage.index > 0) index = this.actualPage.index
    this.loadPage(index);
    return this;
  }

  #_loadpages() {
    this.#_pages = [];

/*

      - Agregar función que cargue sobre el array "this.#_pages" una
        a una todas las páginas desde la DB.

*/

    if (this.#_pages.length == 0) {
      this.#_pages.push(new page("New page", this.#_id))
    }
    return this;
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
    let proyecto = new proyect("test");
    return proyecto;
  }

  static get defaultProyect() {
    return new proyect("New proyect")
  }

  static loadOnList(proyect) {

  }

  static saveOnDB(proyect) {

  }
}