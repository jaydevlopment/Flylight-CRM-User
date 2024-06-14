import React, { useState, useEffect,useCallback } from 'react';
import { FlatList, Text, View, TouchableOpacity, TextInput, ActivityIndicator, Dimensions, Platform, Linking, ToastAndroid } from 'react-native';
import styles from './styles';
import Header from '../../component/header';
import {  Image } from 'react-native-elements';
import { useDispatch, useSelector, connect } from 'react-redux';
import { leadAction } from '../../redux/Actions/index'
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {request,check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import whatsapp from '../../images/whatsapp.png'

export default function DashBoard({ navigation, route }) {

  const {item} = route?.params

  const [IsLodding, setIsLodding] = useState(false)
  const [leadDetail, setleadDetail] = useState('')
  const [GetMore, setGetMore] = useState(false)
  const dispatch = useDispatch()
  const UserData = useSelector(state => state.auth.data)
  const LeadInfo = useSelector(state => state.lead.detail)
  const { width, height } = Dimensions.get('window');

  const [result, setResult] = useState(null);

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const Get_Data = () => {
    // setIsLodding(true)
    if (UserData.status == "success") {
      let data = {
        uid: UserData.data.uid,
        org_uid: UserData.data.org_uid,
        profile_id: UserData.data.cProfile.toString(),
        lead_id: route.params ? route.params.item.id : ''
      }
      dispatch(leadAction.GetDetail(data, UserData.data.token));
    }
  }

  const getLeadDetail = useCallback(debounce(Get_Data), [item]);
  
  useEffect(() => {
    setIsLodding(true)
    if (UserData) {
      getLeadDetail()
    }
  }, [item])

  useEffect(() => {
    if (LeadInfo) {
      if (LeadInfo.status == "success") {
        // console.log('................', LeadInfo.lead)
        setIsLodding(false)
        setleadDetail(LeadInfo.data)
        // setleadDetail(LeadInfo.lead)
        dispatch(leadAction.clearResponse())
      }
      else if (LeadInfo.status == "failed") {
        setIsLodding(false)
        ToastAndroid.show(LeadInfo.message, ToastAndroid.SHORT);
      }
    }
  }, [LeadInfo])

  const call = (value, key) => {
    if (key == '1') {
      let mobileNo = value.phone;
      try{
        request(PERMISSIONS.ANDROID.CALL_PHONE).then((result) => {
            if(result=='granted'){
              RNImmediatePhoneCall.immediatePhoneCall(mobileNo);
              let data = {
                uid: UserData.data.uid,
                org_uid: UserData.data.org_uid,
                profile_id: UserData.data.cProfile.toString(),
                lead_id: value.id,
                call_status: 'called',
                lead_status: value.lead_status,
                message: value.description,
                }
              dispatch(leadAction.Editlead(data, UserData.data.token));
              navigation.navigate('RecordFeedback', { data: value,callType:'lead' })
            }
            else{
             alert('Please grant phone call permission')
            }
       });
      }
      catch(error){
        alert('error')
      }
      // if (Platform.OS !== "android") {
      //   phoneNumber = `telprompt:${mobileNo}`;
      // } else {
      //   phoneNumber = `tel:${mobileNo}`;
      // }
      // Linking.canOpenURL(phoneNumber)
      //   .then(supported => {
      //     if (!supported) {
      //       // Alert.alert("Number is not available");
      //       ToastAndroid.show("Number is not available", ToastAndroid.SHORT);
      //     } else {
      //       navigation.navigate('RecordFeedback', { data: value })
      //       return Linking.openURL(phoneNumber);
      //     }
      //   })
      //   .catch(err => console.log(err));
    }
    else if (key == '2') {
      let mobileNo = value.phone2;

      try{
        request(PERMISSIONS.ANDROID.CALL_PHONE).then((result) => {
          if(result=='granted'){
            RNImmediatePhoneCall.immediatePhoneCall(mobileNo);
            let data = {
              uid: UserData.data.uid,
              org_uid: UserData.data.org_uid,
              profile_id: UserData.data.cProfile.toString(),
              lead_id: value.id,
              call_status: 'called',
              lead_status: value.lead_status,
              message: value.description,
              }
            dispatch(leadAction.Editlead(data, UserData.data.token));
            navigation.navigate('RecordFeedback', { data: value,callType:'lead'})
          }
          else{
           alert('Please grant phone call permission')
          }
        });
      }
      catch(error){
        alert('error')
      }
      // if (Platform.OS !== "android") {
      //   phoneNumber = `telprompt:${mobileNo}`;
      // } else {
      //   phoneNumber = `tel:${mobileNo}`;
      // }
      // Linking.canOpenURL(phoneNumber)
      //   .then(supported => {
      //     if (!supported) {
      //       // Alert.alert("Number is not available");
      //       ToastAndroid.show("Number is not available", ToastAndroid.SHORT);
      //     } else {
      //       navigation.navigate('RecordFeedback', { data: value })
      //       return Linking.openURL(phoneNumber);
      //     }
      //   })
      //   .catch(err => console.log(err));
    }
  };
  const rediractwhatsapp = (value,type=null,cdata=null) => {
    let phoneNumber = value.phone;
  
    
    console.log("whatsapp",phoneNumber)
    const isSupported =  Linking.canOpenURL(`whatsapp://send?phone=${phoneNumber}`);
    if (isSupported) {
           Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
          } else {
            Alert.alert('WhatsApp not installed');
          }
  }
  return (
    <View style={styles.container}>
      <Header style={{ height: height * 14 / 100 }}
        title='Lead Detail'
        renderLeft={() => {
          return (<Image source={require('../../images/back.png')} style={{ width: 28, height: 28 }} />);
        }}
        onPressLeft={() => { navigation.goBack() }}
        renderRight={() => {
          return (<Image source={require('../../images/Notifications.png')} style={{ width: 28, height: 28 }} />);
        }}
        onPressRight={() => { navigation.navigate('Notifications') }}
      />
      {IsLodding == true ?
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
        :
        <View style={{ flex: 1, marginHorizontal: '2%', marginBottom: '2%' }}>
          <Card style={{ marginTop: '-12%' }}>
            <View style={{ padding: '2%', flexDirection: 'row' }}>
              <Avatar.Image
                size={60}
                style={{ backgroundColor: '#C6CCD1' }}
                source={require('../../images/profileCall.png')} />
              <View style={{ flex: 1, marginHorizontal: '2%' }}>
                <Text style={{ fontSize: 18, color: '#000000', fontFamily: 'Roboto', fontWeight: 'bold', }}>{leadDetail.first_name} {leadDetail.last_name}</Text>
                <Text style={{ fontSize: 15, color: '#000000', fontFamily: 'Roboto', fontWeight: 'bold', }}>{leadDetail.company ? leadDetail.company.charAt(0).toUpperCase() + leadDetail.company.slice(1) : ''}</Text>
                <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Roboto', fontWeight: 'bold', }}>+91 {leadDetail.phone}</Text>
              </View>

              <TouchableOpacity onPress={()=>rediractwhatsapp(item,"lead")}  style={{ justifyContent: 'center' }}>
                <Avatar.Image
                  size={45}
                  style={{ backgroundColor: '#C6CCD1', marginTop: '2%',marginHorizontal:5 }}
                  source={whatsapp} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => call(leadDetail, '1')} style={{ justifyContent: 'center' }}>
                <Avatar.Image
                  size={45}
                  style={{ backgroundColor: '#C6CCD1', marginTop: '2%' }}
                  source={require('../../images/GroupCall.png')} />
              </TouchableOpacity>
            </View>
          </Card>
          <Text style={{ fontSize: 18, color: '#000000', fontFamily: 'Roboto', fontWeight: 'bold', marginVertical: '2%' }}>Personal Information</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('LeadEdit', { item: route.params.item })}
            style={{
              borderColor: '#fff',
              borderWidth: 1,
              paddingHorizontal: 20,
              paddingVertical: 2,
              alignSelf: 'flex-end',
              backgroundColor: '#2B6EF2',
              borderRadius: 15,
              marginTop: '-8%'
            }}>
            <Text style={{ color: "#fff", fontSize: 13 }}>
              Edit
            </Text>
          </TouchableOpacity>
          <ScrollView>
            {leadDetail.email ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
              <Avatar.Image
                size={50}
                style={{ backgroundColor: '#C6CCD1' }}
                source={require('../../images/newEmail.png')} />
              <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                <Text style={styles.infoText}>Email Address</Text>
                <TouchableOpacity onPress={() => Linking.openURL(`mailto:${leadDetail.email}`)}>
                  <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.email}</Text>
                </TouchableOpacity>
              </View>
            </View> : null}
            {leadDetail.email2 ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
              <Avatar.Image
                size={50}
                style={{ backgroundColor: '#C6CCD1' }}
                source={require('../../images/newEmail.png')} />
              <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                <Text style={styles.infoText}>Secondary Email Address</Text>
                <TouchableOpacity onPress={() => Linking.openURL(`mailto:${leadDetail.email2}`)}>
                  <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.email2}</Text>
                </TouchableOpacity>
              </View>
            </View> : null}
            {leadDetail.phone2 ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
              <Avatar.Image
                size={50}
                style={{ backgroundColor: '#C6CCD1' }}
                source={require('../../images/newCall.png')} />
              <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                <Text style={styles.infoText}>secondary Phone</Text>
                <TouchableOpacity onPress={() => call(leadDetail, '2')}>
                  <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.phone2}</Text>
                </TouchableOpacity>
              </View>
            </View> : null}
            {leadDetail.fax ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
              <Avatar.Image
                size={50}
                style={{ backgroundColor: '#C6CCD1' }}
                source={require('../../images/newFax.png')} />
              <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                <Text style={styles.infoText}>Fax</Text>
                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.fax}</Text>
              </View>
            </View> : null}
            {leadDetail.website ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
              <Avatar.Image
                size={50}
                style={{ backgroundColor: '#C6CCD1' }}
                source={require('../../images/newGlobe.png')} />
              <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                <Text style={styles.infoText}>Website</Text>
                <TouchableOpacity onPress={() => Linking.openURL(leadDetail.website)}>
                  <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.website}</Text>
                </TouchableOpacity>
              </View>
            </View> : null}
            {leadDetail.gender ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
              <Avatar.Image
                size={50}
                style={{ backgroundColor: '#C6CCD1' }}
                source={require('../../images/newGender.png')} />
              <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                <Text style={styles.infoText}>Gender</Text>
                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.gender}</Text>
              </View>
            </View> : null}
            {leadDetail.dob ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
              <Avatar.Image
                size={50}
                style={{ backgroundColor: '#C6CCD1' }}
                source={require('../../images/newDob.png')} />
              <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                <Text style={styles.infoText}>Date Of Birth</Text>
                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.dob}</Text>
              </View>
            </View> : null}
            {leadDetail.address ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
              <Avatar.Image
                size={50}
                style={{ backgroundColor: '#C6CCD1' }}
                source={require('../../images/newAddress.png')} />
              <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                <Text style={styles.infoText}>Address</Text>
                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.address ? leadDetail.address + ',' : null}{leadDetail.city ? leadDetail.city + ',' : null}{leadDetail.state ? leadDetail.state + ',' : null}{leadDetail.country ? leadDetail.country + ',' : null}{leadDetail.zip}</Text>
              </View>
            </View> : null}
            {leadDetail.lead_source ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
              <Avatar.Image
                size={50}
                style={{ backgroundColor: '#C6CCD1' }}
                source={require('../../images/newLeadsource.png')} />
              <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                <Text style={styles.infoText}>Lead Source</Text>
                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.lead_source}</Text>
              </View>
            </View> : null}
            {leadDetail.leadStatus ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
              <Avatar.Image
                size={50}
                style={{ backgroundColor: '#C6CCD1' }}
                source={require('../../images/newLeadsource.png')} />
              <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                <Text style={styles.infoText}>Lead Status</Text>
                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.leadStatus.name}</Text>
              </View>
            </View> : null}
            {leadDetail.camp ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
              <Avatar.Image
                size={50}
                style={{ backgroundColor: '#C6CCD1' }}
                source={require('../../images/newGlobe.png')} />
              <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                <Text style={styles.infoText}>Campaign</Text>
                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.camp.campaign_name}</Text>
              </View>
            </View> : null}
            {leadDetail.industry ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
              <Avatar.Image
                size={50}
                style={{ backgroundColor: '#C6CCD1' }}
                source={require('../../images/newIndustry.png')} />
              <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                <Text style={styles.infoText}>Industry</Text>
                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.industry}</Text>
              </View>
            </View> : null}
            {leadDetail.number_of_employee ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
              <Avatar.Image
                size={50}
                style={{ backgroundColor: '#C6CCD1' }}
                source={require('../../images/newMember.png')} />
              <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                <Text style={styles.infoText}>Number Of Employee</Text>
                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.number_of_employee}</Text>
              </View>
            </View> : null}
            {leadDetail.annual_revenue ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
              <Avatar.Image
                size={50}
                style={{ backgroundColor: '#C6CCD1' }}
                source={require('../../images/newRevenue.png')} />
              <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                <Text style={styles.infoText}>Annual Revenue</Text>
                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.annual_revenue}</Text>
              </View>
            </View> : null}
            {leadDetail.description ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
              <Avatar.Image
                size={50}
                style={{ backgroundColor: '#C6CCD1' }}
                source={require('../../images/newDescription.png')} />
              <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                <Text style={styles.infoText}>Description</Text>
                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.description}</Text>
              </View>
            </View> : null}
          </ScrollView>
        </View>}
    </View>
  );
}