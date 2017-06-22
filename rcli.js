const createServer = require('net').createServer;
const Transform = require('stream').Transform;
const Splitter = require('./lines');

function createRCLI(handlers, options) {
  const rcli = createServer(options);

  /* Los mensajes son en formato "<comando> <data>"
   * un salto de línea representa el final del
   * comando y la data es JSON
   */
  function handle_line(line, encoding, callback) {
    const write = text => this.push(`${text}\n`);
    const error = text => (write(`Error: ${text}`, callback()));

    const message = line.toString();
    const match = /^([a-z-_]+) (.*)$/.exec(message);

    if(match === null) {
      return error('no pudo comprenderse la línea de entrada');
    }

    const [_, comando, data] = match;

    if(!handlers.hasOwnProperty(comando)) {
      return error('comando no reconocido');
    }

    try {
      const args = JSON.parse(data);

      handlers[comando](args, write, callback);
    } catch(e) {
      return error(e.message);
    }
  }

  function handle_connection(socket) {
    socket.setEncoding('utf8')
          .pipe(new Splitter())
          .pipe(new Transform({ transform: handle_line }))
          .pipe(socket);
  }

  rcli.on('connection', handle_connection);

  return rcli;

}

module.exports = createRCLI;
