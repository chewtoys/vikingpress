/**
 * Find a JS file in an array, and remove it from the array.
 * @param {array} fileList - Array of file names
 * @param {number} i - Index in array
 */
module.exports = async function findFileAndRemove(fileList, i) {
    let index, fileName
    if (typeof i === 'string') {
        fileName = i
        index = fileList.indexOf(fileName)
    }
    else {
        fileName = fileList[i]
        index = fileList.indexOf(fileName)
    }
    fileList.splice(index, 1)
    if (index !== -1) {
        return fileName
    }
    else {
        return null
    }
}
