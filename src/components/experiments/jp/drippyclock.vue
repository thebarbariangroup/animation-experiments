<template>
  <div class="drippyclock">
    <div class="drippyclock__clock-wrapper">
      <div class="drippyclock__clock">
        <span class="drippyclock__digit--s1">{{t.fmtd.s1}}</span><span class="drippyclock__digit--s2">{{t.fmtd.s2}}</span>:<span class="drippyclock__digit--m1">{{t.fmtd.m1}}</span><span class="drippyclock__digit--m2">{{t.fmtd.m2}}</span>:<span class="drippyclock__digit--h1">{{t.fmtd.h1}}</span><span class="drippyclock__digit--h2">{{t.fmtd.h2}}</span>
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
          s1: null, s2: null, m1: null, m2: null, h1: null, h2: null
        }
      }
    }
  },
  methods: {
    getTime () {
      const d = new Date;
      this.t = {
        ms: d.getMilliseconds(),
        s: d.getSeconds(),
        m: d.getMinutes(),
        h: d.getHours()
      };

    }
  },
  mounted () {
    
  },
};
</script>

<style lang="scss" scoped>
</style>
