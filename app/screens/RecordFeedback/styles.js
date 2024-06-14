import { StyleSheet, Dimensions, Platform } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
const { width, height } = Dimensions.get('window');
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
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 10,
        marginTop: '3%',
        height: Platform.OS == 'ios' ? height * 6.5 / 100 : height * 6.5 / 100
    },
    icon: {
        height: responsiveHeight(2.45),
        width: responsiveWidth(4.50),
        marginTop: responsiveHeight(1.75),
        marginHorizontal: responsiveWidth(2),
        marginLeft:responsiveWidth(3)
    },
    pickerStyle: {
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 10,
        // marginHorizontal: '3%',
        paddingVertical: 8,
        marginTop: '2%',
        width: '45%',
        height: Platform.OS == 'ios' ? height * 6.5 / 100 : height * 6.5 / 100
    },
    button: {
        backgroundColor: '#3373F3',
        borderRadius: 10,
        // alignSelf: 'center',
        margin: responsiveHeight(2),
    },
    textButton: {
        padding: 8,
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
    actionSheet: {
        marginTop: '2%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E8EAF5'
    },
    card: {
        borderWidth: 1,
        padding: 2,
        borderColor: '#000000',
        borderRadius: 10,
        marginTop: '2%',
        height: Platform.OS == 'ios' ? height * 6.5 / 100 : height * 6.5 / 100
    },
    cardBack: {
        backgroundColor: '#fff',
        padding: '5%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    }

});

export default styles;