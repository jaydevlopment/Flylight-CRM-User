import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, ActivityIndicator, ToastAndroid, Dimensions } from 'react-native';
import Header from '../../component/header/index'
import { organizationAction, authAction, varificationAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles'
import { useIsFocused } from "@react-navigation/core"
import {  Image } from 'react-native-elements';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

export default function Organization({ navigation }) {

    const { width, height } = Dimensions.get('window');
    const [allOrg, setallOrg] = useState([])
    const [currentOrg, setcurrentOrg] = useState("")
    const [IsLodding, setIsLodding] = useState(true)
    const dispatch = useDispatch()
    const UserData = useSelector(state => state.auth.data)
    const orgList = useSelector(state => state.organization.getList)

    useEffect(() => {
        GetOrg()
    }, [UserData])

    const GetOrg = () => {
        const data = {
            uid: UserData.data.uid,
            org_uid: UserData.data.org_uid,
            profile_id: UserData.data.cProfile.toString(),
        }
        setcurrentOrg(UserData.data.org_uid)
        dispatch(organizationAction.OrganizationList(data, UserData.data.token));
    }

    useEffect(() => {
        if (orgList) {
            if (orgList.status == "200") {
                setallOrg(orgList.data)
                dispatch(organizationAction.clearResponse())
                setIsLodding(false)
            }
            else if (orgList.status == "failed") {
                setIsLodding(false)
            }
            else if (orgList.status == "fail") {
                ToastAndroid.show(orgList.message, ToastAndroid.SHORT);
                setIsLodding(false)
            }
        }
    }, [orgList])

    const ChangeOrg = (value) => {
        dispatch(authAction.SwitchOrg(UserData, value.cProfile, value.orgUid));
    }

    const [refreshing, setrefreshing] = useState(false)
    const handleRefresh = () => {
        console.log(refreshing)
        GetOrg()
    }

    const AllView = ({ item }) => {
        return (
            <TouchableOpacity style={{ marginTop: '0.5%' }} onPress={() => ChangeOrg({ orgUid: item.organization.org_unique_id, cProfile: item.id })}>
                <View style={currentOrg !== '' && currentOrg == item.organization.org_unique_id ?
                    [styles.listData, { backgroundColor: '#24BCFF' }]
                    :
                    styles.listData}>
                    <View style={{ justifyContent: 'center', }}>
                        <Image style={{ height: 48, width: 48, borderRadius: 24, backgroundColor: '#fff' }}
                            source={require('../../images/profileCall.png')} />
                    </View>
                    <View style={{ marginLeft: '3%', flex: 1 }}>
                        <Text
                            style={currentOrg !== '' && currentOrg == item.organization.org_unique_id ?
                                { fontWeight: 'bold', fontSize: 14, color: '#FFFF', fontFamily: 'Roboto' }
                                :
                                { fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }
                            }>
                            {item.organization.name ? item.organization.name : ''}</Text>
                        <Text numberOfLines={1}
                            style={currentOrg !== '' && currentOrg == item.organization.org_unique_id ?
                                { fontFamily: 'Roboto', fontSize: 13, color: '#FFFF', flexShrink: 1 }
                                :
                                { fontFamily: 'Roboto', fontSize: 13, color: '#0F0F0F', flexShrink: 1 }
                            }>
                            {item.role.name ? item.role.name : "not available"}</Text>
                    </View>
                    <Image source={require('../../images/white_check.png')}
                        style={{ height: 16, width: 25, marginTop:responsiveHeight(2.20), marginRight: '5%' }} />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ Flex: 1 }}>
            <Header
                title='Organizations'
                renderLeft={() => {
                    return (
                        <Image
                            source={require('../../images/home.png')}
                            style={{ width: 28, height: 28 }} />
                    );
                }}
                onPressLeft={() => { navigation.toggleDrawer() }}
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
            <View style={{ marginVertical: '2%' }}>
                {IsLodding == true ?
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                    :
                    <FlatList
                        data={allOrg}
                        renderItem={AllView}
                        ListEmptyComponent={() => (!allOrg.length ?
                            <Text style={{ textAlign: 'center', marginTop: '5%', fontSize: 20 }}>No Records Found</Text>
                            : null)}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        keyExtractor={item => item.id}
                    />
                }
            </View>
        </View >
    );
}


