<template>
  <div v-if="show" class="modal" :style="getStyle" @mousedown="mouseDown" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <slot name="modal-header">
          <div class="modal-header" v-if="title">
            {{ title }}
            <a
              class="close"
              style="cursor:pointer"
              aria-label="Close"
              @click.stop="closeModal"
            >
              <span aria-hidden="true">×</span>
            </a>
          </div>
        </slot>
        <div class="modal-body">
          <slot></slot>
        </div>
        <slot name="modal-footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StackModal",
  props: {
    show: Boolean,
    title: String,
    modalClass: Object,
    hasBackdrop: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      backdrop: null
    };
  },
  methods: {
    handleEscape(e) {
      if (this.show && e.keyCode === 27 && this.zIndex === this.totalModals) {
        this.$emit("close");
        this.showAddPl = false;
      }
    },
    mouseDown(event) {
      if (this.$refs.modal === event.target) {
        this.$emit("close");
        this.showAddPl = false;
        event.preventDefault();
      }
    },
    closeModal() {
      this.$emit("close");
      this.showAddPl = false;
    }
  },
  computed: {
    getStyle() {
      let style = {};
      style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      if (this.show) style.display = "block";
      style["z-index"] = 1048 + this.zIndex * 2 + 1;
      return style;
    }
  }
};
</script>
<style>
.modal {
  color: var(--color-text);
  font-size: 15px;
}
.modal-header {
  padding: 0.5rem 1rem 0.4rem 1rem;
}
.modal-dialog {
  width: max-content;
  min-width: 200px;
  max-width: 500px;
  overflow: hidden;
  top: 10%;
}
.modal-content {
  background: var(--color5);
}
.modal-body {
  max-height: 305px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
}
@media (max-width: 900px) {
  .modal-dialog {
    min-width: 300px !important;
    max-width: 350px !important;
    margin: 1.75rem auto;
  }
}
.modal-footer {
  justify-content: start;
  padding: 0.5rem 1rem;
  font-size: 15px;
}
.modal-footer #newpl {
  width: 100%;
}
.modal-footer #newpl i {
  padding-right: 5px;
}
.modal-footer #newpl:hover {
  cursor: pointer;
}
#input-newpl:focus {
  outline-width: 0;
}
#input-newpl {
  width: 100%;
  border: 0;
  border-bottom: 1px solid black;
  padding-right: 70px;
  background: var(--color5);
  color: var(--color-text);
}
#input-newpl-container {
  padding: 0.5rem 1rem;
}
#input-newpl-container p {
  padding: 0;
  margin: 0;
  font-size: 15px;
  color: rgb(192, 188, 188);
}
#btn-createpl {
  position: absolute;
  border: 0;
  background: transparent;
  right: 1rem;
  color: grey;
}
#btn-createpl:hover {
  color: var(--color-hover);
  cursor: pointer;
}
</style>
