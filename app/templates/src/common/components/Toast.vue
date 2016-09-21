<!--
    @file Toast
    @author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<template>
    <div id="toast" v-show="show">
        <div class="weui_mask_transparent"></div>
          <div class="weui_toast" :class="{warning: type=='warning', 'success': type=='success'}">
            <i class="weui_icon_toast"></i>
            <p class="weui_toast_content"><slot></slot></p>
        </div>
  </div>
</template>

<script>
    import store from '../../store';
    export default {
        props: {
            time: {
                type: Number,
                default: 2000
            },
            type: {
                type: String,
                default: 'warning'
            },
            show: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            show: function(val) {
                const _this = this;
                if (val) {
                    clearTimeout(this.timeout)
                    this.timeout = setTimeout(function() {
                        if (window.dispatch) {
                            window.dispatch('HIDE_TOAST');
                        } else {
                            _this.show = false;
                        }
                    }, _this.time)
                }
            }
        }
    }
</script>

<style lang="sass">
    .weui_toast {
        position: fixed;
        z-index: 9999;
        padding: 0 20px;
        // width: 180px;
        min-height: 40px;
        top: 180px;
        left: 50%;
        margin-left: -3.8em;
        text-align: center;
        border-radius: 3px;
        background: #f2dede;
        opacity: 0.95;
        color: #a94442;
        border: 1px solid #ebccd1;
        &.success {
            color: #3c763d;
            background: #dff0d8;
            border: 1px solid #d6e9c6;
        }
    }
    .weui_icon_toast {
        margin: 22px 0 0;
        display: block
    }
    .weui_icon_toast:before {
        content: '';
        color: #fff;
        font-size: 20px
    }
    .weui_toast_content {
        margin: 0 0 15px
    }    
</style>