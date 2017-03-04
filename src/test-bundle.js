import WebMidi from 'webmidi'
import {Sequencer, inputPort, outputPort} from './index'

WebMidi.enable(err => {
  if (err) {
    console.log("No MIDI available")
  } else {
    
    console.log("MIDI ok")
    let traktorIn = inputPort(port => port.name.includes("Traktor Virtual"))
    let traktorOut = outputPort(port => port.name.includes("Traktor Virtual"))
    console.dir(traktorIn)

    let sequencer = new Sequencer(traktorIn, traktorOut, 2, 4, [
      [["C1", 1]],
      [["E1", 1]],
      [["C1", 1], ["D1", 1], ["F1", 1]],
      [["E1", 1], ["F1", 1]],
      [["C1", 1]],
      [["E1", 1]],
      [["C1", 1], ["D1", 1]],
      [["E1", 1]],
    ])
    console.dir(sequencer)
  }
})
