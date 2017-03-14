
<template>
  <transition name="fade">
    <div v-if="show" class="spinner" ref="target"></div>
  </transition>
</template>

<script>
import Spinner from "spin"

export default {
  name: "cd-spinner",
  props: ["show"],
  data () {
    return {
      spinner: null,
    }
  },
  mounted () {
    this.spinner = new Spinner({
      color: "#aaa",
      lines: 12,
      length: 60,
      radius: 40,
    }).spin(this.$refs.target)
  },
  methods: {},
  watch: {},
}
</script>

<style scoped>
.spinner {
  background-color: hsla(0, 5%, 5%, 0.8);
  position: absolute;
  z-index: 100;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}

</style>
