const { compile } = require('vue-template-compiler')
const { resolve } = require('path')
const { readFileSync } = require('fs')


const template = readFileSync(resolve(__dirname, './main.vue'),  'utf8')

console.log(4, compile(template).ast)