class Media {
    constructor(title) {
      this._title = title;
      this._isCheckedOut = false;
      this._ratings = [];
    }
  
    get title() {
      return this._title;
    }
  
    get isCheckedOut() {
      return this._isCheckedOut;
    }
  
    get ratings() {
      return this._ratings;
    }
  
    set isCheckedOut(boolean) {
      this._isCheckedOut = false;
    }
  
    toggleCheckOutStatus() {
      this._isCheckedOut = !this._isCheckedOut;
    }
  
    getAverageRating() {
      let sumOfArray = this._ratings.reduce((currentSum, rating) => currentSum + rating, 0);
      return (sumOfArray / this._ratings.length);
    }
  
    addRating(rating) {
      if (rating >= 1 && rating <= 5) {
        this._ratings.push(rating);
      } else {
        console.log('Rate goes from 1 to 5');
      }
    }
  }
  
  class Book extends Media {
    constructor(author, pages, title) {
      super(title);
      this._author = author;
      this._pages = pages;
    }
  
    get author() {
      return this._author;
    }
  
    get pages() {
      return this._pages;
    }
  }
  
  class Movie extends Media {
    constructor(director, title, runTime) {
      super(title);
      this._director = director;
      this._runTime = runTime;
    }
  
    get director() {
      return this._director;
    }
  
    get runTime() {
      return this._runTime;
    }
  }
  
  class CD extends Media {
    constructor(artist, title, songs) {
      super(title);
      this._artist = artist;
      this._songs = songs;
    }
    get artist() {
      return this._artist;
    }
  
    get songs() {
      return this._songs;
    }
  }
  
  const historyOfEverything = new Book ('Bill Bryson', 'A Short History of Nearly Everything', '544');
  historyOfEverything.toggleCheckOutStatus();
  console.log(historyOfEverything.isCheckedOut);
  historyOfEverything.addRating(4);
  historyOfEverything.addRating(5);
  historyOfEverything.addRating(5);
  console.log(historyOfEverything);
  console.log(historyOfEverything.ratings);
  console.log(historyOfEverything.getAverageRating());
  
  const speed = new Movie ('Jan de Bont', 'Speed', '116');
  speed.toggleCheckOutStatus();
  console.log(speed.isCheckedOut);
  speed.addRating(1);
  speed.addRating(1);
  speed.addRating(5);
  console.log(speed.getAverageRating());
  
  const music = new CD ('Beyonce', 'Who runs the world');
  music.toggleCheckOutStatus();
  console.log(music.isCheckedOut);
  music.addRating(5);
  music.addRating(3);
  music.addRating(2);
  console.log(music.getAverageRating());