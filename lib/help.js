
var chalk = require('chalk')
module.exports = function(){
	console.log();
    console.log("  例如:");
    console.log(
        chalk.gray("    # 创建新项目")
    );
    console.log("    $ ve init my-project");
}