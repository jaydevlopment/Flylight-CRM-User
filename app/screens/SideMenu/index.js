import React, { useState, useEffect } from "react";
import { Alert, Dimensions, View, Text, ImageBackground, StatusBar, Share } from 'react-native'
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import styles from './styles'
import { Image } from 'react-native-elements';
import { Base_ImageUrl } from '../../../const'
import { useDispatch, useSelector, connect } from 'react-redux';
import { userAction, authAction, varificationAction } from '../../redux/Actions';
import { useIsFocused } from "@react-navigation/core"
import {
    DrawerContentScrollView,
    // DrawerItemList,
    // DrawerItem,
} from '@react-navigation/drawer';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";


export default function SideMenu({ navigation }) {

    const UserData = useSelector(state => state.auth.data)
    const [user, setUser] = useState('');
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const profileData = useSelector(state => state.user.userDetail)
    const { width, height } = Dimensions.get('window');

    useEffect(() => {
        if (UserData.status == "success") {
            const data = {
                uid: UserData.data.uid,
                org_uid: UserData.data.org_uid,
                profile_id: UserData.data.cProfile.toString(),
            }
            dispatch(userAction.profile(data, UserData.data.token));
        }
    }, [isFocused])

    useEffect(() => {
        if (profileData) {
            if (profileData.status == "200") {
                setUser(profileData.data.user)
                dispatch(userAction.clearResponse())
            }
            else {
            }
        }
    }, [profileData])

    const LogoutSession = () => {
        if (UserData.status == "success") {
            dispatch(authAction.clearResponse())
        }
    };

    const onShare = async () => {
        try {
            const result = await Share.share({
                title: 'FlylightCrm',
                message: 'FlylightCrm User App , AppLink :https://play.google.com/store/apps/details?id=com.userflylight&hl=en',
                url: 'https://play.google.com/store/apps/details?id=com.userflylight&hl=en'
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={{ flex: 1, }}>
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                backgroundColor="#2B6EF2"
                translucent={false}
                networkActivityIndicatorVisible={true}
            />

            <View >
                <ImageBackground source={require('../../images/drawerImage.png')}
                    style={{ resizeMode: "contain" }}
                >
                    <TouchableOpacity
                        style={{ margin: '5%', marginTop: '5%', alignItems: 'flex-end' }}
                        onPress={() => navigation.closeDrawer()}
                    >
                        <Image
                            style={{ alignSelf: 'flex-end', height: 13, width: 13 }}
                            source={require('../../images/cross.png')}
                        />
                    </TouchableOpacity>

                    <View style={{ padding: "3%" }}>
                        <View style={{ flexDirection: 'row', }}>
                            {user.avatar ?
                                <Avatar.Image size={100}
                                    source={{ uri: `${Base_ImageUrl}` + user.avatar }}
                                />
                                :
                                <Avatar.Image size={100}
                                    source={require('../../images/avtar.jpg')} />
                            }
                            <Card.Content style={{ marginTop: '10%', marginLeft: '-2%' }}>
                                <View style={{ flexDirection: "row", flexWrap: "wrap", width: "80%" }}>
                                    <Title style={{ fontSize: 18, fontFamily: 'Roboto', fontWeight: 'bold', color: '#FFFFFF' }}>
                                        {user.name ? user.name : ''}
                                    </Title>
                                </View>

                                <Paragraph style={{ marginTop: '-5%', fontSize: 13, fontFamily: 'Roboto', fontWeight: 'normal', color: '#FFFFFF' }}>+91
                                    {user.phone ? user.phone : ''}
                                </Paragraph>

                                <View style={{ flexDirection: "row", flexWrap: "wrap", width: "86%" }}>
                                    <Text style={{ fontSize: 12, fontFamily: 'Roboto', fontWeight: 'normal', color: '#FFFFFF' }}>{user.organization}</Text>
                                </View>
                            </Card.Content>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <DrawerContentScrollView >
                <ScrollView style={{ width: width, marginHorizontal: '3%', marginBottom: '10%' }}>
                    <View style={[styles.menusTop]}>
                        {/* <TouchableOpacity onPress={() => navigation.toggleDrawer()} > */}
                        <TouchableOpacity onPress={() => navigation.navigate('DashBoard')}>
                            <View style={{ flexDirection: 'row', }}>
                                <Image style={[styles.image2, { marginRight: '4%',marginLeft:responsiveWidth(1), height: 20, width: 18,}]}
                                    source={require('../../images/Shome.png')}
                                />
                                <View style={[styles.menus]}>
                                    <Text style={styles.items}>Home</Text>
                                    {/* <Image style={[styles.image3]}
                                    source={require('../../images/next.png')}
                                /> */}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menusTop}>
                        <TouchableOpacity onPress={() => navigation.navigate('Organization')}>
                            <View style={{ flexDirection: 'row', }}>
                                <Image style={[styles.image2, { marginRight: '4%',marginLeft:responsiveWidth(1.40), height: 18, width: 15.75,marginTop: responsiveHeight(0.30) }]}
                                    source={require('../../images/Lead.png')}
                                />
                                <View style={[styles.menus]}>
                                    <Text style={styles.items}>Organization</Text>
                                    {/* <Image style={[styles.image3]}
                                    source={require('../../images/next.png')}
                                /> */}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menusTop}>
                        <TouchableOpacity onPress={() => navigation.navigate('LeadAll')}>
                            <View style={{ flexDirection: 'row', }}>
                                <Image style={[styles.image2, { marginTop: responsiveHeight(0.38),marginLeft:responsiveWidth(1.40), marginRight: '4%', height: 15.19, width: 17 }]}
                                    source={require('../../images/TaskManager.png')}
                                />
                                <View style={styles.menus}>
                                <Text style={styles.items}>Leads</Text>
                                    {/* <Image style={[styles.image3]}
                                    source={require('../../images/next.png')}
                                /> */}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menusTop}>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Task_Manager')}
                        >
                            <View style={{ flexDirection: 'row', }}>
                                <Image
                                    style={[styles.image2, {
                                        marginTop: responsiveHeight(0.30),
                                        marginRight: '3%', height: 15.19, width: 18,marginLeft:responsiveWidth(1.40),
                                    }]}
                                    source={require('../../images/TaskManager.png')}
                                />
                                <View style={styles.menus}>
                                    <Text style={styles.items}>
                                        Task
                                    </Text>

                                    {/* <Image style={[styles.image3]}
                                    source={require('../../images/next.png')}
                                /> */}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menusTop}>
                        <TouchableOpacity onPress={() => navigation.navigate('History')}
                        >
                            <View style={{ flexDirection: 'row', }}>
                                <Image style={[styles.image2, { marginRight: '2%', height: 21, width: 24, marginLeft: responsiveWidth(0.20), marginTop: responsiveHeight(0.10), }]}
                                    source={require('../../images/history.png')}
                                />
                                <View style={[styles.menus]}>
                                    <Text style={{
                                        fontSize: 17,
                                        color: '#444444',
                                        fontWeight: 'bold',
                                        paddingBottom: '8%',
                                        fontFamily: 'Roboto',
                                        marginLeft: responsiveWidth(2.42),
                                        marginTop: responsiveHeight(-0.25)
                                    }}>Feedback</Text>
                                    {/* <Image style={[styles.image3]}
                                    source={require('../../images/next.png')}
                                /> */}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menusTop}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Report")}
                        >
                            <View style={{ flexDirection: 'row', }}>
                                <Image
                                    style={[styles.image2, {  marginTop: responsiveHeight(0.30),marginLeft:responsiveWidth(1.40), marginRight: '2%', height: 16.55, width: 22.06 }]}
                                    source={require('../../images/report2.png')}
                                />
                                <View style={styles.menus}>
                                    <Text style={styles.items}>
                                        Reports
                                    </Text>
                                    {/* <Image style={[styles.image3]}
                                    source={require('../../images/next.png')}
                                /> */}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menusTop}>
                        <TouchableOpacity title={'Share'} onPress={() => onShare()}
                        >
                            <View style={{ flexDirection: 'row', }}>
                                <Image style={[styles.image2, { marginRight: '2.5%',marginLeft:responsiveWidth(1.40), height: 19.27, width: 22.03, marginTop: responsiveHeight(0.30), }]}
                                    source={require('../../images/share-blue.png')}
                                />
                                <View style={styles.menus}>
                                    <Text style={{
                                        fontSize: 17,
                                        color: '#444444',
                                        fontWeight: 'bold',
                                        paddingBottom: '8%',
                                        fontFamily: 'Roboto',
                                        marginLeft: responsiveWidth(1.70),
                                        marginTop: responsiveHeight(-0.25)
                                    }}>Share</Text>
                                    {/* <Image style={[styles.image3]}
                                    source={require('../../images/next.png')}
                                /> */}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menusTop}>
                        <TouchableOpacity onPress={() => LogoutSession()}
                        >
                            <View style={{ flexDirection: 'row', }}>
                                <Image style={[styles.image2, { marginRight: '2.5%',marginLeft:responsiveWidth(1.40), height: 19.27, width: 22.03 , marginTop: responsiveHeight(0.30),}]}
                                    source={require('../../images/logout.png')}
                                />
                                <View style={styles.menus}>
                                    <Text style={styles.items}>Logout</Text>
                                    {/* <Image style={[styles.image3]}
                                    source={require('../../images/next.png')}
                                /> */}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={styles.menusTop}>
                    <TouchableOpacity onPress={() => navigation.navigate('CallScreen')}
                    >
                        <View style={{ flexDirection: 'row',   }}>
                            <Image style={[styles.image2, { marginTop: '1.5%', marginRight: '4%', height: 15.19, width: 18 }]}
                                source={require('../../images/TaskManager.png')}
                            />
                            <View style={styles.menus}>
                                <Text style={styles.items}>CallScreen</Text>
                                <Image style={[styles.image3, { marginLeft: '58%' }]}
                                    source={require('../../images/next.png')}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View> */}
                </ScrollView>
            </DrawerContentScrollView>
        </View>
    );
}