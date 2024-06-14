import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    title: {
        margin: 24,
        fontSize: 28,
        color: '#1E263C',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Roboto'
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
        height: "65%",
        width: '45%',
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: '6%',
    },

    boxView: {
        backgroundColor: 'white',
        margin: '5%',
        marginTop: '-15%',
        borderRadius: 30,
    },
    inputFields: {
        flexDirection: 'row',
        borderWidth: 1,
        padding: 3,
        paddingTop:'0%',
        paddingBottom:'0%',
        borderColor: '#000000',
        borderRadius: 10,
        marginTop: '2%',
        marginLeft: '5%',
        marginRight: '5%'
    },
    icon: {
        height: 24,
        width: 22,
        marginRight: '2%',
        marginTop: '3%',
        marginLeft: '2%'
    },
});

export default styles;