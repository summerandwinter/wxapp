const AV = require('../utils/av-weapp-min');

class Music extends AV.Object {
  get song() {
    return this.get('song');
  }
  set song(value) {
    this.set('song', value);
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

AV.Object.register(Music, 'musics');
module.exports = Music;