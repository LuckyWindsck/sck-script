// ==UserScript==
// @name         Utaten Copy Lyric
// @namespace    LuckyWind
// @version      1.0
// @description  To copy lyric from UtaTen
// @author       LuckyWind_sck
// @include      https://utaten.com/lyric/*
// @require      https://cdn.jsdelivr.net/npm/vue@2.6.12
// @run-at       document-end
// @grant        none
// ==/UserScript==

/* global Vue */
/* eslint no-irregular-whitespace: ["error", { "skipTemplates": true }] */
(() => {
  const getCopyContent = () => {
    const cloneLyricBody = document.querySelector('.lyricBody').cloneNode(true);
    cloneLyricBody.querySelectorAll('.ruby span.rt').forEach((rt) => rt.remove());

    const { title } = document.querySelector('.movieTtl_mainTxt').innerText.match(/「(?<title>.*?)」/).groups;
    const artist = document.querySelector('.boxArea_artists_move_top').innerText;
    const metadata = [...document.querySelector('.lyricWork').children].reduce((str, { classList, innerText }) => {
      if (classList.contains('lyricWork__title')) return `${str}\n${innerText}`;
      if (classList.contains('lyricWork__body')) return `${str}　${innerText}`;
      return str;
    }, '');
    const lyric = cloneLyricBody.querySelector('.hiragana').innerText.trim();

    return `${title}　${artist}${metadata}\n\n${lyric}`;
  };

  const copyLyric = function copyLyric() {
    navigator.clipboard.writeText(getCopyContent());
  };

  const CopyButton = Vue.extend({
    methods: { copyLyric },
    template: '<div><a @click="copyLyric" class="lnk_opinion" style="cursor:pointer;">歌詞をコピーする</a><br></div>',
  });

  const lyricBody = document.querySelector('.lyricBody');
  lyricBody.insertBefore(new CopyButton().$mount().$el, lyricBody.children[0]);
})();
