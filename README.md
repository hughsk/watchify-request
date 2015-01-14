# watchify-request [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Wraps a [watchify](http://github.com/substack/watchify) instance into an HTTP
request handler, performing the minimal amount of rebundling required and
pausing requests mid-build to avoid getting old versions of your script on
reload.

## Usage

[![NPM](https://nodei.co/npm/watchify-request.png)](https://nodei.co/npm/watchify-request/)

### `handler = watchifyRequest(bundler)`

Creates a request handler out of a `watchify` or `browserify` instance.

### `handler(req, res[, done])`

Handles the request, where `req` is an `HTTPRequest` instance and `res` is its
matching `HTTPResponse` instance. `done(err)` is optional, and called if the
request isn't handled for some reason, generally in the case of an error.

## See also
- [myth-request](https://github.com/yoshuawuyts/myth-request)
- [koa-watchify](https://github.com/yoshuawuyts/koa-watchify)

## License

MIT. See [LICENSE.md](http://github.com/hughsk/watchify-request/blob/master/LICENSE.md) for details.
