export interface ResponseLogin {
    kind:         string;
    localId:      string;
    email:        string;
    displayName:  string;
    idToken:      string;
    registered:   boolean;
    refreshToken: string;
    expiresIn:    string;
}