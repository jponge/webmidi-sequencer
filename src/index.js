import WebMidi from 'webmidi'

export class Sequencer {

  constructor(inputPort, outputPort, stepsPerBeat, beatsPerPattern, pattern) {
    this.outputPort = outputPort 
    this.stepsPerBeat = stepsPerBeat   
    this.actionStepAt = 24 / stepsPerBeat
    this.stepsPerPattern = stepsPerBeat * beatsPerPattern
    this.beatsPerPattern = beatsPerPattern    
    this.pattern = pattern
    
    this.step = -1
    this.patternStep = 0

    inputPort.on("start", "all", event => {
      this.sync()
      console.log("{sync}")
    })

    inputPort.on("clock", "all", event => {
      this.tick()
    })
  }

  sync() {
    this.step = -1
  }

  tick() {
    this.step = (this.step + 1) % 24
    if (this.step % this.actionStepAt == 0) {
      let action = this.pattern[this.patternStep]
      this.patternStep = (this.patternStep + 1) % (this.stepsPerPattern)
      if (action != null) {        
        action.forEach(note => {
          this.outputPort.playNote(note[0], note[1], {
            duration: 50
          })
        })
      }
    }
  }

  pattern() {
    return this.pattern
  }

  use(pattern) {
    this.pattern = pattern
  }
}

export function inputPort(predicate) {
  return WebMidi.inputs.filter(predicate)[0]
}

export function outputPort(predicate) {
  return WebMidi.outputs.filter(predicate)[0]
}
