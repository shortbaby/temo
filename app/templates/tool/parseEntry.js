/**
 * @file 解析所有的entry
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

var path = require('path');
var fs = require('fs');
var fsTree = require('./fsTree');
var projectDir = path.resolve(__dirname, '..');
var jsDir = path.resolve(projectDir, 'src');
var outputModuleFile = path.resolve(projectDir, 'gulp/config/entry.json');
var moduleFile = fs.readFileSync(outputModuleFile, 'utf-8');
var moduleData = JSON.parse(moduleFile);

fsTree.parse({
    dir: jsDir,
    exclude: ['/common', '/config', 'module'],
    callback: function (tree) {

    	var jsArray = [];
        var dir = path.relative(projectDir, jsDir);

        fsTree.traverse(
            tree,
            function (node) {

                var parts = node.name.split('.');

                if (parts.length === 2 && parts[1].toLowerCase() === 'js') {

                    var subPath = path.relative(jsDir, node.id);
                    var subDir = path.dirname(subPath);

                    jsArray.push(
                    	path.join(dir, subPath)
                    );
                }
            }
        );

        var temp = {};

        for (var k in jsArray) {
            var item = jsArray[k];
            var fileName = item.match(/src\/([\w|\/]+)\./)[1];
            item = item.replace('src/', './src/');
            temp[fileName] = item;
        }

        moduleData.entry = temp;

        fs.appendFile(outputModuleFile, '', function () {
            fs.writeFile(outputModuleFile, JSON.stringify(moduleData, null, 4));
            console.log('gulp/config/entry.json已更新');
        });
    }
});