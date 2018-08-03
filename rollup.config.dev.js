import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
export default {
  input: './src/index.js',
  output: {
    file: `dist/ihuns.js`,
    format: 'umd',
    name: `Ihuns`,
    sourcemap: true
  },
  plugins: [
    resolve({
      jsnext: true, // 该属性是指定将Node包转换为ES2015模块
      // main 和 browser 属性将使插件决定将那些文件应用到bundle中
      main: true, // Default: true
      browser: true // Default: false
    }),
    commonjs(),
    serve({
      open: true, // 是否打开浏览器
      contentBase: './', // 入口html的文件位置
      historyApiFallback: true, // Set to true to return index.html instead of 404
      host: 'localhost',
      port: 10001
    }),
    livereload()
  ]
};
