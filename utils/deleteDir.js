const fs = require("fs")
var logger = require("./logger")
var tplList = require(`${__dirname}/../templates`)
var listTable = require("./listTable")
const chalk = require("chalk")

module.exports = function deletedir(key, path) {
  if (fs.existsSync("./templates/" + path)) {
    delete tplList[key]
    fs.writeFile(
      `${__dirname}/../templates.json`,
      JSON.stringify(tplList),
      "utf-8",
      err => {
        if (err) {
          logger.error(err)
        }
        console.log()
        console.log(chalk.green("删除成功!"))
        console.log()

      }
    )
    fs.rmdirSync("./templates/" + path)
  } else {
    logger.error("该模板不存在!")
    process.exit()
  }
}
