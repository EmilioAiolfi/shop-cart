var path, glob, webpack, uglify, dev, optimize, config, ExtractTextPlugin;

path	 = require('path');
glob	 = require('glob');
webpack  = require('webpack');
ExtractTextPlugin = require('extract-text-webpack-plugin');
optimize = webpack.optimize;
uglify   = optimize.UglifyJsPlugin;

dev	 = !!process.argv.filter(function(item){ return item == '--dev'; }).length;

config = {
	js	: './front',
	dist: __dirname + '/dist/',
	publicPath :'./dist/'
}

module.exports = {

	devtool : 'source-map',

	entry : glob.sync( config.js + '/apps/**/*{.js,.styl}').reduce( entries, {
		main:[ config.js + '/main' ]
	}),

	output: {
		path: config.dist,
        filename: '[name]/index.js',
		publicPath: config.publicPath
	},

	resolve:{
		root :[ path.resolve(config.js), path.resolve(config.dist) ],
		alias :{
			jails :'jails-js/dist/jails'
		}
	},

	plugins :[
		new optimize.CommonsChunkPlugin('main', 'main.js')
	].concat(
		dev? [] :new optimize.UglifyJsPlugin({
			compress :{ warnings:false },
			minimize :true}
		),
		new ExtractTextPlugin('[name]/index.css', {allChunks: false})
	),

	module: {
		loaders: [{
			loader: 'babel',
			test: /\.js|\.jsx$/,
			exclude: /node_modules/,
			query:{
				presets:['es2015'],
				plugins:[['transform-react-jsx', { 'pragma': 'vdom.h'}]]
			}
		},
		{
			test:   /\.styl$/,
			loader: ExtractTextPlugin.extract('css-loader!stylus-loader?paths[]=node_modules&paths[]=front')
		}]
	}
};

function entries(acc, file){

	var filename  = path.basename(file);
	var dir = path.dirname(file).split(/\//).pop();
	acc[dir] = (acc[dir] || []).concat(file);

	return acc;
}
