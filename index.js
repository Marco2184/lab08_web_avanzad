require('dotenv').config();

const http = require('http');
const fs = require('fs');
const path = require('path');

function requestController(req, res) {

  let vista;

  if (req.url === '/') {
    vista = 'index.html';
  } 
  else if (req.url === '/nosotros') {
    vista = 'nosotros.html';
  } 
  else {
    res.writeHead(404, {
      'Content-Type': 'text/html; charset=utf-8'
    });

    return res.end('<h1>Página no encontrada</h1>');
  }

  const ruta = path.join(__dirname, 'views', vista);

  fs.readFile(ruta, (error, data) => {

    if (error) {
      console.log(error);

      res.writeHead(500, {
        'Content-Type': 'text/html; charset=utf-8'
      });

      return res.end('Error al cargar la vista');
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });

    res.end(data);
  });
}

const server = http.createServer(requestController);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log('Aplicacion corriendo en: ' + PORT);
});