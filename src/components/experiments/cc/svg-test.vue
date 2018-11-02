<template>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="47" fill="#000000" stroke="#000000" stroke-width="4" />
    <!-- <circle cx="50" cy="50" r="45" fill="#FFFFFF"/> -->

    <!-- MSecond hand colors -->
    <path d="" stroke="#000000" ref="mSecondColor" />
    <path />
    <!--/MSecond hand colors -->

    <!-- Second hand colors -->
    <!-- <line x1="50" y1="50" x2="0" y2="0" stroke="#FF0000" ref="secondHand" />  -->
    <path d="" stroke="#FF0000" ref="secondColor" />
    <path />
    <!--/Second hand colors -->

    <!-- Minute hand colors -->
    <!-- <line x1="50" y1="50" x2="0" y2="0" stroke="#FFFF00" stroke-width="1" ref="minuteHand" />  -->
    <path d="" stroke="#FFFF00" ref="minuteColor" />
    <path />
    <!--/Minute hand colors -->

    <!-- Hour hand colors -->
    <!-- <line x1="50" y1="50" x2="0" y2="0" stroke="#0000FF" stroke-width="1" ref="hourHand" />  -->
    <path d="" stroke="#0000FF" ref="hourColor" />
    <path />
    <!--/Hour hand colors -->

    <!-- <line x1="50" y1="50" x2="0" y2="0" stroke="#000000" ref="mSecondHand" />  -->

    <circle cx="50" cy="50" r="5" fill="#FF0000"/>
  </svg>
</template>

<script>
  const rMSecond = 47;
  const startPointMSecond = polarToCartesian(50, 50, rMSecond, Math.PI);

  const rSecond = 43;
  const startPointSecond = polarToCartesian(50, 50, rSecond, Math.PI);

  const rMinute = 34;
  const startPointMinute = polarToCartesian(50, 50, rMinute, Math.PI);

  const rHour = 25;
  const startPointHour = polarToCartesian(50, 50, rHour, Math.PI);

  function polarToCartesian (cx, cy, r, angle) {
    const x = cx + r * Math.sin(angle);
    const y = cy + r * Math.cos(angle);

    return [x, y];
  }

  export default {
    methods: {
      animate () {
        const d = new Date();
        const hour = (d.getHours() % 12) * 60 * 60 * 1000;
        const min = d.getMinutes() * 60 * 1000;
        const sec = d.getSeconds() * 1000;
        const msec = d.getMilliseconds();

        // this.animateMSecondHand(msec);
        this.animateSecondHand(msec, sec);
        this.animateMinuteHand(msec, sec, min);
        this.animateHourHand(msec, sec, min, hour);

        requestAnimationFrame(() => {
          this.animate();
        });
      },

      animateMSecondHand (msec) {
        const angle = (msec / 1000 * (2 * Math.PI) + Math.PI) * -1;
        const [x, y] = polarToCartesian(50, 50, rMSecond, angle);

        // this.drawHand(this.$refs.mSecondHand, x, y);
        this.paintCircle(this.$refs.mSecondColor, startPointMSecond, [x, y], rMSecond, angle);
      },

      animateSecondHand (msec, sec) {
        const angle = ((sec + msec) / (60*1000) * (2 * Math.PI) + Math.PI) * -1;
        const [x, y] = polarToCartesian(50, 50, rSecond, angle);

        // this.drawHand(this.$refs.secondHand, x, y);
        this.paintCircle(this.$refs.secondColor, startPointSecond, [x, y], rSecond, angle);
      },

      animateMinuteHand (msec, sec, min) {
        const angle = ((min + sec + msec) / (60 * 60 * 1000) * (2 * Math.PI) + Math.PI) * -1;
        const [x, y] = polarToCartesian(50, 50, rMinute, angle);

        // this.drawHand(this.$refs.minuteHand, x, y);
        this.paintCircle(this.$refs.minuteColor, startPointMinute, [x, y], rMinute, angle);
      },

      animateHourHand (msec, sec, min, hour) {
        const angle = ((hour + min + sec + msec) / (12 * 60 * 60 * 1000) * (2 * Math.PI) + Math.PI) * -1;
        const [x, y] = polarToCartesian(50, 50, rHour, angle);

        // this.drawHand(this.$refs.hourHand, x, y);
        this.paintCircle(this.$refs.hourColor, startPointHour, [x, y], rHour, angle);
      },

      drawHand (el, x, y) {
        el.setAttribute('x2', x);
        el.setAttribute('y2', y);
      },

      paintCircle (el, start, end, r, angle) {
        const largeArcFlag = angle >= -2 * Math.PI ? "0" : "1";

        const d = [
            "M", end[0], end[1], 
            "A", r, r, 0, largeArcFlag, 0, start[0], start[1]
        ].join(" ");
        
        el.setAttribute('d', d);
      }
    },
    mounted () {
      requestAnimationFrame(() => {
        this.animate();
      });
    }
  }
</script>

<style>
body {
  background-color: #000;
}

svg {
  max-width: 90vw;
  max-height: 90vh;
  margin: auto;
} 
</style>