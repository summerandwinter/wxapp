const AV = require('../utils/av-weapp-min');

class Book extends AV.Object {
  get book() {
    return this.get('book');
  }
  set book(value) {
    this.set('book', value);
  }

  get author() {
    return this.get('author');
  }
  set author(value) {
    this.set('author', value);
  }

  get word() {
    return this.get('word');
  }
  set word(value) {
    this.set('word', value);
  }
}

AV.Object.register(Book, 'books');
module.exports = Book;