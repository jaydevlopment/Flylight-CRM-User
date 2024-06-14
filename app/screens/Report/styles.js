import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const styles = StyleSheet.create({

  container3: {
    padding: 10
  },
  dropdown3: {
    height: 50,
    borderColor: '#000000',
    borderWidth:1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon3: {
    marginRight: 5,
  },
  label3: {
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle3: {
    fontSize: 16,
    marginLeft:responsiveWidth(2)
  },
  selectedTextStyle3: {
    fontSize: 16,
    marginLeft:responsiveWidth(2)
  },
  iconStyle3: {
    width: 20,
    height: 20,
  },
  inputSearchStyle3: {
    height: 40,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3373F3',
    borderRadius: 10,
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    marginHorizontal: '1%'
  },
  textButton: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    marginTop:responsiveHeight(0.50)
  },
  card: {
    padding: '3%',
    marginTop:'1%',
    borderRadius: 10,
    backgroundColor: '#FF4789'
  },
  leftItem: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Roboto'
  },
  rightCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  rightItem: {
    height: 37,
    width: 42,
    borderWidth: 2,
    marginTop: '3%',
    padding: '2.5%',
    borderRadius: 10,
    borderColor: '#fff',
  },
  pickerStyle: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    paddingVertical: 11,
    // marginTop: '1%',
    width: '47%'
  },
  icon: {
    height: responsiveHeight(3.20),
    width: responsiveWidth(5.70),
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(3)
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
  charttextIndicator: {
    height: 15,
    width: 15,
    borderRadius: 15 / 2,
    marginRight: '3%'
  },
  chartText: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: '#000000'
  },
})

export default styles