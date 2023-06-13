const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@fortawesome/fontawesome-svg-core$': '@fortawesome/fontawesome-svg-core/index.js',
            '@fortawesome/free-solid-svg-icons$': '@fortawesome/free-solid-svg-icons/index.js',
            '@fortawesome/react-fontawesome$': '@fortawesome/react-fontawesome/index.js',
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        })
    ],
    devServer: {
        historyApiFallback: true,
        port: 3001
    }
};
