/**
 * 
 * -----
 * 
 * ¿Quieres utilizar esta clase?
 * 
 * Prueba esto:
 * ```js
 * new CattoFile
 * ```
 */

class CattoFile {

    /**
     * @description Nombre del archivo.
     */
    #_name

    /**
     * @description Tipo de archivo.
     */
    #_type

    /**
     * @description Contenido del archivo.
     */
    #_content

    /**
     * @description Extensión del archivo.
     */
    #_extension

    /**
     * @description ¿El archivo está encriptado?
     */
    #_encrypted = false

    /**
     * @description Extensiones disponibles.
     */
    static extensions = {
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

    /**
     * 
     * -----
     * 
     * Gracias a esta clase podrás crear y descargar archivos de la
     * forma más fácil y rápida posible.
     * 
     * -----
     * 
     * **USO**
     * 
     * > Por medio del constructor crea un nuevo archivo. Podrás
     * especificar en éste los datos del archivo o hacerlo de forma
     * independiente dato por dato.
     * 
     * >> `Opción A`
     * >> ```js
     * file = new CattoFile("Archivo", ".txt", "Prueba de archivo")
     * >>``` 
     * 
     * >> `Opción B`
     * >> ```js
     * file = new CattoFile()
     * file.name = "Archivo"
     * file.extension = ".txt"
     * file.content = "Prueba de archivo"
     * >>``` 
     * 
     * > Una vez el archivo ha sido creado, descárgalo
     * >> ```js
     * file.download()
     * >> ```
     * 
     * -----
     * 
     * **EXTENSIONES ADMITIDAS**
     * 
     * > Sólo un reducido número de extensiones están permitidas en
     * esta clase, siendo posible una ampliación de ésta lista con
     * unas escasas líneas de código.
     * 
     * > - `.txt`
     * 
     * > Texto plano convencional.
     * 
     * > - `.catto.txt`
     * 
     * > Texto plano convencional guardado en un archivo con una
     * extensión diferente para dificultar que usuarios sin
     * conocimientos informáticos puedan alterarlo.
     * 
     * > - `.catto`
     * 
     * > Texto plano codificado guardado en un archivo con una
     * extensión personalizada para dificultar que usuarios con o
     * sin conocimientos informáticos puedan alterarlo a
     * conveniencia.
     * 
     * > - `.json`
     * 
     * > Archivo JSON.
     * 
     * -----
     * 
     * @param {string | undefined} name Nombre del archivo
     * @param {string | undefined} extension Extensión que será empleada
     * @param {string | undefined} content Contenido del archivo
     * 
    */
    constructor(name, extension, content) {
        name ? (this.name = name) : undefined
        extension ? (this.extension = extension.startsWith(".") ? extension : `.${extension}`) : undefined
        content ? (this.content = content) : undefined
    }

    /**
     * @description Contenido del archivo.
     */
    get content() {
        return this.#_content
    }

    set content(text) {
        if (typeof text != "string" || text.length == 0) throw new Error("Invalid text")
        this.#_content = text
    }

    /**
     * @description Nombre del archivo.
     */
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

    /**
     * @description Extensión del archivo
     */
    get extension() {
        return this.#_extension
    }

    set extension(extension) {
        if (!extension || extension.length <= 1) throw new Error("Extension is required")
        let provisionalType, provisionalEncrypted
        Object.keys(CattoFile.extensions).forEach(key => {
            if (CattoFile.extensions[key].extension == extension) {
                provisionalType = CattoFile.extensions[key].type
                provisionalEncrypted = CattoFile.extensions[key].encrypted
            }
        })
        if (!provisionalType) throw new Error("Invalid extension")
        this.#_encrypted = provisionalEncrypted
        this.#_type = provisionalType
        this.#_extension = extension
    }

    /**
     * @description Tipo de archivo
     */
    get type() {
        return this.#_type
    }

    /**
     * @description Función para descargar el archivo.
     * -----
     * **FUNCIONAMIENTO**
     * > La función comprueba que los datos introducidos son aptos para ser un
     * archivo. Una vez comprobado, crea el archivo y su correspondiente URL
     * de descarga. El código termina creando un hipervínculo a dicho link,
     * siendo siendo seleccionado automáticamente y eliminado al momento tras
     * esto.
     */
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
        const file = new File([content], `${this.#_name}${this.#_extension}`, { type: this.#_type })
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