const Rhythm = require('./rhythm');

/**
 * A Track
 */
class Track {

  constructor({channel, mode, pitches, rhythm, rate=1, octave=4, looped} = {}) {
    this.channel = channel;
    this.mode = mode;
    this.pitches = pitches; // NOTE: these are relative, depends on scale/chords and follow settings
    this.rhythm = rhythm instanceof Rhythm ? rhythm : new Rhythm(rhythm, {rate});
    this.octave = octave;
    this.loopDuration = this.rhythm.duration;
    this.duration = looped ? Infinity : this.loopDuration;
    this.looped = looped;
  }

  *[Symbol.iterator]() {
    let pitchDone = false;
    let rhythmDone = false;
    let pitchIter = this.pitches[Symbol.iterator]();
    let rhythmIter = this.rhythm[Symbol.iterator]();
    let timeOffset = 0;
    while (true) { // eslint-disable-line no-constant-condition
      let pitchNext = pitchIter.next();
      let rhythmNext = rhythmIter.next();
      if (pitchNext.done) {
        pitchDone = true;
        pitchIter = this.pitches[Symbol.iterator]();
        pitchNext = pitchIter.next();
      }
      if (rhythmNext.done) {
        rhythmDone = true;
        rhythmIter = this.rhythm[Symbol.iterator]();
        rhythmNext = rhythmIter.next();
        timeOffset += this.loopDuration;
      }
      if (pitchDone && rhythmDone && !this.looped) break;
      const event = rhythmNext.value;
      event.pitch = pitchNext.value;
      event.time += timeOffset;
      yield event;
    }
  }
}

module.exports = Track;
