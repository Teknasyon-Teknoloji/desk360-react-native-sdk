import { Platform } from "react-native";
import ErrorCodes from "../../Enums/ErrorCodes";
import Desk360Exception from "../../Exceptions/Desk360Exception";

export default class AndroidFunctions {
  nativeDesk360;

  constructor(nativeDesk360) {
    this.nativeDesk360 = nativeDesk360;
  }

  isAndroid() {
    return Platform.OS === 'android'
  }

  getTicketId(hermes, callback) {
    if (!this.isAndroid()) {
      return;
    }
    if (hermes == null) {
      throw new Desk360Exception(ErrorCodes.HERMES_REQUIRED);
    }

    this.nativeDesk360.getTicketId(hermes, callback);
  }
}