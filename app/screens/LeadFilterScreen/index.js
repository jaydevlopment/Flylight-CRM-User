import React, { useState, useEffect,useCallback } from 'react';
import {
  Text, View, Pressable, TouchableOpacity, ActivityIndicator, Platform, FlatList, Linking, Dimensions, ToastAndroid
} from 'react-native';
import styles from './styles';
import Header from '../../component/header';
import {  Image } from 'react-native-elements';
import { useDispatch, useSelector, connect } from 'react-redux';
import { leadAction, historyAction } from '../../redux/Actions/index'
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {request,check, PERMISSIONS, RESULTS} from 'react-native-permissions';

export default function LeadFilterScreen({ navigation, route }) {
  const {value,filters} = route?.params
  const [IsLodding, setIsLodding] = useState({
    leadLodding: true,
    statusLodding: true,
  })
  const [leadList, setleadList] = useState([])
  const [isService, setisService] = useState(route.params.value);
  const dispatch = useDispatch()
  const UserData = useSelector(state => state.auth.data)
  const Leads = useSelector(state => state.lead.data)
  const { width, height } = Dimensions.get('window');
  const [page, setPage] = useState(0);
  const [perPageItems, setperPageItems] = useState(10);
  const [totalItems, settotalItems] = useState(0);
  const [filterKeys, setfilterKeys] = useState(route.params ? route.params.filters : [])
  const [footerLoading,setFooterLoading] = useState(false)
  // useEffect(() => {
  //   FetchData(page)
  // }, [])

  const FetchData = (p) => {

    // console.log('.....................', filterKeys)
    let data = {
      uid: UserData.data.uid,
      org_uid: UserData.data.org_uid,
      profile_id: UserData.data.cProfile.toString(),
      pageSize: perPageItems,
      pageNumber: p,
      filters: filters
    }
    dispatch(historyAction.LeadStatusList(data, UserData.data.token));
   // console.log('value',value)
    switch(value){
      case 'Called':
        data.filters.push({ eq: "called", key: "status" })
        dispatch(leadAction.LeadList(data, UserData.data.token));
        break;
      case 'Pending':
        data.filters.push({ eq: "pending", key: "status" })
        dispatch(leadAction.LeadList(data, UserData.data.token));
        break;
      case 'All':
        dispatch(leadAction.LeadList(data, UserData.data.token));
        break;
      default:
        dispatch(leadAction.LeadList(data, UserData.data.token));
        break;
    }
    // if (value == 'Called') {
    //   data.filters.push({ eq: "called", key: "status" })
    //   dispatch(leadAction.LeadList(data, UserData.data.token));
    // }
    // else if (value == 'Pending') {
    //   data.filters.push({ eq: "pending", key: "status" })
    //   dispatch(leadAction.LeadList(data, UserData.data.token));
    // }
    // else if (value == 'All') {
    //   dispatch(leadAction.LeadList(data, UserData.data.token));
    // }
  }

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

const getFilteredLeads = useCallback(debounce(FetchData), [value]);


useEffect(() => {
  setIsLodding({
    statusLodding: true,
    leadLodding: true
  })
  setleadList([])
  settotalItems(0)
  setPage(0)
  getFilteredLeads(0)
}, [value])

  useEffect(() => {
    if (Leads) {
      if (Leads.status == "success") {
        settotalItems(Leads.total_rows)
        if (page == 0 && Leads.data.length != 0) {
          setleadList(Leads.data)
        } else if (Leads.data.length != 0) {
          let dataLive = Leads.data;
          let listTemp = [...leadList, ...dataLive];
          setleadList(listTemp)
        }
        setIsLodding({
          ...IsLodding,
          leadLodding: false
        })
        setFooterLoading(false)
        dispatch(leadAction.clearResponse())
      }
      else if (Leads.status == "failed") {
        setIsLodding({
          ...IsLodding,
          leadLodding: false
        })
        setFooterLoading(false)
        ToastAndroid.show(Leads.message, ToastAndroid.SHORT);
        dispatch(leadAction.clearResponse())
      }
    }
  }, [Leads])

  const getFilteredLeadsNext = useCallback(debounce(FetchData), [page]);

  const fetchNextItems = () => {
    // console.log('load More Items.........', leadList.length, totalItems)
    if (totalItems > leadList.length) {
      setFooterLoading(true)
      let p = page + 1;
      setPage(p);
      FetchData(p)
    }
  }

  const [refreshing, setrefreshing] = useState(false)
  const handleRefresh = () => {
   // console.log(refreshing)
    setIsLodding({
      statusLodding: true,
      leadLodding: true
    })
    setleadList([])
    settotalItems(0)
    setPage(0)
    FetchData(0)
  }

  const call = (value) => {
    let phoneNumber = value.phone;

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
          navigation.navigate('RecordFeedback', { data: value })
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
    // Linking.canOpenURL(phoneNumber)
    //   .then(supported => {
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
    //   })
    //   .catch(err => console.log(err));
  };

  const renderItem = ({ item }) => {
    return (
      // <TouchableOpacity onPress={() => navigation.navigate('LeadDetail', { item: item })} >
      //   <View style={styles.listData} >
      //     <View style={{ backgroundColor: '', justifyContent: 'center', }}>
      //       <Image style={{ height: 48, width: 48, }} source={require('../../images/profileCall.png')} />
      //     </View>
      //     <View style={{ marginLeft: '2%', flex: 1, backgroundColor: '', }}>
      //       <Text style={{
      //         fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto'
      //       }}>{item.first_name} {item.last_name}</Text>
      //       <View style={{ flexDirection: 'row', }}>
      //         <View style={{ width: '35%', backgroundColor: '' }}>
      //           <Text numberOfLines={1} style={{ color: 'black', fontFamily: 'Roboto', fontSize: 12, color: '#0F0F0F', flexShrink: 1 }}>
      //             {item.company}</Text>
      //         </View>
      //         {item.status == 'pending' ?
      //           <View style={{ backgroundColor: '#F69708', paddingHorizontal: '3%', paddingVertical: '1%', borderRadius: 10 }}>
      //             <Text style={{ color: '#fff' }}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
      //           </View>
      //           :
      //           <View style={{ backgroundColor: '#05B829', paddingHorizontal: '3%', paddingVertical: '1%', borderRadius: 10 }}>
      //             <Text style={{ color: '#fff' }}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
      //           </View>}
      //       </View>
      //       <View style={{ flexDirection: 'row', }}>
      //         <Text max style={{ color: 'black', fontSize: 10 }}>{item.phone}</Text>
      //       </View>
      //     </View>
      //     <View style={{ marginLeft: '2%', backgroundColor: '', marginTop: '1%' }}>
      //       <View style={{ flexDirection: 'row' }}>
      //         <TouchableOpacity style={{ marginLeft: '2%' }} onPress={() => call(item)} >
      //           <Image style={{ height: 40, width: 40, }} source={require('../../images/GroupCall.png')} />
      //         </TouchableOpacity>
      //       </View>
      //     </View>
      //   </View>
      // </TouchableOpacity>
      <TouchableOpacity style={styles.listData}
      onPress={() => navigation.navigate('LeadDetail', { item: item })}>
      <View>
        <Image style={{ height: 48, width: 48, }} source={require('../../images/profileCall.png')} />
      </View>
      <View style={{ flex: 1, marginHorizontal: '2%' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.first_name} {item.last_name}</Text>
        <Text style={{ color: 'black', fontSize: 10 }}>{item.phone}</Text>
        {item.description ? <Text style={{ color: 'black', fontSize: 10 }} numberOfLines={1}>{item.description}</Text> : null}
        {item.status == 'pending' ?
          <View style={{ backgroundColor: '#F69708', paddingHorizontal: '3%', width: '26%', borderRadius: 10, marginBottom: '2%' }}>
            <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center' }}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
          </View>
          :
          <View style={{ backgroundColor: '#05B829', paddingHorizontal: '3%', width: '25%', borderRadius: 10, marginBottom: '2%' }}>
            <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center' }}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
          </View>}
      </View>
      <TouchableOpacity style={{ marginHorizontal: '2%', justifyContent: 'center' }} onPress={() => call(item)} >
        <Image style={{ height: 35, width: 35, }} source={require('../../images/GroupCall.png')} />
      </TouchableOpacity>
    </TouchableOpacity>
    );
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
      <Header
        title={value? value=='All'?'Total Leads':`Leads ${value}`:'Leads'}
        renderLeft={() => {
          return (<Image source={require('../../images/back.png')} style={{ width: 28, height: 28 }} />);
        }}
        onPressLeft={() => { navigation.goBack() }}
        renderRight={() => {
          return (<Image source={require('../../images/Notifications.png')} style={{ width: 28, height: 28 }} />);
        }}
        onPressRight={() => { navigation.navigate('Notifications') }}
      />
      {IsLodding.leadLodding == true ?
        <ActivityIndicator size="small" color="#0000ff" />
        :
        <View style={{flex:1, margin: '2%' }}>
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
            keyExtractor={item => item.id} />
        </View>
      }
    </View>
  );
}


