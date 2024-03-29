// monolith from a previous sketch...removing unnecessary elements
// 'use strict';

// --------------------------------------
// 🔴 main code begins 🔴 
// --------------------------------------

var params = new URLSearchParams(window.location.search);
var offset = 0.01;

var settings = {
    feedback: true,
    mute: false,
    sequenceChords: true
};

function Guitar() {
    var _this = this;
    for (var i = 0; i < 6; i++) {
        _this.strings.push(new Tone.Sampler({
            urls: samples.nylon,
            baseUrl: "samples/nylon-guitar/"
        }).toDestination());
    }
}

Guitar.prototype = {
    previewTone: new Tone.Synth().toDestination(),
    blank: new Tone.Player('samples/blank.wav').toDestination(),
    openStrings: [40, 45, 50, 55, 59, 64],
    strings: [],
    root: '',
    type: '',
    chord: { positions: [] },
    ready: false
};

Guitar.prototype.constructor = Guitar;

Guitar.prototype.mute = function () {
    var _this = this;
    var selection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.openStrings;

    selection.forEach(function (x, i) {
        var thisNote = _this.position(0)[i];
        // if(thisNote!=-1)this.strings[i].triggerRelease(cm.mtof(x+chorder.position(0)[i]))
        if (thisNote != -1) this.strings[i].releaseAll();
    });

    return this;
};

Guitar.prototype.pluck = function (i) {
    var velocity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    if (this.position(0)[i] != -1) {
        this.strings[i].releaseAll();
        this.strings[i].triggerAttack(cm.mtof(this.openStrings[i] + this.position(0)[i]), // pitch
        Tone.now(), // start time
        velocity // velocity
        );
    } else {
        this.blank.start();
    }
    return this;
};

Guitar.prototype.position = function (pos) {
    return this.chord.positions[pos].frets;
};


Guitar.prototype.update = function () {
    var _this = this;
    
    this.root = $('#root').val().replace('♯', 'sharp').replace('♭', 'flat');
    this.type = $('#type').val();
    this.chord = c.chords[this.root].filter(function (x) {
        return x.suffix == _this.type;
    })[0];

    $('#display').text('');
    this.position(0).forEach(function (note, i) {
        return $('#string_' + (i + 1)).text(fret(note, i));
    });

    this.ready = true;
    return this;
};

/**
 * colours
 * todo: consider using the library created with Joel, at least as an option
 */
var colours = {
    C: '#ff0300',
    'C#': '#ff4f00',
    D: '#ff8f00',
    'D#': '#ffd300',
    E: '#fffb00',
    'E#': '#e2ff00',
    F: '#06ff00', // #06ff00
    'F#': '#0cf36f', // #00ff74 
    G: '#27d8c6', //#00ffc8
    'G#': '#00a9ff',
    A: '#0025ff',
    'A#': '#6d00ff',
    B: '#f600ff'
};

var openStrings = [40, 45, 50, 55, 59, 64];
var keystrokes = ['A', 'S', 'D', 'F', 'G', 'H'];

var samples = {
    guitar: 'samples/117710__kyster__c.wav',
    E1: 'samples/117714__kyster__e.wav',
    E3: 'samples/117706__kyster__3-oct-e.wav',
    nylon: {
        E2: 'E2-btb-117677__kyster__e-open-string.wav',
        A2: 'A2-btb-117673__kyster__a-open-string.wav',
        D3: 'D3-btb-117676__kyster__d-open-string.wav',
        B3: 'B3-btb-117674__kyster__b-open-string.wav',
        G3: 'G3-btb-117678__kyster__g-open-string.wav',
        E4: 'E4-btb-117679__kyster__e-open-string.wav'
    }
};

var display = void 0,
    grid = void 0;
var count = -1;

var chorder = new Guitar();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// input

var song = ['C major', 'F major', 'G major', 'A minor'];

var shiftKey = false;
// used by json reader
var c = {};

/**
 * Check the document for items with matching aria-checked
 * @returns {number} current chord number from chordButton data
 */

function getCurrentChord() {
    return document.querySelector('.chordButton[aria-checked="true"]').dataset.number;
}

/**
 * Set the buttons for the current chord
 * @param {*} number 
 * @param {*} shift 
 */

function selectChord(number) {
    var shift = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    // index numbers start from 1
    document.querySelectorAll('.chordButton').forEach(function (x, i) {
        var selectedId = parseInt(x.id.replace('button_', ''));
        if (selectedId == number) {
            x.style.backgroundColor = shift ? 'orange' : 'red';
            x.setAttribute('aria-checked', true);
        } else {
            x.style.backgroundColor = 'lightgray';
            x.setAttribute('aria-checked', false);
        }

        if (shift) {
            storeChord(number - 1);
        }
        setChords(song[number - 1]);
    });
}

function selectString(number, state) {
    number = parseInt(number) + 1;
    document.querySelector('#string_' + number).style.backgroundColor = state ? 'red' : 'lightgray';
    if (state) {
        window.setTimeout(function () {
            document.querySelector('#string_' + number).style.backgroundColor = 'lightgray';
        }, 100);
    }
}

function setChords(str) {
    var _str$split = str.split(' '),
        _str$split2 = _slicedToArray(_str$split, 2),
        root = _str$split2[0],
        type = _str$split2[1];
        console.log('_str$split2',_str$split2);

    $('#root').val(root);
    $('#type').val(type);
    chorder.update();
}

function storeChord(number) {
    var root = $('#root').val();
    var type = $('#type').val();
    song[number] = root + ' ' + type;
}

function fret(value, position) {
    if (value == -1) return 'x';
    value = Tonal.Note.fromMidi(openStrings[position] + value);
    return value;
}

function setMenus(rootMenu) {
    Object.entries(c.chords).forEach(function (_ref, i) {
        var _ref2 = _slicedToArray(_ref, 2),
            root = _ref2[0],
            types = _ref2[1];

        var rootText = root.replace('sharp', '♯').replace('flat', '♭');
        rootMenu.append($('<option>' + rootText + '</option>'));
    });

    setTypes('C');
    rootMenu.on('input', function () {    
        setTypes(this.value);
        chorder.update();
    });
    $('#type').on('input', function () {
        // chorder.chord=this.value;
        chorder.update();
    });
    chorder.update();
}
function setTypes(root) {
    chorder.root = root;
    $('#type').empty();
    c.chords[root.replace('♯', 'sharp').replace('♭', 'flat')].forEach(function (x) {
        $('#type').append($('<option>' + x.suffix + '</option>'));
    });
}

function setButtons() {
    document.querySelectorAll('.chordButton').forEach(function (x) {
        x.setAttribute('data-number', parseInt(x.id.replace('button_', '')));
        x.setAttribute('role', 'switch');
        x.setAttribute('aria-checked', false);
        x.addEventListener('click', function () {
            selectChord(this.dataset.number, shiftKey);
        });
    });
}

function setStringButtons() {
    document.querySelectorAll('.stringButton').forEach(function (x) {
        x.setAttribute('data-number', parseInt(x.id.replace('string_', '') - 1));
        x.addEventListener('click', function () {
            selectString(this.dataset.number, true);
            chorder.pluck(this.dataset.number);
        });
    });
}

fetch("chord-sequencer/guitar.json").then(function (response) {
    return response.json();
}).then(function (jsondata) {
    c = jsondata;
    c.chords.C[0].positions[0].frets[0] = 3;
    c.chords.A[1].positions[0].frets[0] = 0;
    setMenus($('#root'));
    setButtons();
    setStringButtons();
    if (settings.sequenceChords) selectBar(1);
    selectChord(1);
    setGrid();
});

// note: for muted strings (temporary)
// chorder.strings.forEach((x,i)=>{x.triggerAttackRelease('C2',0.06)})

// todo: use keyboard-mapper

var keyboard = {
    shiftKey: false,
    noteTriggers: ['A', 'S', 'D', 'F', 'G', 'H'],
    map: {
        P: function P() {
            playButton($('#play').text() == 'play');
        },
        M: function M() {
            chorder.mute();
        }
    }
};


window.addEventListener('keydown', function (e, stripped) {

    // record state of shift key
    keyboard.shiftKey = e.getModifierState('Shift');

    // ignore repeated strokes and IME composition
    if (e.repeat || e.isComposing || e.keyCode === 229) return false;

    // strip the keystroke category
    stripped = e.code.replace('Key', '').replace('Digit', '');

    if (Object.keys(keyboard.map).includes(stripped)) {
        keyboard.map[stripped]();
        return true;
    }

    // check for note triggers
    if (keyboard.noteTriggers.includes(stripped)) {
        var number = keyboard.noteTriggers.indexOf(stripped);
        selectString(number, true);
        chorder.pluck(number);
    }

    if (parseInt(stripped) > 0 && parseInt(stripped) <= song.length) {
        selectChord(parseInt(stripped), e.getModifierState('Shift'));
    }

    return true;
});


window.addEventListener('keyup', function (e) {
    keyboard.shiftKey = e.getModifierState('Shift');
});

// alternative chord labelling requested during initial NaAC meeting

var menuDictionary = {
    numbers: {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4'
    },
    faces: {
        '1': '🙂',
        '2': '🙃',
        '3': '😀',
        '4': '🙁'
    },
    abcd: {
        '1': 'A',
        '2': 'B',
        '3': 'C',
        '4': 'D'
    }
};

var numberClasses = ['.chordButton', '.chordOption'];

function setChordNumbers(entry) {
    numberClasses.forEach(function (cl) {
        document.querySelectorAll(cl).forEach(function (x) {
            var index = parseInt(x.dataset.value);
            x.innerHTML = menuDictionary[entry][index];
        });
    });
    params.set('numberStyle', entry);
}

// --------------------------------------
// 🏵️ sequence export begins 🏵️ 
// --------------------------------------

function exportSequence() {
    track.notes = [];
    if (settings.sequenceChords) {
        var _loop = function _loop(bar) {
            var value = parseInt(document.getElementById("chord_sequence_" + (bar + 1)).selectedIndex);
            selectChord(value + 1);
            sequencerGrid.forEach(function (row, i) {
                row.forEach(function (col, j) {
                    var note = openStrings[i] + chorder.position(0)[i];
                    if (col.checked && chorder.position(0)[i] >= 0) {
                        track.addNote({ midi: note, time: bar * 2 + j / 4, duration: 0.25 });
                    }
                });
            });
        };

        // row = time, col = string
        for (var bar = 0; bar < 8; bar++) {
            _loop(bar);
        }
    } else {
        // row = time, col = string
        sequencerGrid.forEach(function (row, i) {
            row.forEach(function (col, j) {
                var note = openStrings[i] + chorder.position(0)[i];
                // console.log(col.checked)
                if (col.checked && chorder.position(0)[i] >= 0) {
                    track.addNote({ midi: note, time: j / 4, duration: 0.25 });
                    // console.log(note,j/4)
                }
            });
        });
        midi.duration = 1;
    }

    file = new buffer.Buffer(midi.toArray());
}


var midi = new Midi();
var track = midi.addTrack();

var file;

var downloadBlob, downloadURL;

downloadBlob = function downloadBlob(data, fileName, mimeType) {

    var blob, url;

    blob = new Blob([data], {
        type: mimeType
    });
    url = window.URL.createObjectURL(blob);
    setTimeout(function () {
        downloadURL(url, fileName);
        setTimeout(function () {
            return window.URL.revokeObjectURL(url);
        }, 1000);
    }, 1000);
};

downloadURL = function downloadURL(data, fileName) {
    var a;
    a = document.createElement('a');
    a.href = data;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
};




//TODO: Create a function to add a status update element to the document...


function getSequence() {
    var outputArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    sequencerGrid[0].forEach(function (x) {
        return outputArray.push(x.checked);
    });
    return outputArray;
}

// --------------------------------------
// 🏵️ sequence export ends 🏵️ 
// --------------------------------------

var sequencerGrid = [];

var sequence = [];
for (var i = 0; i < 8; i++) {
    sequence.push([false, false, false, false, false, false]);
}

function playButton() {
    // nb use aria
    var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    if (Tone.now() <= 0.1) Tone.start();
    $('#playB').text(start ? '⏹️ stop' : '▶️ play');
    Tone.Transport[start ? 'start' : 'stop']();
}

function selectBar(subCount) {
    [1, 2, 3, 4, 5, 6, 7, 8].forEach(function (x) {
        document.getElementById('chord_sequence_' + x).style.backgroundColor = subCount == x ? 'red' : 'lightgray';
        var value = parseInt(document.getElementById('chord_sequence_' + subCount).selectedIndex);
        selectChord(value + 1);
    });
}

// --------------------------------------
// 🏵️ sequence functions 🏵️ 
// --------------------------------------

function sequenceRandom() {
    sequence.forEach(function (x) {
        x.forEach(function (y, i) {
            x[i] = Math.random() > 0.5;
        });
    });
}


function sequenceRotate() {
    var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'right';
    sequence = cm.rot(sequence, direction == 'right' ? -1 : 1);
}


function setGrid() {
    var _loop = function _loop(row) {
        sequencerGrid[row] = [];

        var _loop2 = function _loop2(col) {
            sequencerGrid[row][col] = document.getElementById("check_" + row + "_" + col);
            sequencerGrid[row][col].dataset.row = row;
            sequencerGrid[row][col].dataset.col = col;
            sequencerGrid[row][col].oninput = function () {
                sequence[col][row] = this.checked;
            };
        };

        for (var col = 0; col < 8; col++) {
            _loop2(col);
        }
    };

    for (var row = 0; row < 6; row++) {
        _loop(row);
    }
}

function setSequence() {
    Tone.Transport.scheduleRepeat(function (time) {
        count++;
        if (count % 8 == 0 && settings.sequenceChords) {
            var subCount = count / 8 % 8 + 1;
            selectBar(subCount);
        }

        if (settings.mute) chorder.mute();
        sequence[count % 8].forEach(function (row, i) {
            if (row) chorder.pluck(i);
        });
    }, '8n');
}

function Display() {
    this.width = this.cells * this.rows;
    this.height = this.cells * this.cols;
    this.bounds = {
        left: this.offset[0],
        right: this.offset[0] + this.width,
        top: this.offset[1],
        bottom: this.offset[1] + this.height
    };
}

Display.prototype = {
    offset: [0, 0],
    cells: 50,
    rows: 8,
    cols: 6,
    margin: 10,
    grid: [],
    width: 0,
    height: 0,
    bounds: {}
};

Display.prototype.constructor = Display;

function Grid(rows, cols) {
    for (var row = 0; row < rows; row++) {
        this.cells[row] = [];
        for (var col = 0; col < cols; col++) {
            this.cells[row][col] = {
                amount: 0,
                value: false
            };
        }
    }
}

Grid.prototype = {
    cells: []
};

Grid.prototype.constructor = Grid;

Grid.prototype.square = function (x, y) {
    rect(
        x * display.cells + display.margin / 2, // x
        y * display.cells + display.margin / 2, // y
        display.cells - display.margin, // width
        display.cells - display.margin // height
    );
};

Grid.prototype.cellFilled = function (x, y) {
    var cellOpacity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


    cellFill = sequence[x][y] ? 1 : 0.1;
    cellColor = color('black');

    // set stroke
    cellColor.setAlpha(100);
    strokeWeight(sequence[x][y] ? 10 : 3);
    stroke(cellColor);

    // set fill
    cellColor.setAlpha((cellOpacity ? 255 : 150) * cellFill);
    fill(cellColor);

    // draw cell
    this.square(x, y);
};

Grid.prototype.cellOutlined = function (x, y) {
    // draw plain cell outline
    noFill();
    stroke('black');
    strokeWeight(sequence[x][y] ? 2 : 1);

    this.square(x, y);
};

Grid.prototype.update = function () {
    var _this = this;

    this.cells.forEach(function (col, x) {
        display.grid[x] = [];
        col.forEach(function (row, y) {
            display.grid[x][y] = [x * display.cells, y * display.cells];

            cellOpacity = false;
            cellFill = sequence[x][y] ? 1 : 0.1;

            cellColor = color('black');
            if (typeof chorder.chord != 'undefined') {
                cellOpacity = chorder.position(0)[y] >= 0;
                var tempNote = chorder.chord.positions[0].frets[y];
                if (tempNote != -1) {
                    tempNote = cm.mtos(tempNote + openStrings[y]);
                    tempNote = tempNote.replace(/[0-9]/g, '');
                    cellColor = color(colours[tempNote]);
                }
            }

            _this.cellFilled(x, y);
            _this.cellOutlined(x, y);
        });
    });
};

/**
 * p5
 */

function setup() {
    display = new Display();
    grid = new Grid(8, 6);
    createCanvas(display.width, display.height);
    document.querySelector('#sequence-container').appendChild(document.querySelector('#defaultCanvas0'));
    var canvas = document.querySelector('#defaultCanvas0');
    canvas.setAttribute('aria-hidden', true);
    windowResized();
}

/**
 * p5
 */

function draw() {
    background('darkgray');
    noStroke();
    fill(0, 0, 0, 128);
    rect(count % 8 * display.cells, 0, display.cells, height);
    drawGrid();
}

function drawGrid() {
    if (!chorder.ready) return false;
    sequence.forEach(function (col, x) {
        display.grid[x] = [];
        col.forEach(function (row, y) {
            display.grid[x][y] = [x * display.cells, y * display.cells];

            var cellOpacity = false;
            var cellFill = sequence[x][y] ? 1 : 0.1;

            var cellColor = color('black');
            if (typeof chorder.chord != 'undefined') {
                cellOpacity = chorder.position(0)[y] >= 0;
                var tempNote = chorder.chord.positions[0].frets[y];
                if (tempNote != -1) {
                    tempNote = cm.mtos(tempNote + openStrings[y]);
                    tempNote = tempNote.replace(/[0-9]/g, '');
                    cellColor = color(colours[tempNote]);
                }
            }

            // set stroke
            cellColor.setAlpha(100);
            strokeWeight(sequence[x][y] ? 10 : 3);
            stroke(cellColor);

            // set fill
            cellColor.setAlpha((cellOpacity ? 255 : 150) * cellFill);
            fill(cellColor);

            // draw cell
            grid.square(x, y);

            // draw plain cell outline
            noFill();
            stroke('black');
            strokeWeight(sequence[x][y] ? 2 : 1);

            grid.square(x, y);
        });
    });
}

var touchReleased = true;
var touchTime = 0;

function touchStarted() {
    // todo: use multitouch-mapper
    // console.log(millis() - touchTime);
    if (mouseX >= 0 && mouseX <= display.width && mouseY >= 0 && mouseY <= display.height) {
        if (millis() - touchTime < 100) return false;
        touchTime = millis();
        if (!touchReleased) return;
        touchReleased = false;

        var _ref = [int(mouseX / display.width * 8), int(mouseY / display.height * 6)],
            x = _ref[0],
            y = _ref[1];

        sequence[x][y] = !sequence[x][y];
        sequencerGrid[y][x].checked = sequence[x][y];

        if (settings.feedback && sequence[x][y]) {
            chorder.pluck(y);
        }

        var previewNote = chorder.chord.positions[0].frets[y];
        chorder.previewTone.envelope.attack = sequence[x][y] ? 0.01 : 0.1;
        chorder.previewTone.envelope.release = 0.1;
        if (previewNote != -1) chorder.previewTone.triggerAttackRelease(cm.mtof(previewNote + openStrings[y]), chorder.previewTone.envelope.attack, Tone.now(), 0.2);
        //- previewNote = chorder.chord.positions[0].frets[y] + openStrings[y];
        return false;
    }
}

function touchEnded() {
    touchReleased = true;
}

// this appears to be a p5 function, not sure how this got here...?!

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function windowResized() {
    resizeCanvas(display.width, display.height);
    [0, 1, 2, 3, 4, 5, 6, 7].forEach(function (count) {
        // did this have a purpose, once?
    });

    document.querySelectorAll('.gridBox').forEach(function (element) {
        var _element$id$split$sli = element.id.split('_').slice(1).map(function (item) {
            return parseInt(item);
        }),
            _element$id$split$sli2 = _slicedToArray(_element$id$split$sli, 2),
            y = _element$id$split$sli2[0],
            x = _element$id$split$sli2[1];
        // todo: use classes
        element.setAttribute('position', 'absolute');
        element.setAttribute('display', 'block');
        
    });
}

setSequence();
