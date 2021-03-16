#!/usr/bin/env node

let commander = require('commander');
let program = new commander.Command();
var chalk = require('chalk')
var webpack2 = "https://git.coding.net/plingply/vue_webpack2.X.git";
var webpack3 = "https://github.com/plingply/webpack3-vue-ssr.git";
var webpack4 = "https://github.com/plingply/webpack4-template.git";
var wxapp = "https://github.com/plingply/wxapp.git";
var version = require('../package.json').version
var logger = require("../lib/logger");
var rm = require("rimraf").sync;
var path = require("path");
var fs = require("fs")
var exists = fs.existsSync;
var ora = require("ora");


program
    .storeOptionsAsProperties(false) // ；屏蔽参数作为cmd的属性
    .allowExcessArguments(false) // 严格控制参数顺序
    .name('ve')
    .usage('<命令> [参数]')

program
    .command('look')
    .option('-l,--look', '输入项目名称')
    .description('展示支持模板')
    .action((cmd) => {
        console.log(chalk.green('webpack2模板：' + webpack2))
        console.log(chalk.green('webpack3模板：' + webpack3))
        console.log(chalk.green('webpack4模板：' + webpack4))
        console.log(chalk.green('wxapp模板：' + wxapp))
    });

program
    .command('webpack2')
    .option('-n,--name <name>', '输入项目名称')
    .description('创建webpack2模板')
    .action((cmd) => {
        console.log('cmd:', cmd)
        downloadFun(webpack2, cmd.name)
    });

program
    .command('webpack3')
    .option('-n,--name <name>', '输入项目名称')
    .description('创建webpack3模板')
    .action((cmd) => {
        console.log('cmd:', cmd)
        downloadFun(webpack3, cmd.name)
    });

program
    .command('webpack4')
    .option('-n,--name <name>', '输入项目名称')
    .description('创建webpack4模板')
    .action((cmd) => {
        console.log('cmd:', cmd)
        downloadFun(webpack4, cmd.name)
    });

program
    .command('wxapp')
    .option('-n,--name <name>', '输入项目名称')
    .description('创建小程序模板')
    .action((cmd) => {
        console.log('cmd:', cmd)
        downloadFun(wxapp, cmd.name)
    });

program.version(version, '-v, --version', '显示ve版本');
program.helpInformation();

program.parse(process.argv);

function downloadFun(url, name) {
    var spinner = ora("开始下载模板...");
    spinner.start();
    if (!name) {
        logger.fatal("请输入项目名称")
        return
    }
    var oldpath = path.join(process.cwd(), name);
    if (exists(oldpath)) {
        logger.fatal("目录已存在")
        return
    };

    var c = require("child_process");
    c.execSync("git clone " + url + " " + name);
    rm(oldpath + "/.git")
    spinner.stop();
    logger.success("下载完成")

}
