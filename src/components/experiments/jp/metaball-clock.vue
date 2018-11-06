<template>
  <div class="metaball-clock__wrapper">
    <div class="metaball-clock">
      <span class="metaball-clock__last">{{hours}}:{{minutes}}:{{seconds}}</span>
      <span class="metaball-clock__next">{{nextHours}}:{{nextMinutes}}:{{nextSeconds}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      seconds: null,
      minutes: null,
      hours: null,
      nextSeconds: null,
      nextMinutes: null,
      nextHours: null, 
    }
  },
  methods: {
    animate () {
      this.setTimes();
      requestAnimationFrame(() => {
        this.animate();
      });
    },
    setTimes () {
      const d = new Date;
      this.hours = this.addLeadingZero(d.getHours() % 12);
      this.minutes = this.addLeadingZero(d.getMinutes());
      this.seconds = this.addLeadingZero(d.getSeconds());
      this.nextHours = this.addLeadingZero((d.getHours() + 1) % 12);
      this.nextMinutes = this.addLeadingZero(d.getMinutes() + 1);
      this.nextSeconds = this.addLeadingZero(d.getSeconds() + 1);
    },
    addLeadingZero (num) {
      return num < 10 ? `0${num}` : `${num}`;
    }
  },
  mounted () {
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
  font-size: 4em;
  font-weight: 500;

  &__wrapper {
    position: relative;
    height: 90vh;
  }

  &__next {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

}
</style>
