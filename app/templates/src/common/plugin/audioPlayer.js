/**
 * @file 音频播放器
 * @author  XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

var audioPlayer = {

    init: function() {

        var elems = $('[audioplayer]');

        elems.each(function(index, item) {
            if (!item.init) {
                item.init = true;
                audioPlayer.initStructure($(item), index);
            }
        });
    },
    audioList: [],
    pauseOther: function () {
        this.audioList.forEach(function (item, index) {
            var elem = item.elem;
            if (elem.audioStatus) {
                item.audio.pause();
                elem.audioStatus = 0;
                elem.removeClass('playing');
            }
        });
    },
    initStructure: function($elem, index) {
        var url = $elem.data('url');
        var len = $elem.data('length');
        var self = this;

        var $audio = $('<audio preload="none" volume="1.0" src="' + url + '"></audio>');
        var audio = $audio[0];
        this.audioList.push({
            audio: audio,
            elem: $elem
        });
        $elem.html('').addClass('audio-player');

        var lengthHtml = '' + '<i class="icon-wave-right"></i>' + '<span class="audio-length">' + Math.floor(len / 60) + '\'' + len % 60 + '"' + '</span>';

        $elem.html(lengthHtml);

        $elem.on('click', function(e) {
            if ($elem.audioStatus) {
                audio.pause();
                $elem.audioStatus = 0;
                $elem.removeClass('playing');
            } else {
                self.pauseOther();
                if (!$elem.audioLoaded) {
                    $elem.html('下载中...');
                }
                audio.play();
                $elem.audioStatus = 1;
                $elem.addClass('playing');
            }
            e.stopPropagation();
        });

        audio
            .addEventListener('ended', function() {
                $elem.audioStatus = 0;
                $elem.removeClass('playing');
            });

        audio.addEventListener('loadeddata', function() {
            $elem.audioLoaded = 1;
            $elem.html(lengthHtml);
        });

        $(window).on('beforeunload', function() {
            audio.pause();
            $elem.audioStatus = 0;
            $elem.removeClass('playing');
            audio = null;
        });
    }
};

export default audioPlayer;
