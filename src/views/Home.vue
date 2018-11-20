<template>
  <div class="home">
    <router-link to="/experiments">Browse Experiments</router-link>
    <br/>
    <button class="slideshow-button" @click="$parent.startSlideshow()">Start Slideshow</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data: function () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 8px;

  & .slideshow-button {
    margin: 5px 0;
  }
}
</style>

