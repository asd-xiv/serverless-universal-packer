/** @typedef {import("tape").Test} Test */

import { unlinkSync, writeFileSync } from "node:fs"

import test from "tape"

import { runBuildScript } from "../../index.js"

/**
 * Prepare a working packer script
 * - artifact file not emmited (nothing written to stdout)
 * - exit code 0
 * @param {Test} t
 */
const beforeEach = t => {
  const scriptPath = "/tmp/up-script_success-no-artifact"
  const scriptContent = ["#!/bin/bash -e", 'artifact_path="/tmp/up_artifact"']

  writeFileSync(scriptPath, scriptContent.join("\n"), { mode: "775" })

  t.teardown(() => {
    unlinkSync(scriptPath)
  })

  return { scriptPath }
}

test("runBuildScript() - given [working script without returning artifact]", async t => {
  const { scriptPath } = beforeEach(t)

  /** @type {string[]} */
  const stdout = []
  /** @type {string[]} */
  const stderr = []

  t.plan(1)

  try {
    await runBuildScript(scriptPath, {
      onStdout: input => stdout.push(input),
      onStderr: input => stderr.push(input),
    })
  } catch (error) {
    const expectedError = /** @type {Error} */ (error)

    t.equal(
      "UniversalPacker script exited with zero code but did not return an artifact",
      expectedError.message,
      "should [throw error because no artifact outputed]"
    )

    if (expectedError.stack !== undefined) {
      t.comment(expectedError.message)
      expectedError.stack.split("\n").forEach(line => {
        t.comment(line)
      })
    }
  }
})
