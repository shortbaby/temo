'use strict'
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec;
module.exports = () => {
    co(function*() {
        // 处理用户输入
        let tplName = 'tianxiao';
        let fileUrl = config.tpl[tplName].url;
        let serverPort;
        let proxyPort;
        //let tplName = yield prompt('Template name: ')
        let projectName = yield prompt('Project name: ')
        let useDefault = yield prompt.confirm('Do you want use the default server port? (y/n)');

        if (!useDefault) {
            serverPort = yield prompt('WebpackDevServer Port(betweent 8000 and 9999): ')
            proxyPort = yield prompt('WebpackDevServer Proxy Port(betweent 8000 and 9999):')

            if (parseInt(serverPort) > 9999 || parseInt(serverPort) < 8000 
                || parseInt(proxyPort) > 9999 || parseInt(proxyPort) < 8000) {

                console.log (chalk.red(`\n Server Port must be betweent 8000 and 9999`));
                process.exit();
            }
        }
        let templatePath = path.resolve(__dirname, '..', fileUrl);
        console.log(chalk.green(`\n Template path: ${templatePath}`));

        //模板项目的路径
        
        //branch = config.tpl[tplName].branch

        // git命令，远程拉取项目并自定义项目名
        //let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`
        
        console.log(chalk.green('\n Start generating...'));

        fs.mkdir(projectName, function(err) {
            if (err) {
                console.log(chalk.red(err))
            } else {
                let cmdStr = `cp -r ${templatePath}/* ${projectName}`;

                console.log(chalk.magenta(`\n ${cmdStr}`));

                console.log(chalk.magenta(`\n Waiting for seconds...`));
                exec(cmdStr, (error, stdout, stderr) => {
                    if (error) {
                        console.log(error)
                        process.exit()
                    }
                    if (serverPort && proxyPort ) {
                        let portConfig = {
                            "devServerPort": serverPort,
                            "mockServerPort": proxyPort
                        }
                        fs.writeFileSync(path.resolve(projectName, './config/index.json'), JSON.stringify(portConfig), 'utf-8');
                    }
                    console.log(chalk.green('\n √ Generation completed!'))
                    console.log(chalk.green(`\n You can start the project follow steps`))
                    console.log(chalk.magenta(`\n cd ${projectName} && npm start`))
                    process.exit()
                })
            }
        })  
    })
}