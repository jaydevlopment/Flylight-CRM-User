import React, { useState, useEffect } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView,
    Image, Alert, StatusBar, SafeAreaView, Dimensions, Platform, ActivityIndicator
} from 'react-native';
import styles from './styles';
// import { useDispatch, useSelector, connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
// import { registerAction } from '../../redux/Actions/index'

export default function Register({ navigation }) {
    const { width, height } = Dimensions.get('window');
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Phone, setPhone] = useState("")
    const [Org, setOrg] = useState("")
    const [Password, setPassword] = useState("")
    const [Cpassword, setCpassword] = useState("")
    const [IsLodding, setIsLodding] = useState(false)
    // const dispatch = useDispatch()
    // const registerData = useSelector(state => state.register.data)

    // useEffect(() => {
    //     if (registerData) {
    //         if (registerData.status == "success") {
    //             setName(""), setEmail(""), setPhone("")
    //             setOrg(""), setPassword(""), setCpassword("")
    //             setIsLodding(false)
    //             dispatch(registerAction.clearResponse())
    //             navigation.navigate("Varification", { uid: registerData.data.uid })
    //         }
    //         else if (registerData.status == "failed") {
    //             setIsLodding(false)
    //             dispatch(registerAction.clearResponse())
    //             Alert.alert(registerData.message)
    //         }
    //     }
    //     else {
    //     }
    // }, [registerData])

    const RegisterFunction = () => {
        if (Name == "") {
            Alert.alert(" Enter name ")
        }
        else if (Email == "") {
            Alert.alert("Enter Email")
        }
        else if (Phone == "") {
            Alert.alert("Phone")
        }
        else if (Org == "") {
            Alert.alert(" Enter Organization ")
        }
        else if (Password == "") {
            Alert.alert("Enter Password")
        }
        else if (Cpassword == "") {
            Alert.alert(" Enter Re-Password ")
        }
        else {
            const data = {
                name: Name,
                email: Email,
                organization: Org,
                password: Password,
                c_password: Cpassword,
                phone: Phone,
            }
            setIsLodding(true)
            Alert.alert('API Implemented Inprogress')
            setIsLodding(false)
            // dispatch(registerAction.register(data));
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                // dark-content, light-content and default
                hidden={false}
                //To hide statusBar
                backgroundColor="#2B6EF2"
                //Background color of statusBar only works for Android
                translucent={false}
                //allowing light, but not detailed shapes
                networkActivityIndicatorVisible={true}
            />
            <LinearGradient colors={['#2B6EF2', '#8DB3FF', '#8DB3FF']}
                style={{
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                }}
            >
                <View
                    style={Platform.OS == 'ios' ?
                        { margin: 15, } : { margin: 5, }}>
                    <Text style={{
                        textAlign: 'center',
                        fontWeight: 'bold', fontSize: 22,
                        color: 'white'
                    }}>Register </Text>
                    <Text style={{
                        textAlign: 'center',
                        fontWeight: 'bold', fontSize: 14,
                        color: 'white'
                    }}></Text>
                </View>
            </LinearGradient>
            <ScrollView
                style={styles.boxView}>
                <Text style={{
                    margin: '3%', marginTop: '2%',
                    marginBottom: '-1%', color: '#2F394E',
                    fontFamily: 'Roboto',
                    fontSize: 15
                }}>Enter Name</Text>

                <View style={styles.inputFields2}>
                    <Image
                        style={Platform.OS == 'ios' ? [styles.icon, {
                            height: 22, width: 21,
                            margin: '3%', marginLeft: '2%'
                        }] : [styles.icon, {
                            height: 22, width: 21,
                            margin: '3%', marginLeft: '2%'
                        }]}
                        source={require('../../images/user.png')}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        value={Name}
                        onChangeText={e5 => setName(e5)}
                        placeholder="Name"
                    />
                </View>

                <Text style={{
                    margin: '3%', marginBottom: '-1%',
                    color: '#2F394E', fontFamily: 'Roboto',
                    marginTop: '-2%', fontSize: 15
                }}>Email </Text>

                <View style={styles.inputFields2}>
                    <Image
                        style={Platform.OS == 'ios' ?
                            [styles.icon, {
                                height: 18, width: '7%',
                                marginRight: '2.5%', margin: '3%', marginLeft: '2.5%'
                            }] :
                            [styles.icon, {
                                height: 18, width: '7%',
                                marginRight: '2.5%', marginTop: '5%', margin: '3%', marginLeft: '2.5%'
                            }]}
                        source={require('../../images/mail.png')}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        value={Email}
                        onChangeText={e => setEmail(e)}
                        placeholder="example@gmail.com"
                    />
                </View>

                <Text style={{
                    marginLeft: '3%', fontFamily: 'Roboto',
                    marginRight: '5%', color: '#2F394E', marginBottom: '-1%',
                    fontSize: 15
                }}>Phone</Text>

                <View style={styles.inputFields2}>
                    <Image
                        style={Platform.OS == 'ios' ? [styles.icon, {
                            height: 26, width: '4.5%',
                            margin: '2%', marginRight: '4%', marginLeft: '3%'
                        }] :
                            [styles.icon, {
                                height: 26, width: '5.6%',
                                marginTop: '3.2%', marginRight: '4%', marginLeft: '3%'
                            }]}
                        source={require('../../images/mobile.png')}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        value={Phone}
                        keyboardType='numeric'
                        onChangeText={e8 => setPhone(e8)}
                        placeholder="Phone"
                    />
                </View>

                <Text style={{
                    margin: '3%',
                    marginBottom: '-1%', color: '#2F394E',
                    fontFamily: 'Roboto', marginTop: '-2%',
                    fontSize: 15
                }}>Organization</Text>

                <View style={styles.inputFields2}>
                    <Image
                        style={Platform.OS == 'ios' ? [styles.icon, {
                            height: 24, width: 24,
                            margin: '2%'
                        }]
                            : [styles.icon, {
                                height: 24, width: 24,
                                margin: '2%', marginTop: '3.5%'
                            }]}
                        source={require('../../images/globe.png')}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        value={Org}
                        onChangeText={e4 => setOrg(e4)}
                        placeholder="Organization"
                    />
                </View>
                <Text style={{
                    margin: '3%', marginBottom: '-1%',
                    color: '#2F394E', fontFamily: 'Roboto', marginTop: '-2%',
                    fontSize: 15
                }}>Password</Text>

                <View style={styles.inputFields2}>
                    <Image
                        style={Platform.OS == 'ios' ? [styles.icon, {
                            height: 22, width: 21,
                            margin: '2.5%'
                        }] :
                            [styles.icon, {
                                height: 22, width: 21,
                                margin: '2.5%', marginTop: '3.5%'
                            }]}
                        source={require('../../images/icon-password.png')}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        value={Password}
                        onChangeText={e3 => setPassword(e3)}
                        placeholder="Password"
                    />
                </View>
                <Text style={{
                    margin: '3%', marginBottom: '-1%',
                    color: '#2F394E', fontFamily: 'Roboto',
                    marginTop: '-2%', fontSize: 15
                }}>Re-Enter Password </Text>

                <View style={styles.inputFields2}>
                    <Image
                        style={Platform.OS == 'ios' ? [styles.icon, {
                            height: 22, width: 21,
                            margin: '2.5%'
                        }] :
                            [styles.icon, {
                                height: 22, width: 21,
                                margin: '2.5%', marginTop: '3.5%'
                            }]}
                        source={require('../../images/icon-password.png')}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        value={Cpassword}
                        onChangeText={e2 => setCpassword(e2)}
                        placeholder="Re-Enter Password "
                    />
                </View>

                {IsLodding == true ?
                    <ActivityIndicator size="small" color="#0000ff" />
                    :
                    <View />
                }

                <TouchableOpacity style={styles.button} onPress={() => RegisterFunction()}>
                    <Text style={styles.textButton}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button1}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.textButton}>To Sign In Press Here </Text>
                </TouchableOpacity>

            </ScrollView>
            {/* </SafeAreaView> */}
        </View>
    );
}


