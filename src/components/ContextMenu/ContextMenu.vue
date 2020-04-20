<template>
  <div @click.stop @contextmenu.stop :id="id" :style="ctxStyle" class="ctx-menu-container">
    <div style="background-color:transparent" class="ctx open">
      <ul
        role="menu"
        class="ctx-menu"
        :class="{
          'ctx-menu-right': align==='right',
          'ctx-menu-left': align==='left'
        }"
      >
        <slot></slot>
      </ul>
    </div>
  </div>
</template>
<script>
import createBodyClickListener from "./body-click-listener";

export default {
  name: "context-menu",
  props: {
    id: {
      type: String,
      default: "default-ctx"
    }
  },
  data() {
    return {
      locals: {},
      align: "left",
      ctxTop: 0,
      ctxLeft: 0,
      ctxVisible: false,
      bodyClickListener: createBodyClickListener(e => {
        let isOpen = !!this.ctxVisible;
        let outsideClick = isOpen && !this.$el.contains(e.target);
        if (outsideClick) {
          this.ctxVisible = false;
          this.$emit("ctx-cancel", this.locals);
          e.stopPropagation();
        } else {
          this.ctxVisible = false;
          // this.$emit("ctx-close", this.locals);
        }
      })
    };
  },
  methods: {
    setPositionFromEvent(e) {
      e = e || window.event;

      const scrollingElement =
        document.scrollingElement || document.documentElement;

      if (e.pageX || e.pageY) {
        this.ctxLeft = e.pageX;
        this.ctxTop = e.pageY - scrollingElement.scrollTop;
      } else if (e.clientX || e.clientY) {
        this.ctxLeft = e.clientX + scrollingElement.scrollLeft;
        this.ctxTop = e.clientY + scrollingElement.scrollTop;
      }

      this.$nextTick(() => {
        const menu = this.$el;
        const minHeight =
          (menu.style.minHeight || menu.style.height).replace("px", "") || 32;
        const minWidth =
          (menu.style.minWidth || menu.style.width).replace("px", "") || 32;
        const scrollHeight = menu.scrollHeight || minHeight;
        const scrollWidth = menu.scrollWidth || minWidth;

        const largestHeight = window.innerHeight - scrollHeight - 25;
        const largestWidth = window.innerWidth - scrollWidth - 25;

        if (this.ctxTop > largestHeight) this.ctxTop = largestHeight;
        if (this.ctxLeft > largestWidth) this.ctxLeft = largestWidth;
      });
      return e;
    },

    open(e, data) {
      if (this.ctxVisible) this.ctxVisible = false;
      this.ctxVisible = true;
      this.$emit("ctx-open", (this.locals = data || {}));
      this.setPositionFromEvent(e);
      this.$el.setAttribute("tab-index", -1);
      this.bodyClickListener.start();
      return this;
    }
  },
  watch: {
    ctxVisible(newVal, oldVal) {
      if (oldVal === true && newVal === false) {
        this.bodyClickListener.stop();
      }
    }
  },
  destroyed() {
    this.bodyClickListener.stop();
  },
  computed: {
    ctxStyle() {
      return {
        display: this.ctxVisible ? "block" : "none",
        top: (this.ctxTop || 0) + "px",
        left: (this.ctxLeft || 0) + "px"
      };
    }
  }
};
</script>
<style scoped>
.ctx {
  position: relative;
}

.ctx-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  font-size: 0.9rem;
  color: var(--color-text);
  text-align: left;
  list-style: none;
  background-color: var(--color5);
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  /* border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  -moz-box-shadow: 0 0 5px #ccc;
  -webkit-box-shadow: 0 0 5px #ccc;
  box-shadow: 0 0 5px #ccc; */
}

.ctx-divider {
  height: 1px;
  margin: 0.5rem 0;
  overflow: hidden;
  background-color: #e5e5e5;
}

.ctx-item {
  display: block;
  /*width: 100%;*/
  padding: 3px 20px;
  clear: both;
  font-weight: normal;
  line-height: 1.5;
  color: var(--color-text);
  text-align: inherit;
  white-space: nowrap;
  background: none;
  border: 0;
  cursor: default;
}

.ctx-item:focus,
.ctx-item:hover {
  color: #2b2d2f;
  text-decoration: none;
  background-color: #f5f5f5;
  cursor: normal;
}

.open > .ctx-menu {
  display: block;
}

.open > a {
  outline: 0;
}

.ctx-menu-right {
  right: 0;
  left: auto;
}

.ctx-menu-left {
  right: auto;
  left: 0;
}

.ctx-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 990;
}

.pull-right > .ctx-menu {
  right: 0;
  left: auto;
}

.ctx-menu-container {
  position: fixed;
  padding: 0;
  /* border: 1px solid #bbb; */
  background-color: whitesmoke;
  z-index: 99999;
  /* box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15); */
}
</style>