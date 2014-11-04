var Emitter = require('events/')
var noop    = (function(){})
var bl      = require('bl')

module.exports = wreq

function wreq(bundler) {
  var prevError = false
  var pending = false
  var buffer

  update()
  bundler.on('update', update)

  return handler

  function handler(req, res, next) {
    next = next || noop

    if (pending) {
      return pending.once('ready', function(err) {
        if (err) return next(err)
        return handler(req, res, next)
      })
    }

    if (prevError) return next(prevError)

    res.setHeader('content-type', 'text/javascript')
    return res.end(buffer)
  }

  function update() {
    var p = pending = new Emitter

    bundler.bundle().pipe(bl(function(err, _buffer) {
      if (p !== pending) return
      buffer = _buffer
      pending.emit('ready', prevError = err, pending = false)
    }))
  }
}
