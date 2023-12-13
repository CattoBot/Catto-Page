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
 *     user: object
 *     admin: object
 *   }
 * }
 * > ```
 * 
 */

class Console {

    admin = {
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
    mode = 0

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
     * @returns void
     * @example input("user/login"): void
     */
    input(text) {
        
    }

    /**
     * @description En este objeto encontrarás un objeto individual para cada comando. En él, una
     * función `run(prefix, args)` es la ejecutada cuando el usuario hace uso del comando.
     */
    execute = {
        list: {
            /**
             * @param {string} prefix 
             * @param {string[]} args 
             */
            run(prefix, args) {

            }
        }
    }

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
     * @description Objeto con los permisos necesarios para cada comando o grupo de comandos. Incluye
     * la función "check" para comprobar de forma rápida si dispone de permisos
     * suficientes.
     * 
     * Aquellos comandos cuyos permisos no están registrados, su nivel de permisos es por
     * defecto `0x0`.
     * 
     * -----
     * 
     * @example Console.permissions.admin._ = 0x1
     */
    static permissions = {
        user: {
            _: 0x0
        },
        admin: {
            _: 0x1
        },
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
         * @returns boolean (El nivel de permisos del usuario incluye el permiso especificado)
         * @example check(5, 1<<2): true
         */
        check(a, b) {
            return (a & b) == b
        }
    }
}