require('dotenv').config();

const http = require('http');
const fs = require('fs');
const path = require('path');

function requestController(req, res) {

    let archivo;

    if (req.url === '/') {
        archivo = 'main.html';
    } 
    else if (req.url === '/nosotros') {
        archivo = 'nosotros.html';
    } 
    else {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=utf-8'
        });

        return res.end(`
            <h1>Error 404</h1>
            <p>Página no encontrada.</p>
            <a href="/">Volver al inicio</a>
        `);
    }

    const ruta = path.join(__dirname, 'views', archivo);

    fs.readFile(ruta, (error, contenido) => {

        if (error) {
            res.writeHead(500, {
                'Content-Type': 'text/html; charset=utf-8'
            });

            return res.end('Error al cargar la vista');
        }

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });

        res.end(contenido);
    });
}

const server = http.createServer(requestController);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log('Aplicacion corriendo en: ' + PORT);
});