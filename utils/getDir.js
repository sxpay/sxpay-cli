const fs = require("fs")
var logger = require("./logger")
var tplList = require(`${__dirname}/../templates`)
var listTable = require("./listTable")
module.exports = function mkdir(path, name) {
  console.log("./templates/" + path)
  if (!fs.existsSync("./templates/" + path)) {
    tplList[+new Date()] = path
    fs.writeFile(
      `${__dirname}/../templates.json`,
      JSON.stringify(tplList),
      "utf-8",
      err => {
        if (err) {
          logger.error(err)
        }
        listTable(tplList, name, "新增模板文件夹成功!")
      }
    )
    fs.mkdirSync("./templates/" + path)
  } else {
    logger.error("该模板已存在!")
    process.exit()
  }
}
