import Vue from "vue"

Vue.mixin({
  methods: {
    jump(path) {
      return this.$router.push(path)
    }
  }
})
