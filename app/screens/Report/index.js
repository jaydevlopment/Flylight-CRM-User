import React, { useState, useEffect } from "react";
import { ActivityIndicator, FlatList, View, Text, Pressable, Dimensions, TouchableOpacity, ToastAndroid } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Image } from 'react-native-elements';
import { Card } from 'react-native-paper'
import styles from "./styles";
import Header from '../../component/header'
import { historyAction } from '../../redux/Actions/index'
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import PieChart from 'react-native-pie-chart';
import {responsiveHeight, responsiveWidth,responsiveFontSize} from "react-native-responsive-dimensions";

export default function Report({ navigation }) {
    const [totalChart, settotalChart] = useState({
        calledLeads: 0,
        pendingLeads: 0,
        totalLeads: 0,
        reportLodding: true,
        campLodding: true,
        ChartLodding: false
    })
    const [filterKeys, setfilterKeys] = useState([])
    const [value, setValue] = useState(null);
    // const [Opportunity, setOpportunity] = useState('7-Days');
    const [startDate, setstartDate] = useState(new Date());
    const [startmode, setstartMode] = useState('date');
    const [startshow, setstartshow] = useState(false);
    const [starttext, setstarttext] = useState(true)

    const [enddate, setendDate] = useState(new Date());
    const [endmode, setendMode] = useState('date');
    const [endshow, setendShow] = useState(false);
    const [endtext, setendtext] = useState(true)

    const { width, height } = Dimensions.get('window');
    const [Report, setReport] = useState()
    const [campaignData, setcampaignData] = useState([])

    const dispatch = useDispatch()
    const UserData = useSelector(state => state.auth.data)
    const reportData = useSelector(state => state.history.getReportList)
    const CampData = useSelector(state => state.history.campData)

    const widthAndHeight = 160
    const series = [totalChart.calledLeads, totalChart.pendingLeads]
    const sliceColor = ['#6191F3', '#FFBC04']

    useEffect(() => {
        GetList()
    }, [])

    const GetList = () => {
        const data = {
            uid: UserData.data.uid,
            org_uid: UserData.data.org_uid,
            profile_id: UserData.data.cProfile.toString(),
            filters: []
        }
        dispatch(historyAction.reportList(data, UserData.data.token));
        dispatch(historyAction.CampaignList(data, UserData.data.token));
    }

    useEffect(() => {
        if (reportData) {
            if (reportData.status == "success") {
                let total = reportData.data.leadsCalled.count + reportData.data.leadsPending.count
                settotalChart({
                    calledLeads: reportData.data.leadsCalled.count,
                    pendingLeads: reportData.data.leadsPending.count,
                    totalLeads: total,
                    reportLodding: false
                })
            }
            else if (reportData.status == "failed") {
                settotalChart({
                    ...totalChart,
                    reportLodding: false
                })
                ToastAndroid.show(reportData.message, ToastAndroid.SHORT);
            }
        }
    }, [reportData])

    useEffect(() => {
        if (CampData) {
            if (CampData.status == "success") {
                setcampaignData(CampData.data.rows)
                settotalChart({
                    ...totalChart,
                    campLodding: false
                })
            }
            else if (CampData.status == "failed") {
                settotalChart({
                    ...totalChart,
                    campLodding: false
                })
                ToastAndroid.show(CampData.message, ToastAndroid.SHORT);
                dispatch(historyAction.clearResponse())
            }
        }
    }, [CampData])

    const Search = () => {
        let StartDate = moment(startDate).format("YYYY-MM-DD")
        let EndDate = moment(enddate).format("YYYY-MM-DD")
        let data = {
            uid: UserData.data.uid,
            org_uid: UserData.data.org_uid,
            profile_id: UserData.data.cProfile.toString(),
            filters: []
        }
        if (starttext == false && endtext == false || value !== null) {
            if (StartDate !== EndDate) {
                if (starttext == true) {
                    ToastAndroid.show("Please Select Start Date", ToastAndroid.SHORT);
                }
                else if (endtext == true) {
                    ToastAndroid.show("Please Select End Date", ToastAndroid.SHORT);
                }
                else {
                    if (StartDate <= EndDate) {
                        settotalChart({
                            ...totalChart,
                            reportLodding: true
                        })
                        data.filters.push({ gte: StartDate, key: 'created_at' },
                            { lte: EndDate, key: 'created_at' })
                        dispatch(historyAction.reportList(data, UserData.data.token));
                    }
                    else {
                        ToastAndroid.show("Wrong Format", ToastAndroid.SHORT);
                    }
                }
            }
            else if (StartDate == EndDate && starttext == false && endtext == false) {
                settotalChart({
                    ...totalChart,
                    reportLodding: true
                })
                data.filters.push({ gte: StartDate, key: 'created_at' },
                    { lte: EndDate, key: 'created_at' })
                dispatch(historyAction.reportList(data, UserData.data.token));
            }
            if (value !== null) {
                if (value == 'none') {
                    ToastAndroid.show('Please Select Campaign', ToastAndroid.SHORT);
                }
                else {
                    settotalChart({
                        ...totalChart,
                        reportLodding: true
                    })
                    data.filters.push({ eq: value, key: 'campaign' })
                    dispatch(historyAction.reportList(data, UserData.data.token));
                }
            }
            setfilterKeys(data.filters)
          console.log('........................',data.filters)
        }
        else {
            ToastAndroid.show('Please Select Search Criteria', ToastAndroid.SHORT);
        }
    }

    const Reset = () => {
        setValue(null)
        setstarttext(true)
        setendtext(true)
        setstartDate(new Date())
        setendDate(new Date())
        setfilterKeys([])
        settotalChart({
            ...totalChart,
            reportLodding: true
        })
        GetList()
    }

    const [refreshing, setrefreshing] = useState(false)
    const handleRefresh = () => {
        console.log(refreshing)
        settotalChart({
            ...totalChart,
            reportLodding: true
        })
        GetList()
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

    const checkStatusValue = (value) => {
        if (value == 'All') {
            navigation.navigate('LeadFilterScreen', { filters: filterKeys, value: 'All' })
            setfilterKeys([])
            Reset()
        }
        else if (value == 'Called') {
            navigation.navigate('LeadFilterScreen', { filters: filterKeys, value: 'Called' })
            setfilterKeys([])
            Reset()
        }
        else if (value == 'Pending') {
            navigation.navigate('LeadFilterScreen', { filters: filterKeys, value: 'Pending' })
            setfilterKeys([])
            Reset()
        }
    }

    return (
        <View style={{ flex: 1, }}>
            <Header
                title='Report'
                renderLeft={() => {
                    return (
                        <Image source={require('../../images/home.png')} style={{ width: 28, height: 28 }} />);
                }}
                onPressLeft={() => {
                    navigation.toggleDrawer() // navigation.openDrawer() 
                }}
                renderRight={() => {
                    return (<Image source={require('../../images/Notifications.png')} style={{ width: 28, height: 28 }} />);
                }}
                onPressRight={() => { navigation.navigate('Notifications') }}
            />

            {totalChart.reportLodding && totalChart.campLodding == true ?
                <ActivityIndicator size="small" color="#0000ff" />
                :
                <View style={{ flex: 1, marginVertical: '2%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: '2%' }}>
                        <Pressable style={styles.pickerStyle} onPress={showDatepicker} >
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={Platform.OS == 'ios' ? [styles.icon] : [styles.icon, { marginTop: '2%' }]}
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
                                        <Text style={{ marginTop: '10%', fontSize: 12, color: '#000000' }}>From Date</Text>
                                        :
                                        null
                                    }
                                </View>
                                    :
                                    <View>
                                        {starttext == true ?
                                            <Text style={{ marginTop: responsiveHeight(0.70), fontSize: 12, color: '#000000', marginLeft: responsiveWidth(3) }}>From Date</Text>
                                            :
                                            <Text style={{ marginTop: responsiveHeight(0.70), fontSize: 12, color: '#000000',marginLeft: responsiveWidth(3) }}>{moment(startDate).format('DD/MM/YYYY')}</Text>
                                        }
                                    </View>
                                }
                            </View>
                        </Pressable>
                        <Pressable style={styles.pickerStyle} onPress={showEDatepicker} >
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={Platform.OS == 'ios' ? [styles.icon] : [styles.icon, { marginTop: '2%' }]}
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
                                    {endtext == true ?
                                        <Text style={{ marginTop: '10%', fontSize: 12, color: '#000000' }}>To Date</Text>
                                        :
                                        null
                                    }
                                </View>
                                    :
                                    <View>
                                        {endtext == true ?
                                            <Text style={{ marginTop: responsiveHeight(0.70), fontSize: 12, color: '#000000', marginLeft: responsiveWidth(3) }}>To Date</Text>
                                            :
                                            <Text style={{ marginTop: responsiveHeight(0.70), fontSize: 12, color: '#000000',  marginLeft: responsiveWidth(3) }}>{moment(enddate).format('DD/MM/YYYY')}</Text>
                                        }
                                    </View>
                                }
                            </View>
                        </Pressable>
                    </View>
                    <View style={styles.container3}>
                        {/* <Text style={{ color: '#000000', paddingBottom: '2%', fontSize: 20 }}>Select Campaign</Text> */}
                        <View style={{ flexDirection: 'row' }}>
                            <Dropdown
                                style={[styles.dropdown3, { width: '60%' }]}
                                placeholderStyle={styles.placeholderStyle3}
                                selectedTextStyle={styles.selectedTextStyle3}
                                iconStyle={styles.iconStyle3}
                                data={campaignData}
                                search={true}
                                searchPlaceholder='Search'
                                maxHeight={160}
                                labelField="campaign_name"
                                valueField="id"
                                placeholder='Select Campaign'
                                value={value}
                                onChange={item => { setValue(item.id); }}
                                renderLeftIcon={() => (<View>
                                    <Image source={require('../../images/list.png')}
                                        style={{ height: 23, width: 17, marginRight: '2%',marginLeft:responsiveWidth(1.40) }} />
                                </View>)}
                            />
                            <TouchableOpacity style={[styles.button,]} onPress={() => Search()} >
                                <Text style={styles.textButton}>Search</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginVertical: '3%' }} onPress={() => Reset()}>
                                <Image source={require('../../images/refreshButton.png')} style={{ height: 24, width: 24,marginLeft:responsiveWidth(1) }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {totalChart.reportLodding == true ?
                        <ActivityIndicator size="small" color="#0000ff" />
                        :
                        <FlatList
                            contentContainerStyle={{
                                // display: "flex",
                                flexGrow: 1,
                            }}
                            data={[{}]}
                            keyExtractor={() => 'childrenkeyflatlist'}
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            renderItem={() =>
                                <View style={{ marginHorizontal: '3%' }}>
                                    <Card style={{ padding: '3%' }}>
                                        <Text style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 16, color: '#000000' }}>Leads</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <View style={{ justifyContent: 'center' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={[styles.charttextIndicator, { backgroundColor: '#FFBC04' }]}>
                                                    </View>
                                                    <Text style={styles.chartText}>  Pending</Text>
                                                    <Text style={styles.chartText}>  {totalChart.pendingLeads}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginTop: '3%' }}>
                                                    <View style={[styles.charttextIndicator, { backgroundColor: '#6191F3' }]}>
                                                    </View>
                                                    <Text style={styles.chartText}>  Called</Text>
                                                    <Text style={styles.chartText}>  {totalChart.calledLeads}</Text>
                                                </View>
                                            </View>
                                            {totalChart.calledLeads || totalChart.pendingLeads ?
                                                <PieChart
                                                    widthAndHeight={widthAndHeight}
                                                    series={series}
                                                    sliceColor={sliceColor}
                                                /> :
                                                <View style={{ height: 140, width: 140, borderRadius: 80 }}>
                                                    <Text style={{ textAlign: 'center', marginTop: '40%' }}>Leads Zero</Text>
                                                </View>}
                                        </View>
                                    </Card>

                                    <Card style={[styles.card, { backgroundColor: '#6FD3F5' }]}>
                                        <TouchableOpacity onPress={() => checkStatusValue("All")} >
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View>
                                                    <Text style={{ fontSize: 20, color: '#FFFFFF', fontFamily: 'Roboto' }} >Total Leads</Text>
                                                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }} >{totalChart.totalLeads}</Text>
                                                </View>
                                                <View style={{
                                                    height: 37, width: 42, borderWidth: 2, marginTop: '3%',
                                                    padding: '2.5%', borderRadius: 10, borderColor: '#fff',
                                                    backgroundColor: '#04AEE8'
                                                }}>
                                                    <Image
                                                        source={require('../../images/arrow_white.png')}
                                                        style={{ height: 13, width: 20, }}
                                                    />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </Card>
                                    <Card style={[styles.card, { backgroundColor: '#2AEF4B' }]}>
                                        <TouchableOpacity onPress={() => checkStatusValue("Called")} >
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View>
                                                    <Text style={{ fontSize: 20, color: '#FFFFFF', fontFamily: 'Roboto' }} >Lead Called</Text>
                                                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }} >{totalChart.calledLeads}</Text>
                                                </View>
                                                <View style={{
                                                    height: 37, width: 42, borderWidth: 2, marginTop: '3%',
                                                    padding: '2.5%', borderRadius: 10, borderColor: '#fff', backgroundColor: '#2AEF4B'
                                                }}>
                                                    <Image
                                                        source={require('../../images/arrow_white.png')}
                                                        style={{ height: 13, width: 20, }}
                                                    />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </Card>
                                    <Card style={[styles.card, { backgroundColor: '#EF2AE2' }]}>
                                        <TouchableOpacity onPress={() => checkStatusValue("Pending")} >
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View>
                                                    <Text style={{ fontSize: 20, color: '#FFFFFF', fontFamily: 'Roboto' }} >Leads Pending</Text>
                                                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }} >{totalChart.pendingLeads}</Text>
                                                </View>
                                                <View style={{
                                                    height: 37, width: 42, borderWidth: 2, marginTop: '3%',
                                                    padding: '2.5%', borderRadius: 10, borderColor: '#fff', backgroundColor: '#EF2AE2'
                                                }}>
                                                    <Image
                                                        source={require('../../images/arrow_white.png')}
                                                        style={{ height: 13, width: 20, }}
                                                    />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </Card>
                                </View>}
                        />
                    }
                </View>
            }
        </View>
    );
}