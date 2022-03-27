import { Platform } from "react-native";
import Environments from "../../Enums/Environments";
import ErrorCodes from "../../Enums/ErrorCodes";
import Platforms from "../../Enums/Platforms";
import Desk360Exception from "../../Exceptions/Desk360Exception";

export default class CommonFunctions {
  nativeDesk360;

  constructor(nativeDesk360) {
    this.nativeDesk360 = nativeDesk360;
  }

  isAndroid() {
    return Platform.OS === 'android'
  }
  isIos() {
    return Platform.OS === 'ios'
  }
  start(animated) {
    if (this.isAndroid()) {
      this.nativeDesk360.start();
    }
    else if(this.isIos()) {
      this.nativeDesk360.show(animated);
    }
    
  }

  initialize(properties, token = null) {
    
    if (!properties.appID) {
      throw new Desk360Exception(ErrorCodes.PROPERTIES_APPID_REQUIRED);
    }

    if (properties.environment && !Object.values(Environments).includes(properties.environment)) {
      throw new Desk360Exception(ErrorCodes.VALIDATE_ENVIRONMENT_NOT_VALID);
    }
  
    if (!properties.deviceID) {
      throw new Desk360Exception(ErrorCodes.PROPERTIES_DEVICEID_REQUIRED);
    }

    if (this.isAndroid()) {
      if (properties.platform && !Object.values(Platforms).includes(properties.platform)) {
        throw new Desk360Exception(ErrorCodes.VALIDATE_PLATFORM_NOT_VALID);
      } 
      if (token == null) {
        throw new Desk360Exception(ErrorCodes.TOKEN_REQUIRED);
      }
      this.nativeDesk360.initialize(properties, token, properties.deviceID);
    }
    else if(this.isIos()) {
      if (properties.credentials && properties.credentials.name && properties.credentials.email) {
        throw new Desk360Exception(ErrorCodes.VALIDATE_CREDENTIALS_NOT_VALID);
      }
      this.nativeDesk360.start(properties);
    }
    
  }

}