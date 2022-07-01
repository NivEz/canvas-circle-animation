const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

module.exports = {
    mode: mode,

    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), // path to output directory
        filename: "bundle.js" // bundled file name here
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },

    devtool: 'source-map',

    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        port: 3000
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            filename: "index.html"
        })
    ]
}
