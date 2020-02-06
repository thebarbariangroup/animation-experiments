<template>
  <div 
    :class="className"
  >
    <div :class="nameClass('background')"></div>
<!--     <div :class="nameClass('square', '1')"></div>
    <div :class="nameClass('square', '2')"></div> -->
    <div 
      :class="nameClass('cube')"
      :style="`transform: translate(-50%, -50%) rotateX(${this.rotate.x}deg) rotatey(${this.rotate.y}deg)`"
    >
      <div :class="nameClass('cube-side')"></div>
      <div :class="nameClass('cube-side')"></div>
      <div :class="nameClass('cube-side')"></div>
      <div :class="nameClass('cube-side')"></div>
      <div :class="nameClass('cube-side')"></div>
      <div :class="nameClass('cube-side')"></div>
    </div>
  </div>
</template>

<script>
  import ThrottleHelper from '@/scripts/utils/ThrottleHelper';

  export default {
    name: 'AccelerometerDepth',
    data: function () {
      return {
        className: 'acc-depth',
        mouseHelper: ThrottleHelper.getInstance('mousemove'),
        accelerometer: new window.Accelerometer({frequency: 10}),
        rotate: {
          x: 0,
          y: 0,
        },
        dimensions: {
          width: 0,
          height: 0,
        },
      }
    },
    mounted () {
      this.getDimensions();
      this.setupEventHandlers();
    },
    methods: {
      nameClass (name, variation) {
        let classes = `${this.className}-${name}`;
        classes += variation ? ` ${classes}--${variation}` : '';

        return classes;
      },
      getDimensions () {
        return this.dimensions = {
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      setupEventHandlers () {
        this.onMouseMove = this.onMouseMove.bind(this);
        this.mouseHelper.add(this.onMouseMove);

        this.onAccelerometer = this.onAccelerometer.bind(this);
        this.accelerometer.addEventListener('reading', this.onAccelerometer);
        this.accelerometer.start();
      },
      onMouseMove (e) {
        const x = e.clientX;
        const y = e.clientY;
        const percentage = {
          x: x / this.dimensions.width,
          y: y / this.dimensions.height,
        };

        const multiplier = 20;
        const rotation = {
          x: (percentage.y - 0.5) * multiplier * 2,
          y: -(percentage.x - 0.5) * multiplier * 2,
        }

        this.setRotation(rotation);
      },
      onAccelerometer () {
        const multiplier = 10;

        this.setRotation({
          x: this.accelerometer.z * multiplier, 
          y: this.accelerometer.x * multiplier
        });
      },
      setRotation (rotation) {
        this.rotate = rotation;
      }
    }
  }
</script>

<style lang="scss">
  $className: '.acc-depth';
  $cubeSize: 10vw;

  body {
    overflow: hidden;
  }

  #{$className} {
    position: absolute;
    width: 100vw;
    height: 100vh;
    perspective: 1400px;
    perspective-origin: 50% 50%;

    &-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: #DDD;
      z-index: -1;
    }

    &-cube {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: 0 auto 100px;
      height: $cubeSize;
      width: $cubeSize;
      transition: transform 1000ms ease-out;
      transform-style: preserve-3d;
    }

    &-cube > &-cube-side {
      position: absolute;
      height: $cubeSize;
      width: $cubeSize;
      padding: 20px;
      background-color: rgba(50, 50, 50, 0.85);
      font-size: 1em;
      line-height: 1em;
      color: #fff;
      border: 1px solid #555;
      border-radius: 3px;
    }

    &-cube > &-cube-side:first-child  {
      transform: rotateX(90deg) translateZ(5vw);
    }

    &-cube > &-cube-side:nth-child(2) {
      transform: translateZ(5vw);
    }

    &-cube > &-cube-side:nth-child(3) {
      transform: rotateY(90deg) translateZ(5vw);
      text-align: center;
    }

    &-cube > &-cube-side:nth-child(4) {
      transform: rotateY(180deg) translateZ(5vw);
    }

    &-cube > &-cube-side:nth-child(5) {
      transform: rotateY(-90deg) translateZ(5vw);
    }

    &-cube > &-cube-side:nth-child(6) {
      transform: rotateX(-90deg) rotate(180deg) translateZ(5vw);
    }

  }
</style>
