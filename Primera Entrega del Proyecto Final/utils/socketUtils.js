const socketIo = require(`socket.io`);
const path = require(`path`);
const { promises: fs } = require("fs");

exports.sio = server => {
    return socketIo(server, {
        transport: [`polling`],
        cors: { origin: `*` }
    })
}

exports.connection = io => {
    io.on(`connection`, socket => {
        socket.on(`admin`, value => {
            fs.writeFile(path.resolve(__dirname, `./data/sesion.txt`), JSON.stringify({ admin: value }, null, 2));
        })
    })
}