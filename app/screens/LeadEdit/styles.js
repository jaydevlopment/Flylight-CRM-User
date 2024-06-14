import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listData: {
        padding: 2,
        borderBottomWidth: 1,
        borderRadius: 10,
        borderColor: '#DBDBDB',
        marginVertical: '1%',
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    inputFields: {
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#C3C7E5',
        borderRadius: 10,
        marginTop: '3%',
        height: 45
    },
    container3: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 48,
        borderColor: '#C3C7E5',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginTop:'2%'
    },
    placeholderStyle: {
        fontSize: 12,
        color: '#111111'
    },
    selectedTextStyle: {
        fontSize: 12,
        color: '#111111'
    },
    icon: {
        height: 20,
        width: 18,
        marginTop: '3%',
        marginLeft: '3%'
    },
    button: {
        backgroundColor: '#3373F3',
        borderRadius: 10,
        marginHorizontal: '30%',
        marginVertical: '3%',
        padding: 10
    },
    // title: {
    //     margin: 20,
    //     fontSize: 28,
    //     color: '#1E263C',
    //     fontWeight: 'bold',
    //     textAlign: 'center',
    //     fontFamily:'Roboto'
    // },

    // inputFields2: {
    //     flexDirection: 'row',
    //     borderWidth: 1,
    //     padding: 3,
    //     paddingTop:0,
    //     paddingBottom:0,
    //     borderColor: '#C3C7E5',
    //     borderRadius: 10,
    //     margin: '3%',
    //     padding:'3%'
    //   },
    // button: {
    //     backgroundColor: '#3373F3',
    //     borderRadius: 18,
    //     margin: '3%',
    //     marginBottom: '5%'
    // },
    // button1: {
    //     backgroundColor: '#32CD32',
    //     borderRadius: 18,
    //     margin: '3%',
    //     marginTop:'-1%',
    //     marginBottom: '10%',
    // },
    // textButton: {
    //     paddingTop:15,
    //     paddingBottom:15,
    //     color: 'white',
    //     textAlign: 'center',
    //     fontSize: 15,
    //     fontFamily:'Roboto'
    // },
    // image: {
    //     height: 160,
    //     width: 200,
    //     borderRadius: 15,
    //     alignSelf: 'center',
    //     marginTop: '10%',
    // },

    // boxView: {
    //     backgroundColor: '#fff',
    //     margin: '5%',
    //     padding:'5%',
    //     marginTop: '-15%',
    //     borderRadius: 30,

    // },

});

export default styles;