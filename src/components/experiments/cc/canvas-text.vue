<template>
  <div class="container" ref="container">
    <!-- <canvas ref="canvas"></canvas> -->
  </div>
</template>

<script>
import FBO from '@/components/experiments/cc/_scripts/canvas-text/FBO';
// import ThrottleHelper from '@/scripts/utils/ThrottleHelper';
// import ShaderLoader from '@/components/experiments/cc/scripts/canvas-text/ShaderLoader';

export default {
  name: 'canvas-text',
  data: function () {
    return {}
  },
  methods: {
    init () {
      this.loadImage('/assets/cc/canvas-text/images/text.png')
        .then(this.runFBO);
    },

    runFBO () {

      this.fbo = new FBO();

      var w = window.innerWidth;
      var h = window.innerHeight;
      //regular scene creation
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(60, w/h, 1, 10000);
      this.camera.position.z = 200;
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize( w,h );
      this.$refs.container.appendChild(this.renderer.domElement);

      //width / height of the FBO
      var width  = 256;
      var height = 256;

      //populate a Float32Array of random positions
      // var data = this.getRandomData( width, height, 128 );
      const data = this.getImage(width, height, 32);
      var positions = new THREE.DataTexture( data, width, height, THREE.RGBFormat, THREE.FloatType );
      positions.needsUpdate = true;
      // console.log(positions);

      //this will be used to update the particles' positions
      var simulationShader = new THREE.ShaderMaterial({
        uniforms: {
          positions: { type: "t", value: positions },
          time: { type: "f", value: 0 }
        },
        // vertexShader: ShaderLoader.get( "simulation_vs" ),
        // fragmentShader:  ShaderLoader.get( "simulation_fs" )
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = vec2(uv.x, uv.y);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, position.z, 1.0);
          }
        `,
        fragmentShader:  `
          //basic simulation: displays the particles in place.
          uniform sampler2D positions;
          varying vec2 vUv;
          void main() {
              vec3 pos = texture2D(positions, vUv).rgb;
              gl_FragColor = vec4(pos, 0.);
          }
        `
      });
      //this will be used to represent the particles on screen
      //note that 'positions' is a texture that will be set and updated during the FBO.update() call
      var renderShader = new THREE.ShaderMaterial( {
        uniforms: {
          positions: { type: "t", value: null },
          pointSize: { type: "f", value: 2 },
          time: { type: "f", value: 0 }
        },
        // vertexShader: ShaderLoader.get( "render_vs" ),
        // fragmentShader: ShaderLoader.get( "render_fs" ),
        vertexShader: `
          varying vec3 posTest;
          uniform float time;

          //float texture containing the positions of each particle
          uniform sampler2D positions;

          //size
          uniform float pointSize;

          void main() {
              //the mesh is a normalized square so the uvs = the xy positions of the vertices
              vec3 pos = texture2D( positions, position.xy ).xyz;
              posTest = position;

              //pos now contains the position of a point in space taht can be transformed
              gl_Position = projectionMatrix * modelViewMatrix * vec4( pos.x, pos.y, 10. * (sin(time * posTest.x / 500.)) , 1.0 );

              gl_PointSize = pointSize;
          }
        `,
        fragmentShader: `
          varying vec3 posTest;
          void main()
          {
              gl_FragColor = vec4(posTest, 1.);
          }
        `,
        // transparent: true,
        blending:THREE.AdditiveBlending
      } );
      //init the FBO
      this.fbo.init( width,height, this.renderer, simulationShader, renderShader );
      this.scene.add( this.fbo.particles );
      //GO !
      window.addEventListener( "resize", this.onResize );
      this.onResize();
      this.update();
    },

    loadImage (url) {
      return new Promise ((resolve) => {
        this.img = new Image();
        this.img.onload = function(e)
        {
            resolve(e);
        };
        this.img.crossOrigin = "anonymous";
        this.img.src = url;
      });
    },

    getRandomData ( width, height, size ){
      let len = width * height * 3;
      const data = new Float32Array( len );
      while( len-- )data[len] = ( Math.random() -.5 ) * size ;
      return data;
    },

    getImage (width, height) {
      const ctx = this.getContext();
      ctx.drawImage(this.img, 0, 0);

      const imgData = ctx.getImageData(0, 0, width, height);
      const iData = imgData.data;

      const l = width * height;
      const data = new Float32Array(l*3);
      for (let i = 0; i < l; i++) {
        const i3 = i*3;
        const i4 = i*4;
        if (iData[i4] < 128) {
          data[i3] = ((i % width) / width - 0.5) * width;
          data[i3 + 1] = -1 * ((i /width) / height - 0.5) * height;
          data[i3 + 2] = 0;
        } else {
          data[i3] = -1000;
          data[i3 + 1] = -1000;
          data[i3 + 2] = 0;
        }
      }
      return data;
    },

    getContext (canvas, w, h) {
      canvas = canvas || this.getCanvas(w,h);
      canvas.width = w || canvas.width;
      canvas.height = h || canvas.height;
      return canvas.getContext("2d");
    },

    getCanvas (w, h) {
      var canvas = document.createElement("canvas");
      canvas.width = w || 512;
      canvas.height = h || 512;
      return canvas;
    },

    onResize () {
      var w = window.innerWidth;
      var h = window.innerHeight;
      this.renderer.setSize(w,h);
      this.camera.aspect = w/h;
      this.camera.updateProjectionMatrix();
    },

    update (time) {
      this._rafID = requestAnimationFrame(this.update);
      //update the simulation
      this.fbo.update(time);
      //update mesh
      // this.fbo.particles.rotation.x += Math.PI / 180 * .5;
      // this.fbo.particles.rotation.y += Math.PI / 180 * .5;
      //render the particles at the new location
      this.renderer.render( this.scene, this.camera );
    }
  },
  mounted () {
    this.init();
  }
}
</script>

<style scoped>
  .container, canvas {
    width: 100vw;
    height: 100vh;
    overflow: hidden; 
  }
</style>
