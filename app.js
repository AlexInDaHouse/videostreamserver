const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');

http.createServer((req, res) => {
	let content = fs.readFileSync('./index.html');
	res.writeHead(200, {
		'Content-Type': 'text/html',
		'Cache-Control': 'no-cache, no-store, must-revalidate'
	});
	res.end(content);
}).listen(3005);

const server = new WebSocket.Server({ port: 3000 });
console.log('Listening...');

server.on('connection', socket => {
    // socket.send('Hello');
    console.log('Someone connected!');
    let count = 0;

    socket.on('message', data => {
        for (client of server.clients) {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        }
        // fs.writeFileSync('./frames/' + ++count + '.jpg', data);
        console.log('Count of data: ' + ++count);
    });

    socket.on('close', () => {
        console.log('Disconnected');
    })
});
