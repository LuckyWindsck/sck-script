// ==UserScript==
// @name         Maplestory Exp Ranking Link To User Page In New Tab
// @namespace    LuckyWind
// @version      0.1
// @description  Currently, if one click the user image in the exp ranking page, the user page will
//               be loaded in current page. This userscript modify the link to open user page in a
//               new tab
// @author       LuckyWind_sck
// @match        https://maplestory.nexon.co.jp/community/exp/ranking/
// @match        https://maplestory.nexon.co.jp/community/exp/dendo/
// @run-at       document-end
// @grant        none
// ==/UserScript==

/* eslint-disable no-param-reassign */
(() => {
  window.modifyLinks = () => {
    // example onlick:
    // "function onclick(event) {
    //   isMaintenaceLink('/mypage/avatar/?oid=923224196&nick=ボットコ', '', 'false')
    // }"
    const onclickRegexp = /isMaintenaceLink\('(?<url>.*?)'/;
    const avatarAnchorElements = document.querySelectorAll('li.avatar a');

    avatarAnchorElements.forEach((a) => {
      const { groups: { url } } = a.onclick.toString().match(onclickRegexp);

      // TODO: investigate isMaintenaceLink to check whether it can be safely removed
      a.removeAttribute('onclick');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    });
  };

  const checkAjaxDone = () => {
    const rankingList = document.querySelector('#setList > ol');

    if (rankingList === null) {
      setTimeout(checkAjaxDone, 1000);
    } else {
      window.modifyLinks();
    }
  };

  checkAjaxDone();

  const lastLineInAjaxDone = '$("#setpage").val(page);';
  const funcStr = window.UpdateList.toString().replace(lastLineInAjaxDone, `${lastLineInAjaxDone}window.modifyLinks();`);
  // eslint-disable-next-line no-new-func
  window.UpdateList = new Function(`return ${funcStr}`)();
})();
