// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import alias from 'rollup-plugin-alias';

const substituteModulePaths = {
    /*'window': 'build/module/adapters/window.js'
  'crypto': 'build/module/adapters/crypto.browser.js',
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
        commonjs()
    ],
    external: ['jquery'],
    globals: {
        $: 'jquery',
        jquery: 'jQuery'
    }

}
