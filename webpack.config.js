var webpack = require('webpack'),
	path = require('path'),
	fileSystem = require('fs'),
	env = require('./utils/env'),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	WriteFilePlugin = require('write-file-webpack-plugin');

// load the secrets
var alias = {};

var secretsPath = path.join(__dirname, 'secrets.' + env.NODE_ENV + '.js');

var fileExtensions = [ 'jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2' ];

if (fileSystem.existsSync(secretsPath)) {
	alias['secrets'] = secretsPath;
}

if (env.NODE_ENV === 'development') {
	alias['react-dom'] = '@hot-loader/react-dom';
}

var options = {
	mode: process.env.NODE_ENV || 'development',
	entry: {
		options: path.join(__dirname, 'src', 'js', 'options.js'),
		background: path.join(__dirname, 'src', 'js', 'background.js')
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].bundle.js'
	},
	optimization: {
		minimize: false // <---- disables uglify.
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader',
				exclude: /node_modules/
			},
			{
				test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
				loader: 'file-loader?name=[name].[ext]',
				exclude: /node_modules/
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: require.resolve('react'),
				use: [
					{
						loader: 'expose-loader',
						options: 'React'
					}
				]
			}
		]
	},
	resolve: {
		alias: alias,
		extensions: fileExtensions.map((extension) => '.' + extension).concat([ '.jsx', '.js', '.css' ])
	},
	plugins: [
		// clean the build folder
		new CleanWebpackPlugin([ 'build' ]),
		// expose and write the allowed env vars on the compiled bundle
		new webpack.EnvironmentPlugin([ 'NODE_ENV' ]),
		new CopyWebpackPlugin([
			{
				from: 'src/manifest.json',
				transform: function(content, path) {
					// generates the manifest file using the package.json informations

					var manifest = {
						description: process.env.npm_package_description,
						version: process.env.npm_package_version,
						...JSON.parse(content.toString())
					};

					if (env.NODE_ENV === 'development') {
						manifest.content_security_policy =
							"script-src 'self' 'unsafe-eval' http://localhost:8097; object-src 'self'";
						manifest.permissions.push('http://*/*');
					}

					return Buffer.from(JSON.stringify(manifest));
				}
			}
		]),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'options.html'),
			filename: 'options.html',
			chunks: [ 'options' ]
		}),
		new WriteFilePlugin()
	]
};

if (env.NODE_ENV === 'development') {
	options.devtool = 'cheap-module-eval-source-map';
}

module.exports = options;
