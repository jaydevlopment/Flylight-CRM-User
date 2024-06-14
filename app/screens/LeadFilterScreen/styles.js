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
        height: 20,
        width: 18,
        marginTop: '3%',
        marginLeft: '3%'
    },
    dropdown: {
        height: 48,
        borderColor: '#000000',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      placeholderStyle: {
        fontSize: 12,
        color: '#111111'
      },
      selectedTextStyle: {
        fontSize: 12,
        color: '#111111'
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