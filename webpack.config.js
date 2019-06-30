//Path - переменная Node.js, отвечает за пути
const path = require('path');
const webpack = require('webpack');
//Плагины
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//Получить аргументы из консоли
const argv = require('yargs').argv;
const isDevelopment = argv.mode === 'development';
const isProduction = !isDevelopment;
module.exports = {
	//Точка входа
	entry: {
		app: './src/index.js'
	},
	//Точка выхода 
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
    },
	optimization: {
		splitChunks: {
			chunks: "all"
		}
	},
	module: {
		rules:[
			{
				test: /\.js$/,
				use: [
					{loader: 'babel-loader'}
				]
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {name: 'images/[name].[ext]'}
					},

					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true, // webpack@1.x
							disable: true, // webpack@2.x and newer
						},
					},
				],
			},
			{
		        test: /\.(sa|sc|c)ss$/,
		        use: [
                    {
                        loader:isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,

                    },
					{
						loader:'css-loader'
					},

			        {
			          loader: 'postcss-loader',
			          options: {
			            plugins: [
			              isProduction ? require('cssnano') : () => {},
			              require('autoprefixer')({
			                browsers: ['last 2 versions']
			              })
			            ]
			          }
			        },
                    {
                        loader: "resolve-url-loader"
                    },
					{
                        loader:'sass-loader'
					}

			    ]
		    },
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				/*exclude: /node_modules/,*/
				/*include: path.resolve(__dirname, "src"),*/
				use: [
					{
                        loader:	'file-loader',
                        options: {name: 'fonts/[name].[ext]'}
					}
				]
			}
		]
	},
	
	plugins: [
	//Очищает папку dist от не используемых файлов
		// new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    	new CleanWebpackPlugin(),
    //Добавляет тег script с нужным js
    	new HtmlWebpackPlugin({
    		//Адресс HTML файла
    		template: './src/index.html',
    		//Название файла на выходе
    		filename: 'index.html',
    		//Встраивание тега script в html
    		inject: true,
    		//Иконка на заголовок страницы
    		favicon: 'src/favicon.ico',
    		meta: {viewport: 'width=device-width, initial-scale=1.0'},
    		minify: isProduction ? {
    			//Удалить комментарии
                removeComments: true,
                //Удалить пробелы
                collapseWhitespace: true,
            } : false,
            //showErrors: true
            //chunks: ['another']*/
    	}),
    	new  MiniCssExtractPlugin ({
      	// Название выходного файла css
	      filename: isDevelopment ?  '[name].css'  :  '[name].[hash].css' ,
	    //Надо разобраться
	      chunkFilename : isDevelopment ?  '[id].css'  :  '[id].[hash].css' ,
	    }),

    	new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		})
   ],
   

}