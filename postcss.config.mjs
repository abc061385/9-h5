const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {
      add: true,
      remove: true,
      grid: "autoplace",
    },
    "postcss-pxtorem": {
      rootValue: 16, // 基准根字体大小
      propList: ["*"], // 转换所有属性
      exclude: [/node_modules/],
      unitPrecision: 5,
      mediaQuery: false,
    },
  },
};

export default config;
