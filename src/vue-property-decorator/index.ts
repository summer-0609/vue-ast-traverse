import ts from "typescript";
import glob from "glob";
import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";

import { traverse } from "./traverse";

const fileName = resolve(__dirname, "./example.tsx");

// 读取代码文件，生成 SourceFile 对象
const sourceFile = ts.createSourceFile(
    fileName,
    readFileSync(fileName).toString(),
    ts.ScriptTarget.Latest,
    /* setParentNodes */ true
);

// 转换 AST
const result = traverse(sourceFile)

const printer = ts.createPrinter({ newLine: ts.NewLineKind.CarriageReturnLineFeed });

console.log(result.transformed.map((node) => printer.printNode(ts.EmitHint.Unspecified, node, sourceFile)).join())

// glob('./examples/*.tsx', {}, function (er, files) {
//     files.map((file) => {
//         const filePath = resolve(__dirname, file)
//         const source = ts.createSourceFile(
//             filePath,
//             readFileSync(filePath).toString(),
//             ts.ScriptTarget.Latest,
//             /* setParentNodes */ true,
//         )
//         const result = traverse(source)
//         writeFileSync(
//             filePath,
//             result.transformed.map((node) => printer.printNode(ts.EmitHint.Unspecified, node, source)).join(),
//             { encoding: 'utf-8' },
//         )
//     })
// })
