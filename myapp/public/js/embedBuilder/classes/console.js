/**
 * 
 * -----
 * 
 * Gracias a esta clase podrás crear una consola de usuario de forma rápida y sencilla.
 * 
 * -----
 * 
 * **ESTRUCTURA**
 * 
 * > ```js
 * class Console {
 *   permissions: {
 *     ...
 *     check(): boolean
 *   }
 * }
 * > ```
 * 
 */

class Console {

    #admin = {
        enabled: false
    }

    /**
     * @description Modo en el que se puede encontrar la consola.
     * 
     * Podría variar entre `0` (Estado habitual, ejecuta comandos) y `1` (Estado para
     * ejecutar código JS).
     * 
     * @example mode = 1
     */
    #mode = 0

    /**
     * 
     * -----
     * 
     * Gracias a esta clase podrás crear una consola de usuario de forma rápida y sencilla.
     * 
     * -----
     * 
     * **ESTRUCTURA**
     * 
     * > ```js
     * class Console {
     *   prefixes: {
     *     command: string
     *     adminCommand: string
     *   }
     *   admin: {
     *     enabled: boolean
     *   }
     *   mode: integer
     *   input(): void
     *   execute: object
     * }
     * > ```
     * 
     */
    constructor() {}

    /**
     * @description Por medio de esta función, ejecutaremos el código correspondiente al texto
     * introducido en la consola interna de la página.
     * 
     * @param {string} text Texto introducido en la consola
     * @returns {void}
     * @example input("user/login"): void
     */
    input(text) {
        
    }

    /**
     * @description En este array encontrarás un objeto individual para cada comando. En él, una
     * función `run(prefix, args)` es la ejecutada cuando el usuario hace uso del comando, una
     * constante `name` que denomina el nombre de dicho comando, una constante `alias` con un array
     * que contiene todos los alias del comando y una constante `perms` con los permisos necesarios
     * para poder ejecutar el comando.
     */
    execute = [
        {
            name: "list",
            alias: ["list", "lista"],
            /**
             * @param {string} prefix 
             * @param {string[]} args 
             * @return {boolean}
             */
            run(prefix, args) {

            }
        }
    ]

    /**
     * @description Prefijo que se debe introducir antes de ejecutar un comando.
     * 
     * Los prefijos son útiles para determinar con qué nivel de permisos quiere
     * realizar el usuario la acción, o si quiere ejecutar un comando en el modo de
     * consola de JavaScript.
     */
    static prefixes = {
        /**
         * @description Prefijo para los comandos generales.
         * 
         * -----
         * 
         * @example Console.prefixes.command = "user/"
         */
        command: "user/",

        /**
         * @description Prefijo para los comandos de administrador.
         * 
         * -----
         * 
         * @example Console.prefixes.adminCommand = "admin/"
         */
        adminCommand: "admin/"
    }

    /**
     * Lista de permisos disponibles para los usuarios.
     * 
     * No tener permisos equivale a tener permiso `0x0`.
     */
    static permissions = {

        /**
         * Todos los permisos
         */
        admin: 0x0001,

        /**
         * Gestionar los permisos que tiene un usuario
         */
        manage_permissions: 0x0002,

        /**
         * Gestionar y modificar el contenido de la página
         */
        manage_page: 0x0004,

        /**
         * Utilizar funciones de JavaScript de la página
         */
        javascript_functions: 0x0008,

        /**
         * Utilizar funciones nativas de JavaScript
         */
        javascript: 0x0010,

        /**
         * Gestionar todos los aspectos de la sesión
         */
        manage_session: 0x0020,

        /**
         * Iniciar sesión
         */
        login: 0x0040,

        /**
         * Cerrar sesión
         */
        logout: 0x0080,

        /**
         * Alternar entre cuentas
         */
        switch: 0x0100,

        /**
         * Leer logs
         */
        read: 0x0200,

        /**
         * Guardar el historial de mensajes de la consola
         */
        history: 0x0400,

        /**
         * Compartir el historial de mensajes de la consola
         */
        share: 0x0800,

        /**
         * Escribir en la consola
         */
        write: 0x1000,

        /**
         * @description Con esta función comprobaremos si ciertos permisos serían suficientes para
         * satisfacer otro.
         * 
         * Es recomendable utilizarlo con los permisos de usuario y
         * permisos requeridos para comprobar si un usuario dispone de los permisos
         * requeridos.
         * 
         * -----
         * 
         * @param {integer} a Nivel de permisos del usuario
         * @param {integer} b Nivel de permisos requerido
         * @returns {boolean} boolean (El nivel de permisos del usuario incluye el permiso especificado)
         * @example check(5, 1<<2): true
         */
        check(a, b) {
            console.groupCollapsed("#️⃣ Comprobación de permisos")
            console.log("*️⃣ Nivel dispuesto: ", a)
            console.log("*️⃣ Nivel requerido: ", b)
            let result = (a&b)==b
            if (result) {
                console.log("*️✅ ¡Permiso compatible!")
            } else {
                console.log("*️❌ ¡Permiso incompatible!")
            }
            console.groupEnd()
            return result
        }
    }
}