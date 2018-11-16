<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {TweenMax, CSSPlugin, ScrollToPlugin, Draggable, Elastic} from "gsap/all";
import * as THREE from "three";
window.THREE = THREE;

// Disable Treeshaking of transpilers (and call plugins[0] to fix a warning in Vue)
const plugins = [TweenMax, CSSPlugin, ScrollToPlugin, Draggable, Elastic];
plugins[0];

export default {};
</script>

<style>
body {
  margin: 0;
}
</style>
