import React, { useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Image, Alert, StatusBar,
  SafeAreaView, Platform ,ToastAndroid
} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector, connect } from 'react-redux';
import { authAction } from '../../redux/Actions/index'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation, route, props }) {

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [checked, setchecked] = useState(false)
  const [IsLodding, setIsLodding] = useState(false)
  const [isSelection, setisSelection] = useState(false)

  const dispatch = useDispatch()
  const loginData = useSelector(state => state.auth.data)

  useEffect(() => {
    AsyncStorage.getItem('Email', (err, Email) => {
      if (Email !== null) {
        setEmail(Email)
        setchecked(true)
      }
    })
    AsyncStorage.getItem('Password', (err, Password) => {
      if (Password !== null) {
        setPassword(Password)
        setchecked(true)
      }
    })
  }, [AsyncStorage])

  const login = () => {
    if (Object.Email == "") {
      // Alert.alert(" Enter Email/Mobile ")
      ToastAndroid.show('Enter Email/Mobile', ToastAndroid.SHORT);
    }
    else if (Object.Password == "") {
      // Alert.alert("Enter Password")
      ToastAndroid.show('Enter Password', ToastAndroid.SHORT);
    }
    else {
      setIsLodding(true)
      let data = {
        username: Email,
        password: Password
      }
      dispatch(authAction.login(data));
    }
  }

  useEffect(() => {
    if (loginData) {
      if (loginData.status == "success") {

        setEmail('')
        setPassword('')
        setIsLodding(false)
        // dispatch(authAction.clearResponse())
        // navigation.navigate("DashBoard")
      }
      else if (loginData.status == "failed") {
        setIsLodding(false)
        // dispatch(authAction.clearResponse())
        // Alert.alert(loginData.message)
        ToastAndroid.show(loginData.message, ToastAndroid.SHORT);
      }
      else {
        setIsLodding(false)
      }
    }
  }, [loginData])

  const storeData = async (Email, Password) => {
    try {
      await AsyncStorage.setItem('Email', Email)
      await AsyncStorage.setItem('Password', Password)
    } catch (e) {
      // saving error
    }
  }

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('Email')
      await AsyncStorage.removeItem('Password')
    } catch (e) {
      // remove error
    }
    console.log('Done.')
  }

  checkedFuction = (value) => {
    if (value == false) {
      storeData(Email, Password)
    }
    else {
      removeValue(Email, Password)
    }
    setchecked(!value)
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#2B6EF2"
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
      <LinearGradient
        colors={['#2B6EF2', '#8DB3FF', '#8DB3FF']}
        style={{
          borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
          height: "42%"
        }}
      >
        <View>
          <Image style={styles.image}
            source={require('../../images/Splash.png')}
          />
        </View>
      </LinearGradient>
      <View style={styles.boxView}>
        <Text style={styles.title}>Welcome Back !</Text>
        <Text style={{ margin: '3%', marginBottom: '-1%', color: '#2F394E', fontFamily: 'Roboto', marginTop: '-2%', fontSize: 15 }}>Mobile number /Email </Text>
        <View style={styles.inputFields2}>
          <Image
            style={Platform.OS == 'ios' ? [styles.icon, {
              height: 17, width: 21, margin: '3%', marginLeft: '2%'
            }]
              :
              [styles.icon, {
                height: 17, width: 21, marginTop: '7%', margin: '3%', marginLeft: '2%'
              }]}
            source={require('../../images/mail.png')}
          />
          <TextInput
            style={{ flex: 1 }}
            value={Email}
            onChangeText={e => setEmail(e)}
            placeholder="example@gmail.com"
          />
        </View>
        <Text style={{ marginLeft: '3%', fontFamily: 'Roboto', marginRight: '5%', color: '#2F394E', marginBottom: '-1%', fontSize: 15 }}>Password</Text>
        <View style={styles.inputFields2}>
          <Image
            style={Platform.OS == 'ios' ?
              [styles.icon, { height: 19.20, width: 17.80, margin: '3%' }]
              :
              [styles.icon, { height: 19.20, width: 17.80, margin: '3%', marginTop: '5%', }]
            }
            source={require('../../images/icon-password.png')}
          />
          <TextInput
            style={{ flex: 1 }}
            value={Password}
            onChangeText={e1 => setPassword(e1)}
            placeholder="Password"
            secureTextEntry={!isSelection}
          />
          <TouchableOpacity
            style={{ margin: '3%', marginRight: '0%' }}
            onPress={() => setisSelection(!isSelection)}>
            <Image
              style={
                Platform.OS == 'ios' ? [styles.icon, {
                  height: 18, width: 20,
                  marginTop: '5.5%', marginRight: '5%'
                }]
                  :
                  [styles.icon, {
                    height: 18, width: 20,
                    marginTop: '25%', marginRight: '5%'
                  }]}
              source={require('../../images/private.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%' }}>
          <View style={{ marginLeft: '3%', flexDirection: 'row' }}>
            <View style={{ marginTop: '-4%' }}>
              <BouncyCheckbox
                size={16}
                fillColor="#00BE7E"
                unfillColor="#00BE7E"
                bounceEffect={1}
                isChecked={checked}
                iconStyle={{ borderColor: "#fff" }}
                onPress={() => checkedFuction(checked)}
              />
            </View>
            <Text style={{ fontSize: 12, marginLeft: '-10%', fontFamily: 'Roboto', color: '#6B7285' }}>Remember me</Text>
          </View>
          {IsLodding == true ?
            <ActivityIndicator size="small" color="#0000ff" />
            :
            <View />
          }
          <TouchableOpacity
          onPress={() => navigation.navigate('forgotPassword')}
          >
            <Text style={{ color: '#FB4B0D', fontSize: 12, marginRight: '5%', fontFamily: 'Roboto' }}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => login()}>
          <Text style={styles.textButton}>Sign In </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('register')}>
          <Text style={styles.textButton}>To Sign Up Press Here</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}


