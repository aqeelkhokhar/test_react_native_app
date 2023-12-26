import {StyleSheet} from 'react-native';
import {OpenSouceBlack, OpenSouceOne} from '../../../assets/fonts';
import {BACKGROUND_COLOR} from '../../Assets/Colors';
import {ANYDORE} from '../../Assets/Fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackgroundStyle: {
    height: '100%',
    width: '100%',
  },
  imageOverlayStyle: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: 'green',
    marginTop: 120,
    fontSize: 24,
    fontFamily: OpenSouceOne,
    textAlign: 'center',
    width: '90%',
  },
  companyText: {
    color: 'red',
    fontSize: 24,
    fontFamily: OpenSouceBlack,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '90%',
  },
});
export default styles;
