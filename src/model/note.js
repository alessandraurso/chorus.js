const PitchClass = require('./pitch-class');
const Duration = require('./duration');
const Intensity = require('./intensity');
const { clamp } = require('../utils');

module.exports = class Note {
  constructor(pitchClass, octave, duration, intensity) {
    this.pitchClass = pitchClass != null ? pitchClass : new PitchClass(0, 'C');
    this.octave = octave != null ? octave : 4;
    this.duration = duration != null ? duration : new Duration(1);
    this.intensity = intensity != null ? intensity : new Intensity(0.7);
  }

  static fromProperties(props) {
    const pitchClasses = [];
    const octaves = [];
    const durations = [];
    const intensities = [];
    for (const prop of props) {
      if (prop instanceof PitchClass) pitchClasses.push(prop);
      // TODO octaves
      else if (prop instanceof Duration) durations.push(prop);
      else if (prop instanceof Intensity) intensities.push(prop);
      // TODO: other Notes
    }
    return pitchClasses.map(pc => new Note(pc, octaves.shift(), durations.shift(), intensities.shift()));
  }

  midiJSON() {
    return {
      type: 'note',
      pitch: clamp(12 * (this.octave + 2) + this.pitchClass.value, 0, 127),
      velocity: clamp(this.intensity.value * 127, 0, 127),
      duration: clamp(this.duration.value, 0),
      release: 100,
      channel: 1
    }
  }
};
