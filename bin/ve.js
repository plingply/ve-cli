#!/usr/bin/env node

var program = require('commander');
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
    .version(version)
    .usage("webpack2 [项目名称]")
    .option('-l, --look', '查看支持的webpack版本，以及资源路径')
    .parse(process.argv);

if (program.look) {
    console.log(chalk.green('webpack2模板：' + webpack2))
    console.log(chalk.green('webpack4模板：' + webpack4))
};


// 下载webpack2 模板
if (program.args.length > 0 && program.args[0] == 'webpack2' && program.args[1]) {
    downloadFun(webpack2, program.args[1])
}

// 下载webpack4 模板
else if (program.args.length > 0 && program.args[0] == 'ssr' && program.args[1]) {
    downloadFun(webpack3, program.args[1])
}

// 下载webpack4 模板
else if (program.args.length > 0 && program.args[0] == 'webpack4' && program.args[1]) {
    downloadFun(webpack4, program.args[1])
}

// 下载小程序 模板
else if (program.args.length > 0 && program.args[0] == 'wxapp' && program.args[1]) {
    downloadFun(wxapp, program.args[1])
} else {
    if (!program.look) {
        program.help()
    }
}


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