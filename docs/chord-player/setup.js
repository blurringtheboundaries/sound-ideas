document.body.addEventListener("scroll", (e) => {
  e.preventDefault();
});

// ---------------------------------setup---------------------------------

let noteArray = [
  "C4",
  "D4",
  "E4",
  "G4",
  "A4",
  "C5",
  "D5",
  "E5",
  "G5",
  "A5",
  "C6",
  "D6",
].slice(0, document.querySelectorAll(".instrument__playable__note").length);

const getNoteId = function (id) {
  return parseInt(id.split("_")[1]);
};

// ---------------------------------set up instrument-----------------------

const settings = {
  y: {
    velocity: true,
    volume: false,
    bend: false,
  },
};

var instrument = new ScreenInstrument(
  noteArray,
  document.querySelector("#instrument__underlay"),
  false,
  "instrument",
  {},
  false
);

instrument
  .placeAll(document.querySelector("#instrument__underlay"), "#note_INDEX")
  .setParameters({
    synth: {
      oscillator: {
        type: "sine2",
        volume: -16,
      },
    },
  })
  .refreshElements();
// .cull()

// ---------------------------------set event listeners-----------------------

multitouchMapper
  .addStyles()
  .assignAllowDefault(document.querySelector("#chord-selection"))
  .setDefaultAction(() => instrument.flush)
  .setAction(".instrument__playable__note", {
    start: function (element, e, obj) {
      let velocity = 1;

      if (settings.y.bend) {
        instrument.bend(getNoteId(element.id), 0);
      }

      if (settings.y.velocity) {
        velocity = obj.relative.x / obj.relative.range.x;
      }

      instrument.noteEvent(getNoteId(element.id), velocity);

      // console.log(obj.relative.x / obj.relative.range.x, obj.relative.y / obj.relative.range.y)
    },

    enter: function (element, e, obj) {
      let velocity = 1;

      if (settings.y.velocity) {
        velocity = obj.relative.x / obj.relative.range.x;
      }

      if (settings.y.bend) {
        instrument.bend(getNoteId(element.id), 0);
      }

      instrument.noteEvent(getNoteId(element.id), velocity);
    },

    end: function (element, e, obj) {
      instrument.noteEvent(getNoteId(element.id), 0);
      if (settings.y.bend) {
        instrument.bend(getNoteId(element.id), 0);
      }
    },
    leave: function (element, e, obj) {
      instrument.noteEvent(getNoteId(element.id), 0);
      if (settings.y.bend) {
        instrument.bend(getNoteId(element.id), 0);
      }
    },

    move: function (element, e, obj) {
      // todo: optionally modulate volume here
      if (settings.y.bend) {
        instrument.bend(getNoteId(element.id), -obj.distance.y);
      }
    },
  });
