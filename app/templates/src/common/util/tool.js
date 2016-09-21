

'use strict';

export function getTimeStr (timestamp, pattern) {
    if (timestamp) {
        return Date.format(new Date(timestamp), pattern);
    } else {
        return '';
    }
}

export function optionMap (data, hasBlank) {
    let options = data.map(
        (item) => {
            return {
                value: item.id,
                label: item.name
            }
        }
    )
    if (hasBlank) {
        options.unshift(
            {
                value: '-1',
                label: '请选择'
            }
        );
        return options;
    } else {
        return options;
    }
}

export function getYearOptions (ceiling) {
    var a = [];
    while (ceiling) {
        a.unshift(ceiling);
        ceiling -= 1;
    }
    return a;
}

export function getTimestamp (timeStr) {
    return timeStr === '' ? null : +new Date(timeStr);
}

export function getOptionValue (v) {
    return v >= 0 ? v : null;
}

export function getInputValue (v) {
    return v ? v : null;
}

export function isEmpty (form, field) {
    let f = form[field];
    return (f.$dirty && f.$error.required)
        || (form.$submitted && f.$error.required);
}

export function isFormatError (form, field) {
    let f = form[field];
    return (f.$dirty && f.$invalid)
        || (form.$submitted && f.$invalid);
}

export function merge(target) {
    for (var i = 1, j = arguments.length; i < j; i++) {
        var source = arguments[i];
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                var value = source[prop];
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    }

    return target;
}

export function debounce(fn, delay) {
    var timer;

    return function() {
        var context = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function() {
            fn.apply(context, args);
            timer = null;
        }, delay);
    };
}

export function throttle(fn, delay) {
    var now, lastExec, timer, context, args;

    var execute = function() {
        fn.apply(context, args);
        lastExec = now;
    };

    return function() {
        context = this;
        args = arguments;

        now = Date.now();

        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        if (!lastExec) {
            execute();
        } else {
            var diff = delay - (now - lastExec);
            if (diff < 0) {
                execute();
            } else {
                timer = setTimeout(function() {
                    execute();
                }, diff);
            }
        }
    };
}

export function getPath(object, prop) {
    prop = prop || '';
    var paths = prop.split('.');
    var current = object;
    var result = null;
    for (var i = 0, j = paths.length; i < j; i++) {
        var path = paths[i];
        if (!current) break;

        if (i === j - 1) {
            result = current[path];
            break;
        }
        current = current[path];
    }
    return result;
}

export function setPath(object, prop, value) {
    if (prop === undefined || prop === null) return;

    if (typeof prop === 'object') {
        var target = prop;
        for (prop in target) {
            if (target.hasOwnProperty(prop)) {
                setPath(object, prop, target[prop]);
            }
        }
    } else {
        prop = prop || '';
        var paths = prop.split('.');
        var current = object;
        for (var i = 0, j = paths.length; i < j; i++) {
            var path = paths[i];
            if (!current) break;
            if (i === j - 1) {
                current[path] = value;
                break;
            }
            current = current[path];
        }
    }
}

var scrollbarWidth;

export function getScrollbarWidth() {
    if (scrollbarWidth !== undefined) return scrollbarWidth;

    var outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.position = 'absolute';
    outer.style.top = '-9999px';
    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    outer.style.overflow = 'scroll';

    var inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    var widthWithScroll = inner.offsetWidth;
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}

/**
 * 判断一个dom元素是否在另一个dom元素内
 * @param  {[dom]}  node
 * @param  {[dom]}  target
 * @return {Boolean}
 */
export function isInside(node, target) {
    if (node == null) {
        return false;
    } else if (node == target) {
        return true
    } else {
        return isInside(node.parentNode, target);
    }
}
