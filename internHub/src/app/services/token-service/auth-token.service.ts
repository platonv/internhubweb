import { Injectable, Optional } from '@angular/core';
import { ActivatedRoute, Router, CanActivate } from '@angular/router';
import {
    Http,
    Response,
    Headers,
    Request,
    RequestMethod,
    RequestOptions,
    RequestOptionsArgs
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/filter';

import {
    SignInData,
    RegisterData,
    UpdatePasswordData,
    ResetPasswordData,

    UserType,
    UserData,
    AuthData,

    Angular2TokenOptions
} from './auth-data.model';

@Injectable()
export class Angular2TokenService implements CanActivate {

    get currentUserType(): string {
        if (this.atCurrentUserType != null)
            return this.atCurrentUserType.name;
        else
            return null;
    }

    get currentUserData(): UserData {
        return this.atCurrentUserData;
    }

    get currentAuthData(): AuthData {
        return this.atCurrentAuthData;
    }

    get currentAuthHeaders(): Headers {
        if (this.atCurrentAuthData != null) {
            return new Headers({
                'access-token': this.atCurrentAuthData.accessToken,
                'client':       this.atCurrentAuthData.client,
                'expiry':       this.atCurrentAuthData.expiry,
                'token-type':   this.atCurrentAuthData.tokenType,
                'uid':          this.atCurrentAuthData.uid
            });
        }

        return new Headers;
    }

    private atOptions: Angular2TokenOptions;
    private atCurrentUserType: UserType;
    private atCurrentAuthData: AuthData;
    private atCurrentUserData: UserData;

    constructor(
        private http: Http,
        @Optional() private activatedRoute: ActivatedRoute,
        @Optional() private router: Router
    ) { }

    userSignedIn(): boolean {
        return !!this.atCurrentAuthData;
    }

    canActivate(): boolean {
        if (this.userSignedIn()){
            return true;
        }
        else {
            // Store current location in storage (usefull for redirection after signing in)
            if (this.atOptions.signInStoredUrlStorageKey) {
                localStorage.setItem(
                    this.atOptions.signInStoredUrlStorageKey,
                    window.location.pathname + window.location.search
                );
            }

            // Redirect user to sign in if signInRedirect is set
            if(this.router && this.atOptions.signInRedirect){
                this.router.navigate([this.atOptions.signInRedirect]);
            }

            return false;
        }
    }

    // Inital configuration
    init(options?: Angular2TokenOptions) {

        let defaultOptions: Angular2TokenOptions = {
            apiPath:                    null,
            apiBase:                    "http://internhubapi.herokuapp.com",

            signInPath:                 'auth/sign_in',
            signInRedirect:             '/jobs',
            signInStoredUrlStorageKey:  null,

            signOutPath:                'auth/sign_in',
            validateTokenPath:          'auth/validate_token',
            signOutFailedValidate:      false,

            registerAccountPath:        'auth',
            deleteAccountPath:          'auth',
            registerAccountCallback:    window.location.href,

            updatePasswordPath:         'auth',

            resetPasswordPath:          'auth/password',
            resetPasswordCallback:      window.location.href,

            userTypes:                  [ 
                {name:"admin", path:"admin"},
                {name:"student", path:"student"},
                {name:"university", path:"university"},
                {name:"company", path:"company"}
            ],

            oAuthBase:                  window.location.origin,
            oAuthPaths: {
                github:                 'auth/github'
            },
            oAuthCallbackPath:          'oauth_callback',
            oAuthWindowType:            'newWindow',
            oAuthWindowOptions:         null,

            globalOptions: {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':       'application/json'
                }
            }
        };

        this.atOptions = (<any>Object).assign(defaultOptions, options);

        this.tryLoadAuthData();
    }

    /**
     *
     * Actions
     *
     */

    // Register request
    registerAccount(registerData: RegisterData): Observable<Response> {

        if (registerData.userType == null)
            this.atCurrentUserType = null;
        else {
            this.atCurrentUserType = this.getUserTypeByName(registerData.userType);
            delete registerData.userType;
        }

        registerData.password_confirmation  = registerData.passwordConfirmation;
        delete registerData.passwordConfirmation;

        registerData.confirm_success_url    = this.atOptions.registerAccountCallback;

        return this.post(this.getUserPath() + this.atOptions.registerAccountPath, JSON.stringify(registerData));
    }

    // Delete Account
    deleteAccount(): Observable<Response> {
        return this.delete(this.getUserPath() + this.atOptions.deleteAccountPath);
    }

    // Sign in request and set storage
    signIn(signInData: SignInData): Observable<Response> {

        if (signInData.userType == null)
            this.atCurrentUserType = null;
        else{
            this.atCurrentUserType = this.getUserTypeByName(signInData.userType);
        }

        let body = JSON.stringify({
            email:      signInData.email,
            password:   signInData.password
        });

        let observ = this.post(this.getUserPath() + this.atOptions.signInPath, body);

        observ.subscribe(res => {
            this.atCurrentUserData = res.json().data}, _error => null);

        return observ;
    }

    // Sign out request and delete storage
    signOut(): Observable<Response> {

        localStorage.removeItem('accessToken');
        localStorage.removeItem('client');
        localStorage.removeItem('expiry');
        localStorage.removeItem('tokenType');
        localStorage.removeItem('uid');

        this.atCurrentAuthData = null;
        this.atCurrentUserType = null;
        this.atCurrentUserData = null;

        this.router.navigate(["/login"]);

        return ;
    }

    // Validate token request
    validateToken(): Observable<Response> {
        let observ = this.get(this.getUserPath() + this.atOptions.validateTokenPath);

        observ.subscribe(
            res => this.atCurrentUserData = res.json().data,
            error => {
                if (error.status === 401 && this.atOptions.signOutFailedValidate) {
                    this.signOut();
                }
            });

        return observ;
    }

    /**
     *
     * HTTP Wrappers
     *
     */

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(this.mergeRequestOptionsArgs({
            url:    this.getApiPath() + url,
            method: RequestMethod.Get
        }, options));
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(this.mergeRequestOptionsArgs({
            url:    this.getApiPath() + url,
            method: RequestMethod.Post,
            body:   body
        }, options));
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(this.mergeRequestOptionsArgs({
            url:    this.getApiPath() + url,
            method: RequestMethod.Put,
            body:   body
        }, options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(this.mergeRequestOptionsArgs({
            url:    this.getApiPath() + url,
            method: RequestMethod.Delete
        }, options));
    }

    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(this.mergeRequestOptionsArgs({
            url:    this.getApiPath() + url,
            method: RequestMethod.Patch,
            body:   body
        }, options));
    }

    head(path: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.request({
            method: RequestMethod.Head,
            url:    this.getApiPath() + path
        });
    }

    options(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(this.mergeRequestOptionsArgs({
            url:    this.getApiPath() + url,
            method: RequestMethod.Options
        }, options));
    }

    // Construct and send Http request
    request(options: RequestOptionsArgs): Observable<Response> {

        let baseRequestOptions: RequestOptions;
        let baseHeaders:        { [key:string]: string; } = this.atOptions.globalOptions.headers;

        // Merge auth headers to request if set
        if (this.atCurrentAuthData != null) {
            (<any>Object).assign(baseHeaders, {
                'access-token': this.atCurrentAuthData.accessToken,
                'client':       this.atCurrentAuthData.client,
                'expiry':       this.atCurrentAuthData.expiry,
                'token-type':   this.atCurrentAuthData.tokenType,
                'uid':          this.atCurrentAuthData.uid
            });
        }

        baseRequestOptions = new RequestOptions({
            headers: new Headers(baseHeaders)
        });

        // Merge standard and custom RequestOptions
        baseRequestOptions = baseRequestOptions.merge(options);

        let response = this.http.request(new Request(baseRequestOptions)).share();
        this.handleResponse(response);

        return response;
    }

    private mergeRequestOptionsArgs(options: RequestOptionsArgs, addOptions?: RequestOptionsArgs): RequestOptionsArgs {

        let returnOptions: RequestOptionsArgs = options;

        if (options)
            (<any>Object).assign(returnOptions, addOptions);

        return returnOptions;
    }

    // Check if response is complete and newer, then update storage
    private handleResponse(response: Observable<Response>): void {
        response.subscribe(res => {
            this.getAuthHeadersFromResponse(<any>res);
        }, error => {
            this.getAuthHeadersFromResponse(<any>error);
        });
    }

    /**
     *
     * Get Auth Data
     *
     */

    // Try to load auth data
    private tryLoadAuthData(): void {

        let userType = this.getUserTypeByName(localStorage.getItem('userType'));

        if (userType)
            this.atCurrentUserType = userType;

        this.getAuthDataFromStorage();

        if(this.activatedRoute)
            this.getAuthDataFromParams();

        if (this.atCurrentAuthData)
            this.validateToken();
    }

    // Parse Auth data from response
    private getAuthHeadersFromResponse(data: any): void {
        let headers = data.headers;

        let authData: AuthData = {
            accessToken:    headers.get('access-token'),
            client:         headers.get('client'),
            expiry:         headers.get('expiry'),
            tokenType:      headers.get('token-type'),
            uid:            headers.get('uid')
        };

        this.setAuthData(authData);
    }

    // Parse Auth data from post message
    private getAuthDataFromPostMessage(data: any): void {
        let authData: AuthData = {
            accessToken:    data['auth_token'],
            client:         data['client_id'],
            expiry:         data['expiry'],
            tokenType:      'Bearer',
            uid:            data['uid']
        };

        this.setAuthData(authData);
    }

    // Try to get auth data from storage.
    private getAuthDataFromStorage(): void {

        let authData: AuthData = {
            accessToken:    localStorage.getItem('accessToken'),
            client:         localStorage.getItem('client'),
            expiry:         localStorage.getItem('expiry'),
            tokenType:      localStorage.getItem('tokenType'),
            uid:            localStorage.getItem('uid')
        };

        if (this.checkAuthData(authData))
            this.atCurrentAuthData = authData;
    }

    // Try to get auth data from url parameters.
    private getAuthDataFromParams(): void {
        if(this.activatedRoute.queryParams) // Fix for Testing, needs to be removed later
            this.activatedRoute.queryParams.subscribe(queryParams => {
                let authData: AuthData = {
                    accessToken:    queryParams['token'] || queryParams['auth_token'],
                    client:         queryParams['client_id'],
                    expiry:         queryParams['expiry'],
                    tokenType:      'Bearer',
                    uid:            queryParams['uid']
                };

                if (this.checkAuthData(authData))
                    this.atCurrentAuthData = authData;
            });
    }

    /**
     *
     * Set Auth Data
     *
     */

    // Write auth data to storage
    private setAuthData(authData: AuthData): void {

        if (this.checkAuthData(authData)) {

            this.atCurrentAuthData = authData;
            

            localStorage.setItem('accessToken', authData.accessToken);
            console.log("LocalStorage", localStorage);
            localStorage.setItem('client', authData.client);
            localStorage.setItem('expiry', authData.expiry);
            localStorage.setItem('tokenType', authData.tokenType);
            localStorage.setItem('uid', authData.uid);

            if (this.atCurrentUserType != null)
                localStorage.setItem('userType', this.atCurrentUserType.name);

        }
    }

    /**
     *
     * Validate Auth Data
     *
     */

    // Check if auth data complete and if response token is newer
    private checkAuthData(authData: AuthData): boolean {

        if (
            authData.accessToken != null &&
            authData.client != null &&
            authData.expiry != null &&
            authData.tokenType != null &&
            authData.uid != null
        ) {
            if (this.atCurrentAuthData != null)
                return authData.expiry >= this.atCurrentAuthData.expiry;
            else
                return true;
        } else {
            return false;
        }
    }

    /**
     *
     * Construct Paths / Urls
     *
     */

    private getUserPath(): string {
        if (this.atCurrentUserType == null)
            return '';
        else
            return this.atCurrentUserType.path + '_';
    }

    private getApiPath(): string {
        let constructedPath = '';

        if (this.atOptions.apiBase != null)
            constructedPath += this.atOptions.apiBase + '/';

        if (this.atOptions.apiPath != null)
            constructedPath += this.atOptions.apiPath + '/';

        return constructedPath;
    }

     /**
     *
     * Utilities
     *
     */

    // Match user config by user config name
    private getUserTypeByName(name: string): UserType {
        if (name == null || this.atOptions.userTypes == null)
            return null;

        return this.atOptions.userTypes.find(
            userType => userType.name === name
        );
    }
}