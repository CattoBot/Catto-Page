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
        devMode: data.obtener("devMode") == "true" || false,

        /**
         * @description ¿Puede el usuario abrir el menú contextual de click derecho?
         */
        rightClick: data.obtener("rightClick") == "true" || false,

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
        console.groupCollapsed("#️⃣ Creando usuario")
        try {
            this.configuration.translation = new Translation(this.configuration.language)
            this.keyDown()
            this.console()
            document.oncontextmenu = this.rightClick;
            console.log("✅ Usuario creado correctamente")
        } catch (e) {
            console.groupCollapsed("❌ No ha sido posible crear el usuario correctamente")
            console.error(e)
            console.groupEnd()
        } finally {
            console.groupEnd()
        }
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
            console.log("❌ Permiso de click derecho denegado")
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
        console.groupCollapsed("#️⃣ Configuración de consola")
        try {
            try {
                document.getElementById("toggleConsole").addEventListener("click", function () {
                    document.getElementById("console").classList.toggle("active")
                })
                console.log("✅ \"toggleConsole\" ha sido configurado exitosamente")
            } catch (e) {
                console.groupCollapsed("❌ No ha sido posible configurar \"toggleConsole\"")
                console.error(e)
                console.groupEnd()
            }
            try {
                document.getElementById("closeConsole").addEventListener("click", function () {
                    user.configuration.devMode = false
                    data.establecer("devMode", false)
                    alert("Modo desarrollador deshabilitado")
                })
                console.log("✅ \"closeConsole\" ha sido configurado exitosamente")
            } catch (e) {
                console.groupCollapsed("❌ No ha sido posible configurar \"closeConsole\"")
                console.error(e)
                console.groupEnd()
            }
            try {
                setInterval(function () {
                    if (user.configuration.devMode) document.getElementById("console").classList.toggle("hidden", false)
                    else document.getElementById("console").classList.toggle("hidden", true)
                }, 250)
                console.log("✅ Detector de cambios de estado en el modo desarrollador iniciado")
            } catch (e) {
                console.groupCollapsed("❌ No ha sido posible iniciar el detector de cambio de estado del modo desarrollador")
                console.error(e)
                console.groupEnd()
            }
        } catch (e) {
            console.groupCollapsed("❌ No ha sido posible configurar la consola")
            console.error(e)
            console.groupEnd()
        } finally {
            console.groupEnd()
        }
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
        console.groupCollapsed("#️⃣ Listener de tecla presionada")
        try {
            document.addEventListener('keydown', (event) => {
                User.keys.push(`${event.key.toLowerCase().replace("arrow", "")}`)
                if (User.keys.length > 10) User.keys.shift()
                if (User.keys.join() == User.KEY_UNLOCK_DEV.join()) {
                    console.groupCollapsed("#️⃣ Patrón de pulsaciones reconocido")
                    User.keys = []
                    if (this.configuration.devMode) {
                        this.configuration.devMode = false
                        data.establecer("devMode", false)
                        console.info("Modo desarrollador desactivado")
                    } else {
                        this.configuration.devMode = true
                        data.establecer("devMode", true)
                        console.info("Modo desarrollador activado")
                    }
                    console.groupEnd()
                }
            }, false);
            console.log("✅ Listener iniciado correctamente")
        } catch (e) {
            console.groupCollapsed("❌ No ha sido posible iniciar el listener")
            console.error(e)
            console.groupEnd()
        } finally {
            console.groupEnd()
        }
    }
}