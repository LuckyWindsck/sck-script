// ==UserScript==
// @name         Get Lyric
// @namespace    LuckyWind
// @version      0.1
// @description  To get lyric from UtaTen
// @author       LuckyWind_sck
// @include      https://utaten.com/lyric/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(() => {
  'use strict';
  // Define function
  const {log} = console;
  const copyToClipboard = text => {
      const temp = document.createElement("textarea");
      document.body.appendChild(temp);
      temp.appendChild(document.createTextNode(text));
      temp.select();
      document.execCommand("copy");
      document.body.removeChild(temp);
  }

  // Create button to copy
  const copyButton = document.createElement("a");
  copyButton.appendChild(document.createTextNode("歌詞をコピーする"));
  copyButton.classList.add("lnk_opinion");
  copyButton.style.cursor = "pointer";
  copyButton.addEventListener("click", () => {
      const cloneLyricBody = document.querySelector(".lyricBody").cloneNode(true);
      cloneLyricBody.querySelectorAll(".ruby").forEach(ruby => {
          const rt = ruby.querySelectorAll(".rt")[0];
          if (rt !== undefined) ruby.removeChild(rt);
      });
      let metadata = document.querySelector(".lyricWork").children;
      metadata = document.querySelector(".movieTtl").innerText.replace("「","").replace("」の歌詞","").replace("\n","　")
          + "\n"
          + Array(metadata.length / 2).fill(0).map((e, i) => {
              const dataPair = Array.from(metadata).map(e => e.innerText)
              return `${dataPair[2*i]}　${dataPair[2*i+1]}`
          }).join("\n");
      copyToClipboard(metadata + "\n\n" + cloneLyricBody.querySelector(".hiragana").innerText.trim());
  });
  const lyricBody = document.querySelector(".lyricBody")
  lyricBody.insertBefore(document.createElement("br"), lyricBody.children[0]);
  lyricBody.insertBefore(copyButton, lyricBody.children[0]);
  // const li = document.createElement("li");
  // li.appendChild(copyButton);
  // li.classList.add("lyricLink__item");

  // const lyricLink = document.querySelector(".lyricLink");
  // lyricLink.appendChild(li);
})();