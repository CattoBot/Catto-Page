/**
 * 
 * -----
 * 
 * Gracias a esta clase podrás crear un nuevo usuario con sus correspondientes ajustes,
 * ID, proyectos, servidores...
 * 
 * -----
 * 
 * **ANTES DE EMPEZAR**
 * 
 * > Al crear un nuevo usuario debes recordar obtener los datos de la base de datos si
 * fuese necesario.
 * 
 * > Es necesario en los siguientes casos:
 * > - Proyectos
 * > - Páginas
 * > - Embeds
 * > - Servidores (Discord)
 * > - Información de usuario (Discord)
 * 
 * > Para recuperar esta información puedes hacerlo de la siguiente forma:
 * > ```js
 * var user = new User()
 * await user.load()
 * > ```
 * 
 * -----
 * 
 * **ESTRUCTURA**
 * 
 * > ```js
 * class User {
 *   keys: string[]
 *   KEY_UNLOCK_DEV: string[]
 * }
 * > ```
 * 
 */

class User {

    /**
     * @description Parámetros de configuración del usuario
     */
    configuration = {
        /**
         * @description Idioma que el usuario ha seleccionado
         */
        language: data.obtener("lang") || "en",

        /**
         * @description Traducción aplicada actualmente en la página
         */
        translation: undefined,

        /**
         * @description ¿Está el modo desarrollador activado?
         */
        devMode: data.obtener("devMode")=="true" || false,
        
        /**
         * @description ¿Puede el usuario abrir el menú contextual de click derecho?
         */
        rightClick: data.obtener("rightClick")=="true" || false,

        /**
         * @description Consola del usuario
         */
        console: new Console()
    }

    /**
     * 
     * -----
     * 
     * Gracias a esta clase podrás crear un nuevo usuario con sus correspondientes ajustes,
     * ID, proyectos, servidores...
     * 
     * -----
     * 
     * **ANTES DE EMPEZAR**
     * 
     * > Al crear un nuevo usuario debes recordar obtener los datos de la base de datos si
     * fuese necesario.
     * 
     * > Es necesario en los siguientes casos:
     * > - Proyectos
     * > - Páginas
     * > - Embeds
     * > - Servidores (Discord)
     * > - Información de usuario (Discord)
     * 
     * > Para recuperar esta información puedes hacerlo de la siguiente forma:
     * > ```js
     * var user = new User()
     * await user.load()
     * > ```
     * 
     * -----
     * 
     * **ESTRUCTURA**
     * 
     * > ```js
     * class User {
     *   configuration: {
     *     language: string
     *     translation: Translation
     *     devMode: boolean
     *     rightClick: boolean
     *     console: Console
     *   },
     *   proyects: {
     *     list: object[]
     *     actual_proyect: object
     *     create(): boolean
     *     remove(): boolean
     *   },
     *   load(): boolean
     *   rightClick(): false | undefined
     *   console(): void
     *   keyDown(): void
     * }
     * > ```
     */
    constructor() {

        new CattoFile()
        this.configuration.translation = new Translation(this.configuration.language)
        this.keyDown()
        this.console()
        document.oncontextmenu = this.rightClick;
    }

    /**
     * Esta función comprueba si la configuración del usuario permite
     * hacer click derecho o no, y si no lo permite, lo bloquea.
     * 
     * -----
     * 
     * @returns false | undefined
     */
    rightClick() {
        if (!user || !user.configuration.rightClick || !user.configuration.devMode) {
            return false
        }
    }

    /**
     * Por medio de esta función, la consola es mostrada u ocultada al
     * usuario en función de su configuración de modo desarrollador.
     * 
     * También añade los eventos de mostrar, ocultar y cerrar a sus
     * correspondientes botones de la parte superior derecha.
     */
    console() {
        document.getElementById("toggleConsole").addEventListener("click", function(){
            document.getElementById("console").classList.toggle("active")
        })
        document.getElementById("closeConsole").addEventListener("click", function(){
            user.configuration.devMode = false
            data.establecer("devMode", false)
            alert("Modo desarrollador deshabilitado")
        })
        setInterval(function(){
            if (user.configuration.devMode) document.getElementById("console").classList.toggle("hidden", false)
            else document.getElementById("console").classList.toggle("hidden", true)
        }, 250)
    }

    /**
     * Array de las últimas 10 interacciones del usuario con la página.
     */
    static keys = []

    /**
     * Array de interacciones necesarias para activar o desactivar el modo
     * desarrollador.
     */
    static KEY_UNLOCK_DEV = ["up", "up", "up", "up", "up", "right", "left", "down", "up", "up"]
    
    /**
     * Esta función inicia el listener que comprueba una a una todas las
     * pulsaciones realizadas por el usuario.
     * 
     * Las últimas 10 pulsaciones son guardadas en `(static) keys` y comparadas con
     * las diferentes variables estáticas que empiezan por `KEY`. Si coincide con alguna
     * de ellas, la característica asociada es activada.
     */
    keyDown() {
        document.addEventListener('keydown', (event) => {
            User.keys.push(`${event.key.toLowerCase().replace("arrow", "")}`)
            if (User.keys.length > 10) User.keys.shift()
            if (User.keys.join() == User.KEY_UNLOCK_DEV.join()) {
                User.keys = []
                if (this.configuration.devMode) {
                    this.configuration.devMode = false
                    data.establecer("devMode", false)
                    alert("Modo desarrollador deshabilitado")
                } else {
                    this.configuration.devMode = true
                    data.establecer("devMode", true)
                    alert("Modo desarrollador habilitado")
                }
            }
        }, false);
    }
}