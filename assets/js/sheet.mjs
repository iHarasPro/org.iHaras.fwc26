export default class {

  /**
   * @type {string}
   */
  title;

  /**
   * @type {Object<string,number>}
   */
  counts;


  /**
   * Create a new instance.
   *
   * @param {string}                title
   * @param {Object<string,number>} [counts={}]
   */
  constructor(
    title,
    counts = {},
  ) {
    this.title = title;
    this.counts = counts;
  }


  /**
   * Rename an instance.
   *
   * @param   {string} title
   *
   * @returns {void}
   */
  rename(title) {
    this.title = title;
  }


  /**
   * Get the count.
   *
   * @param   {string} code
   *
   * @returns {number}
   */
  get(code) {
    return this.counts[code] ?? 0;
  }


  /**
   * Increment count by 1 and return it.
   *
   * @param   {string} code
   *
   * @returns {number}
   */
  inc(code) {
    // If 0, initialize
    if (!(code in this.counts)) {
      this.counts[code] = 0;
    }
    return ++this.counts[code];
  }


  /**
   * Decrement count by 1 (to a minimum of 0) and return it.
   *
   * @param   {string} code
   *
   * @returns {number}
   */
  dec(code) {
    // If 0
    if (!(code in this.counts)) {
      return 0;
    }
    // If 1
    if (this.counts[code] === 1) {
      delete this.counts[code];
      return 0;
    }
    // Else
    return --this.counts[code];
  }
}
