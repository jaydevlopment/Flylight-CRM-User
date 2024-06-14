import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, Alert, Platform, ActivityIndicator, Pressable, Dimensions, ToastAndroid } from 'react-native';
import styles from "./styles";
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../component/header/index'
import { Card } from 'react-native-paper'
import {  Image } from 'react-native-elements';
import { historyAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';

export default function History({ navigation }) {

  const [History, setHistory] = useState([])
  const [IsLodding, setIsLodding] = useState(true)
  const [campIsLodding, setcampIsLodding] = useState(true)
  const [statusIsLodding, setstatusIsLodding] = useState(true)
  const [campList, setcampList] = useState([{ label: 'none', value: 'none' }])
  const [campId, setcampId] = useState(null);
  const [statusList, setstatusList] = useState([{ label: 'none', value: 'none' }])
  const [statusId, setstatusId] = useState(null);
  const [status, setstatus] = useState(null);
  const { width, height } = Dimensions.get('window');
  const [footerLoading,setFooterLoading] = useState(false)
  const dispatch = useDispatch()
  const UserData = useSelector(state => state.auth.data)
  const historyData = useSelector(state => state.history.getHistory)
  const CampData = useSelector(state => state.history.campData)
  const LeadData = useSelector(state => state.history.leadData)

  const [startDate, setstartDate] = useState(new Date());
  const [startmode, setstartMode] = useState('date');
  const [startshow, setstartshow] = useState(false);
  const [starttext, setstarttext] = useState(true)

  const [page, setPage] = useState(0);
  const [perPageItems, setperPageItems] = useState(10);
  const [totalItems, settotalItems] = useState('');

  useEffect(() => {
    let data = {
      uid: UserData.data.uid,
      org_uid: UserData.data.org_uid,
      profile_id: UserData.data.cProfile.toString(),
    }
    GetHistoryList(page)
    dispatch(historyAction.LeadStatusList(data, UserData.data.token));
    dispatch(historyAction.CampaignList(data, UserData.data.token));
  }, [])
  useEffect(() => {
    if (historyData) {
      if (historyData.status == "success") {
        if (page == 0) {
          setHistory(historyData.data);
          setIsLodding(false)
          setFooterLoading(false)
        } else if (historyData.data.length != 0) {
          let dataLive = historyData.data;
          let listTemp = [...History, ...dataLive];
          setHistory(listTemp)
          setIsLodding(false)
          setFooterLoading(false)
        }
        settotalItems(historyData.total_rows)
        dispatch(historyAction.clearResponse())
      }
      else if (historyData.status == "failed") {
        setIsLodding(false)
        setFooterLoading(false)
        ToastAndroid.show(historyData.message, ToastAndroid.SHORT);
        dispatch(historyAction.clearResponse())
      }
    }
  }, [historyData])

  useEffect(() => {
    if (CampData) {
      if (CampData.status == "success") {
        setcampList(CampData.data.rows)
        setcampIsLodding(false)
        setFooterLoading(false)
        dispatch(historyAction.clearResponse())
      }
      else if (CampData.status == "failed") {
        setcampIsLodding(false)
        setFooterLoading(false)
        ToastAndroid.show(CampData.message, ToastAndroid.SHORT);
        dispatch(historyAction.clearResponse())
      }

    }
  }, [CampData])

  useEffect(() => {
    if (LeadData) {
      if (LeadData.status == "200") {
        setstatusList(
          LeadData.data !== undefined && LeadData.data.map((item, index) =>
            item ? { label: item.name, value: item.id } : { label: 'None', value: 'None' })
        )
        setstatusIsLodding(false)
        setFooterLoading(false)
        dispatch(historyAction.clearResponse())
      }
      else if (LeadData.status == "failed") {
        setstatusIsLodding(false)
        setFooterLoading(false)
        ToastAndroid.show(LeadData.message, ToastAndroid.SHORT);
        dispatch(historyAction.clearResponse())
      }
      else if (LeadData.status == "fail") {
        setstatusIsLodding(false)
        setFooterLoading(false)
        ToastAndroid.show(LeadData.message, ToastAndroid.SHORT);
        dispatch(historyAction.clearResponse())
      }
    }
  }, [LeadData])
  const GetHistoryList = (p) => {
    let data = {
      uid: UserData.data.uid,
      org_uid: UserData.data.org_uid,
      profile_id: UserData.data.cProfile.toString(),
      pageSize: perPageItems,
      pageNumber: p,
      filters: []
    }
    dispatch(historyAction.HistoryList(data, UserData.data.token));
  }
  const LoadMore = () => {
    console.log('totalItems',totalItems)
    // console.log('load More Items................', Data.length, totalItems)
    if (totalItems > History.length) {
      setFooterLoading(true)
      let p = page + 1;
      setPage(p);
     GetHistoryList(p)
    }
    else{
      setFooterLoading(false)
    }
  }
  const onChangeFrom = (event, selectedDate) =>{
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
    setEMode('date');
  };

  const Search = () => {

    let StartDate = moment(startDate).format("YYYY-MM-DD")
    let EndDate = moment(enddate).format("YYYY-MM-DD")
    let data = {
      uid: UserData.data.uid,
      org_uid: UserData.data.org_uid,
      profile_id: UserData.data.cProfile.toString(),
      pageSize: perPageItems,
      pageNumber: page,
      filters: []
    }
    if (starttext == false || endtext == false || statusId !== null || campId !== null) {
      if (StartDate !== EndDate) {
        if (starttext == true) {
          ToastAndroid.show('Please Select Start Date', ToastAndroid.SHORT);
        }
        else if (endtext == true) {
          ToastAndroid.show('Please Select end Date', ToastAndroid.SHORT);
        }
        else {
          if (StartDate <= EndDate) {
            setIsLodding(true)
            data.filters.push({ gte: StartDate, key: 'created_at'},
              { lte: EndDate, key: 'created_at' })
              console.log('data',JSON.stringify(data))
            dispatch(historyAction.HistoryList(data, UserData.data.token));
          
          }
          else {
            ToastAndroid.show('wrong format', ToastAndroid.SHORT);
          }
        }
      }
      else if (StartDate == EndDate && starttext == false && endtext == false) {
        setIsLodding(true)
        data.filters.push({ gte: StartDate, key: 'created_at' },
          { lte: EndDate, key: 'created_at' })
        dispatch(historyAction.HistoryList(data, UserData.data.token));
      }
      if (statusId !== null && campId !== null) {
        setIsLodding(true)
        data.filters.push({ eq: campId, key: 'campaign'},
          { eq: statusId, key: 'lead_status' } )
        dispatch(historyAction.HistoryList(data, UserData.data.token));
      }
      else if (statusId !== null) {
        setIsLodding(true)
        data.filters.push({ eq: statusId, key: 'lead_status' })
        dispatch(historyAction.HistoryList(data, UserData.data.token));
        // console.log('sssssssss',data.filters)
        // console.log('dataaaa',data)  
      }
      else if (campId !== null) {
        setIsLodding(true)
        data.filters.push({ eq: campId, key: 'campaign' })
       dispatch(historyAction.HistoryList(data, UserData.data.token));
    
      }
    }
    else {
      ToastAndroid.show('Please Select Search Criteria', ToastAndroid.SHORT);
    }
   // console.log("ghhghghgh",data)
  }

  const Reset = () => {
    //console.log('reser')
    setstarttext(true)
    setendtext(true)
    setcampId(null)
    setstatusId(null)
    setstatus(null)
    setstartDate(new Date())
    setendDate(new Date())
    setIsLodding(true)
    setcampIsLodding(true)
    setstatusIsLodding(true)
    setPage(0)
    let data = {
      uid: UserData.data.uid,
      org_uid: UserData.data.org_uid,
      profile_id: UserData.data.cProfile.toString(),
      pageSize: perPageItems,
      pageNumber: page,
      filters: []
    }
    dispatch(historyAction.HistoryList(data, UserData.data.token))
    dispatch(historyAction.LeadStatusList(data, UserData.data.token))
    dispatch(historyAction.CampaignList(data, UserData.data.token))
  }
  const Detail = (value) => {
    navigation.navigate('HistoryDetail', { id: value })
  }

  const campaignSelect = (value) => {
    setcampId(value);
  
  }

  const statusSelect = (item) => {
    setstatus(item.label)
    setstatusId(item.value);
    // console.log('valueeeee..',item)
  }

  const [refreshing, setrefreshing] = useState(false)
  const handleRefresh = () => {
    Reset()
  }

  const HistoryView = ({ item }) => {
    return (
      <Pressable onPress={() => Detail(item.lead_id)} >
        <Card style={{ marginVertical: '1%', padding: '1%' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ justifyContent: 'center' }}>
              <Image
                style={{ height: 48, width: 48 }}
                source={require('../../images/profileCall.png')}
              />
            </View>
            <View style={{ justifyContent: 'center', flex: 1, marginLeft: '3%' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 14, fontFamily: 'Roboto', color: '#0F0F0F' }}>
                {item.lead.first_name} {item.lead.last_name}</Text>
              <Text style={{ color: '#565656', fontSize: 12, fontFamily: 'Roboto' }}>
                {item.lead ? item.lead.company : ''}</Text>
              <Text style={{ fontWeight: '500', fontSize: 11, color: '#0F0F0F' }}>
                Last Call: {moment(item.created_at).utc().format('lll')}
              </Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'baseline', alignItems: 'flex-end' }}>
              <View >
                {item.feedbackStatus ? item.feedbackStatus.status == 'Success' ?
                  <Text style={[{ backgroundColor: '#32CD32' }, styles.itemStatus]}>
                    {item.feedbackStatus.status.charAt(0).toUpperCase() + item.feedbackStatus.status.slice(1)}</Text>
                  :
                  <Text style={[{ backgroundColor: '#F69708' }, styles.itemStatus]}>
                    {item.feedbackStatus.status.charAt(0).toUpperCase() + item.feedbackStatus.status.slice(1)}</Text>
                  : null}
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ height: 10, width: 10 }}
                  source={require('../../images/material-call.png')}
                />
                <Text style={{ color: '#0F0F0F', fontSize: 10 }}>+91 {item.lead ? item.lead.phone : ''}</Text>
              </View>
            </View>
          </View>
        </Card>
      </Pressable>)
  }

  const renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
     if (!footerLoading) return null;
     return (
      <ActivityIndicator style={{paddingTop:20}} size={'small'} color="#0000ff" />
     );
   };

  return (
    <View style={{ flex: 1 }}>
      <Header style={Platform.OS == 'ios' ?  { height: "20%" } : {}}
        title='FeedBack'
        renderLeft={() => {
          return (
            <Image  source={require('../../images/home.png')}
              style={{ width: 28, height: 28 }} />
          );
        }}
        onPressLeft={() => {
          navigation.toggleDrawer()
          // navigation.openDrawer()
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

      {IsLodding == true ?
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
        :
        <View style={{ flex: 1, marginHorizontal: '3%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '2%' }}>
            <Pressable style={styles.pickerStyle} onPress={showDatepicker} >
              <Image
                style={Platform.OS == 'ios' ?
                  [styles.icon] :
                  [styles.icon]}
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
                  <Text style={styles.pickerText}>From Date</Text>
                  :
                  null
                }
              </View>
                :
                <View>
                  {starttext == true ?
                    <Text style={[styles.pickerText, { marginLeft: '10%' }]}>From Date</Text>
                    :
                    <Text style={[styles.pickerText, { marginLeft: '10%' }]}>{moment(startDate).format('DD/MM/YYYY')}</Text>
                  }
                </View>
              }
            </Pressable>
            <Pressable style={styles.pickerStyle} onPress={showEDatepicker} >
              <Image
                style={Platform.OS == 'ios' ?
                  [styles.icon] :
                  [styles.icon]}
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
                  <Text style={styles.pickerText}>To Date</Text>
                  :
                  null
                }
              </View>
                :
                <View>
                  {endtext == true ?
                    <Text style={[styles.pickerText, { marginLeft: '10%' }]}>To Date</Text>
                    :
                    <Text style={[styles.pickerText, { marginLeft: '10%' }]}>{moment(enddate).format('DD/MM/YYYY')}</Text>
                  }
                </View>
              }
            </Pressable>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '2%' }}>
            <Dropdown
              style={[styles.dropdown, { width: '49%' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={campList}
              search={true}
              searchPlaceholder='Search'
              maxHeight={160}
              labelField="campaign_name"
              valueField="id"
              placeholder='Select Campaign'
              value={campId}
              onChange={item => { campaignSelect(item.id) }} 
              renderLeftIcon={() => (
                <View><Image source={require('../../images/list.png')}
                  style={{ height: 21, width: 16, marginRight: '5%' }} />
                </View>
              )
            }
            />
            <Dropdown
              style={[styles.dropdown, { width: '49%' }]}
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

                <View>
                  <Image
                    source={require('../../images/statusnet.png')}
                    style={{ height: 21.08, width: 22.71, marginRight: '5%' }}
                  />
                </View>
              )}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: '2%' }}>
            <TouchableOpacity style={[styles.button, { width: '60%' }]} onPress={() => Search()}>
              <Text style={styles.btnText}>SEARCH</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: '2%' }}
              onPress={() => Reset()}>
              <Image
                source={require('../../images/refreshButton.png')}
                style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
          </View>
          {IsLodding.feedbackLodding == true ?
            <ActivityIndicator size="small" color="#0000ff" style={{ marginTop: '40%' }} />
            :
            <View style={{ marginVertical: '2%', flex: 1 }}>
              <FlatList
                data={History}
                initialNumToRender={10}
                ListEmptyComponent={() => (!History.length ?
                  <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No Records Found</Text>
                  : null)}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                renderItem={HistoryView}
                onEndReachedThreshold={0.4}
                onEndReached={() => LoadMore()}
                //onEndReached={() => LoadMore}
                //keyExtractor={item => item.id}
                 keyExtractor={(item, index) => String(index)}
                 contentContainerStyle={{
                  flexGrow:1,
                  paddingBottom:60
                 }}
                 ListFooterComponent={renderFooter}
              />
            </View>
          }
        </View>}
    </View>
  );
}