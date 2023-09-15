import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import {FlatGrid} from 'react-native-super-grid';

const Gallery = ({navigation, route}) => {
  const [switchTab, setSwitchTab] = useState('Programme');

  const [programmeData, setProgrammeData] = useState([]);
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const galleryDataFunc = async () => {
      const programmeDataApi = await fetch(
        '',
        {
          method: 'GET',
        },
      )
        .then(res => res.json())
        .catch(err => console.log(err));

      console.log(JSON.parse(JSON.parse(JSON.stringify(programmeDataApi)).msg));

      if (programmeDataApi) {
        setProgrammeData(
          JSON.parse(JSON.parse(JSON.stringify(programmeDataApi)).msg)
            .ProgramGallary,
        );
        setNewsData(
          JSON.parse(JSON.parse(JSON.stringify(programmeDataApi)).msg)
            .NewsGallary,
        );
      }
    };

    galleryDataFunc();
  }, []);

  console.log(programmeData);

  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} route={route} />
      {!newsData || !programmeData ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.switchBox}>
            <Pressable
              onPress={() => setSwitchTab('Programme')}
              style={[
                styles.switch,
                switchTab === 'Programme'
                  ? {backgroundColor: '#269DA4'}
                  : {backgroundColor: '#fff'},
              ]}>
              <Text
                style={[
                  switchTab === 'Programme' ? {color: '#fff'} : {color: '#000'},
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                Programme Gallery
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSwitchTab('News')}
              style={[
                styles.switch,
                switchTab === 'News'
                  ? {backgroundColor: '#269DA4'}
                  : {backgroundColor: '#fff'},
              ]}>
              <Text
                style={[
                  switchTab === 'News' ? {color: '#fff'} : {color: '#000'},
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                News Gallery
              </Text>
            </Pressable>
          </View>
          {switchTab === 'Programme' && (
            <FlatGrid
              style={{width: '100%', marginBottom: 80}}
              contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              adjustGridToStyles={true}
              keyExtractor={item => item.galleryId}
              itemDimension={100}
              snapToAlignment="start"
              decelerationRate="fast"
              snapToInterval={Dimensions.get('window').height}
              data={programmeData}
              renderItem={({item}) => (
                <View style={[styles.imageContainer]}>
                  <Image
                    source={{uri: item.image}}
                    // resizeMode="contain"
                    style={{width: '100%', height: '100%', borderRadius: 15}}
                  />
                </View>
              )}
            />
          )}
          {switchTab === 'News' && (
            <FlatGrid
              style={{width: '100%', marginBottom: 80}}
              contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              adjustGridToStyles={true}
              keyExtractor={item => item.galleryId}
              itemDimension={100}
              snapToAlignment="start"
              decelerationRate="fast"
              snapToInterval={Dimensions.get('window').height}
              data={newsData}
              renderItem={({item}) => (
                <View style={[styles.imageContainer]}>
                  <Image
                    source={{uri: item.image}}
                    // resizeMode="cover"
                    style={{width: '100%', height: '100%', borderRadius: 15}}
                  />
                </View>
              )}
            />
          )}
        </View>
      )}
      <Menu navigation={navigation} route={route} />
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
    width: '100%',
  },

  imageContainer: {
    height: 100,
    margin: 10,
    width: 100,
    borderRadius: 15,
    overflow: 'hidden',
  },
  switchBox: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 30,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  switch: {
    paddingVertical: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
