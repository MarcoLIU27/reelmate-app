export default class moviePoolStorage {
    static key = "moviePool";
  
    // Initialize moviePool in sessionStorage if not already present
    static initialize() {
        sessionStorage.setItem(this.key, JSON.stringify([]));
    }
  
    // Add a movieId to the moviePool array
    static add(movieId: string) {
      const moviePool = JSON.parse(sessionStorage.getItem(this.key)!);
      if (!moviePool.includes(movieId)) {
        moviePool.push(movieId);
        sessionStorage.setItem(this.key, JSON.stringify(moviePool));
      }
    }
  
    // Remove a movieId from the moviePool array
    static remove(movieId: string) {
      let moviePool = JSON.parse(sessionStorage.getItem(this.key)!);
      moviePool = moviePool.filter((id: string) => id !== movieId);
      sessionStorage.setItem(this.key, JSON.stringify(moviePool));
    }
  
    // Get the length of the moviePool array
    static getLength() {
      const moviePool = JSON.parse(sessionStorage.getItem(this.key)!);
      return moviePool.length;
    }
  
    static getFirst() {
      const moviePool = JSON.parse(sessionStorage.getItem(this.key)!);
      return moviePool[0];
    }
  
    static removeFirst() {
      let moviePool = JSON.parse(sessionStorage.getItem(this.key)!);
      moviePool = moviePool.slice(1);
      sessionStorage.setItem(this.key, JSON.stringify(moviePool));
    }
  
    // Get the entire moviePool array
    static getAll() {
      return JSON.parse(sessionStorage.getItem(this.key)!);
    }
  };