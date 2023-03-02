/**
 * Imports ... temporary method using window object
 */

window.cm = require('@matthewscharles/cm-toolbox');

const { ScreenInstrument } = require('@matthewscharles/screen-instrument');
window.ScreenInstrument = ScreenInstrument;

const KeyboardMapper = require('keyboard-mapper');
window.keyboardMapper = new KeyboardMapper({},{},false);

window.MidiMapper = require('midi-mapper');

const MultitouchMapper = require('@matthewscharles/multitouch-mapper');
window.multitouchMapper = new MultitouchMapper();

