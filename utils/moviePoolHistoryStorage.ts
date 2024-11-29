export default class moviePoolStorage {
    static key = "moviePoolHistory";
  
    // Initialize moviePoolHistory in sessionStorage if not already present
    static initialize() {
        sessionStorage.setItem(this.key, JSON.stringify([]));
    }
  
    // Add a movieId to the moviePoolHistory array
    static add(movieId: string) {
      const moviePool = JSON.parse(sessionStorage.getItem(this.key)!);
      if (!moviePool.includes(movieId)) {
        moviePool.push(movieId);
        sessionStorage.setItem(this.key, JSON.stringify(moviePool));
      }
    }
  
  
    // Check if a movieId is in the moviePoolHistory array
    static has(movieId: string) {
      const moviePool = JSON.parse(sessionStorage.getItem(this.key)!);
      return moviePool.includes(movieId);
    }
  
    // Get the length of the moviePoolHistory array
    static getLength() {
      const moviePool = JSON.parse(sessionStorage.getItem(this.key)!);
      return moviePool.length;
    }
  
    // Get the entire moviePoolHistory array
    static getAll() {
      return JSON.parse(sessionStorage.getItem(this.key)!);
    }
  };