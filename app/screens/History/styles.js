
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  pickerStyle: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    width: '49%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '3.5%'
  },
  pickerText: {
    textAlignVertical: 'center',
    fontSize: 13,
    color: '#000000',
  },
  icon: {
    height: 20,
    width: 18,
    marginLeft: '3%'
  },
  dropdown: {
    paddingVertical: '2%',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 12,
    color: '#111111'
  },
  selectedTextStyle: {
    fontSize: 12,
    color: '#000000'
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
  listData: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DBDBDB',
    margin: '3%',
    // marginTop: '-0.5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemStatus: {
    paddingHorizontal: '3%',
    paddingVertical: '0.5%',
    borderRadius: 10,
    color: '#fff'
  }

});

export default styles