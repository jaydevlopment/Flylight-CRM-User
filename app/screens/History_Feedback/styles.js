
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  headerView: {
    backgroundColor: '#3373F3',
    height: '10%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  inputFields: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#C3C7E5',
    borderRadius: 10,
    marginTop: '3%',
    height: 45
  },
  icon: {
    height: 20,
    width: 18,
    marginHorizontal: '2%',
    marginVertical: '2%'
  },
  button: {
    backgroundColor: '#3373F3',
    borderRadius: 10,
    // alignSelf: 'center',
    marginTop: '2%',
  },
  textButton: {
    padding: 10,
    fontSize: 21,
    color: 'white',
    textAlign: 'center',
  },
  image2: {
    width: 28,
    height: 28
  },

  container3: {
    padding: 10,
  },
  dropdown3: {
    height: 50,
    borderColor: '#C3C7E5',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,

  },
  icon3: {
    marginRight: 5,
  },
  label3: {
    // position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle3: {
    fontSize: 13,
    color: '#B9BAC8'
  },
  selectedTextStyle3: {
    fontSize: 13,
    color: '#B9BAC8'
  },
  iconStyle3: {
    width: 20,
    height: 20,
  },
  inputSearchStyle3: {
    height: 40,
    fontSize: 16,
  },

});

export default styles