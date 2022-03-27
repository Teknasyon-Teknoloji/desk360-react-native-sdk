import type Desk360Environment from '../Enums/Desk360Environment';
import type Credentials from './Credentials';
export default class Desk360Properties {
    appID: string | undefined;
    deviceID: string | undefined;
    environment: typeof Desk360Environment | undefined;
    lanugage: string| undefined;
    country: string | undefined;
    userCredentials: Credentials | undefined;
    jsonInfo: [string, any] | undefined;
    bypassCreateTokenIntro: boolean | undefined;
}