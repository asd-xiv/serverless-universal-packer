/** @typedef {import("tape").Test} Test */

import { unlinkSync, writeFileSync } from "node:fs"

import test from "tape"

import { runBuildScript } from "../../index.js"

/**
 * Prepare a working packer script
 * - artifact file exists
 * - exit code 0
 * @param {Test} t
 */
const beforeEach = t => {
  const scriptPath = "/tmp/up-script_success"
  const scriptContent = [
    "#!/bin/bash -e",
    'echo "Running custom packer"',
    'artifact_path="/tmp/up_artifact"',
    "touch $artifact_path",
    "echo $artifact_path",
  ]

  writeFileSync(scriptPath, scriptContent.join("\n"), { mode: "775" })

  t.teardown(() => {
    unlinkSync(scriptPath)
  })

  return { scriptPath }
}

test("runBuildScript() - given [working script returning existing artifact]", async t => {
  const { scriptPath } = beforeEach(t)

  /** @type {string[]} */
  const stdout = []
  /** @type {string[]} */
  const stderr = []

  const artifact = await runBuildScript(scriptPath, {
    onStdout: input => stdout.push(input),
    onStderr: input => stderr.push(input),
  })

  t.equal(
    artifact,
    "/tmp/up_artifact",
    "should [return a string with the artifact path]"
  )

  t.deepEqual(
    stdout.join("").trim().split("\n"),
    ["Running custom packer", "/tmp/up_artifact"],
    "should [write twice to stdout, the echo and the artifact]"
  )

  t.deepEqual(
    stderr,
    [],
    "should [not write to stderr because the script is not failing]"
  )

  t.end()

  t.teardown(() => {
    unlinkSync(artifact)
  })
})
