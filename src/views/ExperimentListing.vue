<template>
  <div class="experiment-listing">
    <div class="list-title">
      <span class="list-title_title">Experiments</span>
    </div>
    <div class="experiment-listing-list">
      <ul class="experiment-listing-list_list">
        <li v-for="(item, index) in items" v-bind:key="index">
          <router-link :to="getLink(item)">
            {{getDisplayName(item)}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'experiment-listing',
  data: function() {
    return {
      items: []
    }
  },
  watch: {
    '$route' () {
      this.getExperimentsData();
    }
  },
  methods: {
    getLink (item) {
      return `${location.pathname}/${item.name}`;
    },
    getDisplayName (item) {
      return item.displayName || item.name;
    },
    getExperimentsData () {
      const prefix = this.$route.params.prefix;

      this.axios.get('/experiments.json')
      .then((response) => {
        if (!prefix) {
          return this.items = response.data.items;
        }

        const prefixedItem = response.data.items.find((item) => {
          return item.name === prefix;
        });
        
        return this.items = prefixedItem.items;
      });
    }
  },
  mounted () {
    this.getExperimentsData();
  }
}
</script>
