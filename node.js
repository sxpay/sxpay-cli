const fs = require("fs")
const join = require("path").join
/**
 *
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findSync(startPath) {
  let result = []
  function finder(path) {
    let files = fs.readdirSync(path)
    files.forEach((val, index) => {
      let fPath = join(path, val)
      let stats = fs.statSync(fPath)
      if (stats.isDirectory()) {
        result.push(fPath.split("/")[fPath.split("/").length - 1])
      }
    })
  }
  finder(startPath)
  console.log(result)
  return result
}
let fileNames = findSync("./templates")
