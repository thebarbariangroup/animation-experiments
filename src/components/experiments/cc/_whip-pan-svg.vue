<template>
  <div class="whip-pan" 
    :class="{active: isActive}" 
    @mouseover="onMouseOver" 
    @mouseout="onMouseOut"
  >
    <svg width="600" height="800">
      <filter id="blur" ref="filter">
        <feGaussianBlur ref="filterBlur" in="SourceGraphic" stdDeviation="0" />
      </filter>
      <g width="1200" height="600" filter="url(#blur)">
        <image ref="img2" x="550" y="0" 
          width="600" height="400"
          xlink:href="/assets/cc/whip-pan/images/sitting-plane-across.jpg"
        /> 
        <image ref="img1" x="0" y="0" 
          width="600" height="400" 
          xlink:href="/assets/cc/whip-pan/images/sitting-plane.jpeg"
        /> 
      </g>
    </svg>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        isActive: false,
        currentBlur: 0
      }
    },
    mounted () {
      this.init();
    },
    methods: {
      onMouseOver () {
        this.isActive = true;
        // this.addBlur();
        this.tl.play();
      },
      onMouseOut () {
        this.isActive = false;
        // this.removeBlur();
        this.tl.reverse();
      },
      init () {
        this.tl = this.createTimeLine();
      },
      createTimeLine() {
        const r = this.$refs;
        const tl = new TimelineLite();
        tl.addLabel('start');
        // tl.to(r.img1, 1, {x: -600});
        // tl.to(r.img2, 1, {x: -600}, 'start');
        tl.to(r.filterBlur, 0.25, {attr: {stdDeviation: '20, 0'}}, 'start');
        tl.to(r.filterBlur, 0.25, {attr: {stdDeviation: '0.1, 0'}}, 'start+=0.5');
        tl.timeScale(3);
        tl.pause();

        return tl;
      },
      addBlur () {
        this.increaseBlur();
      },
      removeBlur () {
        this.decreaseBlur()
      },
      increaseBlur () {
        if (this.currentBlur < 10) {
          this.currentBlur += 0.1;
          this.$refs.filter.firstElementChild.setAttribute('stdDeviation', `${this.currentBlur}, 0`);
          
          requestAnimationFrame(() => {
            this.increaseBlur();
          });
        }
      },
      decreaseBlur () {
        if (this.currentBlur > 0) {
          this.currentBlur -= 0.1;
          this.$refs.filter.firstElementChild.setAttribute('stdDeviation', `${this.currentBlur}, 0`);
          
          requestAnimationFrame(() => {
            this.decreaseBlur();
          });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.whip-pan {
  image {
    transition: transform 0.3s;
    will-change: transform;
  }

  &.active {
    image {
      transform: translateX(-600px);
    }
  }
}

</style>
