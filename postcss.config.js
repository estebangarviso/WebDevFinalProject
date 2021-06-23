module.exports = {
    plugins: [
        require("postcss-uncss")({
            html: [
                './index.html',
                './contacto.html',
                './productos.html'
            ]
        })
    ]
}