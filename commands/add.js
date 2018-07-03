const { prompt } = require("inquirer")
var getTemp = require("../utils/getTemp")
var getDir = require("../utils/getDir")
var program = require("commander") // node操作命令
var getAnswersArray = require("../utils/getAnswersArray")
var logger = require("../utils/logger")

if (typeof program.args[0] === "object") {
  logger.error("命令使用错误， 用法: sxpay add <app-frame>")
  return
}
var question = getAnswersArray(program.args[0])

module.exports = prompt(question).then(obj => {
  let template = getTemp(program.args[0], obj)
  getDir(template, program.args[0])
})
