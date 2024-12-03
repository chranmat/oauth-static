import req from '../lib/request.js';
import { URLSearchParams } from 'url';

export class oauth {
    constructor(client_id, client_secret, redirect_uri, provider) {
        this.client_id = client_id;
        this.client_secret = client_secret;
        this.redirect_uri = redirect_uri;
        this.provider = provider,
        this.token
    }

    async getAuthorizeUri(state) {

        const params = {
            client_id: this.client_id,
            redirect_uri: this.redirect_uri,
            response_mode: this.provider.authorize.response_mode,
            response_type: this.provider.authorize.response_type,
            scope: this.provider.authorize.scope,
        }

        if(state) {
            params.state = state;
        }

        return `${this.provider.authorize.uri}?${new URLSearchParams(params).toString()}`;
    }

    async getToken(code) {

        const data = {
            client_id: this.client_id,
            client_secret: this.client_secret,
            redirect_uri: this.redirect_uri,
            grant_type: this.provider.token.grant_type,
            code: code,
        }

        const tokenResponse = await req({
            method: 'post',
            url: this.provider.token.uri,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: new URLSearchParams(data).toString()
        });

        this.token = tokenResponse.data?.access_token || 'Not Found';

        return tokenResponse;
    }

    async getUserProfile() {

        const userprofileResponse = await req({
            method: 'get',
            url: this.provider.userprofile.uri,
            headers: {
                'Authorization': `${this.provider.userprofile.authorization} ${this.token}`
            }
        })
        return userprofileResponse.data;
    }

}

export const provider = {
    microsoft: {
        authorize: {
            uri: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
            response_mode: 'query',
            response_type: 'code',
            scope: 'openid',
            grant_type: 'authorization_code',
        },
        token: {
            uri: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
            grant_type: 'authorization_code',

        },
        userprofile: {
            uri: 'https://graph.microsoft.com/v1.0/me',
            authorization: 'Bearer ',
        }   
    }
}