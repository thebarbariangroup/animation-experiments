<template>
  <div class="metaball-clock__container">
    <svg>
      <defs>
        <filter id="metaball">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix in="blur" mode="matrix"
            values="1   0   0   0   0
                    0   1   0   0   0 
                    0   0   1   0   0 
                    0   0   0   18  -7"
            result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
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
      requestAnimationFrame(() => {
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
        yoyo: false,
        onUpdate: this.updateFilter('.seconds')
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
        // ,
        // onUpdate: this.updateFilter('.minutes')
      });
      this.minuteTimeline.to(this.$refs.lastMinute, 60, {
        opacity: 0,
        ease: Power3.easeIn
      })
      .to(this.$refs.nextMinute, 60, {
        opacity: 1,
        ease: Power3.easeIn
      }, "-=60")
    },
    initHourTimeline () {
      this.hourTimeline = new TimelineMax({
        repeat: -1,
        yoyo: false
        // ,
        // onUpdate: this.updateFilter('.hours')
      });
      this.hourTimeline.to(this.$refs.lastHour, 1200, {
        opacity: 0,
        ease: Power3.easeIn
      })
      .to(this.$refs.nextHour, 1200, {
        opacity: 1,
        ease: Power3.easeIn    
      }, "-=1200");
    },
    updateFilter(e) {
      if (typeof(e) === "string") { 
        e = document.querySelector(e);
      }
      var filter = getComputedStyle(e).filter;
      return function() {
        e.style.filter = "none";
        e.offsetWidth; //just to trigger repaint
        e.style.filter = filter;
      }
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
  background-color: blue;
  color: red;

  &__wrapper {
    position: relative;
    height: 85vh;
  }

  .seconds, .minutes, .hours {
    position: relative;

    filter: url('#metaball');
  }

  .last {
    // &-second, &-minute, &-hour {
    // }
  }
  .next {
    &-second, &-minute, &-hour {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      opacity: 0;
      // color: green;
      // color: rgb(69, 0, 97);
    }
  }
}
</style>
