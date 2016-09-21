/**
 * @file 异步遍历文件系统
 * @author lixiaobin copy
 */

'use strict';

var fs = require('fs');
var path = require('path');

/**
 * 创建一个匹配函数，函数返回值如下:
 *
 *  1: 过滤
 *  0: 跳过
 * -1: 不过滤
 *
 * @inner
 * @param {Array.<string>} patterns 过滤条件
 * @return {Function}
 * @argument {string} @return.file 文件完整路径
 */
function matchFactory(patterns) {

    if (Array.isArray(patterns)) {

        /**
         * 获得文件类型
         *
         *  1: 文件
         * -1: 文件夹
         *
         * @param {string} file 文件路径
         * @return {number}
         */
        function getFileType(file) {
            return /\.[^\.]+$/.test(file) ? 1 : -1;
        }

        patterns = patterns.map(function (pattern) {
            return {
                pattern: new RegExp(
                            pattern.replace(/\./g, '\\.')
                                   .replace(/\*+/g, '.*?')
                                   .replace(/\/$/, '')        // 传入 xx/ 转成 xx，便于统一路径格式
                                   .replace(/\//g, '\\/')
                          + '$'
                        , 'i'),
                fileType: getFileType(pattern)
            };
        });

        return function (file) {
            var fileType = getFileType(file);
            var result = 0;

            for (var i = patterns.length - 1, item; i >= 0; i--) {
                item = patterns[i];

                // 同类才能尝试匹配
                if (item.fileType * fileType > 0) {
                    result = item.pattern.test(file) ? 1 : -1;
                    if (result > 0) {
                        break;
                    }
                }
            }

            return result;
        };
    }

    return function () {
        return 0;
    };

}


/**
 * 解析目录的树形结构
 *
 * @param {Object} options
 * @param {string} options.dir 目录
 * @param {Array.<string>=} options.include 如果设置了 include，则不满足规则的文件都会被过滤
 * @param {Array.<string>=} options.exclude 如果设置了 exclude，则满足规则的文件都会被过滤
 * @param {Function} callback
 * @argument {Object} callback.tree 目录的树形结构
 */
function parse(options) {

    var dir = path.normalize(options.dir);

    var includeMatcher = matchFactory(options.include);
    var excludeMatcher = matchFactory(options.exclude);

    var tree = {
        id: dir,
        name: path.basename(dir),
        children: [ ]
    };

    var dirCounter = 0;
    var fileCounter = 0;

    /**
     * 扫描目录
     *
     * @private
     * @param {Object} dirNode
     */
    function skanDir(dirNode) {

        var children = dirNode.children;

        dirCounter++;

        fs.readdir(dirNode.id, function (err, files) {

            dirCounter--;

            if (err) {
                console.error(err);
            } else if (files.length > 0) {
                files.forEach(function (file) {

                    var fullPath = path.join(dirNode.id, file);

                    if (includeMatcher(fullPath) < 0
                        || excludeMatcher(fullPath) > 0
                    ) {
                        return;
                    }

                    fileCounter++;

                    fs.stat(fullPath, function (err, stats) {

                        fileCounter--;

                        var subNode = {
                            id: fullPath,
                            name: path.basename(fullPath)
                        };
                        children.push(subNode);

                        if (stats.isDirectory()) {
                            subNode.children = [ ];
                            skanDir(subNode);
                        }
                        else {
                            checkComplete();
                        }
                    });
                });
            }

            checkComplete();

        });
    }

    function checkComplete() {
        if (dirCounter === 0 && fileCounter === 0) {
            options.callback(tree);
        }
    }

    fs.stat(dir, function (err, stats) {
        if (err) {
            console.error(err);
        } else {
            if (stats.isDirectory()) {
                skanDir(tree);
            }
            else {
                console.error('options.dir is not a directory.');
            }
        }
    });
}

/**
 * 遍历树形结构
 *
 * @param {Object} tree
 * @return {Function} callback
 * @argument {Object} callback.node
 */
function traverse(tree, callback) {

    // 处理目录节点
    callback(tree);

    if (tree.children) {
        tree.children.forEach(function (node) {
            if (node.children) {
                traverse(node, callback);
            } else {
                // 处理文件节点
                callback(node);
            }
        });
    }
}

exports.parse = parse;
exports.traverse = traverse;
