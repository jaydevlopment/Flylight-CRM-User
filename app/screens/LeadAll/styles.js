import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

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
        paddingVertical:'1%'
    },
    tabButtonText: {
        padding: 5,
        textAlign: 'center'
    },
    pickerStyle: {
        borderWidth: 0.5,
        borderColor: '#000000',
        borderRadius: 10,
        paddingVertical: 11,
        marginTop: '1%',
        width: '47%'
    },
    icon: {
        height: responsiveHeight(3.20),
        width: responsiveWidth(5.80),
        marginTop: '3%',
        marginLeft: responsiveWidth(3)
    },
    dropdown: {
        height: 48,
        borderColor: '#000000',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      placeholderStyle: {
        fontSize: 13,
        color: '#111111',
        marginLeft:responsiveWidth(-1.80)
      },
      selectedTextStyle: {
        fontSize: 13,
        color: '#111111',
        marginLeft:responsiveWidth(-1.80)
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      button: {
        backgroundColor: '#3373F3',
        borderRadius: 10,
        marginHorizontal: '3%',
        padding: 7
      },
      btnText: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#fff',
        textAlign: 'center'
      },

});

export default styles;