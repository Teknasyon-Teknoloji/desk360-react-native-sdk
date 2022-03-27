import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import Desk360, { Desk360Platform, Desk360Environment } from 'react-native-desk360rn';
import { getUniqueId } from 'react-native-device-info';
import * as RNLocalize from "react-native-localize";

export default function App() {

  let start = () => {
    let deviceId = getUniqueId();
    let locale = RNLocalize.getLocales()[0];

    Desk360.getInstance().initialize({
      "appID": "l59pkeVBzPpezHgnGDHv9c2SzwhbOl6M",
      "deviceID": deviceId,
      "appVersion": "1.0.0",
      "languageCode": locale.languageCode,
      "environment": Desk360Environment.SANDBOX,
      "platform": Desk360Platform.GOOGLE,
      "countryCode": locale.countryCode,
      "bypassCreateTicketIntro":true,
      "name": "Test-092021",
      "jsonInfo":{
        "key":"value"
      }
    });
    Desk360.getInstance().start();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>start()}>
        <View style={{width:'40%',alignSelf:'center',backgroundColor:'gray'}}>
          <Text style={{fontSize:16, color:'white',alignSelf:'center',padding:10}}>Press</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
