const AV = require('../utils/av-weapp-min');

class Movie extends AV.Object {
  get word() {
    return this.get('word');
  }
  set word(value) {
    this.set('word', value);
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