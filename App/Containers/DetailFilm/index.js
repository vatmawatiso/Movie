import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import {allLogo} from '../../Assets';
import {toDp} from '../../Helpers/PercentageToDP';
import NavigatorService from '../../Helpers/NavigatorServices';
import Kembali from '../../Components/Kembali';
import LinearGradient from 'react-native-linear-gradient';

const DetailFilm = props => {
  const [state, setState] = useState({
    org_language: '',
    org_title: '',
    ovr_view: '',
    backdr_path: '',
    rls_date: '',
    rating: '',
  });

  useEffect(() => {
    setState(state => ({
      ...state,
      org_language: props.navigation.state.params.original_language,
      org_title: props.navigation.state.params.original_title,
      ovr_view: props.navigation.state.params.overview,
      backdr_path: props.navigation.state.params.backdrop_path,
      rls_date: props.navigation.state.params.release_date,
      rating: props.navigation.state.params.popularity,
    }));
    console.log('bahasa--->' + props.navigation.state.params.original_language);
    console.log('title--->' + props.navigation.state.params.original_title);
    console.log('overview--->' + props.navigation.state.params.overview);
    console.log('rating--->' + props.navigation.state.params.popularity);
    console.log(
      'backdrop path--->' + props.navigation.state.params.backdrop_path,
    );
    console.log('release--->' + props.navigation.state.params.release_date);
  }, []);

  const backdropPath = 'https://image.tmdb.org/t/p/original';

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FF0000', '#000000']} style={styles.container}>
        <Kembali
          title={'Detail Movie'}
          onPress={() => props.navigation.goBack()}
        />
        <View style={styles.bodyIMG}>
          <Image
            source={{uri: `${backdropPath}${state.backdr_path}`}}
            style={{
              width: toDp(310),
              height: toDp(370),
              borderRadius: toDp(20),
            }}
          />
        </View>
        <View style={styles.bodyTitle}>
          <Text style={styles.txtTitle}>{state.org_title}</Text>
          <Text>Language : {state.org_language}</Text>

          <View style={{justifyContent: 'space-between'}}>
            <Text>Ratting : {state.rating}</Text>
            <Text>Release Date : {state.rls_date}</Text>
          </View>
        </View>

        <View style={styles.bodyOverview}>
          <Text style={styles.txtSynopsis}>Synopsis</Text>
          {state.ovr_view != '' ? (
            <>
              <Text style={styles.txtOverview}>{state.ovr_view}</Text>
            </>
          ) : (
            <>
              <Text style={styles.txtOverview}>Synopsis tidak tersedia</Text>
            </>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF0000',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  txtSynopsis: {
    fontWeight: 'bold',
    fontSize: toDp(25),
    color: 'white',
    fontFamily: 'oleo script',
  },
  txtOverview: {
    fontSize: toDp(15),
  },
  bodyIMG: {
    alignItems: 'center',
  },
  bodyTitle: {
    marginLeft: toDp(30),
    marginTop: toDp(25),
  },
  txtTitle: {
    fontSize: toDp(25),
    fontWeight: 'bold',
    color: '#FFF',
    maxWidth: toDp(290),
  },
  bodyOverview: {
    marginLeft: toDp(30),
    marginTop: toDp(25),
    maxWidth: toDp(310),
  },
});

export default DetailFilm;
