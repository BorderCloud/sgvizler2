// rollup.config.js
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import { terser } from "rollup-plugin-terser";

const substituteModulePaths = {
    /*'crypto': 'build/module/adapters/crypto.browser.js',
    'hash.js': 'build/temp/hash.js'*/
}

export default {
    input: 'build/module/index.js',
    plugins: [
        alias(substituteModulePaths),
        nodeResolve({
            browser: true
        }),
        commonjs()
    ],
    external: ['jquery'],
    output: {
        globals: {
            $: 'jquery',
            jquery: 'jQuery'
        },
        sourcemap: true,
        plugins: [terser()]
    }
}
