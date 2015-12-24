var Emitter = require('events/')
var bl      = require('bl')

module.exports = wreq

function wreq(bundler) {
  var prevError = null
  var pending = null
  var buffer = null

  update()
  bundler.on('update', update)

  return handler

  function update() {
    var p = pending = new Emitter

    bundler.bundle().pipe(bl(function(err, _buffer) {
      if (p !== pending) return
      buffer = _buffer
      pending.emit('ready', prevError = err, pending = false)
    }))
  }

  function handler(req, res, next) {
    next = next || send

    if (pending) {
      return pending.once('ready', function(err) {
        if (err) return next(err)
        return handler(req, res, next)
      })
    }

    if (prevError) return next(prevError)

    res.setHeader('content-type', 'application/javascript')

    return next(null, buffer)

    function send(err, body) {
      if (err) return res.emit(err)
      res.end(body)
    }
  }
}
