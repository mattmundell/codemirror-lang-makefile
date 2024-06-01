import * as Grammar from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags} from "@lezer/highlight"

let parser, props

props = [ indentNodeProp.add({ Rule: context => context.column(context.node.from) + context.unit }),
          foldNodeProp.add({ Rule: foldInside }),
          styleTags({ String: tags.string,
                      LineComment: tags.lineComment,
                      Target: tags.className,
                      Component: tags.labelName }) ]

parser = Grammar.parser.configure({ props: props })

export
const makefileLanguage = LRLanguage.define({ name: 'makefile',
                                             parser: parser,
                                             languageData: { commentTokens: {line: '#'} } })

export
function makefile
() {
  return new LanguageSupport(makefileLanguage)
}
