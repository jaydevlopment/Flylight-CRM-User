import React from "react";
import { View, Text, Image, StyleSheet, Alert } from 'react-native'
// import PushNotification from "react-native-push-notification";
// import PushNotificationIOS from "@react-native-community/push-notification-ios";
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash() {

    // PushNotification.configure({
    //     // (optional) Called when Token is generated (iOS and Android)
    //     onRegister: function (token) {
    //       console.log("TOKEN:", token);
    //       AsyncStorage.setItem('fcmToken' ,JSON.stringify(token.token))
    //     },
      
    //     // (required) Called when a remote is received or opened, or local notification is opened
    //     onNotification: function (notification) {
    //       console.log("NOTIFICATION:", notification);
    //       const body = notification.message;
    //       const title = notification.title;
    //       console.log("NOTIFICATION.....................:", body,title);
    //       // Alert.alert(title,body)
    //       // process the notification

    //       PushNotification.localNotification(notification);
    //       // (required) Called when a remote is received or opened, or local notification is opened
    //       notification.finish(PushNotificationIOS.FetchResult.NoData);
    //     },
      
    //     // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    //     onAction: function (notification) {
    //       console.log("ACTION:", notification.action);
    //       console.log("NOTIFICATION:", notification);
      
    //       // process the action
    //     },
      
    //     // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    //     onRegistrationError: function(err) {
    //       console.error(err.message, err);
    //     },
      
    //     // IOS ONLY (optional): default: all - Permissions to register.
    //     permissions: {
    //       alert: true,
    //       badge: true,
    //       sound: true,
    //     },
      
    //     // Should the initial notification be popped automatically
    //     // default: true
    //     popInitialNotification: true,
      
    //     /**
    //      * (optional) default: true
    //      * - Specified if permissions (ios) and token (android and ios) will requested or not,
    //      * - if not, you must call PushNotificationsHandler.requestPermissions() later
    //      * - if you are not using remote notification or do not have Firebase installed, use this:
    //      *     requestPermissions: Platform.OS === 'ios'
    //      */
    //     requestPermissions: true,
    //     senderID: "1747067040",
    //   });

    //   PushNotification.createChannel(
    //     {
    //       channelId: "channel-id", // (required)
    //       channelName: "My channel", // (required)
    //       channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    //       playSound: false, // (optional) default: true
    //       soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    //       importance: 4, // (optional) default: 4. Int value of the Android notification importance
    //       vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    //     },
    //     (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    //   );

    return (
        <View styles={{ marginTop: '45%' }}>
            <Image
                source={require('../../images/Splash.png')}
                style={styles.images}
            />
            <View style={styles.view}></View>
            <Text style={styles.title}>CRM</Text>
            <Text style={styles.subtitle}>Lead Generation and Employee {'\n'}Management</Text>
        </View>
    );
}

const styles = StyleSheet.create({

    images: {
        height: 160,
        width: 220,
        marginTop: '40%',
        alignSelf: 'center',
    },
    view: {
        borderBottomWidth: 2,
        width: '62%',
        marginLeft: '19%'
    },
    title: {
        fontSize: 68,
        fontWeight: 'bold',
        color: '#2F394E',
        textAlign: 'center',
        marginTop: '5%'
    },
    subtitle: {
        fontSize: 22,
        color: '#2F394E',
        textAlign: 'center',
        marginTop: '8%'
    }
})