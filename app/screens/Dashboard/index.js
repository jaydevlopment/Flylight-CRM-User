
import React, { useState, useEffect } from 'react';
import {
  Text, View, Pressable, Dimensions, ActivityIndicator, ToastAndroid,
  Platform, FlatList, Linking, TouchableOpacity,ScrollView, Alert, LogBox 
} from 'react-native';
import styles from './styles';
import Header from '../../component/header';
import { useDispatch, useSelector, connect } from 'react-redux';
import { dashboardAction, leadAction } from '../../redux/Actions/index'
import { Card } from 'react-native-paper';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {request,check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import { BottomSheet, Image } from 'react-native-elements';
import { Avatar, Title, Paragraph } from 'react-native-paper';
import { string } from 'i/lib/util';
import whatsapp from '../../images/whatsapp.png'
export default function DashBoard({ navigation,route }) {

  const [total, settotal] = useState({
    assign: 0,
    pending: 0,
    taskList: [],
    feedbacklist: [],
    leadlist: [],
    IsLodding: true
  })
  const [isService, setisService] = useState('Leads')
  const { width, height } = Dimensions.get('window');
  const dispatch = useDispatch()
  const isFocused = useIsFocused();
  const UserData = useSelector(state => state.auth.data)
  const TotalCount = useSelector(state => state.dashboard.data)
  

  const [result, setResult] = useState(null);

  const [showtaskDetail, setShowTaskDetail] = useState(false)
  const [taskDetail, setTaskDetail] = useState({
        name: '',
        mobile: '',
        email: '',
        title: '',
        taskFor: '',
        reletedTo: '',
        status: '',
        priority: '',
        DueData: '',
        description: ''
    })

  useEffect(() => {
    if (UserData ||isFocused  ) {
      if (UserData.status == "success") {
        isFocused ? FetchData():null
      }
    }
  }, [UserData ,isFocused])


  const FetchData = () => {
    let data = {
       uid: UserData.data.uid,
       org_uid: UserData.data.org_uid,
       profile_id: UserData.data.cProfile.toString(),
    }
   
  //  if( data != null && data.message === "sucesss" ){
    dispatch(dashboardAction.dashboard(data, UserData.data.token));
  //    console.log('sdsddsss',data)
  //  } else {
  //    Alert.alert('aaaaaa')
  //  }
  }



  useEffect(() => {
    if (TotalCount) {
      if (TotalCount.status == "success") {
        settotal({
          pending: TotalCount.data.pendingLeads,
          assign: TotalCount.data.calledLeads,
          taskList: TotalCount.data.tasks.rows,
          feedbacklist: TotalCount.data.feedbacks.rows,
          leadlist: TotalCount.data.leads.rows,
          IsLodding: false
        })
        dispatch(dashboardAction.clearResponse())
      }
      else if (TotalCount.status == "failed") {
        ToastAndroid.show(TotalCount.message, ToastAndroid.SHORT);
        settotal({
          ...total,
          IsLodding: false
        })
      }
    }
  }, [TotalCount])
  const call = (value,type=null,cdata=null) => {
    let phoneNumber = value.phone;
    
    let callingData=null;
    if(type){
      if(type=='lead') callingData = cdata && cdata.length ? cdata.filter((item)=> item.id != value.id) : total && total.leadlist.length > 0 ? total.leadlist.filter((item)=> item.id != value.id) : [];
      if(type=='feedback') callingData = cdata && cdata.length ? cdata.filter((item)=> item.id != value.id) : total && total.feedbacklist.length > 0 ? total.feedbacklist.filter((item)=> item.id != value.id) : [];
      if(type=='task') callingData = cdata && cdata.length ? cdata.filter((item)=> item.id != value.id) : total && total.taskList.length > 0 ? total.taskList.filter((item)=> item.id != value.id) : [];
    }

    try{
      request(PERMISSIONS.ANDROID.CALL_PHONE).then((result) => {
        if(result=='granted'){
            RNImmediatePhoneCall.immediatePhoneCall(phoneNumber);
            let data = {
            uid: UserData.data.uid,
            org_uid: UserData.data.org_uid,
            profile_id: UserData.data.cProfile.toString(),
            lead_id: value.id,
            call_status: 'called',
            lead_status: value.lead_status ? value.lead_status : value.lead.lead_status,
            message: value.description,
            }
            dispatch(leadAction.Editlead(data, UserData.data.token));
            navigation.navigate('RecordFeedback', { data: value,callType:type,callingData:callingData,redirectionRoute:route.name.toString() })
            FetchData()
        }
        else{
          alert('Please grant phone call permission')
        }
       // alert(JSON.stringify(result))
      });

    //   RNImmediatePhoneCall.immediatePhoneCall(phoneNumber);
    //   let data = {
    //   uid: UserData.data.uid,
    //   org_uid: UserData.data.org_uid,
    //   profile_id: UserData.data.cProfile.toString(),
    //   lead_id: value.id,
    //   call_status: 'called',
    //   lead_status: value.lead_status ? value.lead_status : value.lead.lead_status,
    //   message: value.description,
    //   }
    //   dispatch(leadAction.Editlead(data, UserData.data.token));
    //   navigation.navigate('RecordFeedback', { data: value,callType:type,callingData:callingData,redirectionRoute:route.name.toString() })
    //   FetchData()
     }
    catch(error){
      alert('error')
    }
    
    // if (Platform.OS !== "android") {
    //   phoneNumber = `telprompt:${value.phone}`;
    // } else {
    //   phoneNumber = `tel:${value.phone}`;
    // }
    // Linking.canOpenURL(phoneNumber)
    //   .then(supported => {
    //     if (!supported) {
    //       // Alert.alert("Number is not available");
    //       ToastAndroid.show('Number is not available', ToastAndroid.SHORT);

    //     } else {
    //       let data = {
    //         uid: UserData.data.uid,
    //         org_uid: UserData.data.org_uid,
    //         profile_id: UserData.data.cProfile.toString(),
    //         lead_id: value.id,
    //         call_status: 'called',
    //         lead_status: value.lead_status ? value.lead_status : value.lead.lead_status,
    //         message: value.description,
    //       }
    //       dispatch(leadAction.Editlead(data, UserData.data.token));
    //       navigation.navigate('RecordFeedback', { data: value })
    //       FetchData()
    //       return Linking.openURL(phoneNumber);
    //     }
    //   })
    //   .catch(err => console.log(err));
  };
  const [refreshing, setrefreshing] = useState(false)
  const handleRefresh = () => {
    console.log(refreshing)
    settotal({
      ...total,
      IsLodding: true
    })
    FetchData()
  }
  const CheckisService = (value) => {
    setisService(value)
    FetchData()
  }

  const ShowTaskDetail = (item) => {
    setShowTaskDetail(true)
    setTaskDetail({
        name: item.profile.user.name,
        mobile: item.profile.user.phone,
        email: item.profile.user.email,
        title: item.title,
        taskFor: item.task_for,
        reletedTo: item.related_to,
        status: item?.taskstatus?.status??'Progress',
        priority: item?.taskpriority?.priority??'Low',
        DueData: item.due_date,
        description: item.description
    })
}
const HideTaskDetail = (item) => {
    setShowTaskDetail(false)
    setTaskDetail({
        name: '',
        title: '',
        mobile: '',
        email: '',
        taskFor: '',
        reletedTo: '',
        status: '',
        priority: '',
        DueData: '',
        description: ''
    })
}


  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('HistoryDetail', { id: item.lead_id })}>
       <Card style={{ marginTop: '1%', paddingVertical: '1%' }}>
          <View style={{ flexDirection: 'row', padding: 3 }}>
            <View style={{ justifyContent: 'center' }}>
              <Image
                style={styles.notifyImage}
                source={require('../../images/call.png')}
              />
            </View>
            <View style={{ marginHorizontal: '2%', flex: 1, justifyContent: 'center' }}>
              <Text style={{ fontSize: 14, fontFamily: 'ROboto', fontWeight: 'bold', color: '#0F0F0F' }}>{item ? item.first_name : ''} {item ? item.last_name : ''}</Text>
              <Text style={{ fontSize: 11, fontFamily: 'ROboto', color: '#0F0F0F' }}>
                {moment(item.scheduled_time).format('lll')}
                </Text>
            </View>
            <TouchableOpacity
              onPress={() => call(item,'feedback')} style={{ justifyContent: 'center' }}>
              <Image style={styles.notifyImage}
                source={require('../../images/GroupCall.png')} />
            </TouchableOpacity>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
  const renderItemTask = ({ item }) => {
    return (
      // <TouchableOpacity onPress={() => navigation.navigate('Task_Manager')}>
      <TouchableOpacity >
         <Card style={{ marginTop: '1%', paddingVertical: '1%' }}>
          <View style={{ flexDirection: 'row', padding: 3 }}>
            <View style={{ justifyContent: 'center' }}>
              <Image
                style={styles.notifyImage}
                source={require('../../images/newDescription.png')}
              />
            </View>
            <View style={{ marginHorizontal: '2%', flex: 1, justifyContent: 'center' }}>
              <Text style={{ fontSize: 14, fontFamily: 'ROboto', fontWeight: 'bold', color: '#0F0F0F' }}>{item.title ? item.title : ''}</Text>
              <Text style={{ fontSize: 11, fontFamily: 'ROboto', color: '#0F0F0F' }}>{moment(item.created_at).format('lll')}</Text>
            </View>
            {/* <TouchableOpacity onPress={() => call(item,'task')} style={{ paddingHorizontal: '2%', justifyContent: 'center' }}> */}
            <TouchableOpacity onPress={() => ShowTaskDetail(item)}  style={{ paddingHorizontal: '2%', justifyContent: 'center' }}>
              <Image style={{ height: height * 4 / 100, width: width * 8 / 100 }}
                source={require('../../images/arrow.png')} />
            </TouchableOpacity>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }

  
  const renderItemLead = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('LeadDetail', { item: item })}>
        <Card style={{ marginTop: '1%', paddingVertical: '1%' }}>
          <View style={{ flexDirection: 'row', padding: 3 }}>
            <View style={{ justifyContent: 'center' }}>
              <Image
                style={styles.notifyImage}
                source={require('../../images/call.png')}
              />
            </View>
            <View style={{ marginHorizontal: '2%', flex: 1, justifyContent: 'center' }}>
              <Text style={{ fontSize: 14, fontFamily: 'ROboto', fontWeight: 'bold', color: '#0F0F0F' }}>{item.first_name} {item.last_name}</Text>
              <Text style={{ fontSize: 11, fontFamily: 'ROboto', color: '#0F0F0F' }}>
                {(moment(item.created_at).utc().format("YYYY-MM-DD HH:mm:ss A"))} 
                </Text>
            </View>
            <TouchableOpacity 
            onPress={()=>rediractwhatsapp(item,"lead")} 
            style={{ justifyContent: 'center',marginRight:7 }}>
              <Image style={styles.notifyImage}
                source={whatsapp} />
                 {result ? <Text>{result}</Text> : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => call(item,'lead')} style={{ justifyContent: 'center' }}>
              <Image style={styles.notifyImage}
                source={require('../../images/GroupCall.png')} />
            </TouchableOpacity>
          </View>
        </Card>
      </TouchableOpacity>
    );
    } 
//  const whatsapp = async (item) => {
//     const isSupported = await Linking.canOpenURL(`whatsapp://send?phone=${number}`);
//     if (isSupported) {
//       await Linking.openURL(`whatsapp://send?phone=${number}`);
   
//     } else {
//       Alert.alert('WhatsApp not installed');
//     }
//   }
const rediractwhatsapp = (value,type=null,cdata=null) => {
  let phoneNumber = value.phone;

  let callingData =null;
  if(type){
    if(type=='lead') callingData = cdata && cdata.length ? cdata.filter((item)=> item.id != value.id) : total && total.leadlist.length > 0 ? total.leadlist.filter((item)=> item.id != value.id) : [];
  }
  console.log("whatsapp",phoneNumber)
  const isSupported =  Linking.canOpenURL(`whatsapp://send?phone=${phoneNumber}`);
  if (isSupported) {
         Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
        } else {
          Alert.alert('WhatsApp not installed');
        }
}

  return (
    <View style={{ flex: 1 }}>
      <Header style={Platform.OS == 'ios' ? { height: height * 12 / 100 } : { height: height * 12 / 100 }}
        renderLeft={() => { return (<Image source={require('../../images/home.png')} style={{ width: 28, height: 28 }} />); }}
        onPressLeft={() => { navigation.toggleDrawer() }}
        title='Home'
        renderRight={() => { return (<Image source={require('../../images/Notifications.png')} style={{ width: 28, height: 28 }} />); }}
        onPressRight={() => { navigation.navigate('Notifications') }}
      />
      {total.IsLodding == true ?
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
        :
        <View style={{ flex: 1 }}>
          <View style={styles.reView}>
            <Pressable style={{ width: '49%' }} onPress={() => navigation.navigate('LeadAll', { value: 'Called' })}>
              <Card
                style={[styles.cardBox, { borderColor: '#FE2EA4', }]} >
                <Text style={styles.cardTitle}>Leads Called</Text>
                <Text style={[styles.counter, { color: '#FE2EA4' }]}>
                  {total.assign}
                </Text>
              </Card>
            </Pressable >
            <Pressable style={{ width: '49%' }} onPress={() => navigation.navigate('LeadAll', { value: 'Pending' })}>
              <Card
                style={[styles.cardBox, { borderColor: '#3373F3' }]}>
                <Text style={styles.cardTitle}>Leads Pending</Text>
                <Text style={[styles.counter, { color: '#3373F3', }]}>
                  {total.pending}
                </Text>
              </Card>
            </Pressable >
          </View>
          <View style={styles.tabHeader}>
            {isService == 'Leads' ?
              <TouchableOpacity style={[styles.tabStyle, { backgroundColor: '#4F46BA' }]}
                onPress={() => CheckisService('Leads')}>
                <Text style={[styles.tabTextStyle, { color: '#fff' }]}>Leads</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity style={styles.tabStyle}
                onPress={() => CheckisService('Leads')}>
                <Text style={styles.tabTextStyle}>Leads</Text>
              </TouchableOpacity>
            }
            {isService == 'Feedback' ?
              <TouchableOpacity style={[styles.tabStyle, { backgroundColor: '#4F46BA' }]}
                onPress={() => CheckisService('Feedback')}>
                <Text style={[styles.tabTextStyle, { color: '#fff' }]}>Upcoming</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity style={styles.tabStyle}
                onPress={() => CheckisService('Feedback')}>
                <Text style={styles.tabTextStyle}>Upcoming</Text>
              </TouchableOpacity>
            }
            {isService == 'Task' ?
              <TouchableOpacity style={[styles.tabStyle, { backgroundColor: '#4F46BA' }]}
                onPress={() => CheckisService('Task')}>
                <Text style={[styles.tabTextStyle, { color: '#fff' }]}>Task</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity style={styles.tabStyle}
                onPress={() => CheckisService('Task')}>
                <Text style={styles.tabTextStyle}>Task</Text>
              </TouchableOpacity>
            }
          </View>
          <View style={{ marginHorizontal: '3%' }}>
            {isService == 'Task' ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '2%' }}>
              <Text style={{ fontSize: 14, textAlignVertical: 'center', color: '#000000', fontWeight: 'bold' }}>Open Task</Text>
              {total.taskList.length ? <TouchableOpacity
                style={{ borderColor: '#3072F2', borderWidth: 1, borderRadius: 20 }}
                onPress={() => navigation.navigate('Task_Manager')}>
                <Text style={styles.moreButton}>More {">"}</Text>
              </TouchableOpacity> : null}
            </View> : null}
            {isService == 'Feedback' ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '2%' }}>
              <Text style={{ fontSize: 14, textAlignVertical: 'center', color: '#000000', fontWeight: 'bold' }}>Upcoming</Text>
              {total.feedbacklist.length ? <TouchableOpacity
                style={{ borderColor: '#3072F2', borderWidth: 1, borderRadius: 20 }}
                onPress={() => navigation.navigate('History')}>
                <Text style={styles.moreButton}>More {">"}</Text>
              </TouchableOpacity> : null}
            </View> : null}
            {isService == 'Leads' ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '2%' }}>
              <Text style={{ fontSize: 14, textAlignVertical: 'center', color: '#000000', fontWeight: 'bold' }}>Leads</Text>
              {total.leadlist.length ? <TouchableOpacity
                style={{ borderColor: '#3072F2', borderWidth: 1, borderRadius: 20 }}
                onPress={() => navigation.navigate('LeadAll')}>
                <Text style={styles.moreButton}>More {">"}</Text>
              </TouchableOpacity> : null}
            </View> : null}
          </View>
          <View style={{ flex: 1, marginBottom: '2%' }}>
            <FlatList contentContainerStyle={{ flexGrow: 1 }}
              data={[{}]}
              keyExtractor={() => 'childrenkeyflatlist'}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              renderItem={() =>
                <View style={{ marginHorizontal: '3%' }}>
                  <View style={{ justifyContent: "center", width: "100%" }}>
                    {isService == 'Task' ?
                      <ScrollView contentContainerStyle={{flex:1,marginBottom:50}} >
                        <FlatList
                          contentContainerStyle={{ flexGrow: 1 }}
                          data={total.taskList}
                          ListEmptyComponent={() => (!total.taskList.length ?
                            <Text style={{ textAlign: 'center', marginTop: '20%', fontSize: 20 }}>No Records Found</Text>
                            : null)}
                          renderItem={renderItemTask}
                          keyExtractor={item => item.id}
                        />
                       <BottomSheet modalProps={{
                          animationType: 'fade', hardwareAccelerated: true,
                          onRequestClose: () => { HideTaskDetail() }
                         }} isVisible={showtaskDetail}>
                          <View style={{ backgroundColor: '#fff', paddingHorizontal: '3%',paddingBottom:20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                              <View style={{ borderBottomWidth: 1, flexDirection: 'row', marginVertical: '2%', justifyContent: 'space-between', }}>
                                  <Text style={styles.modalText}>Task Detail</Text>
                                  <Pressable style={styles.askTitleEdit}
                                      onPress={() => HideTaskDetail()}>
                                      <Image style={{ height: 14, width: 14, }}
                                          source={require('../../images/cross_blackIos.png')}
                                      />
                                  </Pressable>
                              </View>
                              <View style={{ flexDirection: 'row', marginVertical: '2%', flex: 1 }}>
                                  <View style={{ justifyContent: 'center' }}>
                                      <Avatar.Image size={50}
                                          style={{ backgroundColor: '#C6CCD1' }}
                                          source={require('../../images/profileCall.png')} />
                                  </View>
                                  <View style={{ justifyContent: 'center', marginHorizontal: '2%', flex: 1 }}>
                                      <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', fontSize: 15, color: '#000000' }]}>{taskDetail.name}</Text>
                                      {taskDetail.mobile ? <TouchableOpacity >
                                          <Text style={[styles.DetailCampTitle, { color: '#000000' }]}>{taskDetail.mobile}</Text>
                                      </TouchableOpacity> : null}
                                      {taskDetail.email ? <TouchableOpacity onPress={() => Linking.openURL(`mailto:${taskDetail.email}`)}>
                                          <Text style={[styles.DetailCampTitle, { color: '#000000' }]}>{taskDetail.email}</Text>
                                      </TouchableOpacity> : null}
                                  </View>
                                  <View style={{ marginRight: '2%', justifyContent: 'center' }}>
                                      {taskDetail.status === 'Completed' ?
                                          <Text style={{ backgroundColor: 'green', color: '#fff', paddingHorizontal: '3%', borderRadius: 20 }}>
                                              {taskDetail.status.charAt(0).toUpperCase() + taskDetail.status.slice(1)}</Text>
                                          :
                                          <Text style={{ backgroundColor: 'red', color: '#fff', paddingHorizontal: '3%', borderRadius: 20 }}>
                                              {taskDetail.status.charAt(0).toUpperCase() + taskDetail.status.slice(1)}</Text>}
                                  </View>
                              </View>
                              {taskDetail.title ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Title</Text> : null}
                              <Text style={styles.DetailCampTitle}>{taskDetail.title ? taskDetail.title : null}</Text>
                              {taskDetail.taskFor ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Task For</Text> : null}
                              <Text style={styles.DetailCampTitle}>{taskDetail.taskFor ? taskDetail.taskFor : null}</Text>
                              {taskDetail.reletedTo ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Related To</Text> : null}
                              <Text style={styles.DetailCampTitle}>{taskDetail.reletedTo ? taskDetail.reletedTo : null}</Text>
                              {taskDetail.DueData ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Due Data</Text> : null}
                              <Text style={styles.DetailCampTitle}>{taskDetail.reletedTo ? taskDetail.DueData : null}</Text>
                              {taskDetail.status ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Status</Text> : null}
                              <Text style={styles.DetailCampTitle}>{taskDetail.status ? taskDetail.status : null}</Text>
                              {taskDetail.priority ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Priority</Text> : null}
                              <Text style={styles.DetailCampTitle}>{taskDetail.priority ? taskDetail.priority : null}</Text>
                              {taskDetail.description ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Description</Text> : null}
                              <Text style={styles.DetailCampTitle}>{taskDetail.priority ? taskDetail.description : null}</Text>
                          </View>
                      </BottomSheet>
                      </ScrollView>
                      : null}
                    {isService == 'Feedback' ?
                     <ScrollView contentContainerStyle={{flex:1,marginBottom:50}} >
                        <FlatList
                          contentContainerStyle={{ flexGrow: 1 }}
                          data={total.feedbacklist}
                          renderItem={renderItem}
                          ListEmptyComponent={() => (!total.feedbacklist.length ?
                            <Text style={{ textAlign: 'center', marginTop: '20%', fontSize: 20 }}>No Records Found</Text>
                            : null)}
                          keyExtractor={item => item.id}
                        />
                      </ScrollView> : null}
                    {isService == 'Leads' ?
                      <ScrollView contentContainerStyle={{flex:1,marginBottom:50}} >
                        <FlatList
                          contentContainerStyle={{ flexGrow: 1 }}
                          data={total.leadlist}
                          ListEmptyComponent={() => (!total.leadlist.length ?
                            <Text style={{ textAlign: 'center', marginTop: '20%', fontSize: 20 }}>No Records Found</Text>
                            : null)}
                          renderItem={renderItemLead}
                          keyExtractor={item => item.id}
                        />
                      </ScrollView> : null}
                  </View>
                </View>
              }
            />
          </View>
        </View>
      }
    </View>
  );
}