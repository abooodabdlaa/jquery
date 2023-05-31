import swc from "@swc/core";

const { code, map } = await swc.minify(
	"import foo from '@src/app'; console.log(foo)",
	{
		compress: false,
		mangle: true,
		sourceMap: true
	}
);

console.log( "map", map );
