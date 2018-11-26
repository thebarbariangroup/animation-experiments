<template>
  <div class="experiment">
    <component :is="getDynamicExperiment"></component>
  </div>
</template>

<script>
import cleanupExperiment from '@/scripts/mixins/cleanupExperiment';

export default {
  name: 'experiment',
  methods: {
    getDynamicExperiment () {
      this.expPrefix = this.$route.params.prefix;
      this.expID = this.$route.params.id;

      if (this.$parent.moduleCashe[this.expPrefix] && this.$parent.moduleCashe[this.expPrefix][this.expID]) {
        return this.reloadExperiment();
      }

      return this.importExperiment();
    },
    importExperiment () {
      return new Promise(async (resolve) => {
        const module = await import(`@/components/experiments/${this.expPrefix}/${this.expID}.vue`);

        module.default = Object.assign(module.default, {
          mixins: [cleanupExperiment]
        });

        this.$parent.moduleCashe[this.expPrefix] = Object.assign(this.$parent.moduleCashe[this.expPrefix] || {}, {
          [this.expID]: module
        });

        resolve(module);
      });
    },
    reloadExperiment () {
      return new Promise((resolve) => {
        resolve(this.$parent.moduleCashe[this.expPrefix][this.expID]);
      });
    }
  }
}
</script>
