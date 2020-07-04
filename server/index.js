require("ignore-styles");
require("ignore-loader");

require("@babel/register")({
  ignore: [/(node_module)/],
  presets: [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        targets: {
          esmodules: true,
        },
      },
    ],
  ],

  plugins: [
    [
      "babel-plugin-styled-components",
      {
        ssr: true,
        displayName: false,
        fileName: false,
        transpileTemplateLiterals: false,
        minify: false,
      },
    ],
    [
      "file-loader",
      {
        name: "[name].[hash:8].[ext]",
        extensions: ["png", "jpg", "jpeg", "gif", "svg", "mp4", "mp3", "avi"],
        publicPath: "/static/",
        outputPath: "../../../build/static/media",
        context: "",
        limit: 8192,
        emitFile: true,
      },
    ],
  ],
});

require("./server");
