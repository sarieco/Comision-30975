const express = require("express");
const http = require(`http`);
const cors = require("cors");
const socketIo = require(`socket.io`);
const indexRoutes = require("./routers/indexRoutes");
const path = require("path");
const ContainerApi = require(`./models/api`);
const config = require("./db/config");
const { formatMessage } = require(`./utils/utils`);

const containerProducts = new ContainerApi(config.mariaDB, "products");
const containerChats = new ContainerApi(config.sqlite, "chats");

const PORT = process.env.PORT || 8080;

const app = express();
const httpServer = http.createServer(app);
const io = socketIo(httpServer);

// Middlewares
app.use(cors());
app.use(express.static(path.resolve(__dirname, './public')));

// Routes
app.use("/api", indexRoutes);
app.use("/*", (req, res) =>
    res.send({ success: false, error: `this route does not exist.` })
);

// Socket
io.on(`connection`, async (socket) => {

    socket.on(`form-products`, async ({ nameProduct, priceProduct, imageProduct, username }) => {
        await containerProducts.save({ nameProduct, priceProduct, imageProduct });
        // send-product -- envía un mensaje a quien subió el producto.
        socket.emit(`send-product`, formatMessage(true, username, `Agregaste un nuevo producto.`));
        // send-product -- envía un mensaje a todos menos a quien subió el producto.
        socket.broadcast.emit(`send-product`, formatMessage(true, username, `agregó un nuevo producto.`));
        // get-products -- envía los productos a todos.
        const product = await containerProducts.getAll();
        io.emit(`get-products`, product.result);
    })

    // get-products -- envía los productos existentes a quien ingrese a la página.
    const product = await containerProducts.getAll();
    socket.emit(`get-products`, product.result);

    socket.on(`join-chat`, async (username) => {
        // get-messages -- envía todos los mensajes a quien ingrese a la página.
        const chats = await containerChats.getAll();
        socket.emit(`get-messages`, chats.result);
        // chat-message -- envía un mensaje a quien ingrese a la página.
        socket.emit(`chat-message`, formatMessage(true, username, `Bienvenido`));
        // chat-message -- envía un mensaje a todos menos a quien ingresó a la página.
        socket.broadcast.emit(`chat-message`, formatMessage(true, username, `se unió al chat`));
    });

    socket.on(`read-writing`, ({ username, renderOnOff }) => {
        // show-writing -- envía un mensaje a todos menos a quien está escribiendo.
        socket.broadcast.emit(`show-writing`, formatMessage(true, username, `está`), renderOnOff);
    });

    socket.on(`new-message`, async ({ username, message }) => {
        const newMessage = formatMessage(false, username, message);
        await containerChats.save({ username, message, time: newMessage.time });
        // chat-message -- envía un mensaje a todos.
        io.emit(`chat-message`, newMessage);
    })
});

// Listen
const connectedServer = httpServer.listen(PORT, () => console.log(`Server is up and running on port: ${PORT}`));
connectedServer.on(`error`, error => console.error(error.message));