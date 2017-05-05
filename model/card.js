const AV = require('../utils/av-weapp-min');

class Card extends AV.Object {

  get id() {
    return this.get('id');
  }
  set id(value) {
    this.set('id', value);
  }

  get template() {
    return this.get('template');
  }
  set template(value) {
    this.set('template', value);
  }

  get username() {
    return this.get('username');
  }
  set username(value) {
    this.set('username', value);
  }

  get img_url() {
    return this.get('img_url');
  }
  set img_url(value) {
    this.set('img_url', value);
  }

  get name() {
    return this.get('name');
  }
  set name(value) {
    this.set('name', value);
  }

  get content() {
    return this.get('content');
  }
  set content(value) {
    this.set('content', value);
  }

}

AV.Object.register(Card, 'Card');
module.exports = Card;