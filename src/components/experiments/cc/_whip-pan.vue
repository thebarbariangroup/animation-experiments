<template>
  <div class="whip-pan">
    <div class="whip-pan_wrapper">
      <div class="whip-pan_container">
        <div class="image-wrapper">
          <img src="/assets/cc/whip-pan/images/sitting-plane.jpeg" alt="">
        </div>
        <div class="image-wrapper">
          <img src="/assets/cc/whip-pan/images/sitting-plane-across.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
@keyframes blurFilter {
  0% {
    filter: blur(0px);
  }

  10% {
    filter: blur(20px);
  }

  70% {
    filter: blur(0px);
  }

  100% {
    filter: blur(0px);
  }
}

svg {display: none;}

$perspective: 400px;

.whip-pan {
  overflow:hidden;

  &_wrapper {
    width: 500px;
    height: 300px;
    overflow: hidden;
    margin: auto; 
  }

  &_container {
    position: relative;
    width: 500px;
    height: 300px;
    transition: transform 0.3s;

    &:hover {
      animation: blurFilter 0.5s linear forwards;
      transform: translateX(-550px);

      .image-wrapper {

        &:nth-child(1) {
          transform: perspective($perspective)rotateY(51deg);
        }

        &:nth-child(2) {
          transform: perspective($perspective)rotateY(0deg);
        }
      }
    }
  }

  .image-wrapper {
    display: inline-block;
    height: 400px;
    width: 600px;
    overflow: hidden;
    position: absolute;
    top: -50px;
    transition: transform 0.3s;

    &:nth-child(1) {
      left: -50px;
      transform-origin: right;
    }

    &:nth-child(2) {
      left: 550px;
      transform: perspective(400px)rotateY(-51deg);
      transform-origin: left;
    }
  }

  img {
    width: 600px;
  }
}
</style>
