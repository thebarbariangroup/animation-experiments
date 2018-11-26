<template>
  <div id="app">
    <router-view :key="$route.path"/>
    <div class="slideshow-overlay" :class="{active: slideshow.active}" @click="stopSlideshow"></div>
  </div>
</template>

<script>
import shuffle from '@/scripts/utils/shuffle';
import {TweenMax, CSSPlugin, ScrollToPlugin, Draggable, Elastic} from "gsap/all";
import * as THREE from "three";
window.THREE = THREE;

// Disable Treeshaking of transpilers (and call plugins[0] to fix a warning in Vue)
const plugins = [TweenMax, CSSPlugin, ScrollToPlugin, Draggable, Elastic];
plugins[0];

export default {
  name: 'app',
  data: () => {
    return {
      moduleCashe: {},
      slideshow: {
        items: [],
        active: false,
        idx: 0,
        interval: 1,
        timeout: null
      }
    };
  },
  methods: {
    getExperimentsData () {
      return this.axios.get('/experiments.json')
      .then((response) => {
        this.parseExperiments(response.data.items, '/experiments');
      });
    },
    parseExperiments (items, path) {
      for (let i = 0; i < items.length; i++) {
        const itemLocation = `${path}/${items[i].name}`;
        if (items[i].name[0] === '_') {
          continue;
        }
        if (items[i].type === 'file') {
          this.slideshow.items.push(itemLocation);
        }
        else if (items[i].type === 'directory') {
          this.parseExperiments(items[i].items, itemLocation);
        }
      }
    },
    nextSlide () {
      this.slideshow.idx++;
      if (this.slideshow.idx >= this.slideshow.items.length) {
        this.slideshow.idx = 0;  
      }
      this.$router.push(this.slideshow.items[this.slideshow.idx]);
    },
    startSlideshow (interval = 1) {
      this.getExperimentsData().then(() => {
        this.slideshow.interval = interval;
        this.slideshow.items = shuffle(this.slideshow.items);
        this.slideshow.active = true;
        this.slideshow.idx = 0;
        this.setSlideshowTimeout();
      });
    },
    setSlideshowTimeout () {
      if (this.slideshow.active) {
        this.nextSlide();
        clearTimeout(this.slideshow.timeout);
        this.slideshow.timeout = setTimeout(() => {
          this.setSlideshowTimeout();
        }, 60000 * this.slideshow.interval);
      }
    },
    stopSlideshow () {
      this.slideshow.active = false;
      this.slideshow.idx = 0;
      clearTimeout(this.slideshow.timeout);
      this.$router.push('/');
    }
  },
  mounted () {
  }
};
</script>

<style>
body {
  margin: 0;
}

.slideshow-overlay {
  display: none;
}

.slideshow-overlay.active {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}
</style>
