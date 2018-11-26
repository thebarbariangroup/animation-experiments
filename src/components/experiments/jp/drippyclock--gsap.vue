<template>
  <div class="drippyclock__container">
    <svg>
      <defs>
        <filter id="textFilter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="textBlur" />
          <feColorMatrix in="textBlur" mode="matrix"
            values="1   0   0   0   0
                    0   1   0   0   0 
                    0   0   1   0   0 
                    0   0   0   18  -7"
            result="textGoo" />
          <feComposite in="SourceGraphic" in2="textGoo" operator="atop" />
        </filter>
        <filter id="bgFilter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="bgBlur" />
          <feColorMatrix in="bgBlur" mode="matrix"
            values="1   0   0   0   0
                    0   1   0   0   0 
                    0   0   1   0   0 
                    0   0   0   20  -7"
            result="bgGoo" />
            <!-- <feBlend in="SourceGraphic" in2="bgGoo" /> -->
            <feComposite in="SourceGraphic" in2="bgGoo" operator="atop" />
        </filter>
      </defs>
    </svg>
    <div class="drippyclock">
      <span class="hours"
        ref="hours"
      ><span class="last-hour" ref="lastHour">{{lhFormat}}</span><span class="next-hour" ref="nextHour">{{nhFormat}}</span>
      </span>:<span class="minutes"
        ref="minutes"
      ><span class="last-minute" ref="lastMinute">{{lmFormat}}</span><span class="next-minute" ref="nextMinute">{{nmFormat}}</span>
      </span>:<span class="seconds"
        ref="seconds"
      ><span class="last-second" ref="lastSecond">{{lsFormat}}</span><span class="next-second" ref="nextSecond">{{nsFormat}}</span>
      </span>
      <div class="background__container">
        <div class="background"></div>
        <div class="droplet droplet--s1" ref="secondDroplet1"></div>
        <div class="droplet droplet--s2" ref="secondDroplet2"></div>
        <div class="droplet droplet--s3" ref="secondDroplet3"></div>
        <div class="droplet droplet--m1" ref="minuteDroplet1"></div>
        <div class="droplet droplet--m2" ref="minuteDroplet2"></div>
        <div class="droplet droplet--h1" ref="hourDroplet1"></div>
        <div class="droplet droplet--h2" ref="hourDroplet2"></div>
        <!-- <div class="pool" ref="pool">
          <div class="pool__liquid" ref="poolLiquid"></div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  data: () => {
    return {
      secondTimeline: null,
      minuteTimeline: null,
      hourTimeline: null,
      dropletTimeline: null,
      ms: null,
      ls: null, lm: null, lh: null,
      ns: null, nm: null, nh: null, 
      lsFormat: null, lmFormat: null, lhFormat: null,
      nsFormat: null, nmFormat: null, nhFormat: null, 
    }
  },
  methods: {
    animate () {
      this.setTimes();
      this.scrubTweens();
      // this.setPoolPosition();
      this.formatTimes();
      this._rafID = requestAnimationFrame(() => {
        this.animate();
      });
    },
    setTimes () {
      const d = new Date;
      this.ms = d.getMilliseconds();
      this.ls = d.getSeconds();
      this.lm = d.getMinutes();
      this.lh = Math.max(d.getHours() % 13, 1);
      this.ns = (this.ls + 1) % 60;
      this.nm = (this.lm + 1) % 60;
      this.nh = (this.lh + 1) % 12;
    },
    formatTimes () {
      this.lsFormat = this.addLeadingZero(this.ls);
      this.lmFormat = this.addLeadingZero(this.lm);
      this.lhFormat = this.addLeadingZero(this.lh);
      this.nsFormat = this.addLeadingZero(this.ns);
      this.nmFormat = this.addLeadingZero(this.nm);
      this.nhFormat = this.addLeadingZero(this.nh);
    },
    addLeadingZero (num) {
      return num < 10 ? `0${num}` : `${num}`;
    },
    setPoolPosition () {
      const waterLevel = (this.lh%6 + (this.lm + (this.ls + this.ms/1000) / 60) / 60) / 6;
      this.$refs.poolLiquid.style.transform = `translateY(-${waterLevel * 100}%)`;
    },
    scrubTweens () {
      this.secondTimeline.progress(this.ms / 1000);
      this.dropSecondTimeline1.progress(this.ms / 1000);
      this.dropSecondTimeline2.progress((this.ls%10 + this.ms/1000) / 10);

      this.minuteTimeline.progress((this.ls + this.ms/1000) / 60);
      this.dropMinuteTimeline1.progress((this.ls + this.ms/1000) / 60);
      this.dropMinuteTimeline2.progress((((this.lm%10 + (this.ls + this.ms/1000) / 60) / 10)));
      
      this.hourTimeline.progress((this.lm + (this.ls + this.ms/1000) / 60) / 60);
      this.dropHourTimeline1.progress((this.lm + (this.ls + this.ms/1000) / 60) / 60);
      this.dropHourTimeline2.progress((this.lh%10 + (this.lm + (this.ls + this.ms/1000) / 60) / 60) / 10);
    },
    initDropletTimeline () {
      this.dropSecondTimeline1 = new TimelineMax({repeat: -1, yoyo: false});
      this.dropSecondTimeline2 = new TimelineMax({repeat: -1, yoyo: false});
      this.dropMinuteTimeline1 = new TimelineMax({repeat: -1, yoyo: false});
      this.dropMinuteTimeline2 = new TimelineMax({repeat: -1, yoyo: false});
      this.dropHourTimeline1 = new TimelineMax({repeat: -1, yoyo: false});
      this.dropHourTimeline2 = new TimelineMax({repeat: -1, yoyo: false});
      // this.dropletTimeline = new TimelineMax({repeat: -1, yoyo: false});
      // this.dropletTimeline.add(this.dropSecondTimeline1);
      // .add(secondTimeline2).add(minuteTimeline1).add(minuteTimeline2).add(hourTimeline1).add(hourTimeline2);
      this.dropSecondTimeline1
        .to(this.$refs.secondDroplet1, 1, {y: '60%', scale: '.6', ease: Power1.ease})
        .to(this.$refs.secondDroplet2, 1, {y: '100vh', scaleX: '.5', ease: Power1.easeIn}, '-=1');
      this.dropSecondTimeline2
        .to(this.$refs.secondDroplet3, 10, {y: '60%', scale: '.6', ease: Power0.easeNone})
        .to(this.$refs.secondDroplet3, 1, {y: '100vh', scaleX: '.5', ease: Power1.easeIn});
      this.dropMinuteTimeline1
        .to(this.$refs.minuteDroplet1, 60, {y: '60%', scale: '.6', ease: Power0.easeNone})
        .to(this.$refs.minuteDroplet1, 1, {y: '100vh', scaleX: '.5', ease: Power1.easeIn});
      this.dropMinuteTimeline2
        .to(this.$refs.minuteDroplet2, 600, {y: '60%', scale: '.6', ease: Power0.easeNone})
        .to(this.$refs.minuteDroplet2, 1, {y: '100vh', scaleX: '.5', ease: Power1.easeIn});
      this.dropHourTimeline1
        .to(this.$refs.hourDroplet1, 1200, {y: '60%', scale: '.6', ease: Power0.easeNone})
        .to(this.$refs.hourDroplet1, 1, {y: '100vh', scaleX: '.5', ease: Power1.easeIn});
      this.dropHourTimeline2
        .to(this.$refs.hourDroplet2, 12000, {y: '60%', scale: '.6', ease: Power0.easeNone})
        .to(this.$refs.hourDroplet2, 1, {y: '100vh', scaleX: '.5', ease: Power1.easeIn});
    },
    initSecondTimeline () {
      this.secondTimeline = new TimelineMax({repeat: -1, yoyo: false, onUpdate: this.updateFilter('.seconds')});
      this.secondTimeline.to(this.$refs.lastSecond, 1, {
        opacity: 0,
        y: 100,
        ease: Power0.easeNone
      })
      .to(this.$refs.nextSecond, 1, {
        opacity: 1,
        ease: Power0.easeNone,
      }, '-=1');
    },
    initMinuteTimeline () {
      this.minuteTimeline = new TimelineMax({repeat: -1, yoyo: false});
      this.minuteTimeline.to(this.$refs.lastMinute, 1, {
        opacity: 0,
        ease: Power0.easeNone,
        delay: 60
      })
      .to(this.$refs.nextMinute, 1, {
        opacity: 1,
        ease: Power0.easeNone
      }, '-=1')
    },
    initHourTimeline () {
      this.hourTimeline = new TimelineMax({repeat: -1, yoyo: false});
      this.hourTimeline.to(this.$refs.lastHour, 1, {
        opacity: 0,
        ease: Power0.easeNone,
        delay: 1200  
      })
      .to(this.$refs.nextHour, 1, {
        opacity: 1,
        ease: Power0.easeNone
      }, '-=1');
    },
    updateFilter(el) {
      if (typeof(el) === "string") { 
        el = document.querySelector(el);
      }
      var filter = getComputedStyle(el).filter;
      return function() {
        el.style.filter = "none";
        el.offsetWidth; //just to trigger repaint
        el.style.filter = filter;
      }
    }
  },
  mounted () {
    this.initDropletTimeline();
    this.initSecondTimeline();
    this.initMinuteTimeline();
    this.initHourTimeline();
    this.animate();
  }
};
</script>

<style lang="scss" scoped>
$c_accent1: rgb(0, 153, 255);
// $c_accent1: rgb(16, 42, 156);
$c_accent2: white;
// $c_accent2: rgb(0, 153, 255);
$c_accent3: black;
$c_text: $c_accent2;

// * {
//   backface-visibility: visible !important;
// }

.drippyclock__container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: $c_accent3;
  z-index: -100;
}

.drippyclock {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 10em;
  font-weight: 700;
  font-family: Consolas, monospace;
  backface-visibility: visible;
  // background-color: $c_accent1;
  color: $c_text;

  .seconds, .minutes, .hours {
    position: relative;
    filter: url('#textFilter');
  }

  .next {
    &-second, &-minute, &-hour {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      opacity: 0;
      // color: red;
      // color: rgb(69, 0, 97);
    }
  }

  .background__container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    filter: url('#bgFilter');
  }

  .background {
    position: absolute;
    top: 0;
    left: -20px;
    right: -20px;
    height: 78%;
    background-color: $c_accent1;
  }

  .droplet {
    position: absolute;
    top: 40%;
    height: 75px;
    width: 75px;
    border-radius: 50%;
    // background-color: $c_accent2;
    background-color: $c_accent1;
    transform: translate(-50%, -100%);
    z-index: -10;

    &:after {
      content: '';
      position: absolute;
      top: -50%;
      left: 50%;
      bottom: 0;
      width: 20%;
      background-color: inherit;
      transform: translateX(-50%);
    }

    &--s1 {
      left: calc(50% + 335px);
    }
    &--s2 {
      left: calc(50% + 335px);
      transform: translate(-50%, 60%) scale(.6);
    }
    &--s3 {
      left: calc(50% + 240px);
    }
    &--m1 {
      left: calc(50% + 47px);
    }
    &--m2 {
      left: calc(50% - 47px);
    }
    &--h1 {
      left: calc(50% - 240px);
    }
    &--h2 {
      left: calc(50% - 335px);
    }
  }

  // .pool {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;

  //   &__liquid {
  //     position: absolute;
  //     top: 100vh;
  //     left: -20px;
  //     right: -20px;
  //     height: 80vh;
  //     background-color: $c_accent1;
  //     z-index: 1;
  //   }
  // }
}
</style>
