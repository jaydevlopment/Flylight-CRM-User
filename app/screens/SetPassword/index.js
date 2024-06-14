import React, { useState, useEffect } from 'react';
import {
  Text, View, ToastAndroid, TouchableOpacity, TextInput, Image, Alert, StatusBar,
  SafeAreaView, ActivityIndicator
} from 'react-native';
import styles from './styles';
import { useDispatch, useSelector, connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { passwordAction } from '../../redux/Actions/index'

export default function SetPassword({ navigation, route, props }) {

  const [state, setstate] = useState("")
  const [state1, setstate1] = useState("")
  const [email, setemail] = useState(route.params ? route.params.email : '')
  const [IsLodding, setIsLodding] = useState(false)

  const dispatch = useDispatch()
  const PassData = useSelector(state => state.changePassword.setpassword)

  useEffect(() => {
    if (PassData) {
      if (PassData.status == "success") {
        setstate("")
        setstate1("")
        setIsLodding(false)
        ToastAndroid.show(PassData.message, ToastAndroid.SHORT);
        navigation.navigate("Login")
        dispatch(passwordAction.clearResponse())
      }
      else if (PassData.status == "failed") {
        setIsLodding(false)
        ToastAndroid.show(PassData.message, ToastAndroid.SHORT);
      }
      else if (PassData.status == "fail") {
        setIsLodding(false)
        ToastAndroid.show(PassData.message, ToastAndroid.SHORT);
      }
      else {
      }
    }
  }, [PassData])

  const SetPassword = () => {
    if (state == "") {
      ToastAndroid.show('Enter Password', ToastAndroid.SHORT);
    }
    else if (state1 == "") {
      Alert.alert("Enter Re- Password")
      ToastAndroid.show('Enter Re-Password', ToastAndroid.SHORT);
    }
    else {
      setIsLodding(true)
      let data = {
        email: email,
        password: state,
        confirm_password: state1
      }
      dispatch(passwordAction.NewPassword(data));
    }
  }

  return (
    //     <SafeAreaView style={styles.container} >
    //  <StatusBar>
    <View style={styles.container}>

      <StatusBar
        barStyle="dark-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor="#2B6EF2"
        //Background color of statusBar only works for Android
        translucent={false}
        //allowing light, but not detailed shapes
        networkActivityIndicatorVisible={true}
      />

      <LinearGradient
        colors={['#2B6EF2', '#8DB3FF', '#8DB3FF']}

        style={{
          // flex: 1,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          height: "42%",
          width: "100%",
        }}
      >
        <View
          style={{
            margin: 20,
          }}
        >
          <Image
            style={styles.image}
            source={require('../../images/Splash.png')}
          />
        </View>
      </LinearGradient>
      <View style={styles.boxView}>
        <Text style={styles.title}>New Password</Text>
        <Text style={{
          margin: '3%', marginBottom: '-1%', color: '#2F394E', fontFamily: 'Roboto',
          marginTop: '-2%', fontSize: 15
        }}>Password</Text>

        <View style={styles.inputFields2}>
          <Image style={[styles.icon, {
            height: 22, width: 21,
            margin: '3%'
          }]}
            source={require('../../images/icon-password.png')}
          />
          <TextInput style={{ flex: 1 }}
            value={state}
            onChangeText={e3 => setstate(e3)}
            placeholder="Password"
          />
        </View>
        <Text style={{
          margin: '3%', marginBottom: '-1%', color: '#2F394E',
          fontFamily: 'Roboto', marginTop: '-2%',
          fontSize: 15
        }}>Re-Enter Password </Text>

        <View style={styles.inputFields2}>
          <Image
            style={[styles.icon, {
              height: 22, width: 21,
              margin: '3%'
            }]}
            source={require('../../images/icon-password.png')}
          />
          <TextInput style={{ flex: 1 }}
            value={state1}
            onChangeText={e2 => setstate1(e2)}
            placeholder="Re-Enter Password "
          />
        </View>


        {IsLodding == true ?
          <ActivityIndicator size="small" color="#0000ff" />
          :
          <View />
        }

        <TouchableOpacity style={styles.button} onPress={() => SetPassword()}>
          <Text style={styles.textButton}>Save Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


