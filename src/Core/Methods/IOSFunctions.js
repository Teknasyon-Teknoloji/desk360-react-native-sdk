import { Platform } from "react-native";
import Desk360Environment from "../../Enums/Desk360Environment";
import ErrorCodes from "../../Enums/ErrorCodes";
import Desk360Exception from "../../Exceptions/Desk360Exception";

export default class IOSFunctions {
  nativeDesk360;

  constructor(nativeDesk360) {
    this.nativeDesk360 = nativeDesk360;
  }

  isIos() {
    return Platform.OS === 'ios'
  }

  start(properties) {
    if (!this.isIos()) {
      return;
    }

    if (!properties.appID) {
      throw new Desk360Exception(ErrorCodes.PROPERTIES_APPID_REQUIRED);
    }

    if (properties.environment && !Object.values(Desk360Environment).includes(properties.environment)) {
      throw new Desk360Exception(ErrorCodes.VALIDATE_ENVIRONMENT_NOT_VALID);
    }

    if (properties.credentials && properties.credentials.name && properties.credentials.email) {
      throw new Desk360Exception(ErrorCodes.VALIDATE_CREDENTIALS_NOT_VALID);
    }

    this.nativeDesk360.start(properties);
  }

  show(animated) {
    if (!this.isIos()) {
      return;
    }

    this.nativeDesk360.show(animated);
  }

  setPushToken(deviceToken) {
    if (!this.isIos()) {
      return;
    }

    if (!deviceToken) {
      throw new Desk360Exception(ErrorCodes.DEVICE_TOKEN_REQUIRED);
    }
    this.nativeDesk360.setPushToken(deviceToken);
  }

  getUnreadTickets(callback) {
    if (!this.isIos()) {
      return;
    }
    this.nativeDesk360.getUnreadTickets(callback);
  }

  ticketDetailsViewController(ticket) {
    if (!this.isIos()) {
      return;
    }
    this.nativeDesk360.ticketDetailsViewController(ticket);
  }

  showDetails(ticket, animated) {
    if (!this.isIos()) {
      return;
    }
    this.nativeDesk360.showDetails(ticket,animated);
  }

  applicationLaunchChecker(launchOptions) {
    if (!this.isIos()) {
      return;
    }

    this.nativeDesk360.applicationLaunchChecker(launchOptions);
  }

  willNotificationPresent(userInfo) {
    if (!this.isIos()) {
      return;
    }

    this.nativeDesk360.willNotificationPresent(userInfo);
  }

  applicationUserInfoChecker(launchOptions) {
    if (!this.isIos()) {
      return;
    }

    this.nativeDesk360.applicationUserInfoChecker(launchOptions);
  }

  showWithPushDeeplink() {
    if (!this.isIos()) {
      return;
    }

    this.nativeDesk360.showWithPushDeeplink();
  }
}
