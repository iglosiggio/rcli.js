const Transform = require('stream').Transform;

/* WARNING: Ignora lineas vacías */

class Split extends Transform {
  constructor(options) {
    super(options);
    this._data = "";
  }

  _transform(chunk, encoding, callback) {
    const data = chunk.toString();
    const lines = data.split('\n');

    this._data += lines[0];

    if(lines.length > 1) {
      this.push(this._data);
      lines.slice(1, -1).forEach((line) => this.push(line));
      this._data = lines.slice(-1);
    }

    /* Terminamos de procesar */
    callback();
  }

  _flush(callback) {
    this.push(this._data);
    callback();
  }
}

module.exports = Split;
