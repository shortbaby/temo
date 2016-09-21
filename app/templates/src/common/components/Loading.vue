<template>
    <div id="vue-ui-loading" v-show="show" @click.stop="click($event)">
      <div class="spinner">
          <div></div>
          <div></div>
          <div></div>
      </div>
    </div>
</template>
<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            click(event) {
                event.preventDefault();
            }
        }
    }
</script>
<style lang="sass">

    @import "../../../dep/bootstrap-sass/assets/stylesheets/bootstrap/mixins/vendor-prefixes";

    #vue-ui-loading {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(211, 211, 211, .3);
        .spinner {
            position: absolute;
            width: 10rem;
            height: 2rem;
            top: 50%;
            left: 50%;
            @include translate(-50%, -50%);
            text-align: center;
            > div {
                background-color: #19c0fe;
                width: 15px;
                height: 15px;
                border-radius: 100%;
                margin: 2px;
                @include animation-fill-mode(both);
                display: inline-block;
                @include scale(0.8);
            }
            > div:nth-child(1) {
                @include animation(scale 1.4s -0.32s infinite ease-in-out);
            }
            > div:nth-child(2) {
                @include animation(scale 1.4s -0.16s infinite ease-in-out);
            }
            > div:nth-child(3) {
                @include animation(scale 1.4s infinite ease-in-out);
            }
        }
    }

    @-webkit-keyframes scale {
        0%, 80%, 100% { 
            @include scale(0.0) 
        }
        40% { 
            @include scale(1.0) 
        }
    }

    @keyframes scale {
        0%, 80%, 100% { 
            @include scale(0.0) 
        }
        40% { 
            @include scale(1.0) 
        }
    }
</style>
