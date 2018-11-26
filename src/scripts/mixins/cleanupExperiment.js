export default {
  beforeDestroy () {
    if (this._rafID) {
      cancelAnimationFrame(this._rafID);
    }

    if (this.fbo) {
      this.fbo.kill();
    }

    // if (this.$refs.container) {
    //   const gl = this.$refs.container.getContext('webgl');
    //   if (gl) {
    //     gl.getExtension('WEBGL_lose_context').loseContext();
    //     // this.scene = null;
    //     // this.camera = null;
    //     // this.pointLight = null;
    //     // this.cubes = null;
    //   }
    // }
  }
};