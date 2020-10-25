// ==UserScript==
// @name         Utaten Copy Lyric
// @namespace    LuckyWind
// @version      0.2
// @description  To copy lyric from UtaTen
// @author       LuckyWind_sck
// @include      https://utaten.com/lyric/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

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

  const copyButton = document.createElement('a');
  copyButton.appendChild(document.createTextNode('歌詞をコピーする'));
  copyButton.classList.add('lnk_opinion');
  copyButton.style.cursor = 'pointer';
  copyButton.addEventListener('click', () => navigator.clipboard.writeText(getCopyContent()));

  const lyricBody = document.querySelector('.lyricBody');
  lyricBody.insertBefore(document.createElement('br'), lyricBody.children[0]);
  lyricBody.insertBefore(copyButton, lyricBody.children[0]);
})();
