// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import alias from 'rollup-plugin-alias';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

const substituteModulePaths = {
    /*'crypto': 'build/module/adapters/crypto.browser.js',
    'hash.js': 'build/temp/hash.js'*/
}

export default {
    entry: 'build/module/index.js',
    sourceMap: true,
    plugins: [
        alias(substituteModulePaths),
        nodeResolve({
            browser: true
        }),
        commonjs(),
        uglify({},minify)
    ],
    external: ['jquery'],
    globals: {
        $: 'jquery',
        jquery: 'jQuery'
    }
}
