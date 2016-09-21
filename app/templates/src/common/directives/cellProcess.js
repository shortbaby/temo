/**
 * @File 表格里操作指定
 */

'use strict';

Vue.directive('cellProcess', {
    params: ['option'],
    paramWatchers: {
        option: function (val, oldVal) {
            var ul = $('.process-menu');
            if (!ul.length) {
                var processItem = '';
                var option = val || [];

                option.forEach(function (item) {
                    processItem += '<li data-command="' + item.command + '">' + item.text + '</li>';
                });
                ul.html(processItem);
                // $('body').append('<ul class="dropdown-menu process-menu">' + processItem + '</ul>');
                // ul = $('.process-menu');
            }
        }
    },
    bind: function () {
        var ul = $('.process-menu');
        var loaded = false;
        var self = this;
        if (!ul.length) {

            var processItem = '';
            var option = this.params.option || [];

            option.forEach(function (item) {
                processItem += '<li data-command="' + item.command + '">' + item.text + '</li>';
            });

            $('body').append('<ul class="dropdown-menu process-menu">' + processItem + '</ul>');
            ul = $('.process-menu');

        } else {
            loaded = true;
        }

        $(this.el)
            .on('click', function (event) {

                var target = $(event.currentTarget);
                var offset = target.offset();
                var name = target.attr('data-name');
                var id = target.attr('data-id');
                var status = target.attr('data-status');

                $('body')
                    .data('id', id)
                    .data('name', name)
                    .data('status', status)

                event.stopPropagation();

                vueComponent.$parent.$parent.$emit('cellhandler', ul, +id);
                ul
                    .css({
                        top: offset.top + target.outerHeight(),
                        left: offset.left
                    })
                    .slideDown('fast');
            });
        let vueComponent = self.vm;
        function bodyClick(event) {

            var command = $(event.target).data('command');
            var data = $('body').data();
            if (command) {
                vueComponent.$parent.$parent.$emit(command, +data.id, data.name, data.status);
            }
            if (ul) {
               ul.slideUp('fast');
            }
        }

        self.bodyClick = bodyClick;

        if (!loaded) {
            $('body').bind('click', self.bodyClick);
            window.router.beforeEach(function () {
                $('body').unbind('click', self.bodyClick);
                if (ul) {
                    ul.remove();
                    ul = null;
                }
            });
        }
    },
    unbind: function () {
        $('body').unbind('click', this.bodyClick);
        setTimeout(function () {
            if (!$('.d-grid tr').length) {
                $('.process-menu').remove();
            }
        });
    }
});