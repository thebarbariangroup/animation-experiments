<template>
  <div class="home">
    <router-link to="/experiments">Browse Experiments</router-link>
    <br/><br/>
    <label for="slideInterval">Slideshow Interval (min): </label>
    <input type="number" name="slideInterval" v-model="slideInterval">
    <br/>
    <button class="slideshow-button" @click="$parent.startSlideshow(slideInterval)">Start Slideshow</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data: function () {
    return {
      slideInterval: 1
    }
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

