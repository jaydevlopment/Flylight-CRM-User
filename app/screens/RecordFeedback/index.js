import React, { useState, useEffect } from 'react';
import {
  Text, View, TouchableOpacity, ActivityIndicator, ScrollView, TextInput, ToastAndroid, Alert,
  PermissionsAndroid, Platform, FlatList, Pressable, Dimensions,Linking,
} from 'react-native';
import styles from './styles';
import Header from '../../component/header';
import {  Image } from 'react-native-elements';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BottomSheet, Button, ListItem } from 'react-native-elements';
import { useDispatch, useSelector, connect } from 'react-redux';
import { callAction,dashboardAction, leadAction } from '../../redux/Actions/index'
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {responsiveHeight, responsiveWidth,responsiveFontSize} from "react-native-responsive-dimensions";

export default function RecordFeedback({ navigation, route }) {

  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const { width, height } = Dimensions.get('window');
  const [fname, setfname] = useState(route.params ? route.params.data.first_name : "")
  const [lname, setlname] = useState(route.params ? route.params.data.last_name : "")
  const [phone, setphone] = useState(route.params ? route.params.data.phone : "")
  const [IsLodding, setIsLodding] = useState(false)
  const [isVisible, setIsVisible] = useState(false);
  const [actiontype, setActiontype] = useState('Select Call Action')
  const [agentStatus, setAgentStatus] = useState('Agent Status')
  const [statustype, setStatustype] = useState('Select Status')
  const [tasktype, settasktype] = useState('Select Task')
  const [description, setdescription] = useState('')
  const [audioAvailable, setaudioAvailable] = useState(false)
  const [actionId, setactionId] = useState('')
  const [agentStatusId, setAgentStatusId] = useState('')
  const [statusId, setstatusId] = useState('')
  const [taskId, settaskId] = useState('')
  const [msgtype, setmsgtype] = useState('')
  const [actionList, setactionList] = useState([])
  const [agentStatusList, setAgentStatusList] = useState([])
  const [StatusList, setStatusList] = useState([])
  const [TaskList, setTaskList] = useState([])
  const [isVisible1, setIsVisible1] = useState(false);
  const [agentBottomSheetVisible, setAgentStatusVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const [isVisible4, setIsVisible4] = useState(false);

  const dispatch = useDispatch()
  const UserData = useSelector(state => state.auth.data)
  const ActionData = useSelector(state => state.call.actions)
  const AgentStatusData = useSelector(state => state.call.agentStatus)
  const StatusData = useSelector(state => state.call.status)
  const TaskData = useSelector(state => state.call.tasks)
  const feedbackData = useSelector(state => state.call.addFeedback)

  const [enddate, setendDate] = useState(new Date());
  const [endmode, setendMode] = useState('date');
  const [endshow, setendShow] = useState(false);
  const [endtext, setendtext] = useState(true)

  const [callType, setCallType] = useState(route.params && route.params.callType ? route.params.callType : null)
  const [callingData, setCallingData] = useState(route.params && route.params.callingData && route.params.callingData.length > 0 ? route.params.callingData : null)
  const [parentRoute, setParentRoute] = useState(route.params && route.params.redirectionRoute ? route.params.redirectionRoute : null)
  
  const FetchData = () => {
    let data = {
      uid: UserData.data.uid,
      org_uid: UserData.data.org_uid,
      profile_id: UserData.data.cProfile.toString(),
    }
    dispatch(dashboardAction.dashboard(data, UserData.data.token));
  }

  const onChangeendDate = (event, selectedDate) => {
    console.log(event)
    if (event.type == 'dismissed') {
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
    setEMode('date');
  };

  const [endtime, setendtime] = useState(new Date());
  const [endtimemode, setendtimeMode] = useState('date');
  const [endtimeshow, setendtimeShow] = useState(false);
  const [endtimetext, setendtimetext] = useState(true)
  
  const endtimeonChange = (event, selectedEndTime) => {
    console.log(event)
    if (event.type == 'dismissed') {
      setendtimeShow(!endtimeshow);
    }
    else {
      const currentETime = selectedEndTime || endtime;
      setendtimeShow(Platform.OS === 'ios' ? true : false);
      setendtime(currentETime);
      setendtimetext(false)
    }
  };
  const EndshowMode = (currentMode) => {
    setendtimeShow(!endtimeshow);
    setendtimeMode(currentMode);
  };
  const showEndTimepicker = () => {
    EndshowMode('time');
  };

  const OpenListValue = (value) => {
    setIsLodding(true)
    let data = {
      uid: UserData.data.uid,
      org_uid: UserData.data.org_uid,
      profile_id: UserData.data.cProfile.toString(),
    }
    if (value == 'actionList') {
      setIsVisible(true)
      dispatch(callAction.ActionList(data, UserData.data.token));
    }
    else if (value == 'agentstatusList') {
      setAgentStatusVisible(true)
      dispatch(callAction.AgentStatusList(data, UserData.data.token));
    }
    else if (value == 'statusList') {
      setIsVisible2(true)
      dispatch(callAction.StatusList(data, UserData.data.token));
    }
    else if (value == 'taskList') {
      setIsVisible4(true)
      dispatch(callAction.TaskList(data, UserData.data.token));
    }
    else { }
  }

  useEffect(() => {
    if (ActionData) {
      if (ActionData.status == "200") {
        setactionList(ActionData.data)
        dispatch(callAction.clearResponse())
        setIsLodding(false)
      }
      else if (ActionData.status == "fail") {
        // Alert.alert(ActionData.message)
        ToastAndroid.show(ActionData.message, ToastAndroid.SHORT);
        dispatch(callAction.clearResponse())
        setIsLodding(false)
      }
    }
  }, [ActionData])

  useEffect(() => {
    if (AgentStatusData) {
      if (AgentStatusData.status == "200") {
         setAgentStatusList(AgentStatusData.data)
         dispatch(callAction.clearResponse())
      }
      else if (AgentStatusData.status == "fail") {
         ToastAndroid.show(AgentStatusData.message, ToastAndroid.SHORT);
         dispatch(callAction.clearResponse())
      }
    }
    setIsLodding(false)
  }, [AgentStatusData])

  useEffect(() => {
    if (StatusData) {
      if (StatusData.status == "200") {
        setStatusList(StatusData.data)
        dispatch(callAction.clearResponse())
        setIsLodding(false)
      }
      else if (StatusData.status == "fail") {
        // Alert.alert(StatusData.message)
        ToastAndroid.show(StatusData.message, ToastAndroid.SHORT);
        dispatch(callAction.clearResponse())
        setIsLodding(false)
      }
    }
  }, [StatusData])

  useEffect(() => {
    if (TaskData) {
      if (TaskData.status == "200") {
        setTaskList(TaskData.data)
        dispatch(callAction.clearResponse())
        setIsLodding(false)
      }
      else if (TaskData.status == "fail") {
        // Alert.alert(TaskData.message)
        ToastAndroid.show(TaskData.message, ToastAndroid.SHORT);
        dispatch(callAction.clearResponse())
        setIsLodding(false)
      }
    }
  }, [TaskData])


  useEffect(() => {
    if (feedbackData) {
      // console.log("calling_number",feedbackData.data.phone)
      
      if (feedbackData.status == "success") {
        // setTaskList(feedbackData.data)
        ToastAndroid.show(feedbackData.message, ToastAndroid.SHORT);
        dispatch(callAction.clearResponse())
        setIsLodding(false)
        if(callType && callingData && callingData.length > 0)
        {
          // console.log("Calling_Data",feedbackData.data.phone)
          // call(callingData[6],callType,callingData,parentRoute,feedbackData.data.phone)
          navigation.navigate('DashBoard')
        }
         else{
        //   // navigation.navigate('DashBoard1')
          navigation.navigate('DashBoard')
         }
        // navigation.navigate('DashBoard1')
      }
      else if (feedbackData.status == "fail") {
        // Alert.alert(feedbackData.message)
        ToastAndroid.show(feedbackData.message, ToastAndroid.SHORT);
        dispatch(callAction.clearResponse())
        setIsLodding(false)
      }
      else if (feedbackData.status == "failed") {
        // Alert.alert(feedbackData.message)
        ToastAndroid.show(feedbackData.message, ToastAndroid.SHORT);
        dispatch(callAction.clearResponse())
        setIsLodding(false)
      }
    }
  }, [feedbackData])

  const setOneValue = (value, item) => {
    if (value == 'action') {
      setActiontype(item.action)
      setactionId(item.id)
      setIsVisible(false)
    }
    if (value == 'agentstatus') {
      setAgentStatus(item.status)
      setAgentStatusId(item.id)
      setAgentStatusVisible(false)
    }
    else if (value == 'status') {
      setStatustype(item.status)
      setstatusId(item.id)
      setIsVisible2(false);
    }
    else {
      settasktype(item.title)
      settaskId(item.id)
      setIsVisible4(false);
    }
  }

  const AddFeedback = () => {
    if (fname == '') {
      ToastAndroid.show("Please Enter First name", ToastAndroid.SHORT);
      // Alert.alert('Please Enter First name')
    }
    else if (lname == '') {
      ToastAndroid.show("Please Enter last name", ToastAndroid.SHORT);
      // Alert.alert('Please Enter last name')
    }
    else if (phone == '') {
      ToastAndroid.show("Please Enter Phone Number", ToastAndroid.SHORT);
      // Alert.alert('Please Enter Phone Number')
    }

    else if (actionId == '') {
      ToastAndroid.show("select call action", ToastAndroid.SHORT);
      // Alert.alert('select call action')
    }
    else if (agentStatusId == '') {
      ToastAndroid.show("Select agent status", ToastAndroid.SHORT);
      // Alert.alert('select call action')
    }
    else if (statusId == '') {
      ToastAndroid.show("select status", ToastAndroid.SHORT);
      // Alert.alert('select call status')
    }

    else {
      setIsLodding(true)
      let audio = {
        name: 'sound.mp3',
        type: 'audio/mp3',
        uri: 'file:///sdcard/sound.mp3'
      };
      let formateDate = moment(enddate).format("YYYY-MM-DD")
      let formateTime = moment(endtime).format("HH:mm")
      var data = new FormData();
      data.append('uid', UserData.data.uid)
      data.append('org_uid', UserData.data.org_uid,)
      data.append('profile_id', UserData.data.cProfile.toString())
      data.append('created_by', UserData.data.cProfile.toString())
      data.append('modified_by', UserData.data.cProfile.toString())
      data.append('lead_id', route.params.data ? route.params.data.id : '')
      data.append('first_name', fname)
      data.append('last_name', lname)
      data.append('phone', phone)
      data.append('call_action', actionId)
      data.append('agent_status', agentStatusId)
      data.append('feedback_status', statusId)
      data.append('task_id', taskId)
      if (endtext == false) {
        data.append('date', formateDate)
      }
      if (endtimetext == false) {
        data.append('time', formateTime)
      }
      data.append('description', description)
      // if (audioAvailable == true) {
      //   data.append('audio_file', audio)
      // }
      if (msgtype == 'message') {
        data.append('message_type', msgtype)
        data.append('mobile_number', msgcard.mobile)
        data.append('email', msgcard.email)
        data.append('message', msgcard.discription)
      }
      else if (msgtype == 'business_card') {
        data.append('message_type', msgtype)
        data.append('organization_name', businesscard.orgName)
        data.append('contact_person', businesscard.Uname)
        data.append('mobile_number', businesscard.Umobile)
        data.append('company_address', businesscard.Ucompanyaddress)
        data.append('company_url', businesscard.Ucompanylink)
      }
      else {
        data.append('message_type', msgtype)
      }
      console.log(data)
      dispatch(callAction.RecordFeedback(data, UserData.data.token));
    }
  }

  const [msgcard, setmsgcard] = useState({
    email: '',
    mobile: '',
    discription: ''
  })
  const [businesscard, setbusinesscard] = useState({
    orgName: '',
    Uname: '',
    Umobile: '',
    Ucompanyaddress: '',
    Ucompanylink: '',
  })

  const SaveFunction = () => {
    setIsVisible3(false)
  }

  const SkipFunction = () => {
    setIsVisible3(false)
    setmsgtype('')
  }


  const [start, setstaet] = useState(false)

  const onStartRecord = React.useCallback(async () => {
    setIsStopwatchStart(true);
    setstaet(true)
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
        ) {
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
    // const path = 'hello.m4a';
    const path = Platform.select({
      ios: 'sound.m4a',
      android: 'sdcard/sound.mp3', // should give extra dir name in android. Won't grant permission to the first level of dir.
    });
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    console.log('audioSet', audioSet);
    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
    audioRecorderPlayer.addRecordBackListener((e) => {
      // setrecordSecs(e.currentPosition),
      // setrecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))
      console.log('Time.........................', audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))
    });
    console.log(`uri: ${uri}`);

  }, []);

  const onStopRecord = React.useCallback(async () => {
    console.log('.........', isStopwatchStart)
    setIsStopwatchStart(false);
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    // setrecordSecs(0);
    setaudioAvailable(true)
    console.log(result);
  }, []);

  const CloseRecordModal = () => {
    setstaet(false)
    setIsVisible1(false)
  }


  const [counter, setcounter] = useState(0)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log('This will run every second!',);
  //     let count = 1;
  //     count = count ++ ;
  //     setcounter(count)
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  // console.log('value of counter............', counter)

  const options = {
    container: {
      // backgroundColor: '#FF0000',
      padding: 5,
      borderRadius: 5,
      width: 200,
      alignItems: 'center',
    },
    text: {
      fontSize: 25,
      // color: '#FFF',
      marginLeft: 7,
    },
  };


  const [refreshing, setrefreshing] = useState(false)
  const handleRefresh = () => {
    console.log(refreshing)
    // OpenListValue()
  }

  const ActionLisView = ({ item }) => {

    return (
      <View>
        <TouchableOpacity
          onPress={() => setOneValue('action', item)}
        //  setActiontype(item.action)}
        >
          {actiontype == item.action ?
            <View style={[styles.actionSheet, { backgroundColor: '#24BCFF' }]}>
              <Text style={{ fontSize: 13, padding: '3.5%', color: '#FFFFFF' }}>{item.action}</Text>
              <Image
                source={require('../../images/white_check.png')}
                style={{ height: 13, width: 18, marginTop: '4%', marginRight: '5%' }}
              />
            </View>
            :
            <View style={[styles.actionSheet]}>
              <Text style={{ fontSize: 13, padding: '3.5%', }}>{item.action}</Text>
              <Image
                source={require('../../images/white_check.png')}
                style={{ height: 13, width: 18, marginTop: '4%', marginRight: '5%' }}
              />
            </View>}
        </TouchableOpacity>
      </View>
    )
  }

  const AgentStatsLisView = ({ item }) => {

    return (
      <View>
      <TouchableOpacity
        // onPress={() => setStatustype(item.status)}
        onPress={() => setOneValue('agentstatus', item)}
      >
        {agentStatus == item.status ?
          <View style={[styles.actionSheet, { backgroundColor: '#24BCFF' }]}>
            <Text style={{ fontSize: 13, padding: '3.5%', color: '#FFFFFF' }}>{item.status}</Text>
            <Image
              source={require('../../images/white_check.png')}
              style={{ height: 13, width: 18, marginTop: '4%', marginRight: '5%' }}
            />
          </View>
          :
          <View style={[styles.actionSheet]}>
            <Text style={{ fontSize: 13, padding: '3.5%', }}>{item.status}</Text>
            <Image
              source={require('../../images/white_check.png')}
              style={{ height: 13, width: 18, marginTop: '4%', marginRight: '5%' }}
            />
          </View>}
      </TouchableOpacity>
    </View>
    )
  }

  const StatusLisView = ({ item }) => {

    return (
      <View>
        <TouchableOpacity
          // onPress={() => setStatustype(item.status)}
          onPress={() => setOneValue('status', item)}
        >
          {statustype == item.status ?
            <View style={[styles.actionSheet, { backgroundColor: '#24BCFF' }]}>
              <Text style={{ fontSize: 13, padding: '3.5%', color: '#FFFFFF' }}>{item.status}</Text>
              <Image
                source={require('../../images/white_check.png')}
                style={{ height: 13, width: 18, marginTop: '4%', marginRight: '5%' }}
              />
            </View>
            :
            <View style={[styles.actionSheet]}>
              <Text style={{ fontSize: 13, padding: '3.5%', }}>{item.status}</Text>
              <Image
                source={require('../../images/white_check.png')}
                style={{ height: 13, width: 18, marginTop: '4%', marginRight: '5%' }}
              />
            </View>}
        </TouchableOpacity>
      </View>
    )
  }

  const TaskLisView = ({ item }) => {

    return (
      <View>
        <TouchableOpacity
          // onPress={() => settasktype(item.title)}
          onPress={() => setOneValue('task', item)}
        >
          {tasktype == item.title ?
            <View style={[styles.actionSheet, { backgroundColor: '#24BCFF' }]}>
              <Text style={{ fontSize: 13, padding: '3.5%', color: '#FFFFFF' }}>{item.title}</Text>
              <Image
                source={require('../../images/white_check.png')}
                style={{ height: 13, width: 18, marginTop: '4%', marginRight: '5%' }}
              />
            </View>
            :
            <View style={[styles.actionSheet]}>
              <Text style={{ fontSize: 13, padding: '3.5%', }}>{item.title}</Text>
              <Image
                source={require('../../images/white_check.png')}
                style={{ height: 13, width: 18, marginTop: '4%', marginRight: '5%' }}
              />
            </View>
          }
        </TouchableOpacity>
      </View>
    )
  }


  const call = (value,type=null,cdata=null,parentRoute=null,callPhone) => {
  //  let phoneNumber = value.phone;
    
    let callingData=null;
    if(type){
      callingData = cdata && cdata.length ? cdata.filter((item)=> item.id != callPhone) : [];
    }
// console.log('calling v',phoneNumber)
// console.log('calling dta',callingData)
// console.log('calling ty',type)
// console.log('calling phone data',callPhone)
    try{
      RNImmediatePhoneCall.immediatePhoneCall(callPhone);
      let data = {
          uid: UserData.data.uid,
          org_uid: UserData.data.org_uid,
          profile_id: UserData.data.cProfile.toString(),
          lead_id: value.id,
          call_status: 'called',
          lead_status: value.lead_status ? value.lead_status : value.lead.lead_status,
          message: value.description,
      }
      setCallType(null)
      setCallingData(null)
      dispatch(leadAction.Editlead(data, UserData.data.token));
      navigation.push('RecordFeedback', { data: value,callType:type,callingData:callingData,redirectionRoute:parentRoute })
      setParentRoute(null)
      //FetchData()
    }
    catch(error){
      alert('error')
    }
  };



  return (
    <View style={{ flex: 1 }}>
      <Header
        title='Record Feedback'
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
          // Alert.alert('left')
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
      <ScrollView style={{ marginHorizontal: '3%' }}>

        <View style={styles.inputFields}>
          <Image
            style={styles.icon}
            source={require('../../images/user.png')}
          />
          <TextInput
            style={{ flex: 1 }}
            value={fname}
            // clearButtonMode="always"
            onChangeText={e2 => setfname(e2)}
            placeholder="First Name" />
          {!fname.length ?
            <Text style={{ fontSize: 15, marginRight: '2%', color: 'red' }}>*</Text>
            : null}
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
          {!lname.length ?
            <Text style={{ fontSize: 15, marginRight: '2%', color: 'red' }}>*</Text>
            : null}
        </View>

        <View style={styles.inputFields}>
          <Image
            style={[styles.icon, {
              height: responsiveHeight(3.50), width: responsiveWidth(4.50),marginTop:responsiveHeight(1.50),marginLeft:responsiveWidth(3),marginHorizontal:responsiveWidth(0.40), }]}
            source={require('../../images/mobile.png')}
          />
          <TextInput
            style={{ flex: 1,marginLeft:responsiveWidth(1.50) }}
            value={phone}
            onChangeText={e5 => setphone(e5)}
            placeholder="Enter Mobile Number" />
          {!phone.length ?
            <Text style={{ fontSize: 15, marginRight: '2%', color: 'red' }}>*</Text>
            : null}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={styles.pickerStyle} onPress={showEDatepicker} >
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={Platform.OS == 'ios' ?
                  [styles.icon] :
                  [styles.icon, {height:responsiveHeight(2.90),width:responsiveWidth(5.20), marginTop: responsiveHeight(0.60),marginLeft:responsiveWidth(3), }]}
                source={require('../../images/DOB.png')}
              />
              {endshow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  style={{ paddingVertical: '5%', width: '50%' }}
                  // is24Hour={true}
                  value={enddate}
                  mode={endmode}
                  minimumDate={new Date()}
                  display="default"
                  onChange={onChangeendDate}
                />
              )}
              {endtext == true ?
                <Text style={{marginTop: responsiveHeight(0.80), fontSize: 12, color: '#000000',marginLeft: responsiveWidth(0.95) }}>Follow Up Date</Text>
                :
                <Text style={{ marginTop: responsiveHeight(0.80), fontSize: 12, color: '#000000', marginLeft: responsiveWidth(0.90) }}>{moment(enddate).format('MM/DD/YYYY')}</Text>
              }
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.pickerStyle} onPress={showEndTimepicker} >
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={Platform.OS == 'ios' ?
                  [styles.icon] :
                  [styles.icon, {height:responsiveHeight(2.85),width:responsiveWidth(5.60), marginTop: responsiveHeight(0.70),marginLeft:responsiveWidth(3)}]}
                source={require('../../images/clockIcon.png')}
              />
              {endtimeshow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={endtime}
                  mode={endtimemode}
                  minimumDate={new Date()}
                  is24Hour={true}
                  display="default"
                  onChange={endtimeonChange}
                />
              )}
              {endtimetext == true ?
                <Text style={{ marginTop: responsiveHeight(0.82), fontSize: 12, color: '#000000',  marginLeft: responsiveWidth(0.90) }}>Follow Up Time</Text>
                :
                <Text style={{marginTop: responsiveHeight(0.82), fontSize: 12, color: '#000000', marginLeft: responsiveWidth(0.90) }}>{moment(endtime).format('HH : mm')}</Text>
              }
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={{ paddingVertical: '2%' }}
            // onPress={() => OpenActionsList()}
            onPress={() => OpenListValue('actionList')} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={[styles.icon, { height: responsiveHeight(3.50), width: responsiveWidth(4.50),marginTop:responsiveHeight(0.30),marginLeft:responsiveWidth(3),marginHorizontal:responsiveWidth(0.40) }]}
                  source={require('../../images/mobile.png')}
                />
                <Text style={{ fontSize: 13, marginTop: responsiveHeight(0.75), marginLeft: '6%' }}>{actiontype}</Text>
              </View>
              {actiontype == 'Select Call Action' ?
                <View>
                  <Text style={{ fontSize: 15, textAlign: 'right', marginRight: '8%', marginTop: '-20%', color: 'red' }}>*</Text>
                  <Image
                    style={{ height: responsiveHeight(1.20), width: responsiveWidth(4), }}
                    source={require('../../images/arrow_down.png')}
                  />
                </View>
                :
                <View style={{ marginTop: '4%', }}>
                  <Image
                    style={{  height: responsiveHeight(1.20), width: responsiveWidth(4), }}
                    source={require('../../images/arrow_down.png')}
                  />
                </View>
              }
            </View>
          </TouchableOpacity>
        </View>

         {/* ....Agent status.... */}
        <View style={styles.card}>
          <TouchableOpacity style={{ paddingVertical: '2%' }}
            // onPress={() => OpenActionsList()}
            onPress={() => OpenListValue('agentstatusList')} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={[styles.icon, { height: responsiveHeight(3.50), width: responsiveWidth(4.50),marginTop:responsiveHeight(0.30),marginLeft:responsiveWidth(3),marginHorizontal:responsiveWidth(0.40)  }]}
                  source={require('../../images/mobile.png')}
                />
                <Text style={{ fontSize: 13, marginTop: responsiveHeight(0.75), marginLeft: '7%' }}>{agentStatus}</Text>
              </View>
              {agentStatus == 'Agent Status' ?
                <View>
                  <Text style={{ fontSize: 15, textAlign: 'right', marginRight: '8%', marginTop: '-20%', color: 'red' }}>*</Text>
                  <Image
                    style={{  height: responsiveHeight(1.20), width: responsiveWidth(4), }}
                    source={require('../../images/arrow_down.png')}
                  />
                </View>
                :
                <View style={{ marginTop: '4%', }}>
                  <Image
                    style={{  height: responsiveHeight(1.20), width: responsiveWidth(4), marginRight: '6%' }}
                    source={require('../../images/arrow_down.png')}
                  />
                </View>
              }
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <TouchableOpacity
            style={{ paddingTop: '2%', paddingBottom: '2%' }}
            // onPress={() => OpenStatusList()}
            onPress={() => OpenListValue('statusList')}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={[styles.icon, {  height: responsiveHeight(3.50), width: responsiveWidth(4.50),marginTop:responsiveHeight(0.20),marginLeft:responsiveWidth(3),marginHorizontal:responsiveWidth(0.40)}]}
                  source={require('../../images/state.png')}
                />
                <Text style={{ marginTop: responsiveHeight(0.75), fontSize: 13, marginLeft: '5%' }}> {statustype} </Text>
              </View>

              {statustype == 'Select Status' ?
                <View>
                  <Text style={{ fontSize: 15, textAlign: 'right', marginRight: '8%', marginTop: '-20%', color: 'red' }}>*</Text>
                  <Image
                    style={{height: responsiveHeight(1.20), width: responsiveWidth(4), }}
                    source={require('../../images/arrow_down.png')}
                  />
                </View>
                :
                <View style={{ marginTop: '4%', }}>
                  <Image
                    style={{ height: responsiveHeight(1.20), width: responsiveWidth(4), marginRight: '6%' }}
                    source={require('../../images/arrow_down.png')}
                  />
                </View>
              }
            </View>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.card}>
          <TouchableOpacity
            style={{ paddingTop: '2%', paddingBottom: '2%' }}
            onPress={() => setIsVisible1(true)}
          // onPress={() => onStartRecord()}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={require('../../images/list.png')}
                  style={{ height: 21.20, width: 16, marginRight: '2%', marginLeft: '3%' }}
                />
                <Text style={{ marginTop: '5%', fontSize: 13, marginLeft: '10%' }}> Note </Text>
              </View>

              <View style={{ marginTop: '4%', }}>
                <Image
                  style={{ height: 7.6, width: 12.35, marginRight: '6%' }}
                  source={require('../../images/arrow_down.png')}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View> */}

        <View style={styles.inputFields}>
          <Image
            source={require('../../images/list.png')}
            style={{  height: responsiveHeight(3.30), width: responsiveWidth(5),marginTop:responsiveHeight(1.50),marginLeft:responsiveWidth(3.50),marginHorizontal:responsiveWidth(1.50) }}
          />
          <TextInput
            style={{ flex: 1,marginLeft:responsiveWidth(0.65),marginTop:responsiveHeight(0.50) }}
            value={description}
            onChangeText={dis => setdescription(dis)}
            placeholder="Note" />
        </View>
        {/* <View style={[styles.card, { marginBottom: '1%' }]}>
          <TouchableOpacity
            style={{ paddingTop: '2%', paddingBottom: '2%' }}
            onPress={() => { setIsVisible3(true), setmsgtype('message') }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={[styles.icon, { height: 15, width: 19, marginTop: '4%' }]}
                  source={require('../../images/mail.png')}
                />
                <Text style={{ marginTop: '4%', fontSize: 13, marginLeft: '9.5%' }}>Message</Text>
              </View>

              <View style={{ marginTop: '3%', }}>
                <Image
                  style={{ height: 7.6, width: 12.35, marginRight: '6%' }}
                  source={require('../../images/arrow_down.png')}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View> */}
        {IsLodding == true ?
          <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: '1%' }} />
          : <View style={{ marginTop: '3%' }} />}
        <TouchableOpacity style={[styles.button, { marginHorizontal: responsiveWidth(0) }]}
          // onPress={() => navigation.navigate('Test')}
          onPress={() => AddFeedback()}
        >
          <Text style={[styles.textButton, { fontWeight: 'bold' }]}>SUBMIT</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          // onPress={() => navigation.navigate('Test')}
          onPress={() => {
            if(callType && callingData && callingData.length > 0)
            {
              call(callingData[0],callType,callingData,parentRoute)
            }
            else{
                if(parentRoute){
                  navigation.navigate(parentRoute.toString())
                }
                else{
                  navigation.goBack()
                }
            }
          }}
        >
          <Text style={[styles.textButton, { fontWeight: 'bold', color: '#171211' }]}>CANCEL</Text>
        </TouchableOpacity> */}
      </ScrollView>
      <BottomSheet
        modalProps={{
          animationType: 'fade',
          hardwareAccelerated: true,
          onRequestClose: () => {
            setIsVisible(false);
          },
        }} isVisible={isVisible}>
        <View style={styles.cardBack}>
          <Text style={{ textAlign: 'center', color: '#000000', fontSize: 16, fontWeight: '500', marginBottom: '3%' }}>Select your call action</Text>
          {IsLodding == true ?
            <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: '20%' }} />
            :
            <FlatList
              // style={{ marginVertical: '3%' }}
              data={actionList}
              renderItem={ActionLisView}
              ListEmptyComponent={() => (!actionList.length ?
                <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No Records Found</Text>
                : null)}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              keyExtractor={item => item.id}
            />
          }
        </View>
      </BottomSheet >

     {/* .... SET AGENT BOTTOM SHEET VISIBLE .... */}
      <BottomSheet
        modalProps={{
          animationType: 'fade',
          hardwareAccelerated: true,
          onRequestClose: () => {
            setAgentStatusVisible(false);
          },
        }} isVisible={agentBottomSheetVisible}>
        <View style={styles.cardBack}>
          <Text style={{ textAlign: 'center', color: '#000000', fontSize: 16, fontWeight: '500', marginBottom: '3%' }}>Select agent status</Text>
          {IsLodding == true ?
            <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: '20%' }} />
            :
            <FlatList
              // style={{ marginVertical: '3%' }}
              data={agentStatusList}
              renderItem={AgentStatsLisView}
              ListEmptyComponent={() => (!agentStatusList.length ?
                <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No Records Found</Text>
                : null)}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              keyExtractor={item => item.id}
            />
          }
        </View>
      </BottomSheet >
     {/* .... SET AGENT BOTTOM SHEET VISIBLE .... */}

      <BottomSheet
        modalProps={{
          animationType: 'fade',
          hardwareAccelerated: true,
          onRequestClose: () => {
            setIsVisible2(false);
          },
        }} isVisible={isVisible2}>
        <View style={styles.cardBack}>
          <Text style={{ textAlign: 'center', fontSize: 16, color: '#000000', fontWeight: '500', marginBottom: '3%' }}>Select Status</Text>
          {IsLodding == true ?
            <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: '20%' }} />
            :
            <FlatList
              // style={{ marginVertical: '3%' }}
              data={StatusList}
              renderItem={StatusLisView}
              ListEmptyComponent={() => (!StatusList.length ?
                <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No Records Found</Text>
                : null)}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              keyExtractor={item => item.id}
            />
          }
        </View>
      </BottomSheet >
      <BottomSheet
        modalProps={{
          animationType: 'fade',
          hardwareAccelerated: true,
          onRequestClose: () => {
            setIsVisible4(false);
          },
        }} isVisible={isVisible4}>
        <View style={styles.cardBack}>
          <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginBottom: '3%' }}>Select Task</Text>
          {IsLodding == true ?
            <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: '20%' }} />
            :
            <FlatList
              data={TaskList}
              renderItem={TaskLisView}
              ListEmptyComponent={() => (!TaskList.length ?
                <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No Records Found</Text>
                : null)}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              keyExtractor={item => item.id}
            />
          }
        </View>
      </BottomSheet >

      <BottomSheet
        modalProps={{
          animationType: 'fade',
          hardwareAccelerated: true,
          onRequestClose: () => {
            CloseRecordModal()
          },
        }} isVisible={isVisible1}>
        <View style={styles.cardBack}>
          <TouchableOpacity style={{ margin: '3%', width: '20%', alignSelf: 'flex-end' }}
            onPress={() => CloseRecordModal()}
          >
            <Image
              style={{ alignSelf: 'flex-end', marginRight: '5%', height: 18, width: 18 }}
              source={require('../../images/crossImgR.png')} />
          </TouchableOpacity>
          <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginBottom: '3%' }}>Note Your Record</Text>
          {start == true ?
            <Image
              source={require('../../images/GIF.gif')}
              style={{ alignSelf: 'center', width: 50, height: 50 }}
            /> :
            <Image
              source={require('../../images/mic.png')}
              style={{ alignSelf: 'center', width: 50, height: 50 }}
            />}
          {start == true ?
            // <Text style={{ textAlign: 'center' }}>Voice Recording</Text>
            <View style={{ marginHorizontal: '20%' }}>
              <Stopwatch
                laps
                msecs
                start={isStopwatchStart}
                //To start
                reset={resetStopwatch}
                //To reset
                options={options}
                //options for the styling
                getTime={(time) => {
                  // console.log('Stopwatch..............', time);
                }}
              />
            </View>
            :
            <Text style={{ textAlign: 'center' }}>Voice Recording</Text>
          }
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Pressable
              onPress={() => onStartRecord()}
              style={{ backgroundColor: '#7AFB49', marginTop: '3%', borderRadius: 10 }}>
              <Text style={{ fontSize: 13, color: '#fff', padding: 10, paddingLeft: 20, paddingRight: 20, textAlign: 'center' }}>Start</Text>
            </Pressable>
          </View>
          <Pressable
            onPress={() => onStopRecord()}
            style={{ backgroundColor: '#2FC204', marginHorizontal: '3%', marginTop: '3%', borderRadius: 10 }}>
            <Text style={{ fontSize: 13, color: '#fff', padding: 10, paddingLeft: 20, paddingRight: 20, textAlign: 'center' }}>Save</Text>
          </Pressable>
        </View>
      </BottomSheet >

      <BottomSheet
        modalProps={{
          animationType: 'fade',
          hardwareAccelerated: true,
          onRequestClose: () => {
            setIsVisible3(false);
          },
        }} isVisible={isVisible3}>
        <View style={styles.cardBack}>
          <Text style={{ textAlign: 'center', color: '#000000', fontSize: 16, fontWeight: '500', marginBottom: '3%' }}>
            Add Message or Business Card</Text>
          <View
            style={{
              marginHorizontal: '10%',
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}>
            {msgtype == 'message' ?
              <TouchableOpacity style={{
                backgroundColor: '#4F46BA',
                borderRadius: 10, paddingLeft: 32, paddingRight: 32, padding: 5
              }}
                onPress={() => setmsgtype("message")}
              >
                <Text style={{ color: '#fff', fontSize: 13 }}>Message</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
                style={{
                  backgroundColor: '#B4B4B4',
                  borderRadius: 10, paddingLeft: 32, paddingRight: 32, padding: 5, opacity: 80
                }}
                onPress={() => setmsgtype("message")}
              >
                <Text style={{ fontSize: 13, color: '#FFFFFF' }}>Message</Text>
              </TouchableOpacity>
            }

            {msgtype == 'business_card' ?
              <TouchableOpacity style={{
                backgroundColor: '#4F46BA',
                borderRadius: 10, paddingLeft: 20, paddingRight: 20, padding: 5
              }}
                onPress={() => setmsgtype("business_card")}
              >
                <Text style={{ color: '#fff', fontSize: 13 }}>Business Card</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity style={{
                backgroundColor: '#B4B4B4',
                borderRadius: 10, paddingLeft: 20, paddingRight: 20, padding: 5, opacity: 80
              }}
                onPress={() => setmsgtype("business_card")}
              >
                <Text style={{ fontSize: 13, color: '#FFFFFF' }}>Business Card</Text>
              </TouchableOpacity>
            }
          </View>
          {
            msgtype == "message" ?
              <View style={{ height: 200 }}>
                <View style={styles.inputFields}>
                  <Image
                    style={[styles.icon, { height: 24, width: 15 }]}
                    source={require('../../images/mobile.png')}
                  />
                  <TextInput
                    style={{ flex: 1 }}
                    placeholder="Enter mobile number"
                    value={msgcard.mobile}
                    keyboardType='numeric'
                    // clearButtonMode="always"
                    onChangeText={mob => setmsgcard({
                      ...msgcard,
                      mobile: mob
                    })}
                  />
                </View>
                <View style={styles.inputFields}>
                  <Image
                    style={[styles.icon, { height: 16, width: 20, marginTop: '5%' }]}
                    source={require('../../images/mail.png')}
                  />
                  <TextInput
                    style={{ flex: 1 }}
                    placeholder="Email"
                    value={msgcard.email}
                    // clearButtonMode="always"
                    onChangeText={em => setmsgcard({
                      ...msgcard,
                      email: em
                    })}
                  />
                </View>
                <View style={[styles.inputFields]}>
                  <Image
                    style={[styles.icon, { height: 16, width: 20, marginTop: '3.5%' }]}
                    source={require('../../images/mail.png')}
                  />
                  <TextInput
                    multiline={true}
                    style={{ flex: 1 }}
                    placeholder="Message"
                    value={msgcard.discription}
                    // clearButtonMode="always"
                    onChangeText={mm => setmsgcard({
                      ...msgcard,
                      discription: mm
                    })}
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <TouchableOpacity
                    onPress={() => SaveFunction()}
                    style={{ backgroundColor: '#2FC204', marginLeft: '35%', marginRight: '35%', marginTop: '3%', borderRadius: 10 }}>
                    <Text style={{ fontSize: 13, color: '#fff', padding: 10, paddingLeft: 20, paddingRight: 20, textAlign: 'center' }}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => SkipFunction()}
                    style={{ backgroundColor: '#2FC204', marginLeft: '35%', marginRight: '35%', marginTop: '3%', borderRadius: 10 }}>
                    <Text style={{ fontSize: 13, color: '#fff', padding: 10, paddingLeft: 20, paddingRight: 20, textAlign: 'center' }}>Skip</Text>
                  </TouchableOpacity>
                </View>
              </View>
              :
              <View />
          }
          {
            msgtype == "business_card" ?
              <View>
                <View style={styles.inputFields}>
                  <Image
                    style={[styles.icon, { height: 15.41, width: 22.44, marginTop: '4%' }]}
                    source={require('../../images/leadDetail.png')}
                  />
                  <TextInput
                    style={{ flex: 1 }}
                    placeholder="Your Organization Name"
                    value={businesscard.orgName}
                    // clearButtonMode="always"
                    onChangeText={org => setbusinesscard({
                      ...businesscard,
                      orgName: org
                    })}
                  />
                </View>
                <View style={styles.inputFields}>
                  <Image
                    style={[styles.icon, { height: 18, width: 17, marginTop: '4%' }]}
                    source={require('../../images/user.png')}
                  />
                  <TextInput
                    style={{ flex: 1 }}
                    placeholder="Your Name"
                    value={businesscard.Uname}
                    // clearButtonMode="always"
                    onChangeText={uname => setbusinesscard({
                      ...businesscard,
                      Uname: uname
                    })}
                  />
                </View>
                <View style={styles.inputFields}>
                  <Image
                    style={[styles.icon, { height: 24, width: 15 }]}
                    source={require('../../images/mobile.png')}
                  />
                  <TextInput
                    style={{ flex: 1 }}
                    placeholder="Mobile Number"
                    value={businesscard.Umobile}
                    keyboardType='numeric'
                    // clearButtonMode="always"
                    onChangeText={umob => setbusinesscard({
                      ...businesscard,
                      Umobile: umob
                    })}
                  />
                </View>
                <View style={styles.inputFields}>
                  <Image
                    style={[styles.icon, { height: 18, width: 14, marginTop: '4%' }]}
                    source={require('../../images/address.png')}
                  />
                  <TextInput
                    style={{ flex: 1 }}
                    placeholder="Company Address"
                    value={businesscard.Ucompanyaddress}
                    // clearButtonMode="always"
                    onChangeText={ucom => setbusinesscard({
                      ...businesscard,
                      Ucompanyaddress: ucom
                    })}
                  />
                </View>
                <View style={styles.inputFields}>
                  <Image
                    style={[styles.icon, { height: 17.60, width: 17.60, marginTop: '4%' }]}
                    source={require('../../images/globe.png')}
                  />
                  <TextInput
                    style={{ flex: 1 }}
                    placeholder="Company URL"
                    value={businesscard.Ucompanylink}
                    // clearButtonMode="always"
                    onChangeText={link => setbusinesscard({
                      ...businesscard,
                      Ucompanylink: link
                    })}
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <TouchableOpacity
                    onPress={() => SaveFunction()}
                    style={{ backgroundColor: '#2FC204', marginLeft: '35%', marginRight: '35%', marginTop: '3%', borderRadius: 10 }}>
                    <Text style={{ fontSize: 13, color: '#fff', padding: 10, paddingLeft: 20, paddingRight: 20, textAlign: 'center' }}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => SkipFunction()}
                    style={{ backgroundColor: '#2FC204', marginLeft: '35%', marginRight: '35%', marginTop: '3%', borderRadius: 10 }}>
                    <Text style={{ fontSize: 13, color: '#fff', padding: 10, paddingLeft: 20, paddingRight: 20, textAlign: 'center' }}>Skip</Text>
                  </TouchableOpacity>
                </View>
              </View>
              :
              <View />
          }
        </View>
      </BottomSheet >
    </View>
  );
}
