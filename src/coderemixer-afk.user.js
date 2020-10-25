// ==UserScript==
// @name         計算dsh0416小雞帶弓多久了
// @namespace    LuckyWind
// @version      1.0.4
// @description  Update slide / Auto answering
// @author       LuckyWind_sck
// @match        https://coderemixer.com/
// @require      https://momentjs.com/downloads/moment-with-locales.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

(() => {
  'use strict';
  const author = Array.from(document.querySelectorAll("a"))
      .find(e => e.href.includes("twitter")).href.split("/").pop();
  const daysNotUpdating = moment().diff(moment(document.querySelector('[itemprop="datePublished"]').innerText), "days");
  const message = `${author} 已经小鸡带弓【${document.title}】${daysNotUpdating} 天了`;
  const section = document.createElement("section").appendChild(
      document.createElement("p").appendChild(
          document.createTextNode(message)).parentNode).parentNode;
  document.querySelector(".h1").insertAdjacentElement("afterend", section);
  section.id = "last-update";
})();