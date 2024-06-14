import React, { useState, useEffect } from 'react';
import {
    Text, View, TextInput, FlatList, ActivityIndicator, Linking,
    Modal, Alert, Pressable, ToastAndroid, Dimensions, TouchableOpacity,ScrollView
} from 'react-native';
import {  Image } from 'react-native-elements';
import { BottomSheet, ListItem } from 'react-native-elements';
import moment from 'moment';
import Header from '../../component/header/index'
import { taskAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import {responsiveHeight, responsiveWidth,responsiveFontSize} from "react-native-responsive-dimensions";

export default function Task_Manager({ navigation }) {
    const [isService, setisService] = useState('All');
    const [allTask, setallTask] = useState([])
    const [page, setPage] = useState(0);
    const [perPageItems, setperPageItems] = useState(10);
    const [totalItems, settotalItems] = useState('');
    const [IsLodding, setIsLodding] = useState({ taskLodding: true, editlodding: false, })
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, settext] = useState(true)
    const [title, settitle] = useState('')
    const [Status, setStatus] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [temObject, settempObject] = useState('')
    const data = [
        { label: 'Not Started', value: 1, },
        // { label: 'In Progress', value: 2 },
        { label: 'Completed', value: 3 },
    ];
    const { width, height } = Dimensions.get('window');
    const dispatch = useDispatch()
    const UserData = useSelector(state => state.auth.data)
    const taskList = useSelector(state => state.task.getList)
    const responseAdd_Edit = useSelector(state => state.task.addTask)
    const [footerLoading,setFooterLoading] = useState(false)
    useEffect(() => {
        Get_Data(page)
    }, [])
    const Get_Data = (p) => {
        const data = {
            uid: UserData.data.uid,
            profile_id: UserData.data.cProfile.toString(),
            org_uid: UserData.data.org_uid,
            pageSize: perPageItems,
            pageNumber: p,
            filters: []
        }
        dispatch(taskAction.TaskList(data, UserData.data.token));
    }
    useEffect(() => {
        if (taskList) {
            if (taskList.status == "success") {
                if (page == 0) {
                    setallTask(taskList.data)
                } else if (taskList.data.length != 0) {
                    let dataLive = taskList.data;
                    let listTemp = [...leadList, ...dataLive];
                    setallTask(listTemp)
                }
                settotalItems(taskList.total_rows)
                setIsLodding({ editlodding: false, taskLodding: false })
                setFooterLoading(false)
            }
            else if (taskList.status == "failed") {
                setIsLodding({ editlodding: false, taskLodding: false })
                setFooterLoading(false)
            }
        }
    }, [taskList])
    const checkValue = (value) => {
        setallTask([])
        setisService(value)
        const data = {
            uid: UserData.data.uid,
            profile_id: UserData.data.cProfile.toString(),
            org_uid: UserData.data.org_uid,
            pageSize: perPageItems,
            pageNumber: '0',
            filters: []
        }
        if (value == 'Done') {
            setIsLodding({
                ...IsLodding,
                taskLodding: true
            })
            data.filters.push({ eq: '3', key: 'status' })
            dispatch(taskAction.TaskList(data, UserData.data.token))
        }
        else if (value == 'ToDo') {
            setIsLodding({
                ...IsLodding,
                taskLodding: true
            })
            data.filters.push({ eq: '1', key: 'status' })
            dispatch(taskAction.TaskList(data, UserData.data.token))
        }
        else if (value == 'All') {
            setIsLodding({
                ...IsLodding,
                taskLodding: true
            })
            dispatch(taskAction.TaskList(data, UserData.data.token))
        }
    }

    const initialStates = () => {
        setIsLodding({ taskLodding: true, editlodding: false, })
        setallTask([])
        settitle('')
        setDate(new Date())
        settext(true)
        setStatus(null)
        settempObject("")
        checkValue(isService)
    }

    const [detail, setDetail] = useState(false)
    const [detailObject, setdetailObject] = useState({
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

    const ShowDetail = (item) => {
        //console.log(item)
        setDetail(true)
        setdetailObject({
            name: item.profile.user.name,
            mobile: item.profile.user.phone,
            email: item.profile.user.email,
            title: item.title,
            taskFor: item.task_for,
            reletedTo: item.related_to,
            status: item.taskstatus.status,
            priority: item.taskpriority.priority,
            DueData: item.due_date,
            description: item.description
        })
    }
    const HideDetail = (item) => {
        setDetail(false)
        setdetailObject({
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

    const CheckEditTask = (value) => {
        settitle(value.title)
        if (value.due_date) {
            const dateStr = new Date(value.due_date);
            setDate(dateStr)
            settext(false)
        }
        setStatus(value.taskstatus.id)
        settempObject(value)
        setIsVisible(true)
    };
    const EditFunction = (value) => {
        if (title == "") { ToastAndroid.show('Enter Title', ToastAndroid.SHORT); }
        else if (Status == null) { ToastAndroid.show('Select Status', ToastAndroid.SHORT); }
        else {
            let formateStartDate = moment(date).format("YYYY-MM-DD")
            setIsLodding({ ...IsLodding, editlodding: true })
            const data = {
                uid: UserData.data.uid,
                org_uid: UserData.data.org_uid,
                profile_id: UserData.data.cProfile,
                created_by: UserData.data.cProfile,
                modified_by: UserData.data.cProfile,
                task_id: value.id ? value.id : '',
                title: title,
                task_for: value.task_for ? value.task_for : '',
                task_related_to: value.related_to ? value.related_to : '',
                task_related_to_id: value.what_id ? value.what_id : '',
                status: Status,
                priority: value.taskpriority.id ? value.taskpriority.id : '',
                description: value.description ? value.description : '',
                due_date: formateStartDate,
            }
            dispatch(taskAction.Add_EditTask(data, UserData.data.token));
        }
    }

    useEffect(() => {
        if (responseAdd_Edit) {
            if (responseAdd_Edit.status == "success") {
                setIsVisible(false)
                ToastAndroid.show(responseAdd_Edit.message, ToastAndroid.SHORT);
                // setrefreshing(!refreshing)
                initialStates()
                // setIsLodding({ ...IsLodding, editlodding: false })
                // settitle('')
                // setDate(new Date())
                // settext(true)
                // setStatus(null)
                // settempObject("")
                // checkValue(isService)
                // setrefreshing(!refreshing)
                dispatch(taskAction.clearResponse())
            }
            else if (responseAdd_Edit.status == "failed") {
                setIsLodding({
                    ...IsLodding,
                    editlodding: false
                })
                ToastAndroid.show(responseAdd_Edit.message, ToastAndroid.SHORT);
            }
        }
    }, [responseAdd_Edit])
    const onChangeFrom = (event, selectedDate) => {
        if (event.type == 'dismissed') {
            setShow(!show);
        }
        else {
            console.log('date selected ')
            const currentDate = selectedDate || date;
            setShow(Platform.OS === 'ios');
            setDate(currentDate)
            settext(false)
        }
    };
    const showMode = (currentMode) => {
        setShow(!show);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };

    const [refreshing, setrefreshing] = useState(false)
    const handleRefresh = () => {
        console.log(refreshing)
        checkValue(isService)
    }
    const LoadMore = () => {
        if (totalItems > allTask.length) {
            setFooterLoading(true)
            let p = page + 1;
            setPage(p);
            Get_Data(p)
        }
        else{
            setFooterLoading(false)
        }
    }

    const AllView = ({ item }) => {
        return (<View style={{ marginHorizontal: '3%', marginVertical: '1%', backgroundColor: '#e9ebf2',
         paddingHorizontal: '2%', borderRadius: 10 }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#B5B8C0',paddingVertical:'2%'}}>
                <View style={{ justifyContent: 'center', }}>
                    <Image
                        style={{ height: 48, width: 48, }}
                        source={require('../../images/profileCall.png')}
                    />
                </View>
                <View style={{ justifyContent: 'center', flex: 1, marginHorizontal: '3%', }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.profile.user.name.charAt(0).toUpperCase() + item.profile.user.name.slice(1)}</Text>
                    <Text style={{ fontSize: 12, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.title}</Text>
                    <Text style={{ fontSize: 12, color: '#0F0F0F', fontFamily: 'Roboto' }} numberOfLines={1}>{item.description}</Text>
                </View>
                <View style={{ justifyContent: 'center', }}>
                    <Text style={{
                        backgroundColor: '#7a9bf5', color: '#0e4af0', borderRadius: 5,
                        paddingHorizontal: '5%', paddingVertical: '2%', fontSize: 15, fontWeight: 'bold'
                    }}>{item.task_for.charAt(0).toUpperCase() + item.task_for.slice(1)}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <TouchableOpacity
                    style={{flexDirection: 'row',justifyContent:'center',alignItems:'center',
                    width: '50%', borderRightWidth: 1, borderColor: '#B5B8C0', paddingVertical: '3%', }}
                    onPress={() => CheckEditTask(item)}>
                    <Image style={{ height: 16, width: 18, }}
                        source={require('../../images/newEdit.png')} />
                    <Text style={{ marginHorizontal: '3%', fontSize: 15 }}>Edit Task</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{flexDirection: 'row',justifyContent:'center',alignItems:'center',
                     width: '50%', paddingVertical: '4%', }}
                     onPress={() => ShowDetail(item)}  >
                    <Text style={{ marginHorizontal: '3%', fontSize: 15 }}>More Detail</Text>
                    <Image style={{ height: 13, width: 9, }}
                        source={require('../../images/newDetail.png')} />
                </TouchableOpacity>
            </View>
        </View>
        )
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
                title='Task Manager'
                renderLeft={() => {
                    return (
                        <Image
                            source={require('../../images/home.png')}
                            style={{ width: 28, height: 28 }} />
                    );
                }}
                onPressLeft={() => {
                    // navigation.openDrawer()
                    navigation.toggleDrawer()
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
                {isService == 'ToDo' ?
                    <Pressable style={[styles.tabButton, { backgroundColor: '#4F46BA' }]} onPress={() => checkValue("ToDo")}>
                        <Text style={[styles.tabButtonText, { color: '#fff' }]}>To-Do</Text>
                    </Pressable>
                    :
                    <Pressable style={styles.tabButton} onPress={() => checkValue("ToDo")}>
                        <Text style={[styles.tabButtonText, { color: '#141516' }]}>To-Do</Text>
                    </Pressable>
                }
                {isService == 'Done' ?
                    <Pressable style={[styles.tabButton, { backgroundColor: '#4F46BA' }]} onPress={() => checkValue("Done")}>
                        <Text style={[styles.tabButtonText, { color: '#fff' }]}>Done</Text>
                    </Pressable>
                    :
                    <Pressable style={styles.tabButton} onPress={() => checkValue("Done")}>
                        <Text style={[styles.tabButtonText, { color: '#141516' }]}>Done</Text>
                    </Pressable>
                }
            </View>
            {/* <View style={{ marginTop: '3%' }}> */}
            {IsLodding.taskLodding == true ?
                <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                :
                <View style={{ marginVertical: '2%', flex: 1 }}>
                    <View style={{ marginVertical: '1%' }}>
                        <Text style={{ marginHorizontal: '3%', color: '#000000', fontWeight: 'bold' }}>Task List</Text>
                    </View>
                    <View>
                        <FlatList
                            contentContainerStyle={{
                                flexGrow:1,
                                paddingBottom:50
                            }}
                            data={allTask}
                            renderItem={AllView}
                            ListEmptyComponent={() => (!allTask.length ?
                                <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No Records Found</Text>
                                : null)}
                            refreshing={refreshing}
                            ListFooterComponent={renderFooter}
                            onRefresh={handleRefresh}
                            onEndReachedThreshold={0.4}
                            onEndReached={() => LoadMore()}
                            //keyExtractor={item => item.id}
                            keyExtractor={(item, index) => String(index)}
                        />
                    </View>
                </View>
            }
            {/* </View> */}
            <BottomSheet modalProps={{
                animationType: 'fade',
                hardwareAccelerated: true,
                onRequestClose: () => { setIsVisible(false); }
            }}
                isVisible={isVisible}>
                <View style={{ backgroundColor: '#fff', paddingHorizontal: '3%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', marginVertical: '2%', justifyContent: 'space-between', }}>
                        <Text style={styles.modalText}>Edit Task</Text>
                        <Pressable style={styles.askTitleEdit}
                            onPress={() => setIsVisible(false)}>
                            <Image style={{ height: 14, width: 14, }}
                                source={require('../../images/cross_blackIos.png')}
                            />
                        </Pressable>
                    </View>
                    <View style={styles.inputFields}>
                        <Image style={styles.icon}
                            source={require('../../images/user.png')}
                        />
                        <TextInput
                            placeholder="Meeting with Mr.George"
                            placeholderTextColor='#4A4A4A'
                            value={title}
                            onChangeText={e19 => settitle(e19)}
                            style={{ paddingRight: '5%', flex: 1,marginLeft:responsiveWidth(2),marginTop:responsiveHeight(0.50) }}
                        />
                        {!title.length ?
                            <Text style={{ fontSize: 15, marginRight: '2%', color: 'red' }}>*</Text>
                            : null}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable
                        // onPress={showDatepicker}
                        >
                            <View style={styles.pickers}>
                                <Image style={{ height:responsiveHeight(3), width:responsiveWidth(5.70), marginTop: responsiveHeight(0.10), marginLeft:responsiveHeight(0.10) }}
                                    source={require('../../images/DOB.png')} />
                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        style={{ backgroundColor: '', marginTop: '-5%', width: '100%' }}
                                        value={date}
                                        mode={mode}
                                        minimumDate={new Date()}
                                        // is24Hour={true}
                                        display="default"
                                        onChange={onChangeFrom}
                                    />)}
                                {Platform.OS == 'ios' ? <View>
                                    {text == true ? <Text style={{ marginTop: '5%', fontSize: 12, color: '#000000', }}>From</Text> : null}
                                </View>
                                    :
                                    <View>
                                        {text == true ?
                                            <Text style={{ marginTop: '5%',marginLeft:responsiveWidth(2.50), fontSize: 12, color: '#000000', paddingRight: '15%' }}>From</Text>
                                            :
                                            <Text style={{ marginTop: '5%', marginLeft:responsiveWidth(2.50),fontSize: 12, color: '#000000' }}>{moment(date).format('MM/DD/YYYY')}</Text>
                                        }
                                    </View>
                                }
                            </View>
                        </Pressable>
                        <Dropdown
                            style={styles.dropdown3}
                            placeholderStyle={styles.placeholderStyle3}
                            selectedTextStyle={styles.selectedTextStyle3}
                            data={data}
                            maxHeight={100}
                            labelField="label"
                            valueField="value"
                            placeholder='Status'
                            value={Status}
                            onChange={item => {
                                setStatus(item.value);
                            }}
                            renderLeftIcon={() => (
                                <Image
                                    style={[styles.icon, { height:responsiveHeight(3.50), width:responsiveWidth(6.50),marginTop:responsiveHeight(0),marginLeft:responsiveWidth(1) }]}
                                    source={require('../../images/transgender.png')}
                                />)}
                        />
                    </View>
                    {IsLodding.editlodding == true ? <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '5%' }} /> : null}
                    <Pressable
                        style={styles.updateBtn}
                        onPress={() => EditFunction(temObject)} >
                        <Text style={styles.textStyle}>Update</Text>
                    </Pressable>
                </View>
            </BottomSheet>
            <BottomSheet modalProps={{
                animationType: 'fade', hardwareAccelerated: true,
                onRequestClose: () => { HideDetail() }
            }} isVisible={detail}>
                <View style={{ backgroundColor: '#fff', paddingHorizontal: '3%',paddingBottom:20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', marginVertical: '2%', justifyContent: 'space-between', }}>
                        <Text style={styles.modalText}>Task Detail</Text>
                        <Pressable style={styles.askTitleEdit}
                            onPress={() => HideDetail()}>
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
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', fontSize: 15, color: '#000000' }]}>{detailObject.name}</Text>
                            {detailObject.mobile ? <TouchableOpacity >
                                <Text style={[styles.DetailCampTitle, { color: '#000000' }]}>{detailObject.mobile}</Text>
                            </TouchableOpacity> : null}
                            {detailObject.email ? <TouchableOpacity onPress={() => Linking.openURL(`mailto:${detailObject.email}`)}>
                                <Text style={[styles.DetailCampTitle, { color: '#000000' }]}>{detailObject.email}</Text>
                            </TouchableOpacity> : null}
                        </View>
                        <View style={{ marginRight: '2%', justifyContent: 'center' }}>
                            {detailObject.status === 'Completed' ?
                                <Text style={{ backgroundColor: 'green', color: '#fff', paddingHorizontal: '3%', borderRadius: 20 }}>
                                    {detailObject.status.charAt(0).toUpperCase() + detailObject.status.slice(1)}</Text>
                                :
                                <Text style={{ backgroundColor: 'red', color: '#fff', paddingHorizontal: '3%', borderRadius: 20 }}>
                                    {detailObject.status.charAt(0).toUpperCase() + detailObject.status.slice(1)}</Text>}
                        </View>
                    </View>
                    {detailObject.title ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Title</Text> : null}
                    <Text style={styles.DetailCampTitle}>{detailObject.title ? detailObject.title : null}</Text>
                    {detailObject.taskFor ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Task For</Text> : null}
                    <Text style={styles.DetailCampTitle}>{detailObject.taskFor ? detailObject.taskFor : null}</Text>
                    {detailObject.reletedTo ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Related To</Text> : null}
                    <Text style={styles.DetailCampTitle}>{detailObject.reletedTo ? detailObject.reletedTo : null}</Text>
                    {detailObject.DueData ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Due Data</Text> : null}
                    <Text style={styles.DetailCampTitle}>{detailObject.reletedTo ? detailObject.DueData : null}</Text>
                    {detailObject.status ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Status</Text> : null}
                    <Text style={styles.DetailCampTitle}>{detailObject.status ? detailObject.status : null}</Text>
                    {detailObject.priority ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Priority</Text> : null}
                    <Text style={styles.DetailCampTitle}>{detailObject.priority ? detailObject.priority : null}</Text>
                    {detailObject.description ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Description</Text> : null}
                    <Text style={styles.DetailCampTitle}>{detailObject.priority ? detailObject.description : null}</Text>
                </View>
            </BottomSheet>
        </View>
    );
}