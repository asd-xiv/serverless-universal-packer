import test from "tape"

import { getPluginSettings } from "../index.js"

test("getPluginSettings() - given [no custom configuration]", t => {
  const result = getPluginSettings({})

  t.equal(
    result.script,
    "npm pack",
    "should [return script with default value 'npm pack']"
  )
  t.equal(
    result.shell,
    "/bin/bash -e",
    "should [return 'shell' with default value '/bin/bash -e]'"
  )
  t.end()
})

test("getPluginSettings() - given [custom configuration]", t => {
  const result = getPluginSettings({
    universalPacker: {
      script: "npm run build",
      shell: "/bin/sh -e",
    },
  })

  t.equal(
    result.script,
    "npm run build",
    "should [return 'script' with custom value 'npm run build']"
  )
  t.equal(
    result.shell,
    "/bin/sh -e",
    "should [return 'shell' with custom value '/bin/sh -e']"
  )
  t.end()
})
