<template>
  <span v-el:trigger>
    <slot>
    </slot>
  </span>
  <div class="popover"
    v-bind:class="{
    'top':placement === 'top',
    'left':placement === 'left',
    'right':placement === 'right',
    'bottom':placement === 'bottom'
    }"
    v-el:popover
    v-show="show"
    :transition="effect">
      <div class="arrow"></div>
      <slot name="title">
      </slot>
      <div class="popover-content">
         <slot name="content"><slot>
      </div>
  </div>
</template>

<script>
  import EventListener from '../../../dep/vue-strap/src/utils/EventListener';
  import coerceBoolean from '../../../dep/vue-strap/src/utils/coerceBoolean';
  export default {
  props: {
    trigger: {
      type: String,
      default: 'click'
    },
    effect: {
      type: String,
      default: 'fadein'
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    header: {
      type: Boolean,
      coerce: coerceBoolean,
      default: true
    },
    placement: {
      type: String
    },
    right: {
      type: String
    },
    left: {
      type: String
    }
  },
  data() {
    return {
      position: {
        top: 0,
        left: 0
      },
      show: false
    }
  },
  events: {
    hide() {
      this.show = false;
    }
  },  
  methods: {
    toggle(event) {
      this.show = !this.show;
    }
  },
  ready() {
    if (!this.$els.popover) return console.error("Couldn't find popover v-el in your component that uses popoverMixin.");
    const popover = this.$els.popover;
    const triger = this.$els.trigger.children[0];
    if (this.trigger === 'hover') {
      this._mouseenterEvent = EventListener.listen(triger, 'mouseenter', ()=> this.show = true)
      this._mouseleaveEvent = EventListener.listen(triger, 'mouseleave', ()=> this.show = false)
    } else if (this.trigger === 'focus') {
      this._focusEvent = EventListener.listen(triger, 'focus', ()=> this.show = true)
      this._blurEvent = EventListener.listen(triger, 'blur', ()=> this.show = false)
    } else {
      let self = this;
      this._clickEvent = EventListener.listen(triger, 'click', this.toggle);
      this._closeEvent = EventListener.listen(window, 'click', (e)=> {
        if (!popover.contains(e.target) && !triger.contains(e.target)) {
           self.show = false;
        }
      })
    }
    switch (this.placement) {
      case 'top' :
        this.position.left = triger.offsetLeft - popover.offsetWidth / 2 + triger.offsetWidth / 2;
        this.position.top = triger.offsetTop  - popover.offsetHeight;
        popover.style.top = this.position.top + 'px';
        popover.style.left = this.position.left + 'px';
        break
      case 'left':
        this.position.left = triger.offsetLeft - popover.offsetWidth;
        this.position.top = triger.offsetTop + triger.offsetHeight / 2 - popover.offsetHeight / 2;
        popover.style.top = this.position.top + 'px';
        popover.style.left = this.position.left + 'px';
        break
      case 'right':
        this.position.left = triger.offsetLeft + triger.offsetWidth;
        this.position.top = triger.offsetTop + triger.offsetHeight / 2 - popover.offsetHeight / 2;
        popover.style.top = this.position.top + 'px';
        popover.style.left = this.position.left + 'px';
        break
      case 'bottom':
        this.position.left = triger.offsetLeft - popover.offsetWidth / 2 + triger.offsetWidth / 2;
        this.position.top = triger.offsetTop + triger.offsetHeight
        popover.style.top = this.position.top + 'px';
        break
      default:
        console.log('Wrong placement prop')
    }
    popover.style.top = this.position.top + 'px'
    popover.style.left = this.position.left + 'px'
    if (this.left && this.left === 'auto') {
      popover.style.left = 'auto'
    }
    if (this.right && this.right === 'auto') {
      popover.style.right = 'auto';
    }
    if (!isNaN(this.left)) {
      popover.style.left = parseInt(this.left) + 'px';
    }
    if (!isNaN(this.right)) {
      popover.style.right = parseInt(this.right) + 'px';
    }
    popover.style.display = 'none';
  },
  beforeDestroy() {
    if (this._blurEvent) {
      this._blurEvent.remove()
      this._focusEvent.remove()
    }
    if (this._mouseenterEvent) {
      this._mouseenterEvent.remove()
      this._mouseleaveEvent.remove()
    }
    if (this._clickEvent) this._clickEvent.remove()
    if (this._closeEvent) this._closeEvent.remove()
  }
}
</script>
<style>
.scale-transition,
.fade-transition {
  display: block;
}
.scale-enter {
  animation:scale-in 0.15s ease-in;
}
.scale-leave {
  animation:scale-out 0.15s ease-out;
}
@keyframes scale-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes scale-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}
</style>
