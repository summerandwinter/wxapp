const AV = require('../utils/av-weapp-min');

class Template extends AV.Object {

  get id() {
    return this.get('id');
  }
  set id(value) {
    this.set('id', value);
  }

  get tid() {
    return this.get('tid');
  }
  set tid(value) {
    this.set('tid', value);
  }

  get url() {
    return this.get('url');
  }
  set url(value) {
    this.set('url', value);
  }

}

AV.Object.register(Template, 'template');
module.exports = Template;