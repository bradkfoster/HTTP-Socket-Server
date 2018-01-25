const net = require('net');
const html = require('./html.js')

let helium = html.helium;
let h404 = html.h404;
let hydrogen = html.hydrogen;
let index = html.index;
let styles = html.styles;



const server = net.createServer(function (connection) {

  connection.on('data', function (data) {
    console.log('You received a request 1')
    console.log(data.toString());




    let header = data.toString().match(/[^\r\n]+/g)[0].split(' ');
    console.log(header);
    let method = header[0];
    let uri = header[1];
    let length = data.toString().length;











    if (method === 'GET') {
      switch (uri) {
        case '/':
        case '/index.html':
          createContent(connection, index);
          break;
        case '/hydrogen.html':
          createContent(connection, hydrogen);
          break;
        case '/helium.html':
          createContent(connection, helium);
          break;
        case '/css/styles.css':
          createContent(connection, styles);
          break;
        default:
          createContent(connection, h404);

      }
    }

  }) //close createServer



})








server.listen(8080, function () {
  console.log('You are now connected');
});

function createContent(connection, body) {
  debugger
  let res = `HTTP/1.1 200 OK
Server: BradsServer
Date: Wed, 08 Jul 2015 22:31:15 GMT
Content-Type: text/html; charset=utf-8
Connection: keep-alive

${body}`;


  connection.write(res);
  connection.end();
}