import 'dotenv/config';
import { provider } from './lib/oauth.js';
const config = {};

// Config definition
config.base_url = process.env.BASE_URL || 'http://localhost:3000';
config.port = process.env.PORT || 3000;

config.access = {
    allowed_upn_patterns: process.env.UPN_PATTERNS || undefined,
}

config.oauth = {
    provider: provider.microsoft,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI || config.base_url + '/login/callback'
}

// Config checks!
if(!config.oauth.client_id) {
    console.log('Client ID not defined! Use environment variable CLIENT_ID.');
    process.exit(1);
}

if(!config.oauth.client_secret) {
    console.log('Client Secret not defined! Use environment variable CLIENT_SECRET.');
    process.exit(1);
}

if(!config.access.allowed_upn_patterns) {
    console.log('UPN Patterns not defined! Use environment variable UPN_PATTERNS.');
    process.exit(1);
}

export default config;