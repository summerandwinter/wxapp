const AV = require('../utils/av-weapp-min');

class Movie extends AV.Object {
  get id() {
    return this.get('id');
  }
  set id(value) {
    this.set('id', value);
  }

  get word() {
    return this.get('word');
  }
  set word(value) {
    this.set('word', value);
  }

  get movie() {
    return this.get('movie');
  }
  set movie(value) {
    this.set('movie', value);
  }
  get photo() {
    return this.get('photo');
  }
  set photo(value) {
    this.set('photo', value);
  }
}

AV.Object.register(Movie, 'movies');
module.exports = Movie;