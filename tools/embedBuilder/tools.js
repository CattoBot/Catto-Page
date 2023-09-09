function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const data = {
  eliminar(ruta) {
    localStorage.removeItem(`${ruta}`);
    return localStorage
  },
  establecer(ruta, valor) {
    localStorage.setItem(`${ruta}`, valor);
    return
  },
  existe(ruta) {
    if (localStorage[`${ruta}`]) return true;
    return false;
  },
  obtener(ruta) {
    return localStorage.getItem(`${ruta}`);
  },
  reset() {
    localStorage.clear();
  },
  table() {
    return console.table(localStorage)
  }
}

const myIndexedDB = {
  db: undefined,
  async startDB() {
    return new Promise(async resolve => {
      let request = window.indexedDB.open("user", 1);
      request.onerror = function () {
        console.error("No se pudo abrir la base de datos");
      };
      request.onsuccess = function () {
        console.info("Base de datos abierta con éxito");
        myIndexedDB.db = request.result;
        resolve()
      };
      request.onupgradeneeded = function (e) {
        myIndexedDB.db = e.target.result;
        myIndexedDB.addsheet(
          "embeds",
          [
            "id",
            "proyect"
          ],
          [
            { name: "json", unique: false },
            { name: "emoji", unique: false }
          ]
        )
        myIndexedDB.addsheet(
          "proyects",
          [
            "id"
          ],
          [
            { name: "embeds", unique: false },
          ]
        )
      };
    })
  },
  addsheet(name, key, fields) {
    let objectStore = myIndexedDB.db.createObjectStore(name, { keyPath: key });
    fields.forEach(field => {
      objectStore.createIndex(field.name, field.name, { unique: field.unique });
    });
    console.info("Tabla de datos creada exitosamente");
  },
  addElement(sheet, element) {
    let transaction = myIndexedDB.db.transaction([sheet], "readwrite");
    let objectStore = transaction.objectStore(sheet);
    let request = objectStore.add(element);
    transaction.onerror = function () { console.error("Transacción fallida\n"); };
  },
  async displayData(sheet) {
    return new Promise(function (resolve, reject) {
      try {
        let toShow = []
        let objectStore = myIndexedDB.db.transaction(sheet).objectStore(sheet);
        objectStore.openCursor().onsuccess = function (e) {
          let cursor = e.target.result;
          if (cursor) {
            toShow.push(cursor.value)
            cursor.continue();
          }
        };
        resolve(toShow)
      } catch (err) {
        reject(err)
      }
    })
  },
  deleteItem(sheet, id) {
    let transaction = myIndexedDB.db.transaction([sheet], "readwrite");
    let objectStore = transaction.objectStore(sheet);
    try {
      let request = objectStore.delete(id);
    } catch (err) {
      console.error(err)
    }
    transaction.onerror = function () { console.error("Transacción fallida") }
  },
  async has(sheet, id) {
    return new Promise(async resolve => {
      const list = await myIndexedDB.displayData(sheet)
      await sleep(500)
      var i = 0
      for (i = 0; i < list.length; i++) {
        if (list[i].id == id) {
          resolve(true)
        }
      }
      resolve(false)
    })
  },
  async listLength(sheet, min, max) {
    return new Promise(async function (resolve, reject) {
      if (!sheet) return console.error("Tabla no especificada")
      const list = await myIndexedDB.displayData(sheet)
      await sleep(500)
      if (!min && !max) {
        resolve(list.length)
      } else if (min > 0 && max >= 0 && list.length >= min && list.length <= max) {
        resolve(true)
      } else if (min >= 0 && list.length >= min && !max) {
        resolve(true)
      } else if (max >= 0 && list.length <= max && !min) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  },
  async reset(sheet) {
    const list = await myIndexedDB.displayData(sheet)
    await sleep(500)
    var i = 0
    for (i = 0; i < list.length; i++) {
      myIndexedDB.deleteItem(sheet, list[i].id)
    }
  }
}

async function require(url, canonical) {
  return new Promise(async resolve => {
    var response = await fetch(`${canonical ? `${window.location.href.split("/")[0]}/${url}` : `${url}`}`);
    if (window.location.href.startsWith("http://127.0.0.1:5501/")) response = await fetch(`${canonical ? `http://127.0.0.1:5501/${url}` : `${url}`}`);
    const json = await response.json();
    resolve(json)
  })
}