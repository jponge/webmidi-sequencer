import * as midiSequencer from './index'

midiSequencer.whenMidiReady(() => {

  console.log("MIDI ok")

  let traktorIn = midiSequencer.inputPort(port => port.name.includes("Traktor Virtual"))
  let traktorOut = midiSequencer.outputPort(port => port.name.includes("Traktor Virtual"))

  let sequencer = new midiSequencer.Sequencer(traktorIn, traktorOut, 2, 4, [
    [["C1"], 1],
    [["E1"], 1],
    [["C1", "D1", "F1"], 1],
    [["E1", "F1"], 1],
    [["C1"], 1],
    [["E1"], 1],
    [["C1", "D1"], 1],
    [["E1"], 1],
  ])

}, err => {
  console.log("No MIDI available")
})
