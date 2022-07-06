// ==UserScript==
// @name         Coderemixer AFK
// @namespace    LuckyWind
// @version      1.0.4
// @description  計算 dsh0416 小雞帶弓多久了
// @author       LuckyWind_sck
// @match        https://coderemixer.com/
// @require      https://cdn.jsdelivr.net/npm/vue@2.6.12
// @require      https://momentjs.com/downloads/moment-with-locales.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

(() => {
  const AFK = Vue.extend({
    data() {
      return {
        author: document.querySelector('a[href*=twitter]').href.split('/').pop(),
        title: document.title,
        lastUpdate: document.querySelector('[itemprop="datePublished"]').innerText,
      };
    },
    computed: {
      daysNoUpdate() {
        return moment().diff(moment(this.lastUpdate), 'days');
      },
      message() {
        return `${this.author} 已经小鸡带弓【${this.title}】${this.daysNoUpdate} 天了`;
      },
    },
    template: '<section id="last-update"><p>{{ message }}</p></section>',
  });

  const archives = document.querySelector('.h1');
  archives.insertAdjacentElement('afterend', new AFK().$mount().$el);
})();
