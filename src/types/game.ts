import { Version } from './version';

export interface Game {
    name: string;
    appId: string;
    versions: Version[];
}
