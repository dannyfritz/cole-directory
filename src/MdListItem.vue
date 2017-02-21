<template>
  <article class="card card--list">
    <div class="card__icon">
      <slot name="icon"></slot>
    </div>
    <div class="card__content">
      <div class="line" @click="toggleExpand">
        <h1 slot="title" class="heading line__anchor heading--ellipsis">{{title}}</h1>
        <ul class="controls--inline">
          <li v-if="!expanded" class="controls--inline__item">
            <button class="button button-icon">
              <i class="fa fa-chevron-down" aria-hidden="true"></i>
            </button>
          </li>
          <li v-if="expanded" class="controls--inline__item">
            <button class="button button-icon">
              <i class="fa fa-chevron-up" aria-hidden="true"></i>
            </button>
          </li>
        </ul>
      </div>
      <div v-if="expanded" class="card__details">
        <slot name="details"></slot>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "md-list-item",
  props: ["title"],
  data () {
    return {
      expanded: false,
    }
  },
  computed: {},
  methods: {
    toggleExpand () {
      this.expanded = !this.expanded
    }
  },
  filters: {},
}
</script>

<style scoped>
</style>
