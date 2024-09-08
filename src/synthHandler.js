export const synthHandler = {
  presets: {
    plink: {
      filter: {
        type: "highpass",
        frequency: 100,
      },
      synth: {
        oscillator: {
          type: "sine4",
          volume: -3,
        },
        envelope: {
          attack: 0.01,
          decay: 0.2,
          release: 0.1,
        },
      },
    },
    soft: {
      filter: {
        type: "lowpass",
        frequency: 10000,
      },
      synth: {
        oscillator: {
          type: "sine2",
          volume: -6,
          detune: Math.random() - 0.5,
        },
        envelope: {
          attack: 1,
          release: 4,
        },
      },
    },
    plunk: {
      filter: {
        type: "lowpass",
        frequency: 2000,
      },
      synth: {
        oscillator: {
          type: "sawtooth3",
          volume: -24,
        },
        envelope: {
          attack: 0.01,
          decay: 0.4,
          release: 2,
        },
      },
    },
    test: {
      filter: {
        type: "highpass",
        frequency: 100,
      },
      synth: {
        oscillator: {
          type: "sine4",
          volume: -3,
        },
        envelope: {
          attack: 0.01,
          decay: 0.2,
          release: 0.1,
        },
      },
    },
  },
};

if (!localStorage.getItem("synthPresets")) {
  localStorage.setItem("synthPresets", JSON.stringify(synthHandler.presets));
} else {
  synthHandler.presets = JSON.parse(localStorage.getItem("synthPresets"));
}

let synthPresets = synthHandler.presets;

if (document.querySelector("#select_preset")) {
  Object.keys(synthPresets).forEach((x) => {
    document.querySelector("#select_preset").appendChild(
      cm.create("option", {
        innerHTML: x,
      })
    );
  });

  document.querySelector("#select_preset").addEventListener("input", function () {
      instrument.setParameters(synthPresets[this.value]);
    });
}
