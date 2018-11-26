
<template>
  <div class="metaball-clock__wrapper">
    <div class="metaball-clock">
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
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  data: () => {
    return {
      timeline: null,
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
      this.lh = d.getHours() % 12;
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
    scrubTweens () {
      this.secondTimeline.progress(this.ms / 1000);
      this.minuteTimeline.progress((this.ls + this.ms/1000) / 60);
      this.hourTimeline.progress((this.lm + (this.ls + this.ms/1000) / 60) / 60);
    },
    initSecondTimeline () {
      this.secondTimeline = new TimelineMax({
        repeat: -1,
        yoyo: false
      });
      this.secondTimeline.to(this.$refs.lastSecond, 1, {
        opacity: 0,
        ease: Power0.easeNone
      })
      .to(this.$refs.nextSecond, 1, {
        opacity: 1,
        ease: Power0.easeNone
      }, "-=1");
    },
    initMinuteTimeline () {
      this.minuteTimeline = new TimelineMax({
        repeat: -1,
        yoyo: false
      });
      this.minuteTimeline.to(this.$refs.lastMinute, 60, {
        opacity: 0,
        ease: Power3.easeIn
      })
      // .to(this.$refs.lastMinute, 5, {
      //   opacity: 0,
      //   ease: Power1.easeIn
      // })
      .to(this.$refs.nextMinute, 60, {
        opacity: 1,
        ease: Power3.easeIn
      }, "-=60")
      // .to(this.$refs.nextMinute, 5, {
      //   opacity: 1,
      //   ease: Power1.easeIn
      // });
    },
    initHourTimeline () {
      this.hourTimeline = new TimelineMax({
        repeat: -1,
        yoyo: false
      });
      this.hourTimeline.to(this.$refs.lastHour, 1200, {
        opacity: 0,
        ease: Power3.easeIn
      })
      .to(this.$refs.nextHour, 1200, {
        opacity: 1,
        ease: Power3.easeIn    
      }, "-=1200");
    }
  },
  mounted () {
    this.initSecondTimeline();
    this.initMinuteTimeline();
    this.initHourTimeline();
    this.animate();
  }
};
</script>

<style lang="scss" scoped>
.metaball-clock {
  position: absolute;
  top: 45%;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 10em;
  font-weight: 700;
  font-family: Consolas, monospace;
  backface-visibility: hidden;

  &__wrapper {
    position: relative;
    height: 85vh;
  }

  .seconds, .minutes, .hours {
    position: relative;
    background-color: white;
    filter: blur(3px) contrast(15);
    text-shadow: rgb(69, 0, 97) 0 0 10px; 
  }

  .last {
    &-second, &-minute, &-hour {
      // color: white;
    }
  }
  .next {
    &-second, &-minute, &-hour {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      color: rgb(69, 0, 97);
      opacity: 0;
    }
  }
// .metaball-clock {
//   position: absolute;
//   top: 45%;
//   left: 0;
//   right: 0;
//   text-align: center;
//   font-size: 10em;
//   font-weight: 700;
//   font-family: Consolas, monospace;

//   backface-visibility: hidden;
//   // transition: opacity .016s;

//   &__wrapper {
//     position: relative;
//     height: 90vh;
//   }

//   &__last, &__next {
//     // filter: blur(3px);
//   }

//   &__last {
//     & > span {
//       background-color: white;

//       filter: contrast(17);
//       // filter: blur(3px);
//       text-shadow: rgb(69, 0, 97) 0 0 10px;
//     }
//   }

//   &__next {
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     z-index: -1;

//     & > span {
//       background-color: white;

//       filter: contrast(17);
//       // filter: blur(3px);
//       color: rgb(69, 0, 97);
//       text-shadow: rgb(69, 0, 97) 0 0 10px;
//       opacity: 0;
//     }
//   }

}
</style>
