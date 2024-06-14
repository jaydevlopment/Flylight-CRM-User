import React, { useState, useEffect, } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, ToastAndroid, Platform, Dimensions } from 'react-native';
import styles from './styles';
import {  Image } from 'react-native-elements';
import Header from '../../component/header';
import { useDispatch, useSelector, connect } from 'react-redux';
import { userAction } from '../../redux/Actions/index'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import moment from 'moment';

export default function Notifications({ navigation, route }) {

    const [IsLodding, setIsLodding] = useState(true)
    const [BellData, setBellData] = useState([])
    const dispatch = useDispatch()
    const { width, height } = Dimensions.get('window');
    const UserData = useSelector(state => state.auth.data)
    const notificationInfo = useSelector(state => state.user.userNotification)

    useEffect(() => {
        GetNotification()
    }, [])

    const GetNotification = () => {
        let data = {
            uid: UserData.data.uid,
            org_uid: UserData.data.org_uid,
            profile_id: UserData.data.cProfile.toString(),
        }
        dispatch(userAction.notification(data, UserData.data.token));
    }

    useEffect(() => {
        if (notificationInfo) {
            if (notificationInfo.status == "success") {
                setBellData(notificationInfo.data)
                setIsLodding(false)
                dispatch(userAction.clearResponse())
            }
            else if (notificationInfo.status == "failed") {
                ToastAndroid.show(notificationInfo.message, ToastAndroid.SHORT);
                setIsLodding(false)
            }
        }
    }, [notificationInfo])

    const [refreshing, setrefreshing] = useState(false)
    const handleRefresh = () => {
        console.log(refreshing)
        GetNotification()
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{ marginBottom: '1%' }} >
                <TouchableOpacity style={styles.notify} >
                    <Image style={{ width: 45, height: 45 }} source={require('../../images/alert.png')}
                    />
                    <View style={{ width: '70%', marginHorizontal: '1%' }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#0F0F0F', }}>{item.title}</Text>
                        <Text style={{ fontSize: 10, color: '#565656', }}>{item.description}</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 11, color: '#0F0F0F' }} >
                            {moment(item.updated_at).format("HH:MM A")}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 ,height:height,width:width}}>
            <Header style={Platform.OS == 'ios' ? { height: "18%" } : {}}
                title='Notifications'
                renderLeft={() => {
                    return (<Image source={require('../../images/home.png')} style={{ width: 28, height: 28 }} />);
                }}
                onPressLeft={() => { navigation.toggleDrawer() }}
                renderRight={() => {
                    return (<Image source={require('../../images/Notifications.png')} style={{ width: 28, height: 28 }} />);
                }}
               // onPressRight={() => { navigation.goBack() }}
            />
            <View style={{ marginHorizontal: '3%', marginVertical: '2%' }}>
                {IsLodding == true ?
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                    :
                    <FlatList
                        data={BellData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ListEmptyComponent={() => (!BellData.length ?
                            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No Records Found</Text>
                            : null)}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
            </View>
        </View>
    );
}

