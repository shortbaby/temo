<!--
    @file 评价器
    @author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<template>
  <div class="vux-rater">
    <a class="vux-rater-box" v-for="i in max" @click="handleClick(i)" :class="{'is-active':value > i}" :style="{color:colors[i],marginRight:margin+'px',fontSize: fontSize + 'px', width: fontSize + 'px', height: fontSize + 'px'}">
      <span class="vux-rater-inner">{{star}}<span class="vux-rater-outer" :style="{color: activeColor, width: cutPercent + '%'}" v-if="disabled && cutIndex === i">{{star}}</span></span>
    </a>
  </div>
</template>

<script>
  export default {
          ready() {
            this.calc();
          },
          props: {
              max: {
                  type: Number,
                  default: 5
              },
              value: {
                  type: Number,
                  default: 0,
                  twoWay: true
              },
              disabled: {
                  type: Boolean,
                  default: false
              },
              star: {
                  type: String,
                  default: '★'
              },
              activeColor: {
                  type: String,
                  default: '#fc6'
              },
              margin: {
                  type: Number,
                  default: 2
              },
              fontSize: {
                  type: Number,
                  default: 20
              }
          },
          computed: {},
          methods: {
              handleClick(i, force) {
                  if (!this.disabled || force) {
                      this.value = i + 1
                      for (var j = 0; j < this.max; j++) {
                          if (j <= i) {
                              this.colors.$set(j, this.activeColor)
                          } else {
                              this.colors.$set(j, '#ccc')
                          }
                      }
                  }
              },
              calc () {
                  for (var i = 0; i < this.max; i++) {
                      this.colors.push('#ccc')
                  }
                  if (this.value) {
                      this.handleClick(this.value - 1, true)
                  }
                  const _v = this.value.toString().split('.')
                  if (_v.length > 1) {
                      this.cutIndex = _v[0] * 1
                      this.cutPercent = _v[1] * 10
                  }
              }
          },
          data() {
              return {
                  colors: [],
                  cutIndex: -1,
                  cutPercent: 0
              }
          },
          watch: {
              value: function(val) {
                 this.calc();
              }
          }
  }
</script>

<style>
.vux-rater {
  text-align: left;
  display: inline-block;
  line-height: normal;
}
.vux-rater a {
  display: inline-block;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
  color: #ccc;
}
.vux-rater a:last-child {
  padding-right: 2px!important;
  margin-right: 0px!important;
}
.vux-rater a:hover {
  color: #ffdd99;
}
.vux-rater a.is-active {
  
}
.vux-rater a.is-disabled {
  color: #ccc !important;
  cursor: not-allowed;
}
.vux-rater-box {
  position: relative;
}
.vux-rater-inner {
 position: relative;
 display: inline-block;
}
.vux-rater-outer {
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  overflow: hidden;
}
</style>