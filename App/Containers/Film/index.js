import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {allLogo} from '../../Assets';
import {toDp} from '../../Helpers/PercentageToDP';
import NavigatorService from '../../Helpers/NavigatorServices';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';
import Kembali from '../../Components/Kembali';
import LinearGradient from 'react-native-linear-gradient';

const Film = props => {
  const [state, setState] = useState({
    genre: [],
    genreId: '',
    movie: [],
    image: true,
  });

  const backdropPath = 'https://image.tmdb.org/t/p/original';

  // get film
  const getList = () => {
    axios
      .get('https://api.themoviedb.org/3/genre/movie/list?language=en', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmMzMTdlZDNjMGYyMjVlNGQyZjk2Y2Q2MzZmZGQyYyIsInN1YiI6IjY1MWUzYzY2ZjA0ZDAxMDEzOTRhYjlkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gwt0pSuZTRCPXhayzYd05Fdb7nyqIY5SLXvBf4mvLa4',
        },
      })
      .then(res => {
        console.log('Hasil Genre = ', res.data);
        if (res.status == 200) {
          setState(state => ({
            ...state,
            genre: res.data.genres,
          }));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // get tampil hasil
  const getMovie = () => {
    axios
      .get(
        'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.asc&with_genres=' +
          state.genreId,
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmMzMTdlZDNjMGYyMjVlNGQyZjk2Y2Q2MzZmZGQyYyIsInN1YiI6IjY1MWUzYzY2ZjA0ZDAxMDEzOTRhYjlkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gwt0pSuZTRCPXhayzYd05Fdb7nyqIY5SLXvBf4mvLa4',
          },
        },
      )
      .then(res => {
        if (res.status == 200) {
          setState(state => ({
            ...state,
            movie: res.data.results,
          }));
          console.log('hasil movie = ', state.movie);
          console.log(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (state.genreId) getMovie();
    console.log(state.genreId);
  }, [state.genreId]);

  const Detail = (
    original_language,
    original_title,
    overview,
    backdrop_path,
    release_date,
    popularity,
  ) => {
    NavigatorService.navigate('DetailFilm', {
      original_language: original_language,
      original_title: original_title,
      overview: overview,
      backdrop_path: backdrop_path,
      release_date: release_date,
      popularity: popularity,
    });
  };

  const Detailmovie = (item, index) => {
    console.log('cek item  ==> ', item.popularity);
    return (
      <View style={styles.card}>
        <LinearGradient colors={['#FF0000', '#000000']} style={styles.gradient}>
          <TouchableOpacity
            style={styles.btnMovie}
            onPress={() =>
              Detail(
                item.original_language,
                item.original_title,
                item.overview,
                item.backdrop_path,
                item.release_date,
                item.popularity,
              )
            }>
            <View style={styles.bodyDetail}>
              {item.backdrop_path != null ? (
                <>
                  <Image
                    source={{uri: `${backdropPath}${item.backdrop_path}`}}
                    style={{
                      width: toDp(160),
                      height: toDp(230),
                      borderRadius: toDp(5),
                      bottom: toDp(10),
                    }}
                  />
                </>
              ) : (
                <>
                  <Image
                    source={allLogo.img}
                    style={{
                      width: toDp(90),
                      height: toDp(100),
                      borderRadius: toDp(5),
                    }}
                  />
                </>
              )}
            </View>
            <View style={{top: toDp(10)}}>
              <Text
                style={{
                  fontSize: toDp(16),
                  color: '#FFF',
                  width: toDp(150),
                  fontWeight: 'bold',
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: toDp(16),
                  color: '#F6F1F1',
                  width: toDp(150),
                }}>
                {item.release_date}
              </Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Kembali
        title={'Movie'}
        onPress={() => props.navigation.navigate('Home')}
      />
      <Text style={styles.txtFilm}>Pilih Genre Film</Text>
      <SafeAreaView>
        <SelectDropdown
          buttonStyle={styles.dropdown}
          buttonTextStyle={{fontSize: toDp(12), color: '#FFF'}}
          rowTextStyle={{fontSize: toDp(12), color: '#FFF'}}
          dropdownStyle={{borderRadius: toDp(10), backgroundColor: '#FF0000'}}
          rowStyle={{height: toDp(48), padding: toDp(5)}}
          defaultButtonText={'Genre Film'}
          //defaultValue={{
          // id_genre: state.id_genre,
          //name_genre: state.name_genre,
          //}}
          data={state.genre}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem.id, index);
            setState(state => ({...state, genreId: selectedItem.id}));
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.name;
          }}
          rowTextForSelection={(item, index) => {
            return item.name;
          }}
        />
      </SafeAreaView>
      {/* <FlatList
        data={state.movie}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({item, index}) => (
          //<Text style={{color: 'black'}}>{JSON.stringify(item)}</Text>

          <Image
            source={{uri: ${backdropPath}${item.backdrop_path}}}
            style={{width: 120, height: 120}}
          />
        )}
      /> */}

      <FlatList
        contentContainerStyle={{
          justifyContent: 'space-between',
          backgroundColor: '#000000',
        }}
        numColumns={2}
        data={state.movie}
        renderItem={({item, index}) => {
          return Detailmovie(item, index);
        }}
        ListFooterComponent={() => <View style={{height: toDp(120)}} />}
      />

      {!state.genreId && (
        <View style={{marginBottom: toDp(260)}}>
          <Image
            source={allLogo.cari_movie}
            style={{
              width: toDp(160),
              height: toDp(160),
              borderRadius: toDp(5),
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  txtFilm: {
    color: '#FFF',
    marginTop: toDp(10),
    fontSize: toDp(15),
  },
  dropdown: {
    backgroundColor: '#FF0000',
    borderRadius: toDp(10),
    width: toDp(350),
    height: toDp(48),
    margin: toDp(5),
    marginBottom: toDp(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
    // opacity: 0.7,
  },
  card: {
    bottom: toDp(5),
    backgroundColor: '#FF0000',
    borderRadius: toDp(10),
    minHeight: toDp(321),
    // opacity: 0.7,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginTop: toDp(10),
    alignItems: 'center',
    marginHorizontal: toDp(3.5),
  },
  bodyDetail: {
    marginTop: toDp(10),
    height: toDp(220),
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    minHeight: toDp(321),
    width: '100%',
    bottom: toDp(0),
    borderRadius: toDp(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginTop: toDp(10),
    alignItems: 'center',
    marginHorizontal: toDp(3.5),
  },
});

export default Film;
