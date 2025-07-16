// rollup.config.js
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const substituteModulePaths = {
    /*'crypto': 'build/module/adapters/crypto.browser.js',
    'hash.js': 'build/temp/hash.js'*/
}

export default {
    input: 'src/index.ts',
    plugins: [
        alias(substituteModulePaths),
        nodeResolve({
            browser: true
        }),
        typescript({
             tsconfig: 'tsconfig.json',
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
        file: "./build/browser/sgvizler2.mini.js",
        plugins: [terser()]
    }
}
