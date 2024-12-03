import config from "../config.js";

export default (req, res, next) => {

    const session = req.session.validateToken(req.cookies.token);

    if(session) {
        next();
    }
    else {
        res.redirect(config.base_url + '/login');
    }

}