import React from 'react'
import { Image, View, StyleSheet, TouchableOpacity, Dimensions,} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DashBoard, SideMenu } from '../../screens/index'
import {
    RecordFeedback,
    Notifications,
    LeadEdit,
    LeadDetail,
    Organization,
      History,
    LeadAll,
    HistoryDetail,
    History_Feedback,
    Task_Manager,
    Report,
    LeadFilterScreen
  } from '../../screens/index'

const width = Dimensions.get("screen").width;
const Drawer = createDrawerNavigator();

export default function TopTab(props) {

    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer();
    }

    return (
        <Drawer.Navigator
            // drawerStyle={{ width: width }}
            backBehavior='history'
            drawerContent={props => <SideMenu {...props} />}
            initialRouteName="DashBoard"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Drawer.Screen name='DashBoard' component={DashBoard} />

            <Drawer.Screen name='Organization' component={Organization} options={{unmountOnBlur:true}} />
            <Drawer.Screen name='LeadDetail' component={LeadDetail} options={{unmountOnBlur:true}} />
            <Drawer.Screen name='LeadEdit' component={LeadEdit}  options={{unmountOnBlur:true}} />
            <Drawer.Screen name='Notifications' component={Notifications}  options={{unmountOnBlur:true}} />
            <Drawer.Screen name='RecordFeedback' component={RecordFeedback} options={{unmountOnBlur:true}} />
            <Drawer.Screen name='History' component={History} options={{unmountOnBlur:true}} />
            <Drawer.Screen name='LeadAll' component={LeadAll} initialParams={{value:'All'}} options={{unmountOnBlur:true}} />
            <Drawer.Screen name='HistoryDetail' component={HistoryDetail} options={{unmountOnBlur:true}} />
            <Drawer.Screen name="History_Feedback" component={History_Feedback} options={{unmountOnBlur:true}} />
            <Drawer.Screen name="Task_Manager" component={Task_Manager} options={{unmountOnBlur:true}} />
            <Drawer.Screen name='Report' component={Report} options={{unmountOnBlur:true}} />
            <Drawer.Screen name= 'LeadFilterScreen' component={LeadFilterScreen} options={{unmountOnBlur:true}} />

        </Drawer.Navigator>
    );
}

