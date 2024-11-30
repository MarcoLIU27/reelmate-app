export default class shortlistStorage {
  static key = 'shortlist';

  static initialize() {
    sessionStorage.setItem(this.key, JSON.stringify([]));
  }

  static add(movieId: string) {
    const shortlist = JSON.parse(sessionStorage.getItem(this.key)!);
    if (!shortlist.includes(movieId)) {
      shortlist.push(movieId);
      sessionStorage.setItem(this.key, JSON.stringify(shortlist));
    }
  }

  static remove(movieId: string) {
    let shortlist = JSON.parse(sessionStorage.getItem(this.key)!);
    shortlist = shortlist.filter((id: string) => id !== movieId);
    sessionStorage.setItem(this.key, JSON.stringify(shortlist));
  }

  static getLength() {
    const shortlist = JSON.parse(sessionStorage.getItem(this.key)!);
    return shortlist.length;
  }

  static getAll() {
    return JSON.parse(sessionStorage.getItem(this.key)!);
  }
}
