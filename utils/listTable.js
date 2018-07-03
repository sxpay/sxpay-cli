const Table = require("cli-table")
const chalk = require("chalk")

const table = new Table({
  head: ["orderNum", "Frame", "templateName"],
  style: {
    head: ["green"]
  }
})
module.exports = function listTable(tplList, name, lyric) {
  const list = Object.keys(tplList)
  if (list.length) {
    list.forEach((key, index) => {
      table.push([index + 1, name, tplList[key]])
      if (table.length === list.length) {
        console.log(table.toString())
        if (lyric) {
          console.log(chalk.green(`\u2714 ${lyric}`))
        }
        process.exit()
      }
    })
  } else {
    console.log(table.toString())
    if (lyric) {
      console.log(chalk.green(`\u2714 ${lyric}`))
    }
    process.exit()
  }
}
