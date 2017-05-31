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

  get likes() {
    return this.get('likes');
  }
  set likes(value) {
    this.set('likes', value);
  }

  get liked() {
    return this.get('liked');
  }
  set liked(value) {
    this.set('liked', value);
  }

  get content() {
    return this.get('content');
  }
  set content(value) {
    this.set('content', value);
  }

  get photo() {
    return this.get('photo');
  }
  set photo(value) {
    this.set('photo', value);
  }

  get publish() {
    return this.get('publish');
  }
  set publish(value) {
    this.set('publish', value);
  }

}

AV.Object.register(Card, 'Card');
module.exports = Card;