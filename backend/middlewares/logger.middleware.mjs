export function log(req, res, next) {
    console.log('logger middleware activated')
    next()
}