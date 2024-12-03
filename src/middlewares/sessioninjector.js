export default (session) => {
    return function(req, res, next) {

        req.session = session;
        next();
    }
}