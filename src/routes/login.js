import express from "express";
import { oauth, provider } from "../lib/oauth.js";
import matchUPN from "../lib/matchupn.js";
import forbidden from "../templates/forbidden.js";
import config from '../config.js';

const router = express.Router();
const auth = new oauth(config.oauth.client_id, config.oauth.client_secret, config.oauth.redirect_uri, provider.microsoft);

router.get('/', async (req, res) => {
    const authorizeUri = await auth.getAuthorizeUri();
    console.log(`REDIRECT ${authorizeUri}`);
    res.redirect(authorizeUri);
})

router.get('/callback', async (req, res) => {

    try {
        await auth.getToken(req.query.code);

        const UserProfile = await auth.getUserProfile();
        const hasAccess = matchUPN(UserProfile.userPrincipalName, config.access.allowed_upn_patterns);

        if (hasAccess) {
            const session = req.session.createSession(UserProfile.userPrincipalName);
            res.cookie('token', session.token, { maxAge: session.age, httpOnly: true })

            console.log(`REDIRECT ${config.base_url}`)
            res.redirect(config.base_url);
        }
        else {
            res.status(403).send(forbidden());
        }
    }
    catch(e) {
        console.log(`ERROR ${e}`)
        res.status(403).send(forbidden());
    }

})

export default router;