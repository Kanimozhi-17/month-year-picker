// import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
const packageJson = require("./package.json");
import { dts } from "rollup-plugin-dts";
import PeerDepsExternalPlugin from "rollup-plugin-peer-deps-external";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

export default [
  {
    input: "src/index.ts", // Entry point of your package
    output: [
      {
        // file: "dist/index.js",
        file: packageJson.main,
        format: "cjs", // CommonJS format
        sourcemap: true,
        exports: "auto",
      },
      {
        // file: "dist/index.esm.js",
        file: packageJson.module,
        format: "esm", // ES Module format
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      PeerDepsExternalPlugin(),
      nodeResolve(),
      terser(),
      // babel({
      //   exclude: "node_modules/**",
      //   presets: ["@babel/preset-env", "@babel/preset-react"],
      // }),
    ],
    external: ["react", "react-native"], // Exclude React and React Native from the bundle
  },
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.types,
      },
    ],
    plugins: [dts()],
  },
];
