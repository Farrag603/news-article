const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
    entry: './src/client/index.js', // Entry point for production
    mode: 'production', // Production mode
    output: {
        filename: '[name].[contenthash].js', // Output file with content hash for caching
        path: `${__dirname}/dist`,
        clean: true // Cleans the output directory
    },
    module: {
        rules: [
            {
                // Babel loader for JS
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                // SASS Loader for CSS extraction
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS to separate files
                    'css-loader', // Turns CSS into CommonJS
                    'sass-loader' // Compiles Sass to CSS
                ]
            },
            {
                // File loader for assets like images
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/client/views/index.html', // Use the HTML template
            filename: './index.html' // Output HTML file
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css' // Extracted CSS file
        }),
        new CleanWebpackPlugin(), // Cleans dist folder
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true, // Ensures clients are immediately controlled
            skipWaiting: true, // Skip waiting to activate the service worker immediately
            runtimeCaching: [
                {
                    urlPattern: ({ url }) => url.origin === 'https://api.meaningcloud.com', // Cache API requests
                    handler: 'NetworkFirst', // Prefer network, fallback to cache if offline
                    options: {
                        cacheName: 'api-cache', // Cache name for API responses
                        expiration: {
                            maxEntries: 50, // Maximum number of cached responses
                            maxAgeSeconds: 60 * 60 * 24 // Cache for 1 day
                        }
                    }
                },
                {
                    urlPattern: ({ url }) => url.origin === 'https://localhost:8081', // Cache local server requests
                    handler: 'NetworkFirst', // Prefer network, fallback to cache if offline
                    options: {
                        cacheName: 'local-cache', // Cache name for local server responses
                        expiration: {
                            maxEntries: 50, // Maximum number of cached responses
                            maxAgeSeconds: 60 * 60 * 24 // Cache for 1 day
                        }
                    }
                },
                {
                    urlPattern: /\.(?:html|css|js|json)$/i, // Cache HTML, CSS, JS, and JSON files
                    handler: 'StaleWhileRevalidate', // Use cache, revalidate in background
                    options: {
                        cacheName: 'static-assets', // Cache name for static files
                        expiration: {
                            maxEntries: 100, // Maximum number of cached static assets
                            maxAgeSeconds: 60 * 60 * 24 * 30 // Cache for 30 days
                        }
                    }
                }
            ]
        })
    ],
    optimization: {
        minimize: true, // Minimize the output for production
        minimizer: [
            new TerserPlugin(), // Minify JavaScript
            new CssMinimizerPlugin() // Minify CSS
        ],
        splitChunks: {
            chunks: 'all' // Code splitting
        }
    }
}
