/*

\-----------------------------------------------/
                  CLASE EMBED
/-----------------------------------------------\

Clase que permite la construcción del embed y la
cual devuelve el correspondiente JSON.

Se puede construír por medio de setters o por
medio de funciones. El ejemplo es el siguiente:

- Obtener título:
    let title = embed.title

- Establecer título
    embed.title = ""
    embed.setTitle("")

La diferencia entre los dos métodos es que el
segundo permite encadenar funciones de la
siguiente manera:
    embed.setTitle("").setDescription("")

*/

class Embed {

  // ID del embed en cuestión, por el que se le identificará en la DB
  #_id = "ID del embed";

  // Datos obtenidos de la DB acerca del embed
  #_data = {}

  // JSON del embed después de la última vez que se usó el método `get json`
  #_json = {}

  // Información del embed, campos, títulos, etc...
  #_title = "Título del embed";
  #_description = "Descripción del embed";
  #_fields = [{ name: "Array de campos", value: "Del embed", inline: false }];
  #_author = {
    text: "gacarbla",
    iconURL: "https://cdn.discordapp.com/attachments/1095009011146952865/1095009563901698129/g.jpg",
    textURL: "http://gacarbla.es"
  };
  #_footer = {
    text: "Pié de página",
    iconURL: "https://cdn.discordapp.com/attachments/1095009011146952865/1095009563901698129/g.jpg"
  };
  #_timestamp = "1695584038";
  #_color = "#ed4245";
  #_url = "http://gacarbla.es";
  #_imageURL = "https://cdn.discordapp.com/attachments/1095009011146952865/1095009563901698129/g.jpg";
  #_thumbnailURL = "https://cdn.discordapp.com/attachments/1095009011146952865/1095009563901698129/g.jpg";

  // Valores por defecto del embed
  static DEFAULT_VALUES = {
    title: "",
    description: "",
    fields: [],
    author: {
      text: "",
      iconURL: "",
      textURL: ""
    },
    footer: {
      text: "",
      iconURL: ""
    },
    timestamp: "",
    color: "#000000",
    url: "",
    image: "",
    thumbnail: ""
  }

  /*
    --------------------------------
    Sistemas de validación de inputs
    --------------------------------
  */

  // Un string se encuentre indefinido o su longitud sea igual a 0
  static #validateUndefinedString = string => ((typeof string === "string" && string.length === 0) || typeof string === "undefined");

  // Un booleano se encuentra definido como true o false
  static #validateBoolean = boolean => (typeof boolean === "boolean");

  // Un objeto es un objeto y no un array
  static #validateObject = object => ((typeof object === "object") && !Array.isArray(object));

  // Un array es realmente un array
  static #validateArray = array => (Array.isArray(array));

  // Un texto cumple con el mínimo y máximo de caracteres
  static #validateText = (text, minLength, maxLength) => (Embed.#validateUndefinedString(text) || (typeof text === "string" && (text.length >= minLength && text.length <= maxLength)));

  // Una URL dispone de los requisitos mínimos para ser considerada así
  static #validateUrl = url => (Embed.#validateUndefinedString(url) || (typeof url === "string" && (url.startsWith("https://") || url.startsWith("http://"))));

  // Una dirección o url posee los requisitos mínimos para ser considerada de imagen
  static #validateImage = url => (url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".png"));

  // Una url posee los requisitos mínimos para ser considerada imagen desde url
  static #validateImageUrl = imageUrl => (Embed.#validateUndefinedString(imageUrl) || (Embed.#validateUrl(imageUrl) && Embed.#validateImage(imageUrl)));

  // Un campo cumple las condiciones para ser válido
  static #validateField = field => (Embed.#validateText(field.name, 1, 256) && Embed.#validateText(field.value, 1, 1024) && Embed.#validateBoolean(field.inline));

  // El objeto `author` cumple las condiciones para ser válido 
  static #validateAuthor = author => (Embed.#validateObject(author) && Embed.#validateText(author.text, 0, 256) && Embed.#validateUrl(author.textURL) && Embed.#validateImageUrl(author.iconURL));

  // El tiempo introducido en el timestamp es válido
  static #validateTimestamp = ms => (Embed.#validateUndefinedString(ms) || ((new Date(ms)).getTime() > 0));

  // El objeto `footer` cumple las condiciones para ser válido
  static #validateFooter = footer => (Embed.#validateObject(footer) || (Embed.#validateText(footer.text) && Embed.#validateImageUrl(footer.iconURL)))

  static #validateColor = color => (this.#validateText(color, 7, 7) && (color.startsWith("#")))

  // Constructor del embed
  constructor(id) {
    this.#_id = id;
    this.reset()
  };

  // ID del embed
  get id() {
    return this.#_id
  }

  // Título del embed
  get title() {
    return this.#_title;
  };
  set title(x) {
    if (Embed.#validateText(x, 0, 256)) { // Valida el texto
      this.#_title = x;
    } else {
      throw new Error("Invalid title"); // Si no es válido, devuelve error
    };
  };

  // Descripción del embed
  get description() {
    return this.#_description;
  };
  set description(x) {
    if (Embed.#validateText(x, 0, 4096)) { // Valida el texto
      this.#_description = x;
    } else {
      throw new Error("Invalid description"); // Si no es válido, devuelve error
    };
  };

  /**
   * Color del embed
  */
  get color() {
    return this.#_color;
  };
  set color(x) {
    if (!Embed.#validateColor(x)) { // Valida el color en un inicio
      throw new Error("Invalid color");
    } else {
      let validChars = "0123456789abcdef"; // Declara los caracteres válidos en el color
      for (let i = 1; i < x.length; i++) { // Verifica que el color no posee ningún caracter diferente
        if (!validChars.includes(x.toLowerCase()[i])) {
          throw new Error("Invalid color"); // Si lo posee, devuelve como color inválido
        };
      };
      this.#_color = x.toUpperCase(); // Guarda el color como mayúsculas
    };
  };

  /**
   * Obtiene el pié del embed
   * @param {}
   */
  get footer() {
    return this.#_footer;
  };
  

  /**
   * PEstablece el pié del embed
   * @param {Object} object Objeto del pié de página. Debe incluír un valor "text" y otro "iconURL"
   */
  set footer(object) {
    if (Embed.#validateFooter(object)) {
      this.#_footer = object;
    } else {
      throw new Error("Invalid footer");
    };
  };

  // Campos del embed
  get fields() {
    return this.#_fields;
  };
  set fields(x) {
    if (Embed.#validateArray(x)) { // Valida que se trate de un array
      x.forEach(field => {
        if (!Embed.#validateField(field)) { // Valida que cada elemento del array se trate de un objeto field
          throw new Error(`Invalid field [${x.indexOf(field)}]: ${field}`); // Si no cumple el requisito devuelve error
        }
      })
      this.#_fields = x
    } else {
      throw new Error("Invalid fields object"); // Si no es un array devuelve error
    }
  };

  // Imágen usada en el embed
  get image() {
    return this.#_imageURL;
  };
  set image(x) {
    if (Embed.#validateImageUrl(x)) { // Valida que la url sea válida
      this.#_imageURL = x;
    } else {
      throw new Error("Invalid image URL"); // Si no lo es, devuelve error
    }
  };

  // Imágen utilizada en el thumbnail del embed
  get thumbnail() {
    return this.#_thumbnailURL;
  };
  set thumbnail(x) {
    if (Embed.#validateImageUrl(x)) { // Valida que la url sea válida
      this.#_thumbnailURL = x;
    } else {
      throw new Error("Invalid thumbnail URL"); // Si no lo es, devuelve error
    }
  };

  // Timestamp del embed
  get timestamp() {
    return new Date(this.#_timestamp);
  };
  set timestamp(x) {
    if (Embed.#validateTimestamp(x)) { // Valida que el timestamp sea válido
      this.#_timestamp = x;
    } else {
      throw new Error("Invalid timestamp"); // Si no lo es, devuelve error
    }
  };

  // Objeto autor del embed
  get author() {
    return this.#_author;
  };
  set author(x) {
    if (Embed.#validateAuthor(x)) { // Valida que el objeto autor se válido
      this.#_author = x;
    } else {
      throw new Error("Invalid author"); // Si no lo es, devuelve error
    };
  };

  // URL del título del embed
  get url() {
    return this.#_url;
  };
  set url(x) {
    if (Embed.#validateUrl(x)) { // Valida la URL
      this.#_url = x;
    } else {
      throw new Error("Invalid URL"); // Si no es válida, devuelve error
    }
  };

  // JSON del embed
  get json() {
    Object.entries(Embed.DEFAULT_VALUES).forEach(([key, _]) => {
      this.#_json[key] = this[key];
      // Por cada key que el embed por defecto debería tener, se carga sobre la variable #_json con el valor actual en la clase
    })
    return this.#_json;
  };
  set json(x) {
    Object.keys(x).forEach(key => {
      this[key] = x[key]; // Se carga sobre la clase cada variable introducida
    })
  };

  static get randomColor() {
    let maxVal = 0xFFFFFF;
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`
  }

  // Método para cargar un JSON
  convertFromJSON(JSON) {
    this.json = JSON;
    return this;
  };

  // Método para formatear el embed a por defecto
  reset() {
    this.json = Embed.DEFAULT_VALUES;
    return this;
  };

  // Método para establecer el título
  setTitle(text) {
    this.title = text;
    return this;
  };

  // Método para establecer la descripción
  setDescription(text) {
    this.description = text;
    return this;
  };

  // Método para establecer el color
  setColor(hexCode) {
    this.color = hexCode;
    return this;
  };

  // Método para establecer los campos
  setFields(fieldsArray) {
    this.fields = fieldsArray;
    return this;
  };

  // Método para añadir un campo
  addField(field) {
    this.fields.push(field)
    return this;
  };

  // Método para establecer autor
  setAuthor(authorObject) {
    this.author = authorObject;
    return this;
  };

  // Método para establecer el pié del embed
  setFooter(footerObject) {
    this.footer = footerObject;
    return this;
  };

  // Método para establecer la URL del título
  setURL(url) {
    this.url = url;
    return this;
  };

  // Método para establecer el timestamp
  setTimestamp(timestamp) {
    this.timestamp = timestamp;
    return this;
  };

  // Método para establecer la url de la imagen
  setImage(url) {
    this.image = url;
    return this;
  };

  // Método para establecer la url de la thumbnail
  setThumbnail(url) {
    this.thumbnail = url;
    return this;
  };
};