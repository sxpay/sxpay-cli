const { prompt } = require("inquirer")
const { writeFile } = require("fs")
const { listTable } = require("../utils/listTable")
var List = require("prompt-list")
var deletedir = require("../utils/deleteDir")
let tplList = require(`${__dirname}/../templates`)
const chalk = require("chalk")
var logger = require("../utils/logger")

var enquirer = new List({
  name: "Templates",
  type: "list",
  message: "请选择你要删除的模板名?",
  choices: Object.values(tplList)
})
module.exports = enquirer.run().then(function(answers) {
  if (answers) {
    var answersArray = [
      {
        type: "confirm",
        name: "deleteName",
        message: `确定要删除该模板吗?(${answers})`,
        default: true
      }
    ]
    prompt(answersArray).then(obj => {
      if (obj.deleteName) {
        for (let key in tplList) {
          if (tplList[key] === answers) deletedir(key, answers)
        }
      } else {
        console.log()
        console.log(chalk.green("取消成功!"))
        console.log()
      }
    })
  } else {
    console.log()
    logger.error("没有要删除的模板")
    console.log()
  }
})
