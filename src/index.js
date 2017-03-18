import WebMidi from 'webmidi'

export class Sequencer {

  constructor(inputPort, outputPort, stepsPerBeat, beatsPerPattern, pattern) {
    this.outputPort = outputPort
    this.stepsPerBeat = stepsPerBeat
    this.actionStepAt = 24 / stepsPerBeat
    this.stepsPerPattern = stepsPerBeat * beatsPerPattern
    this.beatsPerPattern = beatsPerPattern
    this.pattern = pattern

    this.listeners = []

    this.step = -1
    this.patternStep = 0

    inputPort.on("start", "all", event => {
      this.sync()
    })

    inputPort.on("clock", "all", event => {
      this.tick()
    })
  }

  addListener(listener) {
    this.listeners.push(listener)
  }

  dispatch(event) {
    for (var i = 0; i < this.listeners.length; i++) {
      this.listeners[i](event)
    }
  }

  sync() {
    this.step = -1
    this.patternStep = 0
    this.dispatch({type: 'sync'})
    this.tick()
  }

  tick() {
    this.step = (this.step + 1) % 24
    if (this.step % this.actionStepAt == 0) {
      let action = this.pattern[this.patternStep]
      this.patternStep = (this.patternStep + 1) % (this.stepsPerPattern)
      if (action != null) {
        this.outputPort.playNote(action[0], action[1], {
          duration: 50,
          release: 1.0,
          velocity: 1.0
        })
      }
      this.dispatch({type: 'step', step: this.patternStep})
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

export function whenMidiReady(success, failure) {
  WebMidi.enable(err => {
    if (err) {
      failure(err)
    } else {
      success()
    }
  })
}
