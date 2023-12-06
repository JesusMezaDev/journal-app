export interface ResponseRegister {
    kind:         string;
    idToken:      string;
    email:        string;
    refreshToken: string;
    expiresIn:    string;
    localId:      string;
}