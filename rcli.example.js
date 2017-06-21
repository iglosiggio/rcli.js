const rcli = require('./rcli')

const server = rcli({
  echo(data, write, callback) {
    write(data.toString());
    callback();
  }

  hola(data, write, callback) {
    write(`Hola ${data.quien}!`);
    callback();
  }
}).listen(1337);
