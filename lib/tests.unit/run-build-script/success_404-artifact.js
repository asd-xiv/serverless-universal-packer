/** @typedef {import("tape").Test} Test */

import { unlinkSync, writeFileSync } from "node:fs"

import test from "tape"

import { runBuildScript } from "../../index.js"

/**
 * Prepare a working packer script
 * - artifact file does not exist
 * - exit code 0
 * @param {Test} t
 */
const beforeEach = t => {
  const scriptPath = "/tmp/up-script_success-404-artifact"
  const scriptContent = [
    "#!/bin/bash -e",
    'echo "Running custom packer"',
    'echo "/path/does/not/exist"',
  ]

  writeFileSync(scriptPath, scriptContent.join("\n"), { mode: "775" })

  t.teardown(() => {
    unlinkSync(scriptPath)
  })

  return { scriptPath }
}

test("runBuildScript() - given [working script returning non-existing artifact]", async t => {
  const { scriptPath } = beforeEach(t)

  t.plan(1)

  try {
    await runBuildScript(scriptPath)
  } catch (error) {
    const expectedError = /** @type {Error} */ (error)

    t.equal(
      "ENOENT: no such file or directory, access '/path/does/not/exist'",
      expectedError.message,
      "should [throw error because the artifact does not exist]"
    )
  }
})
