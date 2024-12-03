import crypto from 'crypto';

export default class Session {
    constructor(expirationMs) {
        this.sessions = [];
        this.expirationMs = expirationMs || 300000
    }

    generateToken() {
        return crypto.randomBytes(32).toString('hex');
        //return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    createSession(userId, expirationMs = this.expirationMs) {
        const token = this.generateToken();
        const session = { userId, token, age: expirationMs, expires: Date.now() + expirationMs };

        this.sessions.push(session);

        setTimeout(() => {
            this.sessions = this.sessions.filter(s => s.token !== token);
        }, expirationMs);

        return { token: session.token, session: session.age }
    }

    validateToken(token) {
        const session = this.sessions.find(s => s.token === token && s.expires > Date.now());
        if (session) {
            return session;
        }
        return null;
    }
}