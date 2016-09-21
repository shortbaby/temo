/**
 * @fileOverview file
 * @author lixiaobin
 */

'use strict';

/**
 * 获取文件信息
 * @param  {string} requestPath
 * @return {Object}
 */
exports.getFileInfo = function (requestPath) {

    var filePath = '.' + requestPath;
    var lastIndex = filePath.lastIndexOf('.');
    var directoryPath = filePath.substring(0, lastIndex);
    var fileType = filePath.substring(lastIndex + 1);
    var fileName = filePath.substring(filePath.lastIndexOf('/') + 1, lastIndex);

    return {
        directoryPath: directoryPath,
        filePath: filePath,
        fileType: fileType,
        fileName: fileName
    };

};