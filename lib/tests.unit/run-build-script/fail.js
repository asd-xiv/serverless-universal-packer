/** @typedef {import("tape").Test} Test */

import { unlinkSync, writeFileSync } from "node:fs"

import test from "tape"

import { runBuildScript } from "../../index.js"

/**
 * Prepare a failing packer script
 * - exit code != 0
 * @param {Test} t
 */
const beforeEach = t => {
  const scriptPath = "/tmp/up_packer-script-fail"
  const scriptContent = [
    "#!/bin/bash -e",
    'echo "Running custom packer"',
    'echo "This script will fail" >&2',
    "exit 1",
  ]

  writeFileSync(scriptPath, scriptContent.join("\n"), { mode: "775" })

  t.teardown(() => {
    unlinkSync(scriptPath)
  })

  return { scriptPath }
}

test("runBuildScript() - given [failing packer script]", async t => {
  const { scriptPath } = beforeEach(t)

  /** @type {string[]} */
  const stdout = []
  /** @type {string[]} */
  const stderr = []

  t.plan(2)

  try {
    await runBuildScript(scriptPath, {
      onStdout: input => stdout.push(input),
      onStderr: input => stderr.push(input),
    })
  } catch (error) {
    const expectedError = /** @type {Error} */ (error)

    t.equal(
      expectedError.message,
      "UniversalPacker script exited with a non-zero exit code: 1",
      "should [throw error because the script exited with a non-zero exit code]"
    )

    t.deepEqual(
      stderr.join("").trim().split("\n"),
      ["This script will fail"],
      "should [write once to stderr because the script is failing]"
    )
  }
})
