
module.exports= {
    mode: "production",
    entry: "./src/main/index.js",
    output: {
        path: process.cwd() + "/",
        filename: "index.js",
        // clean: true,
    },
    module: {
        rules: [
            {
                test: /\.node$/,
                loader: "node-loader",
              },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },

        ],
    },
    plugins: [
    ],
    target: "node", // enum
};
