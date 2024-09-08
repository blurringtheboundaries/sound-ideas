/**
 * Imports ... temporary method using window
 * (this is legacy code from an early version of the project)
 */

import MidiMapper from 'midi-mapper';
console.log('MidiMapper',MidiMapper)
window.MidiMapper = MidiMapper;

import MultitouchMapper from '@matthewscharles/multitouch-mapper';
window.multitouchMapper = new MultitouchMapper();

import KeyboardMapper from 'keyboard-mapper';
window.keyboardMapper = new KeyboardMapper({},{},false);

import { ScreenInstrument } from '@matthewscharles/screen-instrument';

import CM from '@matthewscharles/cm-toolbox';
window.cm = CM;

import gsap from "gsap";
window.gsap = gsap;

import { Tonal, Scale } from 'tonal';
window.Tonal = Tonal;
window.Scale = Scale;

// import { presetTemplate } from './presetTemplate.js';
// window.presetTemplate = presetTemplate;

// import { SynthControl } from './synthControl.js';
// window.SynthControl = SynthControl;

// -------

window.getRotation = (value) => {
    return cm.map(value, 0, 127, 0, 270, true) - 135;
}

export { ScreenInstrument, CM }