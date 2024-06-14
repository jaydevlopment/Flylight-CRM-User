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
    textTitle: {
        fontWeight: '700',
    },
    textDainamic: {
        fontWeight: 'bold',
        color: '#2B6EF2'
    },
    infoText: {
        fontSize: 15,
        color: '#000000',
        fontFamily: 'Roboto'
    },
});

export default styles;