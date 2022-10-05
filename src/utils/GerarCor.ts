function gerarHex() {
    let numero = Math.floor(Math.random() * 255).toString(16);
    while (numero.length < 2) {
        numero = '0' + numero;
    }
    return numero;
}

function GerarCor() {
    const red = gerarHex();
    const green = gerarHex();
    const blue = gerarHex();
    return ('#' + red + green + blue).toUpperCase();
}

export { GerarCor }