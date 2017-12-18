'use strict';

const regexS = /medium.com\/.*/g;

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});


// on tab updated
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // code in here will run every time a user goes onto a new tab, so you can insert your scripts into every new tab

    var regex = new RegExp(regexS);
    var results = regex.exec(tab.url);

    if(results){
      // console.log(`Injecting Analytics in tab: ${tab.url}`);
      // Init Google Analytics?
      (function(i, s, o, g, r, a, m) {
          i['GoogleAnalyticsObject'] = r;
          i[r] = i[r] || function() {
              (i[r].q = i[r].q || []).push(arguments)
          }, i[r].l = 1 * new Date();
          a = s.createElement(o),
              m = s.getElementsByTagName(o)[0];
          a.async = 1;
          a.src = g;
          m.parentNode.insertBefore(a, m)
      })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga'); // Note: https protocol here

      window.ga('create', 'UA-111375927-1', 'auto');
      window.ga('set', 'checkProtocolTask', function() {}); // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
      window.ga('require', 'displayfeatures');
    }

});


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    // console.log('Received %o from %o, frame', msg, sender.tab, sender.frameId);

    // tracking page views
    if (msg.page) {
        // track page
        window.ga('send', 'pageview', msg.page);
    }

    // tracking events
    if (msg.action) {
        // track event
        if (msg.value) {
            window.ga('send', 'event', msg.category, msg.action, msg.label, msg.value);
        } else {
            window.ga('send', 'event', msg.category, msg.action);
        }
    }
  });
