import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, Dimensions, ActivityIndicator,
  TouchableOpacity, ScrollView, ToastAndroid, Alert, StatusBar
} from 'react-native';
import styles from './styles';
import {  Image } from 'react-native-elements';
import Header from '../../component/header/index'
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { historyAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';

export default function AddContact({ navigation, route }) {

  const { width, height } = Dimensions.get('window');
  const [fname, setfname] = useState(route.params ? route.params.Edata.first_name : "")
  const [lname, setlname] = useState(route.params ? route.params.Edata.last_name : "")
  const [phone, setphone] = useState(route.params ? route.params.Edata.phone : "")
  const [City, setCity] = useState(route.params ? route.params.Edata.city : "")
  const [State, setState] = useState(route.params ? route.params.Edata.state : "")
  const [description, setdescription] = useState(route.params ? route.params.Edata.campaign : null);

  const [startDate, setstartDate] = useState(new Date());
  const [startmode, setstartMode] = useState('date');
  const [startshow, setstartshow] = useState(false);
  const [starttext, setstarttext] = useState(true)

  const onChangeFrom = (event, selectedDate) => {
    if (event.type == 'dismissed') {
      setstartshow(!startshow);
    }
    else {
      console.log('date selected ', event)
      const currentDate = selectedDate || startDate;
      setstartshow(Platform.OS === 'ios' ? true : false);
      setstartDate(currentDate)
      setstarttext(false)
    }
  };
  const Mode = (currentMode) => {
    setstartshow(!startshow);
    setstartMode(currentMode);
  };
  const showDatepicker = () => {
    Mode('date');
  };



  const [enddate, setendDate] = useState(new Date());
  const [endmode, setendMode] = useState('date');
  const [endshow, setendShow] = useState(false);
  const [endtext, setendtext] = useState(true)

  const onChangeendDate = (event, selectedDate) => {
    if (event.type == 'dismissed') {
      console.log('date not selected end ')
      setendShow(!endshow);
    }
    else {
      const currentDate = selectedDate || enddate;
      setendShow(Platform.OS === 'ios' ? true : false);
      setendDate(currentDate)
      setendtext(false)
    }
  };
  const setEMode = (currentMode) => {
    setendShow(!endshow);
    setendMode(currentMode);
  };
  const showEDatepicker = () => {
    setEMode('time');
  };

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);


  const data = [
    { label: 'In-Progress', value: 'In-Progress' },
    { label: 'In-Progress1', value: 'In-Progress1' },
    { label: 'In-Progress2', value: 'In-Progress2' },
  ];

  const [value1, setValue1] = useState(null);
  const [isFocus1, setIsFocus1] = useState(false);


  const data1 = [
    { label: 'Task', value: 'Task' },
    { label: 'Task1', value: 'Task1' },
    { label: 'Task2', value: 'Task2' },
  ];

  const [value2, setValue2] = useState(null);
  const [isFocus2, setIsFocus2] = useState(false);


  const data2 = [
    { label: 'Note', value: 'Note' },
    { label: 'Note1', value: 'Note1' },
    { label: 'Note2', value: 'Note2' },
  ];

  const [value3, setValue3] = useState(null);
  const [isFocus3, setIsFocus3] = useState(false);


  const data3 = [
    { label: 'Message1', value: 'Message1' },
    { label: 'Message2', value: 'Message2' },
    { label: 'Message3', value: 'Message3' },
  ];

  const [feedback, setfeedback] = useState()
  const [IsLodding, setIsLodding] = useState(false)
  const dispatch = useDispatch()
  const UserData = useSelector(state => state.auth.data)
  const FeedbackData = useSelector(state => state.history.feedback)

  const AddFunction = () => {
    if (fname == "") {
      // Alert.alert(" Enter First Name ")
      ToastAndroid.show('Enter First Name', ToastAndroid.SHORT);
    }
    else if (lname == "") {
      // Alert.alert("Enter Last Name")
      ToastAndroid.show('Enter Last Name', ToastAndroid.SHORT);
    }
    else if (phone == "") {
      // Alert.alert(" Enter phone Number ")
      ToastAndroid.show('Enter phone Number', ToastAndroid.SHORT);
    }
    else {
      let formateDate = moment(date).format("YYYY-MM-DD")
      let formateTime = moment(time).format("hh:mm")

      if (UserData.status == "success") {
        const data = {
          uid: UserData.data.uid,
          profile_id: UserData.data.cProfile,
          org_uid: UserData.data.org_uid,
          first_name: fname, last_name: lname, date: formateDate,
          // time: formateTime,
          phone: phone, state: State, city: City, description: description,
          // feedback_id: "16"
        }
        dispatch(historyAction.AddEdit_feedback_History(UserData.data.token, data));
        setIsLodding(true)
      }
    }
  }

  useEffect(() => {

    if (FeedbackData) {
      if (FeedbackData.status == 'success') {
        // Alert.alert()
        ToastAndroid.show(FeedbackData.message, ToastAndroid.SHORT);
        setIsLodding(false)
        setfname(''), setlname(''), setphone(''), setCity(''),
          setState(), setdescription(), setDate(new Date()), settime(new Date())
        navigation.navigate('History');
        dispatch(historyAction.clearHistoryFeedbackResponse())
      }
      else if (FeedbackData.status == 'fail') {
        // Alert.alert(FeedbackData.message)
        ToastAndroid.show(FeedbackData.message, ToastAndroid.SHORT);
        setIsLodding(false)
      }
      else {
        setIsLodding(false)
      }

    }
    else {

    }

  }, [FeedbackData])

  return (
    <View style={{ flex: 1 }}>
      <Header
        style={Platform.OS == 'ios' ?
          { height: "20%" } :
          // { height: "16%" }}
          {}}
        title='History Feedback'
        renderLeft={() => {
          return (
            <Image
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
              source={require('../../images/Notifications.png')}
              style={{ width: 28, height: 28 }} />
          );
        }}
        onPressRight={() => {
          navigation.navigate('Notifications')
        }}
      />

      <ScrollView style={{ marginHorizontal: '3%', marginTop: '1%' }}>
        <View style={styles.inputFields}>
          <Image
            style={styles.icon}
            source={require('../../images/user.png')}
          />
          <TextInput
            style={{ flex: 1 }}
            value={fname}
            onChangeText={e2 => setfname(e2)}
            placeholder="First Name" />
        </View>
        <View style={styles.inputFields}>
          <Image
            style={styles.icon}
            source={require('../../images/user.png')}
          />
          <TextInput
            style={{ flex: 1 }}
            value={lname}
            onChangeText={e3 => setlname(e3)}
            placeholder="Last Name" />
        </View>
        <View style={styles.inputFields}>
          <Image
            style={[styles.icon, {
              height: 28, width: '4.8%',
              marginRight: '3.8%'
            }]}
            source={require('../../images/mobile.png')}
          />
          <TextInput
            style={{ flex: 1 }}
            value={phone}
            keyboardType='numeric'
            onChangeText={e5 => setphone(e5)}
            placeholder="Enter Mobile Number" />
        </View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: '#C3C7E5',
            borderRadius: 10,
            // marginHorizontal: '3%',
            paddingVertical: 5,
            marginTop: '2%'
          }}
          onPress={showDatepicker} >
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={styles.icon}
              source={require('../../images/DOB.png')}
            />
            {startshow && (
              <DateTimePicker
                testID="dateTimePicker"
                style={{ paddingVertical: '5%', width: '50%' }}
                // is24Hour={true}
                value={startDate}
                mode={startmode}
                display="default"
                onChange={onChangeFrom}
              />
            )}
            {Platform.OS == 'ios' ? <View>
              {starttext == true ?
                <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC' }}>Date of Birth</Text>
                :
                <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC' }}></Text>
              }
            </View>
              :
              <View>
                {starttext == true ?
                  <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>Date of Birth</Text>
                  :
                  <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>{moment(startDate).format('DD/MM/YYYY')}</Text>
                }
              </View>
            }
          </View>
        </TouchableOpacity>




        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: '#C3C7E5',
            borderRadius: 10,
            // marginHorizontal: '3%',
            paddingVertical: 5,
            marginTop: '2%'
          }}
          onPress={showEDatepicker} >
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={[styles.icon]}
              source={require('../../images/DOB.png')}
            />
            {endshow && (
              <DateTimePicker
                testID="dateTimePicker"
                style={{ paddingVertical: '5%', width: '50%' }}
                // is24Hour={true}
                value={enddate}
                mode={endmode}
                display="default"
                onChange={onChangeendDate}
              />
            )}
            {Platform.OS == 'ios' ? <View>
              {endtext == true ?
                <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC' }}>Set Date</Text>
                :
                <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC' }}></Text>
              }
            </View>
              :
              <View>
                {endtext == true ?
                  <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>Set Time</Text>
                  :
                  <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>{moment(enddate).format("hh:mm")}</Text>
                }
              </View>
            }
          </View>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={[styles.inputFields, { width: '49%' }]}>
            <Image
              style={[styles.icon, {
                height: 26, width: '9%',
                marginHorizontal:'5%',marginVertical:'5%'
              }]}
              source={require('../../images/city.png')}
            />
            <TextInput
              style={{ width: '80%' }}
              value={City}
              onChangeText={e13 => setCity(e13)}
              placeholder="City" />
          </View>
          <View
            style={[styles.inputFields, { marginLeft: '2%', marginRight: '5%', width: '49%' }]}>
            <Image
              style={[styles.icon, {
                height: 22, width: '15%',
                marginVertical:'5%'
              }]}
              source={require('../../images/state.png')}
            />
            <TextInput
              style={{ width: '80%' }}
              value={State}
              onChangeText={e14 => setState(e14)}
              placeholder="State" />
          </View>
        </View>
        <View style={styles.inputFields}>
          <Image
            style={[styles.icon, { height: 24, width: '5%', marginVertical:'3%' }]}
            source={require('../../images/list.png')}
          />
          <TextInput
            style={{ flex: 1 }}
            value={description}
            onChangeText={e19 => setdescription(e19)}
            placeholder="Description" />
        </View>

        <Dropdown
          style={[styles.dropdown3, { marginTop: '2%' }, isFocus && { borderColor: '' }]}
          placeholderStyle={styles.placeholderStyle3}
          selectedTextStyle={styles.selectedTextStyle3}
          // inputSearchStyle={styles.inputSearchStyle3}
          iconStyle={styles.iconStyle3}
          data={data}
          // search
          maxHeight={160}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'In-Progress' : '...'}
          // searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <View>
              <Image
                source={require('../../images/mobile.png')}
                style={{ height: 25, width: 16, marginRight: '5%' }}
              />
            </View>
          )}
        />

        <Dropdown
          style={[styles.dropdown3, { marginTop: '2%' }, isFocus && { borderColor: '' }]}
          placeholderStyle={[styles.placeholderStyle3, { marginLeft: '-2%' }]}
          selectedTextStyle={[styles.selectedTextStyle3, { marginLeft: '-2%' }]}
          // inputSearchStyle={styles.inputSearchStyle3}
          iconStyle={styles.iconStyle3}
          data={data1}
          // search
          maxHeight={160}
          labelField="label"
          valueField="value"
          placeholder={!isFocus1 ? 'Task' : '...'}
          // searchPlaceholder="Search..."
          value={value1}
          onFocus={() => setIsFocus1(true)}
          onBlur={() => setIsFocus1(false)}
          onChange={item => {
            setValue1(item.value);
            setIsFocus1(false);
          }}
          renderLeftIcon={() => (
            <View>
              <Image
                style={[styles.icon, { height: 23, width: 23, marginTop: '5%' }]}
                source={require('../../images/info.png')}
              />
            </View>
          )}
        />
        <Dropdown
          style={[styles.dropdown3, { marginTop: '2%' }, isFocus && { borderColor: '' }]}
          placeholderStyle={styles.placeholderStyle3}
          selectedTextStyle={styles.selectedTextStyle3}
          // inputSearchStyle={styles.inputSearchStyle3}
          iconStyle={styles.iconStyle3}
          data={data2}
          // search
          maxHeight={160}
          labelField="label"
          valueField="value"
          placeholder={!isFocus2 ? 'Note' : '...'}
          // searchPlaceholder="Search..."
          value={value2}
          onFocus={() => setIsFocus2(true)}
          onBlur={() => setIsFocus2(false)}
          onChange={item => {
            setValue2(item.value);
            setIsFocus2(false);
          }}
          renderLeftIcon={() => (
            <View>
              <Image
                source={require('../../images/list.png')}
                style={{ height: 21, width: 16, marginRight: '5%' }}
              />
            </View>
          )}
        />
        <Dropdown
          style={[styles.dropdown3, { marginTop: '2%' }, isFocus && { borderColor: '' }]}
          placeholderStyle={styles.placeholderStyle3}
          selectedTextStyle={styles.selectedTextStyle3}
          // inputSearchStyle={styles.inputSearchStyle3}
          iconStyle={styles.iconStyle3}
          data={data3}
          // search
          maxHeight={160}
          labelField="label"
          valueField="value"
          placeholder={!isFocus3 ? 'Message' : '...'}
          // searchPlaceholder="Search..."
          value={value3}
          onFocus={() => setIsFocus3(true)}
          onBlur={() => setIsFocus3(false)}
          onChange={item => {
            setValue3(item.value);
            setIsFocus3(false);
          }}
          renderLeftIcon={() => (
            <View>
              <Image
                source={require('../../images/list.png')}
                style={{ height: 21, width: 16, marginRight: '5%' }}
              />
            </View>
          )}
        />

        {IsLodding == true ?
          <ActivityIndicator size="small" color="#0000ff" />
          :
          <View />}
        <TouchableOpacity style={[styles.button, {
          marginLeft: '2%', borderRadius: 20,
          marginRight: '2%'
        }]} onPress={() => AddFunction()}>
          <Text style={[styles.textButton, { fontWeight: 'bold' }]}>Call Again</Text>
        </TouchableOpacity>
        <View style={{ marginTop: '10%', height: 20 }} />
      </ScrollView>
    </View>
  );
}