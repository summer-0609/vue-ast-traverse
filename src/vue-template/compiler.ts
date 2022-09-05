import { resolve } from "path";
import { readFileSync } from 'fs'
import { makeMap, unicodeRegExp } from "../utils";

const templateTag = /^\<template\>([\d\D]*)\<\/template\>/g
const comment = /^<!\--/

// Regular Expressions for parsing tags and attributes
const attribute =
    /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const dynamicArgAttribute =
    /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const doctype = /^<!DOCTYPE [^>]+>/i


const isSpecialTag = makeMap('script,style,template', true)
const isPlainTextElement = makeMap('script,style,textarea', true)


const isIgnoreNewlineTag = makeMap('pre,textarea', true)
const shouldIgnoreFirstNewline = (tag: string, html: string) =>
  tag && isIgnoreNewlineTag(tag) && html[0] === '\n'


const data = readFileSync(resolve(__dirname, './SearchQuerybar.vue'), 'utf-8')

const template = data.match(templateTag)?.[0] as string

parseHTML(template)

function parseHTML(html: string) {
    let last, lastTag
    let index = 0
    while (html) {
        last = html
        // Make sure we're not in a plaintext content element like script/style
        if (!lastTag || !isPlainTextElement(lastTag)) {
            let textEnd = html.indexOf('<')
            // Comment:
            if (comment.test(html)) {
                const commentEnd = html.indexOf('-->')

                advance(commentEnd + 3)
                continue
            }

            // Doctype:
            const doctypeMatch = html.match(doctype)
            if (doctypeMatch) {
                advance(doctypeMatch[0].length)
                continue
            }
            
            const endTagMatch = html.match(endTag)
                if (endTagMatch) {
                const curIndex = index
                advance(endTagMatch[0].length)
                // parseEndTag(endTagMatch[1], curIndex, index)
                continue
            }

            // Start tag:
            const startTagMatch = parseStartTag()
            if (startTagMatch) {
                handleStartTag(startTagMatch)
                if (shouldIgnoreFirstNewline(lastTag, html)) {
                  advance(1)
                }
                continue
            }
        }
        html = ''
    }

    function advance(n: number) {
        index += n
        html = html.substring(n)
    }

    // 解析开始标签
    function parseStartTag() {
        const start = html.match(startTagOpen)
        if (start) {
            const match = {
                tagName: start[1],
                attrs: [],
                start: index,
                unarySlash: '',
                end: undefined
            }
            advance(start[0].length)

            let end, attr
            // 获取标签属性
            while (!(end = html.match(startTagClose)) &&
                (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
                attr.start = index
                advance(attr[0].length)
                attr.end = index
                //@ts-ignore
                match.attrs.push(attr)
            }
            if (end) {
                match.unarySlash = end[1]
                advance(end[0].length)
                match.end = index
                return match
            }
        }
    }

    function handleStartTag(match) {
        const tagName = match.tagName
        const unarySlash = match.unarySlash
    
    }
}