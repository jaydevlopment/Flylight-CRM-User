import { StyleSheet, Dimensions } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    image2: {
        // marginLeft: '2%',
        width: 25,
        height: 25,
    },

    image3: {
        width: 7.11,
        height: 15,
        marginTop: '3%',
        // marginRight: '3%'
    },
    headerView: {
        flexDirection: 'row',
        height: "28%",
        // marginTop:'0%'
    },
    headerView2: {
        backgroundColor: 'red',
        backgroundColor: '#017EEB',
        paddingTop: '3%'
    },
    menus: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        paddingHorizontal: '3%',
        borderColor: '#444444',
        // backgroundColor: 'red',
        width: '65%'
    },
    menusTop: {
        marginTop: '3%',
        padding: 5,
        // backgroundColor:'green'
    },
    items: {
        // marginLeft: '5%',
        fontSize: 17,
        color: '#444444',
        fontWeight: 'bold',
        paddingBottom: '8%',
        fontFamily: 'Roboto',
        marginLeft:responsiveWidth(2),
         marginTop:responsiveHeight(-0.25),
        // textAlign:'center'
    }

});

export default styles;