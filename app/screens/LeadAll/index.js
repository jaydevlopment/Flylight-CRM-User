import React, { useState, useEffect } from 'react';
import {Text, View, Pressable, TouchableOpacity, ActivityIndicator, Platform,FlatList, Linking, Dimensions, ToastAndroid} from 'react-native';
import styles from './styles';
import Header from '../../component/header';
import {  Image } from 'react-native-elements';
import { useDispatch, useSelector, connect } from 'react-redux';
import { leadAction, historyAction } from '../../redux/Actions/index'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {request,check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {responsiveHeight, responsiveWidth,responsiveFontSize} from "react-native-responsive-dimensions";

import whatsapp from '../../images/whatsapp.png'

export default function LeadAll({ navigation, route }) {
  const {value} = route?.params
  const [IsLodding, setIsLodding] = useState({leadLodding: true,statusLodding: true})
  const [leadList, setleadList] = useState([])
  const [isService, setisService] = useState(route.params ? route.params.value : 'All');
  const [statusList, setstatusList] = useState([{ label: 'none', value: 'none' }])
  const [statusId, setstatusId] = useState(null);
  const [status, setstatus] = useState(null);
  const dispatch = useDispatch()
  const UserData = useSelector(state => state.auth.data)
  const Leads = useSelector(state => state.lead.data)
  const LeadData = useSelector(state => state.history.leadData)
  const { width, height } = Dimensions.get('window');
  const [page, setPage] = useState(0);
  const [perPageItems, setperPageItems] = useState(10);
  const [totalItems, settotalItems] = useState('');
  const [startDate, setstartDate] = useState(new Date());
  const [startmode, setstartMode] = useState('date');
  const [startshow, setstartshow] = useState(false);
  const [starttext, setstarttext] = useState(true)
  const [footerLoading,setFooterLoading] = useState(false)
  // const [filterKeys, setfilterKeys] = useState([])

  const [result, setResult] = useState(null);
  useEffect(() => {
    FetchData(page)
  }, [])

  useEffect(()=>{
   if(value) checkValue(value)
  },[value])

  useEffect(() => {
    if (Leads) {
      if (Leads.status == "success") {
        settotalItems(Leads.total_rows)
        if (page == 0 ) {
          setleadList(Leads.data)
          setIsLodding({...IsLodding,leadLodding: false})
        } else if (Leads.data.length != 0) {
          let dataLive = Leads.data;
          let listTemp = [...leadList, ...dataLive];
          setleadList(listTemp)
          setIsLodding({...IsLodding,leadLodding: false})
          setFooterLoading(false)
        }
        dispatch(leadAction.clearResponse())
      }
      else if (Leads.status == "failed") {
        setIsLodding({...IsLodding,leadLodding: false})
        setFooterLoading(false)
        ToastAndroid.show(Leads.message, ToastAndroid.SHORT);
        dispatch(leadAction.clearResponse())
      }
    }
  }, [Leads])
  useEffect(() => {
    if (LeadData) {
      if (LeadData.status == "200") {
        setstatusList(LeadData.data !== undefined && LeadData.data.map((item, index) =>
          item ? { label: item.name, value: item.id } : { label: 'None', value: 'None' }))
        setIsLodding({...IsLodding,statusLodding: false})
        setFooterLoading(false)
      }
      else if (LeadData.status == "fail") {
        setIsLodding({...IsLodding,statusLodding: false})
        setFooterLoading(false)
        ToastAndroid.show(LeadData.message, ToastAndroid.SHORT);
      }
    }
  }, [LeadData])
  const FetchData = (p) => {
    let data = {
      uid: UserData.data.uid,
      org_uid: UserData.data.org_uid,
      profile_id: UserData.data.cProfile.toString(),
      pageSize: perPageItems,
      pageNumber: p,
      filters: []
    }
    dispatch(historyAction.LeadStatusList(data, UserData.data.token));
    if (isService == 'Called') {
      data.filters.push({ eq: "called", key: "status" })
      dispatch(leadAction.LeadList(data, UserData.data.token));
    }
    else if (isService == 'Pending') {
      data.filters.push({ eq: "pending", key: "status" })
      dispatch(leadAction.LeadList(data, UserData.data.token));
    }
    else {
      dispatch(leadAction.LeadList(data, UserData.data.token));
    }
  }
  const onChangeFrom = (event, selectedDate) => {
    if (event.type == 'dismissed') {
      setstartshow(!startshow);
    }
    else {
      console.log('date selected ')
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
      setendShow(!endshow);
    }
    else {
      console.log('date selected ')
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

  const Search = () => {
    let StartDate = moment(startDate).format("YYYY-MM-DD")
    let EndDate = moment(enddate).format("YYYY-MM-DD")
    let data =  {
      uid: UserData.data.uid,
      org_uid: UserData.data.org_uid,
      profile_id: UserData.data.cProfile.toString(),
      pageSize: perPageItems,
     pageNumber: '0',
      filters: [] }
    if (starttext == false || endtext == false || statusId !== null) {
      if (StartDate !== EndDate) {
        if (starttext == true) {ToastAndroid.show("Please Select Start Date", ToastAndroid.SHORT);}
        else if (endtext == true) {ToastAndroid.show("Please Select End Date", ToastAndroid.SHORT);}
        else {
          if (StartDate <= EndDate) {
            setIsLodding({ ...IsLodding, leadLodding: true })
            setleadList([])
            setPage(0)
            data.filters.push({ gte: StartDate, key: 'created_at' },
              { lte: EndDate, key: 'created_at' })
            dispatch(leadAction.LeadList(data, UserData.data.token));
          }
          else {  ToastAndroid.show("Wrong Format", ToastAndroid.SHORT); }
        }
      }
      else if (StartDate == EndDate && starttext == false && endtext == false) {
        setIsLodding({ ...IsLodding,leadLodding: true })
        setPage(0)
        setleadList([])
        data.filters.push({ gte: StartDate, key: 'created_at' },
          { lte: EndDate, key: 'created_at' })
        dispatch(leadAction.LeadList(data, UserData.data.token));
      }
      if (statusId !== null) {
        if (statusId == 'none') {ToastAndroid.show("Status Not Available", ToastAndroid.SHORT);}
        else {
          setIsLodding({ ...IsLodding,leadLodding: true })
          setPage(0)
          setleadList([])
          data.filters.push({ eq: statusId, key: 'lead_status' })
          dispatch(leadAction.LeadList(data, UserData.data.token));
        }
      }
      if (isService == 'Called') {
        setIsLodding({ ...IsLodding,leadLodding: true })
        setPage(0)
        setleadList([])
        data.filters.push({ eq: "called", key: "status" })
        dispatch(leadAction.LeadList(data, UserData.data.token));
      }
      else if (isService == 'Pending') {
        setIsLodding({...IsLodding,leadLodding: true })
        setPage(0)
        setleadList([])
        data.filters.push({ eq: "pending", key: "status" })
        dispatch(leadAction.LeadList(data, UserData.data.token));
      }
      console.log(data)
    }
    else {  ToastAndroid.show('Please Select Search Criteria', ToastAndroid.SHORT);}
  }

  const Reset = () => {
    setstarttext(true)
    setendtext(true)
    setstatusId(null)
    setstatus(null)
    setstartDate(new Date())
    setendDate(new Date())
    setIsLodding({statusLodding: true,leadLodding: true })
    setPage(0)
    setleadList([])
    checkValue(isService)
  }

  const checkValue = (value) => {
    setleadList([])
    setisService(value)
    setPage(0)
    settotalItems('')
    let data = {
      uid: UserData.data.uid,
      org_uid: UserData.data.org_uid,
      profile_id: UserData.data.cProfile.toString(),
      pageSize: perPageItems,
      pageNumber: '0',
      filters: []
    }
    if (value == 'Called') {
      setIsLodding({...IsLodding,leadLodding: true})
      data.filters.push({ eq: "called", key: "status" })
      dispatch(leadAction.LeadList(data, UserData.data.token));
    }
    else if (value == 'Pending') {
      setIsLodding({...IsLodding, leadLodding: true})
      data.filters.push({ eq: "pending", key: "status" })
      dispatch(leadAction.LeadList(data, UserData.data.token));
    }
    else {
      setIsLodding({...IsLodding,leadLodding: true})
      dispatch(leadAction.LeadList(data, UserData.data.token));
    }
  }

  const fetchNextItems = () => {
    //console.log('load More Items.........', leadList.length, totalItems,page)
    if (totalItems > leadList.length) {
      setFooterLoading(true)
      let p = page + 1;
      setPage(p);
      FetchData(p)
    }
    else{
      setFooterLoading(false)
    }
  }

  const [refreshing, setrefreshing] = useState(false)
  const handleRefresh = () => {
    console.log(refreshing)
    setIsLodding({statusLodding: true,leadLodding: true})
    // FetchData(0)
    checkValue(isService)
  }

  const call = (value,type,cdata=null) => {
    let phoneNumber = value.phone;

    
   let callingData = cdata && cdata.length ? cdata.filter((item)=> item.id != value.id) : isService == 'Called' ? [] : leadList && leadList.length > 0 ? leadList.filter((item)=> item.id != value.id) : [];

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
          lead_status: value.lead_status,
          message: value.description,
          }
          dispatch(leadAction.Editlead(data, UserData.data.token));
          navigation.navigate('RecordFeedback', { data: value,callType:type,callingData:callingData,redirectionRoute:route.name.toString() })
          FetchData()
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
    //   phoneNumber = `telprompt:${value.phone}`;
    // } else {
    //   phoneNumber = `tel:${value.phone}`;
    // }
    // Linking.canOpenURL(phoneNumber).then(supported => {
    //     if (!supported) {
    //       ToastAndroid.show("Number is not available", ToastAndroid.SHORT);
    //     } else {
    //       let data = {
    //         uid: UserData.data.uid,
    //         org_uid: UserData.data.org_uid,
    //         profile_id: UserData.data.cProfile.toString(),
    //         lead_id: value.id,
    //         call_status: 'called',
    //         lead_status: value.lead_status,
    //         message: value.description,
    //       }
    //       dispatch(leadAction.Editlead(data, UserData.data.token));
    //       navigation.navigate('RecordFeedback', { data: value })
    //       return Linking.openURL(phoneNumber);
    //     }
    //   }).catch(err => console.log(err));
  };

  const statusSelect = (item) => {
    setstatus(item.label)
    setstatusId(item.value);
  }

  const renderItem = ({ item }) => {
    return ( <TouchableOpacity style={styles.listData}
        onPress={() => navigation.navigate('LeadDetail', { item: item })}>
        <View>
          <Image style={{ height: 48, width: 48, }} source={require('../../images/profileCall.png')} />
        </View>
        <View style={{ flex: 1, marginHorizontal: '2%' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.first_name} {item.last_name}</Text>
          <Text style={{ color: 'black', fontSize: 10 }}>{item.phone}</Text>
          {item.description ? <Text style={{ color: 'black', fontSize: 10 }} numberOfLines={1}>{item.description}</Text> : null}
          {item.status == 'pending' ?
            <View style={{ backgroundColor: '#F69708',  width: '32%', borderRadius: 10, marginBottom: '2%', }}>
              <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center', }}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
            </View>
            :
            <View style={{ backgroundColor: '#05B829',  width: '32%', borderRadius: 10, marginBottom: '2%'}}>
              <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center', }}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
            </View>}
        </View>
        <TouchableOpacity style={{ marginHorizontal: '2%', justifyContent: 'center' }}  onPress={()=>rediractwhatsapp(item,"lead")}  >
          <Image style={{ height: 35, width: 35, }} source={whatsapp} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: '2%', justifyContent: 'center' }} onPress={() => call(item,'lead')} >
          <Image style={{ height: 35, width: 35, }} source={require('../../images/GroupCall.png')} />
        </TouchableOpacity>
      </TouchableOpacity> );
  }
  
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
  const renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
     if (!footerLoading) return null;
     return (
      <ActivityIndicator style={{paddingTop:20}} size={'small'} color="#0000ff" />
     );
   };

  return (
    <View style={styles.container}>
      <Header 
        renderLeft={() => { return (<Image source={require('../../images/home.png')} style={{ width: 28, height: 28 }} />);}}
        onPressLeft={() => { navigation.toggleDrawer() }}
        title='Leads'
        renderRight={() => { return (<Image source={require('../../images/Notifications.png')} style={{ width: 28, height: 28 }} />);}}
        onPressRight={() => { navigation.navigate('Notifications') }}
      />
      <View style={styles.tabStyle}>
        {isService == 'All' ?
          <Pressable style={[styles.tabButton, { backgroundColor: '#4F46BA' }]} onPress={() => checkValue("All")}>
            <Text style={[styles.tabButtonText, { color: '#fff' }]}>All</Text>
          </Pressable>
          :
          <Pressable style={styles.tabButton} onPress={() => checkValue("All")}>
            <Text style={[styles.tabButtonText, { color: '#141516' }]}>All</Text>
          </Pressable>
        }
        {isService == 'Called' ?
          <Pressable style={[styles.tabButton, { backgroundColor: '#4F46BA' }]} onPress={() => checkValue("Called")}>
            <Text style={[styles.tabButtonText, { color: '#fff' }]}>Called</Text>
          </Pressable>
          :
          <Pressable style={styles.tabButton} onPress={() => checkValue("Called")}>
            <Text style={[styles.tabButtonText, { color: '#141516' }]}>Called</Text>
          </Pressable>
        }
        {isService == 'Pending' ?
          <Pressable style={[styles.tabButton, { backgroundColor: '#4F46BA' }]} onPress={() => checkValue("Pending")}>
            <Text style={[styles.tabButtonText, { color: '#fff' }]}>Pending</Text>
          </Pressable>
          :
          <Pressable style={styles.tabButton} onPress={() => checkValue("Pending")}>
            <Text style={[styles.tabButtonText, { color: '#141516' }]}>Pending</Text>
          </Pressable>
        }
      </View>
      {IsLodding.leadLodding == true && IsLodding.statusLodding == true ?
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '30%' }} />
        : <View style={{ flex: 1 }} >
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: '2%' }}>
            <Pressable style={styles.pickerStyle} onPress={showDatepicker} >
              <View style={{ flexDirection: 'row' }}>
                <Image style={Platform.OS == 'ios' ? [styles.icon] : [styles.icon, { marginTop: responsiveHeight(0.20),width:responsiveWidth(5.85),height:responsiveHeight(3.20) }]}
                  source={require('../../images/DOB.png')} />
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
                    <Text style={{ marginTop: responsiveHeight(0.80), fontSize: 12, color: '#000000' }}>From Date</Text> : null }
                </View>
                  :
                  <View>
                    {starttext == true ?
                      <Text style={{ marginTop: responsiveHeight(0.70), fontSize: 13, color: '#000000', marginLeft: '10%' }}>From Date</Text>
                      :
                      <Text style={{ marginTop: responsiveHeight(0.70), fontSize: 13, color: '#000000', marginLeft: '10%' }}>{moment(startDate).format('DD/MM/YYYY')}</Text>
                    }
                  </View>
                }
              </View>
            </Pressable>
            <Pressable style={styles.pickerStyle} onPress={showEDatepicker} >
              <View style={{ flexDirection: 'row' }}>
                <Image style={Platform.OS == 'ios' ? [styles.icon] : [styles.icon, { marginTop: responsiveHeight(0.20),width:responsiveWidth(5.85),height:responsiveHeight(3.20) }]}
                  source={require('../../images/DOB.png')} />
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
                  {endtext == true ?<Text style={{ marginTop: '10%', fontSize: 13, color: '#000000' }}>To Date</Text>: null}
                </View>
                  :
                  <View>
                    {endtext == true ?
                      <Text style={{marginTop: responsiveHeight(0.70), fontSize: 13, color: '#000000', marginLeft: responsiveWidth(2.50) }}>To Date</Text>
                      :
                      <Text style={{ marginTop: responsiveHeight(0.70), fontSize: 13, color: '#000000',marginLeft: responsiveWidth(2.50) }}>{moment(enddate).format('DD/MM/YYYY')}</Text>
                    }
                  </View>
                }
              </View>
            </Pressable>
          </View>
          <View style={{ marginVertical: '1%', marginHorizontal: '3%' }}>
            {IsLodding.statusLodding == true ?
              <ActivityIndicator size="small" color="#0000ff" />
              :
              <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={statusList}
                search={true}
                searchPlaceholder='Search'
                maxHeight={160}
                labelField="label"
                valueField="value"
                placeholder='Select Status'
                value={statusId}
                onChange={item => {
                  statusSelect(item)
                }}
                renderLeftIcon={() => (
                  <View><Image source={require('../../images/list.png')}
                    style={{ height: 24, width: 17, marginRight: '5%',marginLeft:responsiveWidth(1.50) }} />
                  </View>
                )}
              />
            }
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity style={[styles.button, { width: '60%' }]} onPress={() => Search()}>
              <Text style={styles.btnText}>SEARCH</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: '2%' }} onPress={() => Reset()}>
              <Image source={require('../../images/refreshButton.png')} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
          </View>
          {IsLodding.leadLodding == true ?
            <ActivityIndicator size="small" color="#0000ff"  style={{ marginTop: '30%' }} />
            :
            <View style={{ flex: 1, margin: '2%' }}>
              <FlatList
              contentContainerStyle={{
                flexGrow:1,
                paddingBottom:60
               }}
                data={leadList}
                renderItem={renderItem}
                initialNumToRender={10}
                ListEmptyComponent={() => (!leadList.length ?
                  <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No Records Found</Text>
                  : null)}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                ListFooterComponent={renderFooter}
                onEndReachedThreshold={0.4}
                onEndReached={() => fetchNextItems()}
               // keyExtractor={item => item.id} 
               keyExtractor={(item, index) => String(index)}
                />
            </View>
          }
        </View>}
    </View>
  );
}