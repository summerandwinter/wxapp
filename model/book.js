const AV = require('../utils/av-weapp-min');

class Book extends AV.Object {
  get sid() {
    return this.get('sid');
  }
  set sid(value) {
    this.set('sid', value);
  }

  get id() {
    return this.get('id');
  }
  set id(value) {
    this.set('id', value);
  }

   get writerId() {
    return this.get('id');
  }
  set writerId(value) {
    this.set('id', value);
  }
   get writerName() {
    return this.get('writerName');
  }
  set writerName(value) {
    this.set('writerName', value);
  }

   get articleId() {
    return this.get('id');
  }
  set articleId(value) {
    this.set('id', value);
  }

   get uid() {
    return this.get('id');
  }
  set uid(value) {
    this.set('id', value);
  }

  get username() {
    return this.get('id');
  }
  set username(value) {
    this.set('id', value);
  }

  get comments() {
    return this.get('id');
  }
  set comments(value) {
    this.set('id', value);
  }

  get likes() {
    return this.get('id');
  }
  set likes(value) {
    this.set('id', value);
  }

  get hasFulltext() {
    return this.get('id');
  }
  set hasFulltext(value) {
    this.set('id', value);
  }

  get content() {
    return this.get('content');
  }
  set content(value) {
    this.set('content', value);
  }
}

AV.Object.register(Book, 'books');
module.exports = Book;