<template>
  <div class="container" ref="container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import ThrottleHelper from '@/scripts/utils/ThrottleHelper';

export default {
  name: 'canvas-test',
  data: function () {
    return {}
  },
  methods: {
    init () {
      this.mouseMoveHelper = ThrottleHelper.getInstance('mousemove');

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
      
      this.renderer = new THREE.WebGLRenderer({canvas: this.$refs.canvas});
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.container.appendChild(this.renderer.domElement);

      this.cubes = this.createCubes();

      this.pointLight = this.createPointLight();

      this.camera.position.z = 5;

      this.setupEventHandlers();
      this.animate(this.renderer, this.scene, this.camera);
    },

    setupEventHandlers () {
      this.checkMouse = this.checkMouse.bind(this);
      this.mouseMoveCallbackID = this.mouseMoveHelper.add(this.checkMouse);
    },

    createCubes () {
      const X_ROWS = 10;
      const Y_ROWS = 10;

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

      const cubes = [];
      for (let x = 0; x < X_ROWS; x++) {
        for (let y = 0; y < Y_ROWS; y++) {
          const cube = new THREE.Mesh(geometry, material);
          cube.position.x = (x - X_ROWS/2) * 2;
          cube.position.y = (y - Y_ROWS/2) * 2;
          this.scene.add(cube);

          cubes.push(cube);
        }
      }

      return cubes;
    },

    createPointLight () {
      const pointLight = new THREE.SpotLight(0xff0000);
      pointLight.position.set(50, 50, 50);
      this.scene.add(pointLight);
      return pointLight;
    },

    rotateCube () {
      this.cube.rotation.x += 0.001;
      this.cube.rotation.y += 0.001;
    },

    checkMouse (e) {
      const relX = e.clientX / window.innerWidth;
      const relY = e.clientY / window.innerHeight;

      this.camera.rotation.y = (relX - 0.5);
      this.camera.rotation.x = (relY - 0.5);
      this.cubes.forEach((cube) => {
        cube.rotation.y = (relX - 0.5);
        cube.rotation.x = (relY - 0.5);
      });
    },

    animate (renderer, scene, camera) {
      this._rafID = requestAnimationFrame(() => {
        this.animate(this.renderer, scene, camera);
      });

      // this.rotateCube();
      this.renderer.render(scene, camera);
    }
  },

  mounted () {
    this.init();
  },
  beforeDestroy() {
    this.mouseMoveHelper.remove(this.mouseMoveCallbackID);
  },
}
</script>

<style scoped>
  .container, canvas {
    width: 100vw;
    height: 100vh;
    overflow: hidden; 
  }
</style>
