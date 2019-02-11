/* global maroon */
const { readdir } = require('fs')
const { promisify } = require('util')

const readDirAsync = promisify(readdir)

/**
 * Read a file directory.
 * @param {string} pathToDirectory - Path to the directory you want to read
 * @returns {array} - The names of the files in the directory
 */
module.exports = async function readDir(pathToDirectory) {
    return await readDirAsync(pathToDirectory)
}
