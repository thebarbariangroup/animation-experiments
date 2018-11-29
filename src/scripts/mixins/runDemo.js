export default {
  mounted () {
    if (this.$route.query.demo && typeof this._initDemo === 'function') {
      console.log('_initDemo()');
      this._initDemo();
    }
  }
}