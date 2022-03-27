import type Environment from '../Enums/Environments';
import type Platform from '../Enums/Platforms';

export default class Desk360SDKManager {
    appKey: string | undefined;
    appVersion: string | undefined;
    languageCode: string | undefined;
    jsonObject: Object | undefined;
    platform: typeof Platform | undefined;
    environment: typeof Environment | undefined;
    countryCode: string | undefined;
    name: string | undefined;
    emailAddress: string | undefined;
    enableHelpMode: boolean | undefined;
}