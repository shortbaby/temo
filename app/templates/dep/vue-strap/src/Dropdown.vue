<template>
  <div class="btn-group">
    <slot></slot>
    <slot name="dropdown-menu"></slot>
  </div>
</template>
<script>
  import EventListener from './utils/EventListener'
  export default {
    methods: {
      toggleDropdown(e) {
        e.preventDefault();
        var el =  $(this.$el);
        if (el.hasClass('open')) {
          el.removeClass('open');
        } else {
          el.addClass('open');
        }
      }
    },
    ready() {
      const el = this.$el
      const toggle = el.querySelector('[data-toggle="dropdown"]')
      if (toggle)
      {
        toggle.addEventListener('click', this.toggleDropdown)
      }
      this._closeEvent = EventListener.listen(window, 'click', (e)=> {
        if (!el.contains(e.target)) $(el).removeClass('open')
      })
    },
    beforeDestroy() {
      if (this._closeEvent) this._closeEvent.remove()
    }
  }
</script>
