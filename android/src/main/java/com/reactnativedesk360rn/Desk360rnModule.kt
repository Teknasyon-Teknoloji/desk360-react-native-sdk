package com.reactnativedesk360rn

import android.util.Log
import com.facebook.react.bridge.*
import com.reactnativedesk360.Desk360Emitter
import com.teknasyon.desk360.helper.*
import org.json.JSONException
import org.json.JSONObject
import com.google.gson.Gson

class Desk360rnModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "Desk360rn"
    }

    var desk360Emitter = Desk360Emitter(reactContext)
    var desk360Client: Desk360Client? = null;
    /*
    * Whether Desk360 has initialized before or not. This flag will
    * be used to prevent multiple initializations.
    */
    private var isDesk360Initialized = false

    @ReactMethod
    fun initialize(properties: ReadableMap, token: String?, deviceToken: String?) {
      Log.e("initialize",properties.toString());
      val builder = Desk360SDKManager.Builder(this.reactApplicationContext);
      if (properties.hasKey("appID"))
        properties.getString("appID")?.let { builder.setAppKey(it) };
      if (properties.hasKey("appVersion"))
        properties.getString("appVersion")?.let { builder.setAppVersion(it) };
      if (properties.hasKey("languageCode"))
        properties.getString("languageCode")?.let { builder.setLanguageCode(it) };
      if (properties.hasKey("jsonObject"))
        properties.getMap("jsonObject")?.let { builder.setCustomJsonObject(convertJson(it)) };
      if (properties.hasKey("platform")){
        val platform = when (properties.getInt("platform")){
          0 -> Platform.GOOGLE
          1 -> Platform.HUAWEI
          else -> Platform.GOOGLE;
        }
        builder.setPlatform(platform);
      }
      if (properties.hasKey("environment")){
        val environment = when (properties.getInt("environment")){
          0 -> Environment.SANDBOX
          1 -> Environment.PRODUCTION
          else -> Environment.SANDBOX
        }
      }
      if (properties.hasKey("countryCode"))
        builder.setCountryCode(properties.getString("countryCode"));
      if (properties.hasKey("name"))
        properties.getString("name")?.let { builder.setUserName(it) };
      if (properties.hasKey("emailAddress"))
        properties.getString("emailAddress")?.let { builder.setUserEmailAddress(it) };
      // If the library has initialized before, do not do anything.
      val desk360SDKManager = builder.build();

      desk360SDKManager.initialize(token, deviceToken);
      isDesk360Initialized = true;
    }

    @ReactMethod
    fun start() {
      if(!isDesk360Initialized)
        return;
      Desk360SDK.start();
    }

    @ReactMethod
    fun getTicketId(hermes: String, callback: Callback) {
      callback.invoke(Desk360SDK.getTicketId(hermes));
    }

    @Throws(JSONException::class)
    private fun convertJson(model: ReadableMap): JSONObject {
      return JSONObject(Gson().toJson(model));
    }

}
