import React, { useState, useEffect, useRef } from 'react';
import {
  Text, View, ToastAndroid, TouchableOpacity, TextInput, Image, Alert, StatusBar,
  ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { useDispatch, useSelector, connect } from 'react-redux';
import { passwordAction } from '../../redux/Actions/index'

export default function ForgotPassword({ navigation }) {

  const [state, setstate] = useState("")
  const [IsLodding, setIsLodding] = useState(false)
  const dispatch = useDispatch()
  const getData = useSelector(state => state.changePassword.sendotp)
  useEffect(() => {
    if (getData) {
      if (getData.status == "success") {
        setIsLodding(false)
        ToastAndroid.show(getData.message, ToastAndroid.SHORT);
        navigation.navigate('VarificationCode', { email: state })
        dispatch(passwordAction.clearResponse());
        setstate("")
      }
      else if (getData.status == "warning") {
        setIsLodding(false)
        ToastAndroid.show(getData.message, ToastAndroid.SHORT);
        navigation.navigate('VarificationCode', { email: state })
        dispatch(passwordAction.clearResponse());
      }
      else if (getData.status == "fail") {
        setIsLodding(false)
        ToastAndroid.show(getData.message, ToastAndroid.SHORT);
      }
      else if (getData.status == "failed") {
        setIsLodding(false)
        ToastAndroid.show(getData.message, ToastAndroid.SHORT);
      }
      else { }
    }
  }, [getData])



  const GetOTP = () => {
    if (state == "") {
      ToastAndroid.show('Enter Email/Mobile', ToastAndroid.SHORT);
    }
    else {
      setIsLodding(true)
      let data = {
        email: state
      }
      dispatch(passwordAction.SendOtp(data));
    }
  }

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [])

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
          // flex: 1,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          height: "35%",
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

      <View
        style={styles.boxView}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={{ marginLeft: '5%', fontSize: 15, color: '#1E263C', fontFamily: 'Roboto', }}>Mobile number /Email</Text>

        <View style={styles.inputFields}>
          <Image
            style={[styles.icon, { height: 28, width: 17 }]}
            source={require('../../images/mobile.png')}
          />
          <TextInput
            style={{ flex: 1 }}
            // keyboardType='decimal-pad'
            ref={inputRef}
            autoFocus={true}
            placeholder="email@gmail.com"
            value={state}
            onChangeText={e => setstate(e)}
          />
        </View>
        {IsLodding == true ?
          <ActivityIndicator size="small" color="#0000ff" />
          :
          null
        }
        <TouchableOpacity style={styles.button} onPress={() => GetOTP()}>
          <Text style={styles.textButton}>Get OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


