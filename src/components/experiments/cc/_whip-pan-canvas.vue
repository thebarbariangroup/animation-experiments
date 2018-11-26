<template>
  <div class="whip-pan">
    <img ref="img1" src="/assets/cc/whip-pan/images/sitting-plane.jpeg" alt="">
    <img ref="img2" src="/assets/cc/whip-pan/images/sitting-plane-across.jpg" alt="">
    <canvas id="canvas" ref="canvas"
      width="600" height="400"
    ></canvas>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        isActive: false,
        canvas: null,
        ctx: null
      }
    },
    methods: {
      init () {
        const r = this.$refs;
        this.canvas = r.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.drawFirstImage();
      },
      drawFirstImage () {
        const r = this.$refs;
        if (r.img1.complete) {
          this.drawScaledImage(this.ctx, r.img2);
        } else {
          r.img1.onload = this.drawFirstImage;
        }
      },
      drawScaledImage (ctx, img) {
        const canvasAspectRatio = ctx.canvas.height/ctx.canvas.width;
        const imageAspectRatio = img.height/img.width;
        // const drawProps = {
        //   x: 0,
        //   y: 0,
        //   width: img.width,
        //   height: img.height
        // }
        if (imageAspectRatio > canvasAspectRatio) {
          // imageHeight
        }
        console.log(canvasAspectRatio, imageAspectRatio);
        ctx.drawImage(img, 0, 0, 960, 720, 0, 0, 600, 400);
      }
    },
    mounted () {
      this.init();
    },
    destroyed () {
      this.canvas = null;
      this.ctx = null;
    }
  }
</script>

<style lang="scss" scoped>
img {
  display: none;
}
</style>
