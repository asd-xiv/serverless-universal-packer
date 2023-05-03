/**
 * @returns {string}
 * @example
 * sayGoodbye()
 * // "goodbye"
 */
const sayGoodbye = () => "goodbye"

/**
 * @typedef  {Object} SayHelloFnReturn
 * @property {string} beep
 * @property {string} boop
 */

/**
 * Function with types infered from docs, 2 birds in hand.
 * @param {Object}          [props={}]
 * @param {"lorem"|"dolor"} [props.foo="lorem"]
 * @param {string}          [props.bar="ipsum"]
 * @returns {SayHelloFnReturn}
 * @example
 * sayHello({ foo: "dolor" })
 * // { beep: "hello dolor", boop: "hello ipsum" }
 */
const sayHello = ({ foo = "lorem", bar = "ipsum" } = {}) => ({
  beep: `hello ${foo}`,
  boop: `hello ${bar}`,
})

export { sayHello, sayGoodbye }
