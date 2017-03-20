import * as midiSequencer from './index'

midiSequencer.whenMidiReady(() => {

  console.log("MIDI ok")

  let traktorIn = midiSequencer.inputPort(port => port.name.includes("Traktor Virtual"))
  let traktorOut = midiSequencer.outputPort(port => port.name.includes("Traktor Virtual"))

  // Kick C1
  // Clap D1
  // Snare F1
  // Shaker E1

  const seq1 = [
    // ---- //
    [["C1"], 1],
    null,
    null,
    null,
    // ---- //
    [["C1"], 1],
    null,
    null,
    null,
    // ---- //
    [["C1"], 1],
    null,
    null,
    null,
    // ---- //
    [["C1"], 1],
    null,
    null,
    null,
  ]

  const seq2 = [
    // ---- //
    [["C1"], 1],
    null,
    null,
    null,
    // ---- //
    [["C1", "D1"], 1],
    null,
    null,
    null,
    // ---- //
    [["C1"], 1],
    null,
    null,
    null,
    // ---- //
    [["C1", "D1"], 1],
    null,
    null,
    [["D1"], 1],
  ]

  const seq3 = [
    // ---- //
    [["C1"], 1],
    null,
    [["E1"], 1],
    null,
    // ---- //
    [["C1", "D1"], 1],
    null,
    [["E1"], 1],
    null,
    // ---- //
    [["C1"], 1],
    null,
    [["E1"], 1],
    null,
    // ---- //
    [["C1", "D1"], 1],
    null,
    [["E1"], 1],
    [["D1"], 1],
  ]

  const seq4 = [
    // ---- //
    [["C1"], 1],
    null,
    [["E1"], 1],
    null,
    // ---- //
    [["C1", "D1"], 1],
    null,
    [["E1"], 1],
    [["F1"], 1],
    // ---- //
    [["C1"], 1],
    null,
    [["E1", "F1"], 1],
    [["E1"], 1],
    // ---- //
    [["C1", "D1", "F1"], 1],
    [["F1"], 1],
    [["E1", "D1"], 1],
    [["D1", "E1"], 1],
  ]

  let sequencer = new midiSequencer.Sequencer(traktorIn, traktorOut, 4, 4, seq4)

  sequencer.addListener((event) => {
    console.dir(event)
  })

}, err => {
  console.log("No MIDI available")
})
