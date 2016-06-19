const PitchClass = require('../model/pitch-class');
const names = PitchClass.NAMES;
const PITCH_CLASSES = {};
for (let i = 0; i < names.length; i++) {
  PITCH_CLASSES[names[i]] = new PitchClass(i).freeze();
}

module.exports = Object.freeze(PITCH_CLASSES);