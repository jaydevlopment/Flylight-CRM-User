import { StyleSheet ,Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({


    inputfields: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 8,
        paddingLeft: 12,
        width: '12%',
        marginLeft: '3%',
    },

    container: {
        flex: 1,
    },
    title: {
        margin: 24,
        fontSize: 28,
        color: '#1E263C',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Roboto',

    },

    button: {
        backgroundColor: '#3373F3',
        borderRadius: 18,
        // alignSelf: 'center',
        margin: '5%',
        marginBottom: '10%'
    },
    textButton: {
        paddingTop: 15,
        paddingBottom: 15,
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'Roboto'
    },
    image: {
        height: 160,
        width: 200,
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: '10%',
    },

    boxView: {
        backgroundColor: 'white',
        margin: '5%',
        marginTop: '-15%',
        borderRadius: 30,
    },

    cell: {
        // width: 50,
        // height: 50,
        // lineHeight: 38,
        height: height / 14, width: width /8,
        lineHeight:  height /18,
        fontSize: 20,
        padding: 5,
        backgroundColor: '#EAECEF',
        textAlign: 'center',
        borderRadius: 10,
        fontFamily: 'Roboto'
    },

});

export default styles;