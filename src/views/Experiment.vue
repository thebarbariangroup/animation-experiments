<template>
  <div class="experiment">
    <component :is="dynamicExperiment"></component>
  </div>
</template>

<script>
export default {
  name: 'experiment',
  computed: {
    dynamicExperiment () {
      return () => import(`@/components/experiments/${this.$route.params.prefix}/${this.$route.params.id}.vue`);
    }
  }
}
</script>
