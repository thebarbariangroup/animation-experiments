export default class ShaderLoader {

    constructor () {
      this.shaders = [];
    }

    get (id) {
      return this.shaders[ id ];
    }

    loadShaders (shaders, baseUrl, callback) {
      this.shaders = shaders;

      this.baseUrl = baseUrl || "./";
      this.callback = callback;
      this.batchLoad(this, this.onShadersReady);
    }

    batchLoad (scope, callback) {
        var queue = 0;
        for ( var name in ShaderLoader.shaders ) {
          queue++;
          var req = new XMLHttpRequest();
          req.onload = loadHandler(queue, name, req, callback);
          req.open('get', scope.baseUrl + name + '.glsl', true);
          req.send();
        }  
    }

    loadHandler (queue, name, req, callback) {
      return () => {
        this.shaders[ name ] = req.responseText;
        if ( --queue <= 0 ) callback();
      };
    }

    onShadersReady (){
      if(this.callback) this.callback();
    }

}


