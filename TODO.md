Features
- Additional Rhythm behaviors
  - Euclidean Pattern - could just be a function that returns a list of numbers
  - Negative numbers for rests?
- Enhance Section behavior
  - Needs to set a length.
  - Tracks should have an option to loop or do a "one shot"
  - Tracks should have a start time offset option
  - Harmony should have an option to loop or do a "one shot" (last chord continues until the end of the section)
- Track might need defaultDuration, defaultIntensity options? Or event durations/intensities Arrays?
  - Rhythm class already seems to support durations/intensities Arrays
- New track mode 'chord-root' (better name?). Ignores inversion or is somehow relative to the root of the chord.
  - In this mode, we might want the pitch numbers to follow the scale vs the chord. This could be different modes. 
    I am wondering if track.type should be split into different options, though, like "follow" and "constraint" (or keep "type" but add "follow")?
  - Meh, these ideas are probably too complicated. Maybe just add track mode 'bass', which follows the chord roots and is constrained to the scale.
- Chord features:
  - Add a bass note below the chord.
    So for example, in C MAJOR, TRIAD(5,{bass:C}) could result in C,E,A or maybe C,A,C(,E?)
    This starts getting into the territory of wanting to control the spacing/openess of the chord
    At some point the user probably just needs to construct a custom chord?
  - Another idea is a more generic {add:[offsets]} option that can add some addition offsets (probably only supported in the CHORDS functions)
  - "Chromatic chords", like MAJ, MIN, that can be used to borrow chords from other scales.
    Note: we'll need to know the scale root. Maybe Section can see if a Chord has a scale set and not overwrite it, but set the root...
  - Once we figure out "chromatic chords", try microtonal tunings like 19-TET
- Improve MIDI file support (lots of little features are missing, plus error handling for semi-malformed input files could be improved / see MIDI specs)
- Good test coverage

Bugs
- All notes off doesn't work for higher channels. It seems like it should. I wonder if we are overloading the MIDI port with too many messages? Try adding a MIDI monitor to Ableton Live to verify

Maybe
- Support melodic sequences (as in the music theory kind of sequence), where the same relative pitch patterns are repeated by starting at different scale (or chord?) degrees
- Automatic voice leading, esp for chord progressions, maybe for bass/lead too (prefer intervals less than a tritone)?
- Maybe Rhythm should support Iterables for times, pitches, durations, intensities, so we can use
  the Pattern classes for this stuff! They would need to detect end-of-iteration and restart though (potentially depending on other options).
  - Maybe introduce a LoopingIterable helper class?
  - Now I'm not even sure the Pattern classes belong in this library. Although the random class could be nice...