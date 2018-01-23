'use strict';

const l = console.log;
const n = console.log.bind(null, '\n');

const windowSelection = window.getSelection();
let isSelectionChanged;
let isSkipNextSelectionChangeEvent;


document.addEventListener('selectionchange', function(event) {
  l('on selectionchange()');

  if (isSkipNextSelectionChangeEvent) {
    l('skip');
    return;
  }
  isSelectionChanged = true;
});




document.addEventListener('mousedown', function(event) {
  n(); l('on mousedown()', event);

  isSelectionChanged = false;
  isSkipNextSelectionChangeEvent = false;
});




document.addEventListener('mouseup', function(event) {
  l('on mouseup()', event);

  if (event.button !== 0) {
    l('not primary button');
    return;
  }

  tryCopy(event);
});




document.addEventListener('keydown', function(event) {
  n(); l('on keydown()', event);

  isSkipNextSelectionChangeEvent = event.key === 'Tab';
  isSelectionChanged = false;
});




document.addEventListener('keyup', function(event) {
  l('on keyup()', event);

  if (event.key !== 'Shift') {
    l('no shift');
    return;
  }

  tryCopy(event);
});




function tryCopy(event) {
  l('tryCopy()');

  if (event.ctrlKey) {
    l('Ctrl pressed');
    return;
  }

  if (!isSelectionChanged) {
    l('selection was not changed');
    return;
  }

  const selection = windowSelection.toString().trim();
  l('selection', selection, selection.length);

  if (selection.length === 0) {
    l('no selection');
    return;
  }

  const result = document.execCommand('copy');
  l('copy result', result);
  chrome.runtime.sendMessage(result);
}
