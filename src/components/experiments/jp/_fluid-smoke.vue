<template>
  <div class="fluid-smoke">
    <canvas></canvas>
  </div>
</template>

<script>
import webGLFluidSimulation from '@/components/experiments/jp/_scripts/fluid-smoke/WebGL-Fluid-Simulation';

export default {
  name: 'fluid-smoke',
  mounted () {
    webGLFluidSimulation();
  },
  methods: {
    _initDemo () {
    }
  }
}
</script>

<style lang="scss" scoped>
  // * {
  //   user-select: none;
  // }
  // html, body {
  //   overflow: hidden;
  // }
  // body {
  //   margin: 0;
  //   position: fixed;
  //   width: 100%;
  //   height: 100%;
  // }
  canvas {
    width: 100%;
    height: 100%;
  }
  .fluid-smoke {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
  .dg {
    opacity: 0.9;
  }
  .dg .property-name {
    overflow: visible;
  }
  .bigFont {
    font-size: 150%;
    color: #8C8C8C;
  }
  .cr.function.appBigFont {
    width: 288px;
    font-size: 150%;
    line-height: 27px;
    background-color: #2F4F4F;
  }
  .cr.function.appBigFont .property-name {
    float: none;
  }
  .cr.function.appBigFont .icon {
    position: relative;
    bottom: 27px;
  }
  .icon {
    font-family: 'iconfont';
    font-size: 130%;
    float: right;
  }
  .twitter:before {
    content: 'a';
  }
  .github:before {
    content: 'b';
  }
  .app:before {
    content: 'c';
  }
</style>

