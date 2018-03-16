#!/usr/bin/env node

/**
 * Module dependencies.
 */
var program = require("commander");
var ora = require("ora");
var exists = require("fs").existsSync;
var rm = require("rimraf").sync;
var path = require("path");
var logger = require("../lib/logger");
var chalk = require('chalk')
var fs = require("fs")

program
    .usage("init [项目名称]")

program.on("--help", function () {
    console.log();
    console.log("  例如:");
    console.log(
        chalk.gray("    # 创建新项目")
    );
    console.log("    $ ve init my-project");
});

var url = "https://git.coding.net/plingply/vue_webpack2.X.git";



/**
 * Help.
 */

function help() {
    program.parse(process.argv)
    if (program.args.length < 1) return program.help()
}
help()


var args = program.args;

function init() {
    if (args[0] != "init") {
        return program.help();
    }
    if (!args[2] || args[2] == 'v2') {
        url = "https://git.coding.net/plingply/vue_webpack2.X.git";
        console.log(chalk.green("    # v2模板地址：" + url));
    }
    downloadFun();
}

function downloadFun() {
    var spinner = ora("开始下载模板...");
    spinner.start();
    if (args[1]) {
        var tmp = path.join(process.cwd(), args[1]);
        var oldpath = path.join(process.cwd(), 'vue_webpack2.X');
        if (exists(tmp)) rm(tmp);
        if (exists(oldpath)) rm(oldpath);
        var c = require("child_process");
        c.execSync("git clone " + url);
        fs.rename(path.join(process.cwd(), 'vue_webpack2.X'), tmp, function (err) {
            if (err) {
                logger.fatal("rename err:" + err)
            }
           
            c.execSync("cd "+tmp + " & "+ rm(".git"));
            spinner.stop();
            logger.fatal("下载完成")
        })
    } else {
        var oldpath = path.join(process.cwd(), 'vue_webpack2.X');
        if (exists(oldpath)) rm(oldpath);
        var c = require("child_process");
        c.execSync("git clone " + url);
        spinner.stop();
        logger.fatal("安装完成")
    }
}

init();