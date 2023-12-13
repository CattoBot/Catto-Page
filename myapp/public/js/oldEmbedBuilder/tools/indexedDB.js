const myDB = {
  db: null,

  // Método para iniciar la base de datos
  async initDB(databaseName) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(databaseName, 1);

      request.onerror = (event) => {
        reject("Error al abrir la base de datos: " + event.target.error);
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        console.info("Base de datos iniciada exitosamente")
        resolve();
      };

      request.onupgradeneeded = (event) => {
        this.db = event.target.result;
        this.addsheet(
          "pages",
          ["id","proyect"],
          [
            { name: "embed", unique: false },
            { name: "roles", unique: false },
            { name: "emoji", unique: false }
          ]
        )
        this.addsheet(
          "proyects",
          ["id"],
          [
            { name: "pages", unique: false },
          ]
        )
      };
    });
  },

  addsheet(name, key, fields) {
    let objectStore = myDB.db.createObjectStore(name, { keyPath: key });
    fields.forEach(field => {
      objectStore.createIndex(field.name, field.name, { unique: field.unique });
    });
    console.info(`Tabla "${name}" creada exitosamente`);
  },

  // Método para añadir un elemento a la base de datos
  async addItem(storeName, item) {
    const transaction = this.db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    return new Promise((resolve, reject) => {
      const request = store.add(item);

      request.onsuccess = (event) => {
        resolve();
      };

      request.onerror = (event) => {
        reject("Error al añadir el elemento: " + event.target.error);
      };
    });
  },

  // Método para retirar un elemento de la base de datos por su clave primaria
  async removeItem(storeName, itemId) {
    const transaction = this.db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    return new Promise((resolve, reject) => {
      const request = store.delete(itemId);

      request.onsuccess = (event) => {
        resolve();
      };

      request.onerror = (event) => {
        reject("Error al eliminar el elemento: " + event.target.error);
      };
    });
  },

  // Método para comprobar si un elemento existe en la base de datos
  async itemExists(storeName, itemId) {
    const transaction = this.db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    return new Promise((resolve, reject) => {
      const request = store.get(itemId);

      request.onsuccess = (event) => {
        const result = event.target.result;
        resolve(result !== undefined);
      };

      request.onerror = (event) => {
        reject("Error al comprobar la existencia del elemento: " + event.target.error);
      };
    });
  },

  // Método para obtener la lista completa de elementos en la base de datos
  async getAllItems(storeName) {
    const transaction = this.db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const items = [];

    return new Promise((resolve, reject) => {
      store.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          items.push(cursor.value);
          cursor.continue();
        } else {
          resolve(items);
        }
      };

      transaction.onerror = (event) => {
        reject("Error al obtener la lista de elementos: " + event.target.error);
      };
    });
  },
};