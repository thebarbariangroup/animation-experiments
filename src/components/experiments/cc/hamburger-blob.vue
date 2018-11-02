<template>
  <div class="hamburger-blob" v-on:click="onClick" ref="container">
    <span class="hamburger-blob_line" ref="line0"></span>
    <span class="hamburger-blob_line" ref="line1"></span>
    <span class="hamburger-blob_line" ref="line2"></span>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data: function () {
    return {
      active: false
    }
  },
  methods: {
    onClick () {
      if (this.active) {
        return this.close();
      }

      return this.open();
    },
    open () {
      const r = this.$refs;
      const timeScale = 0.05;

      const tl = new TimelineLite();
      const tl0 = new TimelineLite();
      const tl1 = new TimelineLite();
      const tl2 = new TimelineLite();

      tl0.to(r.line0, 0.15, {transform: 'translate3d(0,0,0)'});
      tl0.to(r.line0, 0.15, {transform: 'translate3d(0,0,0)rotate(-45deg)'});
      tl1.to(r.line1, 0.15, {});
      tl1.to(r.line1, 0.15, {transform: 'scaleX(0)'});
      tl2.to(r.container, 0, {filter: 'contrast(5)'});
      tl2.to(r.line2, 0.15, {transform: 'translate3d(0,0,0)'});
      tl2.to(r.line2, 0.15, {transform: 'translate3d(0,0,0)rotate(-145deg)'});
      tl2.to(r.line2, 0.1, {transform: 'translate3d(0,0,0)rotate(-125deg)'});
      tl2.to(r.line2, 0.1, {transform: 'translate3d(0,0,0)rotate(-135deg)'});
      tl2.to(r.container, 0.3, {filter: 'contrast(7)'});

      tl.timeScale(timeScale);
      tl0.timeScale(timeScale);
      tl1.timeScale(timeScale);
      tl2.timeScale(timeScale);

      this.active = true;
      console.log(this.active);
    },
    close () {
      const r = this.$refs;
      
      const tl = new TimelineLite();
      tl.to(r.line0, 1, {transform: ''});
      tl.to(r.line0, 1, {transform: ''});
      tl.to(r.line2, 1, {transform: ''});
      tl.to(r.line2, 1, {transform: ''});
      tl.to(r.line1, 1, {transform: ''});

      tl.timeScale(2);
      this.active = false;
    }
  }
}
</script>

<style scoped lang="scss">
$className: '.hamburger-blob';
$containerWidth: 100px;
$dimensions: $containerWidth * 0.9;
$heightModifier: 9;
$spacing: 30px;

#{$className} {
  position: relative;
  width: $dimensions;
  height: $dimensions;
  background-color: white;
  margin: auto;
  overflow: hidden;
  filter: contrast(7);

  &_line {
    position: absolute;
    top: 0;
    left:0;
    right:0;
    bottom: 0;
    display: block;
    width: $dimensions;
    height: $dimensions/$heightModifier;
    margin: auto;
    background-color: black;
    filter: blur(4px);
    backface-visibility: hidden;

    &:nth-child(1) {
      transform: translateY(-$spacing);
    }

    &:nth-child(2) {}

    &:nth-child(3) {
     transform: translateY($spacing); 
    }
  }
}
</style>
