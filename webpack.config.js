let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')


let cssLoaders = (extra) => {
    let loaders = [
        {
            loader: MiniCssExtractPlugin.loader
        },
        'css-loader',
        'postcss-loader',
        'group-css-media-queries-loader'
    ]
    if(extra) loaders.push(extra)
    return loaders
}




module.exports = {
    // говорим где лежат все исходники нашего приложения
    context: path.resolve(__dirname, 'src'),
    mode: 'developement',
    // указываем какой файл являеться входним для нашего проекта
    entry: {
        main: './scripts/index.js'
    },
    // куда наш файл отправлять в результате работы вебпака
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'script/[name].[hash].js',
        clean: true
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname,'src')
        }
    },
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        open: true,
        static: './dist',
        port: 4300
    },
    // для добавляния и использования любых плагинов
    plugins: [
        // используем для того чтобы вебпак понимал наш  html  и будет добавлять его в dist
        new HtmlWebpackPlugin({
            template: './index.pug'
        }),
        new MiniCssExtractPlugin({
            filename: 'style/[name].[hash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.pug$/i,
                loader: 'pug-loader'
            },
            {
                test: /\.css$/i,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/i,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext][query]'
                }
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext][query]'
                }
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}