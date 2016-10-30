const Section = require('./section');
const { noteJSON } = require('../utils');

/**
 * A Song
 */
class Song {

  constructor({bpm=120, sections, scale, sectionLength}) {
    this.bpm = bpm;
    this.sections = sections.map(s =>
      s instanceof Section ? s : new Section(Object.assign({ scale, length: sectionLength }, s))
    );
  }

  *[Symbol.iterator]() {
    const {bpm, sections} = this;
    yield {type: 'bpm', value: bpm};
    let timeOffset = 0;
    for (const section of sections) {
      for (const event of section) {
        event.time += timeOffset;
        yield noteJSON(event);
      }
      timeOffset += section.length;
    }
  }

  toJSON() {
    const {bpm, sections} = this;
    const partsJSON = [];
    let timeOffset = 0;
    for (const section of sections) {
      for (const event of section) {
        const partIdx = event.part; // this will be needed for MIDI file output or toJSON()
        let partJSON = partsJSON[partIdx];
        if (!partJSON) partJSON = partsJSON[partIdx] = [];
        event.time += timeOffset;
        partJSON.push(noteJSON(event));
      }
      timeOffset += section.length;
    }
    // TODO: make this bpm be compatible with serializer (which doesn't even output a tempo event yet...)
    // TODO: convert parts to tracks based on their channel
    return { bpm, tracks: partsJSON };
  }
}

module.exports = Song;
