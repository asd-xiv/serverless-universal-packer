/* eslint-disable promise/avoid-new */

/**
 * @typedef  {import("serverless")} Serverless
 * @typedef  {import("serverless").Options} PluginOptions
 * @typedef  {import("serverless/classes/Plugin").Logging} PluginLogging
 */

import { execFile } from "node:child_process"
import { unlinkSync, writeFileSync } from "node:fs"
import { access } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"

/**
 * @typedef  {Object} UniversalPackerSettings
 * @property {string|string[]} script
 * @property {string}          shell
 */

/**
 * Get plugin settings from config, merged with defaults
 * @param {Record<string, any>} serverlessCustom
 * @returns {UniversalPackerSettings}
 */
export const getPluginSettings = serverlessCustom => {
  const { shell = "/bin/bash -e", script = "npm pack" } =
    serverlessCustom["universalPacker"] || {}

  return { shell, script }
}

/**
 * Build a temporary executable file with the script defined in the custom
 * configuration
 * @param {UniversalPackerSettings} settings
 * @returns {{content: string, path: string}}
 */
export const buildScriptFile = settings => {
  const temporaryPath = join(tmpdir(), `universal-packer-${Date.now()}.sh`)
  const { shell } = settings
  let { script } = settings

  if (Array.isArray(script)) {
    script = script.join("\n")
  }

  script = `#!${shell}\n${script}`
  writeFileSync(temporaryPath, script, { mode: "775" })

  return {
    content: script,
    path: temporaryPath,
  }
}

/**
 * Run a shell script and return the path to the artifact
 * @param {string}                  filePath
 * @param {object}                  props
 * @param {(input: string) => void} props.onStdout
 * @param {(input: string) => void} props.onStderr
 * @returns {Promise<string>}
 */
export const runBuildScript = async (filePath, { onStdout, onStderr }) =>
  new Promise((resolve, reject) => {
    const packingProcess = execFile(filePath)
    const { stdout, stderr } = packingProcess
    let stdoutData = ""
    let stderrData = ""

    if (stdout) {
      stdout.on("data", data => {
        stdoutData += data
        onStdout(data)
      })
    }

    if (stderr) {
      stderr.on("data", data => {
        stderrData += data
        onStderr(data)
      })
    }

    packingProcess.on("close", code => {
      if (code !== 0) {
        return reject(
          new Error(
            `UniversalPacker script exited with a non-zero exit code: ${code}`,
            {
              cause: stderrData,
            }
          )
        )
      }

      const lines = stdoutData.trim().split("\n")
      const artifact = lines[lines.length - 1]

      if (!artifact) {
        return reject(
          new Error(
            `UniversalPacker script exited with zero code but did not return an artifact`
          )
        )
      }

      return access(artifact)
        .then(() => resolve(artifact))
        .catch(error => reject(error))
    })
  })

export default class UniversalPacker {
  /**
   * @name constructor
   * @param {Serverless}    serverless
   * @param {PluginOptions} options
   * @param {PluginLogging} logging
   */
  constructor(serverless, options, { log, progress }) {
    this.serverless = serverless
    this.options = options
    this.log = log
    this.progress = progress.get("package")
    this.hooks = {
      "before:package:createDeploymentArtifacts": () => this.package(),
      "after:package:createDeploymentArtifacts": () => this.cleanup(),
    }

    // Plugin specific
    this.upSettings = getPluginSettings(this.serverless.service.custom)
    this.upScript = buildScriptFile(this.upSettings)
  }

  /**
   * Package the service using script defined in serverless.yml under
   * custom.universalPacker
   * @returns {Promise<void>}
   */
  async package() {
    this.log.verbose("Using UniversalPacker's script:")
    this.log.verbose(this.upScript.content)

    return runBuildScript(this.upScript.path, {
      onStdout: data => this.progress.update(data),
      onStderr: data => this.log.error(data),
    }).then(artifact => {
      this.serverless.service.package["artifact"] = artifact
      this.log.success(`UniversalPacker completed successfully with artifact`)
      this.log.verbose(artifact)
    })
  }

  cleanup() {
    if (this.upScript.path) {
      this.log.verbose("Cleaning up temporary script file")
      this.log.verbose(this.upScript.path)

      unlinkSync(this.upScript.path)
    }
  }
}
