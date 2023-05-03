import test from "tape"

import { sayHello, sayGoodbye } from "./hello-world.js"

test("sayHello", t => {
  t.deepEqual(sayHello({ foo: "dolor" }), {
    beep: "hello dolor",
    boop: "hello ipsum",
  })
  t.end()
})

test("sayGoodbye", t => {
  t.equal(sayGoodbye(), "goodbye")
  t.end()
})
