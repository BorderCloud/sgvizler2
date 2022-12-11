// rollup.config.js
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import typescript from '@rollup/plugin-typescript';

const substituteModulePaths = {
    /*'window': 'build/module/adapters/window.js'
  'crypto': 'build/module/adapters/crypto.browser.js',
   'hash.js': 'build/temp/hash.js'*/
}

export default {
    input: 'build/module/index.js',
    plugins: [
        alias(substituteModulePaths),
        nodeResolve({
            browser: true
        }),
        typescript({ compilerOptions: {lib: [
            "es6",
            "dom",
            "es2020.string"
        ], target: "es6"}}),
        commonjs()
    ],
    external: ['jquery'],
    output: {
        globals: {
            $: 'jquery',
            jquery: 'jQuery'
        },
        sourcemap: true
    }
}
