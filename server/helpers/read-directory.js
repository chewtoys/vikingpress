const { readdirSync } = require('fs')

/** Synchronously read all the JavaScript files in a directory.
 * @param {string} - Path to the directory you want to read
 * @returns {array} All JavaScript files in the directory you wanted to read
 */
module.exports = function readDirectory (path) {
  let fileList = []
  // Read the directory
  readdirSync(path)
  // Filter our selection to only JS files
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js')
    })
  // Process each model file
    .forEach(fileName => {
      fileList.push(fileName)
    })

  // Return the list of files in the directory
  return fileList
}
