const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
    entry: './src/client/index.js', // Entry point
    mode: 'development', // Development mode
    devtool: 'source-map', // Generate source maps for easier debugging
    stats: 'minimal', // Clean output in the terminal
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                // Babel loader to transpile modern JS
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                // SASS Loader
                test: /\.scss$/,
                use: [
                    'style-loader', // Injects styles into DOM
                    'css-loader', // Turns CSS into CommonJS
                    'sass-loader' // Compiles Sass to CSS
                ]
            },
            {
                // File loader for images, fonts, etc.
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    devServer: {
        static: path.join(__dirname, 'dist'), // Serve content from dist folder
        port: 8080, // Dev server port
        open: true, // Open in the browser automatically
        hot: true // Enable Hot Module Replacement
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/client/views/index.html', // Template HTML
            filename: './index.html' // Output filename
        }),
        new CleanWebpackPlugin({
            dry: false, // Actually remove files
            verbose: true, // Show logs
            cleanStaleWebpackAssets: true, // Clean outdated files
            protectWebpackAssets: false // Allow overwriting of assets
        })
    ]
}
