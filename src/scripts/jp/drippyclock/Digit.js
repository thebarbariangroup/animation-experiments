export default class Digit {
  constructor (config) {
    this.el = config.el;
    this.morphInterval = config.morphInterval;
    this.s = {
      morphing: false,
      val = 0
    };
    
    this._init();
  }

  _init () {

  }

  tick (t) {
    if (time > this.morphInterval - 1) {
      this._morphText();
    }
  }

  _morphText () {
    this.el.classlist.add('animate');
    setTimeout(() => {
      this.el.classlist.remove('animate');
    }, 1);
  }
}