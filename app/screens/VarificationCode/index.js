
import React, { useState, useEffect, useDebugValue } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, ToastAndroid, Alert, Image, StatusBar, } from 'react-native';
import { useDispatch, useSelector, connect } from 'react-redux';
import { passwordAction } from '../../redux/Actions/index'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

export default function Varification({ navigation, route }) {

  const [state, setstate] = useState(route.params ? route.params.email : '')
  const [IsLodding, setIsLodding] = useState(false)
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  const dispatch = useDispatch()
  const otpData = useSelector(state => state.changePassword.checkotp)
  // const resendOtpData = useSelector(state => state.resendOTP.otpResend)

  useEffect(() => {
    if (otpData) {
      if (otpData.status == "success") {
        setIsLodding(false)
        ToastAndroid.show(otpData.message, ToastAndroid.SHORT);
        navigation.navigate('SetPassword', { email: state })
        dispatch(passwordAction.clearResponse());
        setValue('')
      }
      else if (otpData.status == "failed") {
        setIsLodding(false)
        ToastAndroid.show(otpData.message, ToastAndroid.SHORT);
      }
    }
    else {
    }
  }, [otpData])

  // useEffect(() => {
  //   if (resendOtpData) {
  //     if (resendOtpData.status == "success") {
  //       setIsLodding(false)
  //       Alert.alert(resendOtpData.message)
  //     }
  //     else if (resendOtpData.status == "failed") {
  //       setIsLodding(false)
  //       Alert.alert(resendOtpData.message)                                                                                //otherwise alert show 
  //     }
  //   }
  //   else {
  //   }
  // }, [resendOtpData])

  const VerifyOTP = () => {
    if (value == "") {
      ToastAndroid.show('Enter OTP', ToastAndroid.SHORT);
    }
    else {
      setIsLodding(true)
      let data = {
        email: state,
        otp: value
      }
      dispatch(passwordAction.Verify(data));
    }
  }

  const resend = () => {
    setIsLodding(true)
    // dispatch(resendOtpAction.resend(state));
  }

  useEffect(() => {
    ref.current.focus();
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
        style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20, height: "42%", width: "100%", }}
      >
        <View style={{ margin: 20 }}
        >
          <Image style={styles.image} source={require('../../images/Splash.png')} />
        </View>
      </LinearGradient>

      <View style={styles.boxView}>
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={{ marginTop: '-5%', color: '#131313', fontFamily: 'Roboto', textAlign: 'center', fontSize: 14 }}>
          Please enter the OTP sent {'\n'} on {state}
        </Text>
        <Text style={{ margin: '5%', fontSize: 16, fontFamily: 'Roboto', color: '#000000' }}>Verification Code</Text>

        <View style={{ marginLeft: '5%', marginRight: '7%' }}>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoFocus={true}
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
{/* 
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: '5%', marginBottom: '0%' }}>
          <Text style={{ fontSize: 12, fontFamily: 'Roboto', color: '#000000' }}>Don't Received OTP?</Text>
          <TouchableOpacity
            onPress={() => resend()}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={require('../../images/refresh.png')}
                style={{ height: 20, width: 20, marginRight: '2%' }}
              />
              <Text style={{ color: '#1E32FA', fontSize: 12, }}>SEND AGAIN</Text>
            </View>
          </TouchableOpacity>
        </View> */}

        {IsLodding == true ?
          <ActivityIndicator size="small" color="#0000ff" />
          :
          <View />
        }

        <TouchableOpacity style={styles.button} onPress={() => VerifyOTP()}>
          <Text style={styles.textButton}>Verify & Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


