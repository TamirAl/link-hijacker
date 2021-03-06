'use strict';

var linkHijacker = require('..');

document
  .getElementById('default-prevented')
  .addEventListener('click', function(e) {
    e.preventDefault();
  });

function logHijacking(link) {
  var countContainer = document.getElementById(link.id + '-count');
  var currentCount = Number(countContainer.innerText);
  var nextCount = currentCount + 1;
  countContainer.innerText = nextCount;
}

var stop = linkHijacker.hijack(logHijacking);

var usingDefaults = true;
var switchButton = document.getElementById('switch-options');
switchButton.addEventListener('click', function() {
  if (usingDefaults === true) {
    stop();
    stop = linkHijacker.hijack(
      {
        skipModifierKeys: false,
        skipDownload: false,
        skipTargetBlank: false,
        skipExternal: false,
        skipMailTo: false,
        skipOtherHost: false
      },
      logHijacking
    );
    usingDefaults = false;
    switchButton.innerText = 'set options to true (defaults)';
  } else {
    stop();
    stop = linkHijacker.hijack(logHijacking);
    usingDefaults = true;
    switchButton.innerText = 'set options to false';
  }
});
