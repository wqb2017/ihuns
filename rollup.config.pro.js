import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const FORMAT = process.env.FORMAT;
export default {
  input: './src/index.js',
  output: {
    file: `dist/ihuns.min.js`,
    format: `${FORMAT}`,
    name: `Ihuns`
  },
  plugins: [
    resolve({
      jsnext: true, // 该属性是指定将Node包转换为ES2015模块
      main: true, // Default: true
      browser: true // Default: false
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    uglify()
  ]
};
