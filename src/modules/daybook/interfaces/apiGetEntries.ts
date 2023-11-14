import type { Entry } from './entry';

export interface ApiGetEntries {
    data:       Data[];
    status:     number;
    statusText: string;
    request:    Request;
}

export interface Data {
    date: Date;
    text: string;
}
