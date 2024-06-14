import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        margin: 20,
        fontSize: 28,
        color: '#1E263C',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily:'Roboto'
    },

    inputFields2: {
        flexDirection: 'row',
        borderWidth: 1,
        padding: 3,
        paddingTop:0,
        paddingBottom:0,
        borderColor: '#000000',
        borderRadius: 10,
        margin: '3%',

      },
    button: {
        backgroundColor: '#3373F3',
        borderRadius: 18,
        margin: '3%',
        marginBottom: '5%'
    },
    button1: {
        backgroundColor: '#32CD32',
        borderRadius: 18,
        margin: '3%',
        marginTop:'-1%',
        marginBottom: '10%',
    },
    textButton: {
        paddingTop:15,
        paddingBottom:15,
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
        fontFamily:'Roboto'
    },
    image: {
        height: 160,
        width: 200,
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: '10%',
    },

    boxView: {
        backgroundColor: '#fff',
        margin: '5%',
        padding:'5%',
        marginTop: '-15%',
        borderRadius: 30,
        
    },

});

export default styles;