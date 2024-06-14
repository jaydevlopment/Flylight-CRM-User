

import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabStyle: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: '-5%',
        marginHorizontal: '10%',
        borderRadius: 20
    },
    tabButton: {
        width: '34%',
        borderRadius: 20,
        paddingVertical: '1%',
        zIndex: 1,
    },
    tabButtonText: {
        padding: 5,
        textAlign: 'center'
    },
    modalView: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#46484B',
        textAlignVertical:'center'
    },
    inputFields: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 10,
        marginVertical: '3%',
    },
    icon: {
        height: responsiveHeight(3),
        width: responsiveWidth(5.50),
        marginLeft:responsiveHeight(1.50),
        marginTop: responsiveHeight(2.20)
    },
    pickers: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: '#000000',
        padding: 10,
        paddingHorizontal: '7%',
        borderRadius: 10
    },
    dropdown3: {
        height: 42,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 8,
        width: '50%',
        // marginRight: '3%',
        paddingHorizontal: 8,
    },
    placeholderStyle3: {
        fontSize: 16,
        borderColor: '#000000',
        marginLeft:responsiveWidth(3.50)
    },
    selectedTextStyle3: {
        fontSize: 16,
        borderColor: '#000000',
    },
    updateBtn: {
        backgroundColor: '#114DC4',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: '20%',
        marginVertical: '4%'
    },
    textStyle: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15,
        paddingHorizontal: 20
    },
    askModel: {
        marginHorizontal: '5%',
        marginTop: '50%',
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    askTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#3373F3',
        color: 'white',
        textAlign: "center",
        paddingVertical: '3%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    askTitleR: {
        margin: '5%',
        marginRight: '3%',
        marginTop: '-11.5%',
        alignSelf: 'flex-end',
        padding: 10
    },
    askTitleEdit: {
        // margin: '5%',
        // marginRight: '3%',
        // marginTop: '-11.5%',
        alignSelf: 'flex-end',
        padding: 10,
    },
    listData: {
        padding: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000000',
        marginHorizontal:'3%',
        marginVertical: '1%',
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    DetailCampTitle: {
        fontSize: 14,
        // color: '#000000',
        color: '#46484B',
        fontFamily: 'Roboto'
      },

});

export default styles