import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {allLogo} from '../../Assets';
import {toDp} from '../../Helpers/PercentageToDP';
import NavigatorService from '../../Helpers/NavigatorServices';

const Home = props => {
  return (
    <View style={styles.container}>
      <View style={styles.tblogo}>
        <Image source={allLogo.logo} style={styles.logo} />
      </View>
      <View style={{top: toDp(230)}}>
        <TouchableOpacity
          onPress={() => NavigatorService.reset('Film')}
          style={styles.btnNext}>
          <Text style={styles.txtNext}>Selanjutnya</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: toDp(180),
    height: toDp(160),
  },
  tblogo: {
    height: toDp(130),
    bottom: toDp(70),
  },
  txtNext: {
    fontWeight: 'bold',
    fontSize: toDp(15),
    color: 'white',
  },
  btnNext: {
    backgroundColor: '#000000',
    width: toDp(300),
    height: toDp(45),
    borderRadius: toDp(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
