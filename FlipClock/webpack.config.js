const path = require("path"); // 处理绝对路径
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { Template } = require("webpack");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "/src/index.js"), // 打包入口文件
  output: {
    path: path.join(__dirname, "/dist"), //打包后的文件存放的地方
    filename: "bundle.[hash].js", //打包后输出文件的文件名
    clean: true,
  },
  devServer: {
    port: 3000,
    hot: true,
    open: true,
  },
  resolve: {
    extensions: [".jsx", "..."],
  },
  module: {
    // 表示对除了/node_modules/下的js和jsx结尾的文件应用 loader
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/assets/logo.png",
    }),
  ],
};
