/**
 * ErrorCodes
 */
export default {
  NATIVE_MODULE_NOT_FOUND: {
    code: 101,
    message: 'Native module "RNDesk360" not found.',
  },
  NATIVE_MODULE_EVENT_EMITTER_NOT_FOUND: {
    code: 121,
    message: 'Native module "RNDesk360Emitter" not found.',
  },
  PROPERTIES_APPID_REQUIRED: {
    code: 201,
    message: 'Missing parameter "appID" required for Desk360Properties.' 
  },
  PROPERTIES_DEVICEID_REQUIRED: {
    code: 202,
    message: 'Missing parameter "deviceID" required for Desk360Properties.' 
  },
  PROPERTIES_ENVIRONMENT_REQUIRED: {
    code: 203,
    message: 'Missing parameter "environment" required for Desk360Properties.' 
  },
  VALIDATE_ENVIRONMENT_NOT_VALID: {
    code: 204,
    message: 'Environment is not valid for Desk360Properties.' 
  },
  VALIDATE_PLATFORM_NOT_VALID: {
    code: 209,
    message: 'Platform is not valid for Desk360Properties.' 
  },
  VALIDATE_CREDENTIALS_NOT_VALID: {
    code: 208,
    message: 'Credentials is not valid for Desk360Properties.' 
  },
  PROPERTIES_LANGUAGE_REQUIRED: {
    code: 205,
    message: 'Missing parameter "language" required for Desk360Properties.' 
  },
  PROPERTIES_COUNTRY_REQUIRED: {
    code: 206,
    message: 'Missing parameter "country" required for Desk360Properties.' 
  },
  PROPERTIES_USER_CRED_REQUIRED: {
    code: 207,
    message: 'Missing parameter "userCredentials" required for Desk360Properties.' 
  },
  TARGETID_REQUIRED: {
    code: 301,
    message: 'Missing parameter "targetID" required' 
  },
  TOKEN_REQUIRED: {
    code: 302,
    message: 'Missing parameter "notificationToken" required' 
  },
  DEVICE_TOKEN_REQUIRED: {
    code: 303,
    message: 'Missing parameter "deviceID" required' 
  },
  HERMES_REQUIRED: {
    code: 304,
    message: 'Missing parameter "hermes" required' 
  },
};
