import { accessSync, unlinkSync } from "node:fs"

import test from "tape"

import { buildScriptFile } from "../index.js"

test("buildScriptFile() - given [shell and script as strings]", t => {
  const result = buildScriptFile({
    shell: "/bin/bash -e",
    script: "npm pack",
  })

  t.equal(
    result.content,
    "#!/bin/bash -e\nnpm pack",
    "should [set 'content' with valid shebang and passed 'script' string]"
  )

  t.ok(
    result.path.includes("universal-packer-"),
    "should [set 'path' with temporary file name]"
  )

  t.doesNotThrow(() => {
    accessSync(result.path)
  }, "should [write temporary file to disk]")

  t.teardown(() => {
    unlinkSync(result.path)
  })

  t.end()
})

test("buildScriptFile() - given [script as array of string]", t => {
  const result = buildScriptFile({
    shell: "/bin/bash -e",
    script: ["ls -al", "npm run build"],
  })

  t.equal(
    result.content,
    "#!/bin/bash -e\nls -al\nnpm run build",
    "should [return 'content' with valid shebang and 'script' array joined by newline]"
  )

  t.teardown(() => {
    unlinkSync(result.path)
  })

  t.end()
})
