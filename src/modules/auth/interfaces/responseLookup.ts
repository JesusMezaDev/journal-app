export interface ResponseLookup {
    kind:  string;
    users: User[];
}

export interface User {
    localId:           string;
    email:             string;
    displayName:       string;
    passwordHash:      string;
    emailVerified:     boolean;
    passwordUpdatedAt: number;
    providerUserInfo:  ProviderUserInfo[];
    validSince:        string;
    lastLoginAt:       string;
    createdAt:         string;
    lastRefreshAt:     string;
}

export interface ProviderUserInfo {
    providerId:  string;
    displayName: string;
    federatedId: string;
    email:       string;
    rawId:       string;
}
