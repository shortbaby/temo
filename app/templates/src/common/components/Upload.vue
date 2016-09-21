<template>
    <div class="upload-wrapper clearfix">
        <div class="upload-btn">
            <slot></slot>
            <form onsubmit="return false" id="{{key}}-form">
                <input type="file" name="{{ key }}" @change="fileInputChange" accept="{{ accept }}" multiple="{{ multiple }}">
            </form>
        </div>
        <span v-if="tip" class="tip">{{ tip }}</span>
    </div>
</template>

<script>
    export default {
        props: {
            accept: {
                type: String,
                default: 'image/*'
            },
            multiple: {
                type: Boolean,
                default: ''
            },
            key: {
                type: String,
                default: ''
            },
            tip: {
                type: String,
                default: ''
            }
        },
        events:  {
            reset: function () {
               this.reset();
            }
        },
        methods: {
            fileInputChange: function () {
                this.myFiles = $('input[name="' + this.key + '"]')[0].files;
                this.$dispatch('onFileChange', this.myFiles, this);
                this.reset();
            },
            reset: function () {
                $('#' + this.key + '-form')[0].reset();
            }
        }
    }
</script>

<style lang="sass">
    .upload-btn {
        position: relative;
        overflow: hidden;
        .btn {
            font-size:14px;
            color:#6f7276;
            background:#f6f7f9;
            border:1px solid #e0e0e0;
            border-radius:4px;
            width:158px;
            height:34px;
            line-height: 34px;
            padding: 0px;
        }
        float: left;
        > div {
            text-align: left;
        }
        > form {
            > input {
                position: absolute;
                top: 0;
                right: 0;
                margin: 0;
                opacity: 0;
                   -moz-transform: translate(-300px, 0) scale(4);
                -webkit-transform: translate(-300px, 0) scale(4);
                     -o-transform: translate(-300px, 0) scale(4);
                -webkit-transform: translate(-300px, 0) scale(4);
                        transform: translate(-300px, 0) scale(4);
                font-size: 23px;
                direction: ltr;
                cursor: pointer;
            }
        }
    }
    .upload-wrapper {
        .tip {
            color: #999;
            line-height: 33px;
            float: left;
            height: 33px;
            margin-left: 10px;
        }
    }
</style>
