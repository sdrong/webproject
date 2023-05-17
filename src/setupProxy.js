const {createProxyMiddleware} = reqire('http-proxy-middleware');

modeule.exports = function(app) {
    app.use(
        '/',
        createProxyMiddleware({
            target: "http://localhost:3000",
            changeOrigin: true,
        })
    );
};