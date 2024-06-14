import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert, Platform, ActivityIndicator, ToastAndroid } from 'react-native';
import styles from './styles';
import Header from '../../component/header';
import {  Image } from 'react-native-elements';
import { useDispatch, useSelector, connect } from 'react-redux';
import { leadAction } from '../../redux/Actions/index'
import { Dropdown } from 'react-native-element-dropdown';


export default function DashBoard({ navigation, route }) {
  const Roles = [
    { label: 'called', value: 'called' },
  ];

  const [description, setdescription] = useState(route.params ? route.params.item.description : '');
  const [role, setrole] = useState(route.params ? route.params.item.status : null);
  const [dropList, setdropList] = useState([{ label: 'none', value: 'none' }])
  const [account, setaccount] = useState(route.params ? route.params.item.lead_status : null);
  const [IsLodding, setIsLodding] = useState(false)
  const dispatch = useDispatch()
  const UserData = useSelector(state => state.auth.data)
  const LeadStatus = useSelector(state => state.lead.status)
  const EditReasponse = useSelector(state => state.lead.edit)


  useEffect(() => {
    if (UserData) {
      Get_Data()
    }
  }, [])

  const Get_Data = () => {
    setIsLodding(true)
    if (UserData.status == "success") {
      let data = {
        uid: UserData.data.uid,
        org_uid: UserData.data.org_uid,
        profile_id: UserData.data.cProfile.toString(),
        lead_id: route.params ? route.params.item.id : ''
      }
      dispatch(leadAction.leadStatus(data, UserData.data.token));
    }
  }
  useEffect(() => {
    if (LeadStatus) {
      if (LeadStatus.status == "200") {
        let userData = LeadStatus.data && LeadStatus.data.map((ld) => {
          let user = { label: ld.name, value: ld.id }
          if (user !== undefined) {
            //  setdropList([user])
            // console.log([user])
          }
          return user;

        })
        setdropList(userData)
        // console.log(user)
        // setIsLodding(false)
        // setdropList(userData)
        dispatch(leadAction.clearResponse())
        setIsLodding(false)
      }
      else if (LeadStatus.status == "failed") {
        setIsLodding(false)
        // Alert.alert(LeadStatus.message)
        ToastAndroid.show(LeadStatus.message, ToastAndroid.SHORT);
      }
      else {
      }
    }
    else {
    }
  }, [LeadStatus])


  const EditLeadFunction = () => {
    if (account == null) {
      // Alert.alert('please select Lead Status')
      ToastAndroid.show('please select Lead Status', ToastAndroid.SHORT);
    }
    else if (role == null || role == 'pending') {
      // Alert.alert('please select Call Status')
      ToastAndroid.show('please select Call Status', ToastAndroid.SHORT);
    }
    else if (description == '') {
      // Alert.alert('please Enter description')
      ToastAndroid.show('please Enter description', ToastAndroid.SHORT);
    }
    else {
      setIsLodding(true)
      let data = {
        uid: UserData.data.uid,
        org_uid: UserData.data.org_uid,
        profile_id: UserData.data.cProfile.toString(),
        lead_id: route.params ? route.params.item.id : '',
        call_status: role,
        lead_status: account,
        message: description,
      }
      dispatch(leadAction.Editlead(data, UserData.data.token));
    }
  }

  useEffect(() => {
    if (EditReasponse) {
      if (EditReasponse.status == "success") {
        dispatch(leadAction.clearResponse())
        // Alert.alert(EditReasponse.message)
        ToastAndroid.show(EditReasponse.message, ToastAndroid.SHORT);
        setIsLodding(false)
        navigation.navigate('LeadAll')
      }
      else if (EditReasponse.status == "failed") {
        // Alert.alert(EditReasponse.message)
        ToastAndroid.show(EditReasponse.message, ToastAndroid.SHORT);
        setIsLodding(false)
      }
      else {
      }
    }
    else {
    }
  }, [EditReasponse])


  return (
    <View style={styles.container}>
      <Header
        style={Platform.OS == 'ios' ?
          { height: "20%" } :
          // { height: "16%" }}
          {}}
        title='Lead Edit'
        renderLeft={() => {
          return (
            <Image
              // style={styles.image2}
              source={require('../../images/back.png')}
              style={{ width: 28, height: 28 }} />
          );
        }}
        onPressLeft={() => {
          // navigation.openDrawer()
          navigation.goBack()
        }}
        renderRight={() => {
          return (
            <Image
              // style={styles.image2}
              source={require('../../images/Notifications.png')}
              style={{ width: 28, height: 28 }} />
          );
        }}
        onPressRight={() => {
          navigation.navigate('Notifications')
          // Alert.alert('right')
        }}
      />

      {IsLodding == true ?
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
        :
        <View style={{ marginHorizontal: '3%', marginVertical: '2%' }}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={dropList}
            search={true}
            searchPlaceholder='search'
            maxHeight={160}
            labelField="label"
            valueField="value"
            placeholder='Select Lead Status'
            value={account}
            onChange={item => {
              setaccount(item.value);
            }}
            renderLeftIcon={() => (
              <View>
                <Image
                  style={[styles.icon, { height: 22, width: 22 }]}
                  source={require('../../images/transgender.png')}
                />
              </View>
            )}
          />

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={Roles}
            maxHeight={50}
            labelField="label"
            valueField="value"
            placeholder='Select Call Status'
            value={role}
            onChange={item => {
              setrole(item.value);
            }}
            renderLeftIcon={() => (
              <View>
                <Image
                  style={[styles.icon, { height: 22, width: 22 }]}
                  source={require('../../images/transgender.png')}
                />
              </View>
            )}
          />

          <View style={styles.inputFields}>
            <Image
              style={{ height: 26, width: '5.5%', marginHorizontal: '2.5%', marginTop: '3%' }}
              source={require('../../images/list.png')}
            />
            <TextInput
              style={{ flex: 1 }}
              value={description}
              onChangeText={e19 => setdescription(e19)}
              placeholder="Description" />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => EditLeadFunction()}
          >
            <Text style={{ textAlign: 'center', color: '#fff' }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>

      }
    </View>
  );
}


