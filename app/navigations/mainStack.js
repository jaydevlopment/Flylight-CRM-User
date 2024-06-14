
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
} from '../screens/index'
import TopTab from '../navigations/drawer/index'

const Stack = createNativeStackNavigator();

export default function MainStack({ route }) {

  return (
    <TopTab/>
    // <Stack.Navigator screenOptions={{ headerShown: false,animation: 'none' }}>
    //   <Stack.Screen name='DashBoard1' component={TopTab} />
    //   <Stack.Screen name='Organization' component={Organization} />
    //   <Stack.Screen name='LeadDetail' component={LeadDetail} />
    //   <Stack.Screen name='LeadEdit' component={LeadEdit} />
    //   <Stack.Screen name='Notifications' component={Notifications} />
    //   <Stack.Screen name='RecordFeedback' component={RecordFeedback} />
    //   <Stack.Screen name='History' component={History} />
    //   <Stack.Screen name='LeadAll' component={LeadAll} />
    //   <Stack.Screen name='HistoryDetail' component={HistoryDetail} />
    //   <Stack.Screen name="History_Feedback" component={History_Feedback} />
    //   <Stack.Screen name="Task_Manager" component={Task_Manager} />
    //   <Stack.Screen name='Report' component={Report} />
    //   <Stack.Screen name= 'LeadFilterScreen' component={LeadFilterScreen} />
    // </Stack.Navigator>
  );
}


