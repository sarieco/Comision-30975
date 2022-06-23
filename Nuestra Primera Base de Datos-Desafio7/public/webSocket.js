const socket = io.connect();

const fetchProducts = async (products) => {
    try {
        const res = await fetch(`http://localhost:8080/history.hbs`);
        const data = await res.text();
        const template = Handlebars.compile(data);
        const pLength = products.length > 0;
        const html = template({ products, pLength });
        return html;
    } catch (error) {
        console.error(error);
    }
}

// MODAL EVENTS
modalBtn.addEventListener(`click`, () => {
    let userActual = JSON.parse(localStorage.getItem(`user`));
    // join-chat -- envía el nombre de quien ingresó a la página.
    socket.emit(`join-chat`, userActual);
})

// PRODUCTS EVENTS
formProducts.addEventListener(`submit`, () => {
    if (nameProduct.value !== `` && priceProduct.value !== `` && imageProduct.value !== ``) {
        let username = userName.value;
        // form-products -- envía los datos del producto ingresados desd el formulario.
        socket.emit(`form-products`, {
            nameProduct: nameProduct.value,
            priceProduct: priceProduct.value,
            imageProduct: imageProduct.value,
            username
        });
        nameProduct.value = "";
        priceProduct.value = "";
        imageProduct.value = "";
    }
})

// CHAT EVENTS
inputChat.addEventListener(`keyup`, () => {
    if (inputChat.value.length !== 0) renderOnOff = true;
    else renderOnOff = false;
    let username = userName.value;
    // read-writing -- envía una señal de que alguien está o no escribiendo algo.
    socket.emit(`read-writing`, { username, renderOnOff });
});
submitChat.addEventListener(`click`, () => {
    if (inputChat.value.length > 0) {
        let message = inputChat.value;
        let username = userName.value;
        // new-message -- envía el mensaje ingresado por el input.
        socket.emit(`new-message`, { username, message });
        inputChat.value = ``;
        renderOnOff = false;
        // read-writing -- envía una señal de que alguien está o no escribiendo algo.
        socket.emit(`read-writing`, { username, renderOnOff });
    }
});
changeName.addEventListener(`click`, () => {
    renderOnOff = false;
    let username = userName.value;
    // read-writing -- envía una señal de que alguien está o no escribiendo algo.
    socket.emit(`read-writing`, { username, renderOnOff });
    let userActual = JSON.parse(localStorage.getItem(`user`));
    if (username.length >= 3 && username !== userActual) {
        localStorage.setItem(`user`, JSON.stringify(username));
        // join-chat -- envía el nuevo nombre.
        socket.emit(`join-chat`, username);
    }
});

socket.on(`get-products`, async (products) => {
    const renderProducts = await fetchProducts(products);
    historyProducts.innerHTML = renderProducts;
});

socket.on(`send-product`, (data) => {
    let userActual = JSON.parse(localStorage.getItem(`user`));
    renderNewProduct(userActual, data);
});

socket.on(`get-messages`, data => {
    let userActual = JSON.parse(localStorage.getItem(`user`));
    eachRenderMessage(userActual, data);
});

socket.on(`chat-message`, data => {
    let userActual = JSON.parse(localStorage.getItem(`user`));
    renderMessage(userActual, data);
    setTimeout(() => {
        windowChat.scrollTop = windowChat.scrollHeight;
    }, 50);
});

socket.on(`show-writing`, (data, renderOnOff) => {
    renderWriting(data, renderOnOff);
})