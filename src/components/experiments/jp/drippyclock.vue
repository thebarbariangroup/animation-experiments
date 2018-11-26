<template>
  <div class="drippyclock">
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
    <div class="drippyclock__clock-wrapper">
      <div class="drippyclock__clock">
        <span class="drippyclock__digit drippyclock__digit--h2"
          :next="t.fmtd.nh2"
        >{{t.fmtd.h2}}</span><span class="drippyclock__digit drippyclock__digit--h1"
          :next="t.fmtd.nh1"
        >{{t.fmtd.h1}}</span>:<span class="drippyclock__digit drippyclock__digit--m2"
          :next="t.fmtd.nm2"
        >{{t.fmtd.m2}}</span><span class="drippyclock__digit drippyclock__digit--m1"
          :next="t.fmtd.nm1"
        >{{t.fmtd.m1}}</span>:<span class="drippyclock__digit drippyclock__digit--s2"
          :next="t.fmtd.ns2"
        >{{t.fmtd.s2}}</span><span class="drippyclock__digit drippyclock__digit--s1"
          :next="t.fmtd.ns1"
        >{{t.fmtd.s1}}</span>
      </div>
    </div>
    <div class="drippyclock__fluid">

    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  data () {
    return {
      t: {
        raw: {
          ms: null, s: null, m: null, h: null
        },
        fmtd: {
          s1: null, s2: null, m1: null, m2: null, h1: null, h2: null,
          ns1: null, ns2: null, nm1: null, nm2: null, nh1: null, nh2: null
        }
      }
    }
  },
  methods: {
    animate () {
      this.setRawTime();
      this.setFormattedTime();
      this._rafID = requestAnimationFrame(() => {
        this.animate();
      });
    },
    setRawTime () {
      const d = new Date;
      this.t.raw = {
        ms: d.getMilliseconds(),
        s: d.getSeconds(),
        m: d.getMinutes(),
        h: d.getHours()
      };
    },
    setFormattedTime () {
      const r = this.t.raw;
      r.h = (r.h + 11) % 12 + 1;

      const ns = (r.s + 1) % 60;
      const nm = (r.m + 1) % 60;
      const nh = (r.h + 12) % 12 + 1;

      this.t.fmtd = {
        s1: ones(r.s), s2: tens(r.s),
        m1: ones(r.m), m2: tens(r.m),
        h1: ones(r.h), h2: tens(r.h),
        ns1: ones(ns), ns2: tens(ns),
        nm1: ones(nm), nm2: tens(nm),
        nh1: ones(nh), nh2: tens(nh)
      };

      function ones (num) {
        return `${num % 10}`;
      }
      function tens (num) {
        return num < 10 ? '0' : `${num}`[0];
      }
    }
  },
  mounted () {
    this.setRawTime();
    this.setFormattedTime();
    this.animate();
  }
};
</script>

<style lang="scss" scoped>
$c_accent1: rgb(0, 153, 255);
$c_accent2: white;
$c_accent3: black;
$c_text: $c_accent2;

.drippyclock {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: $c_accent3;
  color: $c_text;
  z-index: -100;

  &__clock {
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
    filter: url('#textFilter');
  }

  &__digit {
    position: relative;

    &::after {
      content: attr(next);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      opacity: 0;
    }

    &.animate {
      opacity: 0;
      transition: opacity 1s linear;

      &::after {
        opacity: 1;
        transition: inherit;
      }
    }
  }
}

</style>
