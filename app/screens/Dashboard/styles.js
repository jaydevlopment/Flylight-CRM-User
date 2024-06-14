import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    reView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '-10%',
        marginHorizontal: '3%',
        marginBottom:'1%'
    },
    cardBox: {
        borderRadius: 10,
        borderWidth: 2,
        padding: 10,
        paddingLeft: 17,
    },
    counter: {
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    },
    cardTitle: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#000000'
    },
    notifyImage: {
        height: 35,
        width: 35,
        marginVertical: '5%'
    },
    tabHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginVertical: '1%',
        marginHorizontal: '3%',
        borderRadius: 15,
    },
    tabStyle: {
        paddingVertical: 8,
        paddingHorizontal: 5,
        borderRadius: 15,
    },
    tabTextStyle: {
        fontSize: 16,
        paddingHorizontal: 10,
        color: '#000000'
    },
    parcentage: {
        position: 'absolute',
        fontSize: 20,
        color: '#fff'
    },
    opportunityBtn: {
        marginTop: '5%',
        borderRadius: 15,
        borderWidth: 1,
    },
    opportunityText: {
        paddingVertical: 10,
        paddingHorizontal: '10%',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'Roboto',
    },
    moreButton: {
        color: '#3072F2',
        paddingHorizontal: '5%',
        paddingVertical: '1%',
        textAlign: 'center',
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
    DetailCampTitle: {
        fontSize: 14,
        // color: '#000000',
        color: '#46484B',
        fontFamily: 'Roboto'
      },
});

export default styles;