// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import alias from 'rollup-plugin-alias';
import minify from 'rollup-plugin-minify-es';
//import closure from 'rollup-plugin-closure-compiler-js';

const substituteModulePaths = {
    /*'crypto': 'build/module/adapters/crypto.browser.js',
    'hash.js': 'build/temp/hash.js'*/
}

export default {
    input: 'build/module/index.js',
    sourcemap: true,
    plugins: [
        alias(substituteModulePaths),
        nodeResolve({
            browser: true
        }),
        commonjs(),
        minify()
    ],
    external: ['jquery'],
    globals: {
        $: 'jquery',
        jquery: 'jQuery'
    }
}
