var program = require("commander");
var chalk = require('chalk')
var webpack2 = "https://git.coding.net/plingply/vue_webpack2.X.git";
var webpack4 = "https://github.com/plingply/webpack4-template.git";
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
    downloadFun(webpack2,'vue_webpack2.X')
}

// 下载webpack4 模板
else if (program.args.length > 0 && program.args[0] == 'webpack4' && program.args[1]) {
    downloadFun(webpack4,'webpack4-template')
}

else {
    if (!program.look) {
        program.help()
    }
}


function downloadFun(url,name) {
    var spinner = ora("开始下载模板...");
    spinner.start();
    if (args[1]) {
        var tmp = path.join(process.cwd(), args[1]);
        var oldpath = path.join(process.cwd(), name);
        if (exists(tmp)) rm(tmp);
        if (exists(oldpath)) rm(oldpath);
        var c = require("child_process");
        c.execSync("git clone " + url);
        fs.rename(path.join(process.cwd(), name), tmp, function (err) {
            if (err) {
                logger.fatal("rename err:" + err)
            }

            rm(tmp + "/.git")
            spinner.stop();
            logger.fatal("下载完成")
        })
    }
}



