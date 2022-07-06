// ==UserScript==
// @name         Utaten Copy Lyric
// @namespace    LuckyWind
// @version      1.1.0
// @description  Add a button to copy lyric from UtaTen
// @author       LuckyWind_sck
// @match        https://utaten.com/lyric/*
// @require      https://cdn.jsdelivr.net/npm/vue@2.6.12
// @run-at       document-end
// @grant        none
// ==/UserScript==

(() => {
  const getCopyContent = () => {
    const cloneLyricBody = document.querySelector('.lyricBody').cloneNode(true)
    cloneLyricBody.querySelectorAll('.ruby span.rt').forEach((rt) => rt.remove())

    // This failed because some title doesn't include "「」".
    // Example:
    // * https://utaten.com/lyric/tu19060304/
    //
    // const { title } = (
    //   document.querySelector('.newLyricTitle__main')
    //     .innerText
    //     .match(/「(?<title>.*?)」/)
    //     .groups
    // );
    const title = document.querySelector('#contents > main > ol > li:nth-child(3) > span').innerText.slice(0, -2)
    const artist = document.querySelector('.newLyricWork__name').innerText.trim()
    const metadata = [...document.querySelector('.newLyricWork').children].reduce((str, { classList, innerText }) => {
      if (classList.contains('newLyricWork__title')) return `${str}\n${innerText}`
      if (classList.contains('newLyricWork__body')) return [str, innerText].join('　')
      return str
    }, '')
    const lyric = cloneLyricBody.querySelector('.hiragana').innerText.trim()

    return `${[title, artist].join('　')}${metadata}\n\n${lyric}`
  }

  const copyLyric = function copyLyric() {
    navigator.clipboard.writeText(getCopyContent())
  }

  const CopyButton = Vue.extend({
    methods: { copyLyric },
    template: '<div><a @click="copyLyric" class="lnk_opinion" style="cursor:pointer;">歌詞をコピーする</a><br></div>',
  })

  const lyricBody = document.querySelector('.lyricBody')
  lyricBody.insertBefore(new CopyButton().$mount().$el, lyricBody.children[0])
})()
