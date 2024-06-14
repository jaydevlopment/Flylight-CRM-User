import React, { useState, useEffect,useCallback } from 'react';
import { Text, View, TouchableOpacity, FlatList,Linking, Alert, ActivityIndicator, ToastAndroid } from 'react-native';
import moment from 'moment';
import styles from './styles'
import Header from '../../component/header/index'
import { historyAction ,leadAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import { BottomSheet, Button, ListItem } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import {  Image } from 'react-native-elements';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {request,check, PERMISSIONS, RESULTS} from 'react-native-permissions';

export default function HistoryOne({ navigation, route }) {
    const {id} = route?.params
    const [Data, setData] = useState('')
    const [User, setUser] = useState('')
    const [LeadId, setLeadId] = useState(route.params ? route.params.id : '')
    const [IsLodding, setIsLodding] = useState(true)
    const [page, setPage] = useState(0);
    const [perPageItems, setperPageItems] = useState(10);
    const [totalItems, settotalItems] = useState('');

    const dispatch = useDispatch()
    const UserData = useSelector(state => state.auth.data)
    const DetailData = useSelector(state => state.history.detailHistory)

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


    const GetHistoryDetail = (p) => {
        setIsLodding(true)
        let data = {
            uid: UserData.data.uid,
            org_uid: UserData.data.org_uid,
            profile_id: UserData.data.cProfile.toString(),
            pageSize: perPageItems,
            pageNumber: p,
            lead_id: id,
            filters: []
        }
        dispatch(historyAction.HistoryDetail(data, UserData.data.token));
    }  

    const getHistoryetail = useCallback(debounce(GetHistoryDetail), [id]);

    useEffect(() => {
        setIsLodding(true)
        getHistoryetail(page)
       // GetHistoryDetail(page)
    }, [id])

    // useEffect(() => {
    //     setIsLodding(true)
    //     GetHistoryDetail(page)
    // }, [])

   
    useEffect(() => {
        if (DetailData) {
            //console.log(DetailData)
            if (DetailData.status == "success" && DetailData.data.length > 0) {
                setUser(DetailData.data[0].lead)
                // setData(DetailData.data)
                settotalItems(DetailData.total_rows)
                if (page == 0) {
                    setData(DetailData.data)
                    setIsLodding(false)
                } else if (DetailData.data.length != 0) {
                    let dataLive = DetailData.data;
                    let listTemp = [...leadList, ...dataLive];
                    setData(listTemp)
                    setIsLodding(false)
                }
               
                dispatch(historyAction.clearResponse())
            }
            else if (DetailData.status == "failed") {
                // Alert.alert(DetailData.message)
                ToastAndroid.show(DetailData.message, ToastAndroid.SHORT);
                setIsLodding(false)
                dispatch(historyAction.clearResponse())
            }
            else if (DetailData.status == "fail") {
                // Alert.alert(DetailData.message)
                ToastAndroid.show(DetailData.message, ToastAndroid.SHORT);
                setIsLodding(false)
                dispatch(historyAction.clearResponse())
            }
            else {
            }
        }
    }, [DetailData])


    const [refreshing, setrefreshing] = useState(false)
    const handleRefresh = () => {
        //console.log(refreshing)
        GetHistoryDetail(0)
    }

    const LoadMore = () => {
        // console.log('load More Items................', Data.length, totalItems)
        if (totalItems > Data.length) {
            let p = page + 1;
            setPage(p);
            GetHistoryDetail(p)
        }
    }

    const [bottom, setbottom] = useState({
        isVisible4: false,
        note: '',
        callDate: '',
        callTime: '',
        status: '',
        callAction: '',
        message: '',
        businessCard: ''
    })
    const OpenDetail = (item) => {
        setbottom({
            isVisible4: true,
            note: item.description,
            callDate: moment(item.created_at).utc().format("YYYY-MM-DD"),
            callTime: moment(item.created_at).utc().format("LT"),
            status: item.feedbackStatus ? item.feedbackStatus.status : '',
            callAction: item.callAction ? item.callAction.action : '',
            message: item.feedbackMessage ? {
                messageT: item.feedbackMessage.message,
                phoneT: item.feedbackMessage.phone,
                emailT: item.feedbackMessage.email
            } : '',
            businessCard: item.businessCard ? {
                orgName: item.businessCard.organization_name,
                contactName: item.businessCard.contact_person,
                mobile: item.businessCard.mobile_number,
                orgAddress: item.businessCard.company_address,
                orgLink: item.businessCard.company_url,
            } : '',
        })
    }

    const CloseBottomSheet = (item) => {
        setbottom({
            isVisible4: false,
            note: '',
            callDate: '',
            callTime: '',
            status: '',
            callAction: '',
            message: '',
            businessCard: ''
        })
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
                        lead_status: value.lead_status ? value.lead_status : value.lead.lead_status,
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
        //     phoneNumber = `telprompt:${value.phone}`;
        // } else {
        //     phoneNumber = `tel:${value.phone}`;
        // }
        // Linking.canOpenURL(phoneNumber)
        //     .then(supported => {
        //         if (!supported) {
        //             // Alert.alert("Number is not available");
        //             ToastAndroid.show('Number is not available', ToastAndroid.SHORT);

        //         } else {
        //             let data = {
        //                 uid: UserData.data.uid,
        //                 org_uid: UserData.data.org_uid,
        //                 profile_id: UserData.data.cProfile.toString(),
        //                 lead_id: value.id,
        //                 call_status: 'called',
        //                 lead_status: value.lead_status ? value.lead_status : value.lead.lead_status,
        //                 message: value.description,
        //               }
        //               dispatch(leadAction.Editlead(data, UserData.data.token));
        //             navigation.navigate('RecordFeedback', { data: value })
        //             return Linking.openURL(phoneNumber);
                   
        //         }
        //     })
        //     .catch(err => console.log(err));
    };

    const DetailView = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => OpenDetail(item)} >
                <View style={{ paddingHorizontal: 10, borderBottomWidth: 1, borderRadius: 10, borderColor: '#DBDBDB', marginHorizontal: '3%', }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: '3%' }}>
                        <View>
                            <Text style={{
                                fontWeight: 'bold', fontSize: 16, color: '#0F0F0F', fontFamily: 'Roboto'
                            }}>{moment(item.created_at).utc().format("LT")}</Text>
                            <Text style={{
                                color: '#0F0F0F', paddingBottom: '2%',
                                fontSize: 12, fontFamily: 'Roboto'
                            }}>Call On - {moment(item.created_at).utc().format("YYYY-MM-DD")}</Text>
                        </View>
                        <View>
                            {item.feedbackStatus ?
                                item.feedbackStatus.status == 'Success' ? <Text style={{
                                    color: '#fff', backgroundColor: '#32CD32',
                                    paddingLeft: 15, paddingRight: 15,
                                    padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 10,
                                    marginTop: '20%'
                                }}>{item.feedbackStatus.status ? item.feedbackStatus.status : ''}</Text>
                                    :
                                    <Text style={{
                                        color: '#fff', backgroundColor: '#F69708',
                                        paddingLeft: 15, paddingRight: 15,
                                        padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 10,
                                        marginTop: '20%'
                                    }}>{item.feedbackStatus.status ? item.feedbackStatus.status : ''}</Text>
                                :
                                null}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    const Play = () => {

        //console.log('sdzfdafdzsfds'),
            <WebView source={{ uri: 'https://www.youtube.com/watch?v=X-x7eZOdBFM' }} />
    }


    return (
        <View style={styles.container}>
            <Header
              title='History Detail'
                renderLeft={() => {return (<Image source={require('../../images/back.png')}
                            style={{ width: 28, height: 28 }} />);
                }}
                onPressLeft={() => {
                    // navigation.openDrawer()
                    navigation.goBack()
                }}
                renderRight={() => {
                    return (
                        <Image source={require('../../images/Notifications.png')}
                            style={{ width: 28, height: 28 }} />);
                }}
                onPressRight={() => {
                    navigation.navigate('Notifications')
                    // Alert.alert('right')
                }}
            />
            {IsLodding == true ?
                <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                :
                <View style={{ flex: 1, marginVertical: '2%' }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Avatar.Image
                            size={80}
                            style={{ alignSelf: 'center', backgroundColor: '#C6CCD1' }}
                            source={require('../../images/profileCall.png')} />
                    </View>
                    <Card.Content >
                        <Title style={{ fontSize: 18, fontFamily: 'Roboto', fontWeight: 'bold', textAlign: 'center' }}>
                            {User.first_name} {User.last_name}
                        </Title>
                        <Paragraph style={{ marginTop: '-0.5%', fontSize: 16, fontFamily: 'Roboto', fontWeight: 'normal', textAlign: 'center' }}>
                            {User.company}
                        </Paragraph>
                    </Card.Content>
                    <View style={{
                        flexDirection: 'row', paddingBottom: '3%', paddingHorizontal: '1%',
                        justifyContent: 'space-between', marginHorizontal: '3%', borderBottomWidth: 1
                    }}>
                        <Text style={{ fontWeight: 'bold', marginTop: '3%', color: '#000000', fontSize: 18 }}>+91 {User.phone}</Text>
                        <TouchableOpacity onPress={() => call(User)}>
                            <Image style={{ height: 35, width: 35, marginTop: '1%' }}
                                source={require('../../images/GroupCall.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={Data}
                        renderItem={DetailView}
                        ListEmptyComponent={() => (!Data.length ?
                            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No Records Found</Text>
                            : null)}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        onEndReached={() => LoadMore}
                        keyExtractor={item => item.id}
                    />
                </View>
            }

            <BottomSheet modalProps={{
                animationType: 'fade', hardwareAccelerated: true,
                onRequestClose: () => CloseBottomSheet(),
            }} onBackdropPress={() => CloseBottomSheet()} isVisible={bottom.isVisible4}>
                <View style={{
                    flex: 1, backgroundColor: '#fff',
                    padding: '3%', paddingTop: '5%',
                    borderTopLeftRadius: 20, borderTopRightRadius: 20
                }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ borderBottomWidth: 1 }}>
                            <Text style={styles.askTitle}>History Detail</Text>
                            <TouchableOpacity style={styles.askTitleR}
                                onPress={() => CloseBottomSheet()}>
                                <Image style={{ height: 14, width: 14, }}
                                    source={require('../../images/cross_blackIos.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: '2%', flex: 1 }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Avatar.Image
                                    size={50}
                                    style={{ backgroundColor: '#C6CCD1' }}
                                    source={require('../../images/profileCall.png')} />
                            </View>
                            <View style={{ width: '60%', marginHorizontal: '2%', flex: 1 }}>
                                <Text style={styles.DetailCampTitle}>{bottom.callTime}</Text>
                                <Text style={styles.DetailCampTitle}>Call-Date {bottom.callDate}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.DetailCampTitle}>Status  </Text>
                                    <Text style={{ backgroundColor: 'red', color: '#fff', paddingHorizontal: '3%', borderRadius: 20 }}>
                                        {bottom.status.charAt(0).toUpperCase() + bottom.status.slice(1)}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ marginRight: '2%', justifyContent: 'center' }}>
                                <Text style={{ backgroundColor: 'green', color: '#fff', paddingHorizontal: '3%', borderRadius: 20 }}>
                                    {bottom.callAction.charAt(0).toUpperCase() + bottom.callAction.slice(1)}</Text>
                            </View>
                        </View>
                        {bottom.note ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Note</Text> : null}
                        <Text style={styles.DetailCampTitle}>{bottom.note ? bottom.note : null}</Text>
                        {bottom.message ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>{'\n'}Message</Text> : null}
                        {bottom.businessCard ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>{'\n'}BusinessCard</Text> : null}
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text style={[styles.DetailCampTitle, { fontWeight: 'bold' }]}>
                                    {bottom.message ? 'Message' + '\n' + 'Mobile'
                                        + '\n' + 'Email' : null}
                                    {bottom.businessCard ? 'Contact Name' + '\n' + 'Mobile'
                                        + '\n' + 'Org Name' + '\n' + 'OrgUrl' + '\n' + 'OrgAdress' : null}
                                </Text>
                            </View>
                            <View style={{ marginLeft: '3%', width: '70%' }}>
                                <Text style={styles.DetailCampTitle}>
                                    {bottom.message ? ':   ' + bottom.message.messageT + '\n' + ':   ' + bottom.message.phoneT + '\n' + ':   ' + bottom.message.emailT : null}
                                    {bottom.businessCard ? ':   ' + bottom.businessCard.contactName + '\n' + ':   ' + bottom.businessCard.mobile
                                        + '\n' + ':   ' + bottom.businessCard.orgName + '\n' + ':   ' + bottom.businessCard.orgLink + '\n' + ':   ' + bottom.businessCard.orgAddress : null}
                                </Text>
                            </View>
                        </View>

                    </View>
                </View>
            </BottomSheet>
        </View >
    );
}


