"use strict";

let fs;
try {
	fs = require( "node:fs/promises" );
} catch ( __e ) {
	fs = require( "fs" ).promises;
}
const swc = require( "@swc/core" );

const main = async() => {
	const unminifiedSource = await fs.readFile(
		`${ __dirname }/dist/jquery.js`,
		"utf-8"
	);

	// const { code, map } = await swc.minify(
	const res = await swc.minify(
		unminifiedSource,
		{
			format: {
				ecma: 5,
				asciiOnly: true,
				comments: false,
				preamble: "/*! jQuery v4.0.0-pre | " +
					"(c) OpenJS Foundation and other contributors | jquery.org/license */\n"
			},
			compress: {
				ecma: 5,
				hoist_funs: false,
				loops: false
			},
			mangle: true,
			sourceMap: true
		}
	);

	console.log( "res", res );

	const { code, map } = res;
	console.log( "map", map );

	await fs.writeFile( `${ __dirname }/dist/jquery.swc.min.js`, code );
	await fs.writeFile( `${ __dirname }/dist/jquery.swc.min.map`, map );
};

main()
	.catch( error => {
		console.error( error );
	} );
