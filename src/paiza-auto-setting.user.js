// ==UserScript==
// @name         Paiza Auto Setting
// @namespace    LuckyWind
// @version      0.1
// @description  Automatically setup user custom coding environment
// @author       You
// @match        https://paiza.jp/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=paiza.jp
// @grant        none
// ==/UserScript==

(() => {
  const getRange = (code, rangeMatcher) => {
    const { Range } = window.ace.require('ace/range')

    const codeLines = code.split('\n')
    const rowIdx = codeLines.findIndex((line) => line.match(rangeMatcher))
    if (rowIdx === -1) return undefined

    const match = codeLines[rowIdx].match(rangeMatcher)
    const startColIdx = match.index
    const endColIdx = startColIdx + match[0].length

    return new Range(rowIdx, startColIdx, rowIdx, endColIdx)
  }

  const useUserSetting = () => {
    const defaultCode = `let lines = (
  require("fs").readFileSync("/dev/stdin", "utf8")
    .split("\\n")
    .slice(0, -1)
    .map((line) => line)
)
console.log(lines[0])`

    const rangeMatcher = /(?<=lines)\[0\]/

    const styles = `
  .tab-problem {
    display: flex;
  }
`

    return {
      defaultCode,
      range: getRange(defaultCode, rangeMatcher),
      styles,
    }
  }

  const useConsoleClear = () => {
    const sleep = (sec) => new Promise((resolve) => setTimeout(resolve, sec * 1000))

    // eslint-disable-next-line no-console
    sleep(3).then(console.clear)
  }

  const useEditorSetting = () => {
    window.editor.setTheme('ace/theme/monokai')
    window.editor.session.setTabSize(2)
  }

  const useJavaScript = () => {
    const select = document.getElementById('language_id')
    if (!select) return false

    const JavaScript = Array.from(select.options).find((option) => option.innerText === 'JavaScript')
    if (!JavaScript) return false

    JavaScript.selected = true
    select.dispatchEvent(new Event('change'))

    return true
  }

  const useDefaultEditorValue = (defaultCode, range) => {
    window.editor.session.setValue(defaultCode)

    if (!range) return
    window.editor.selection.setSelectionRange(range)
  }

  const useStyle = (styles) => {
    const styleSheet = document.createElement('style')
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)
  }

  //

  useConsoleClear()

  if (!window.editor) return
  useEditorSetting()

  const success = useJavaScript()
  if (!success) return

  const { defaultCode, range, styles } = useUserSetting()

  useDefaultEditorValue(defaultCode, range)
  useStyle(styles)
})()
