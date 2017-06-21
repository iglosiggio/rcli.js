const rcli = require('./rcli');

/* El handler de un comando recibe tres parámetros:
 *   * data: un objeto con la data pasada al comando
 *   * write: una función que le permite escribir en el socket
 *   * done: una función que DEBE llamar cuando ha terminado de escribir en el socket
 */

const server = rcli({
  echo(data, write, done) {
    write(data);
    done();
  },

  hola(data, write, done) {
    write(`Hola ${data.quien}!`);
    done();
  }
}).listen(1337);
