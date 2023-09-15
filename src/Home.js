import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FlatGrid} from 'react-native-super-grid';
import Swiper from 'react-native-swiper';

const Home = ({navigation, route}) => {
  const [sliderData, setSliderData] = useState([]);
  const [testimonalData, setTestimonalData] = useState([]);
  const [programmeData, setProgrammeData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

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

      if (programmeDataApi) {
        setProgrammeData(
          JSON.parse(JSON.parse(JSON.stringify(programmeDataApi)).msg)
            .ProgramGallary,
        );
      }
    };

    galleryDataFunc();

    const sliderDataFunc = async () => {
      const sliderDataApi = await fetch(
        '',
        {
          method: 'GET',
        },
      )
        .then(res => res.json())
        .catch(err => console.log(err));

      if (sliderDataApi) {
        setSliderData(
          JSON.parse(JSON.parse(JSON.stringify(sliderDataApi)).msg).slider,
        );
        setTestimonalData(
          JSON.parse(JSON.parse(JSON.stringify(sliderDataApi)).msg).leader,
        );

        setProductData(
          JSON.parse(JSON.parse(JSON.stringify(sliderDataApi)).msg).product,
        );

        setCategoryData(
          JSON.parse(JSON.parse(JSON.stringify(sliderDataApi)).msg).category,
        );

        console.log(JSON.parse(JSON.parse(JSON.stringify(sliderDataApi)).msg));
      }
    };

    sliderDataFunc();
  }, []);

  console.log(productData);

  const DataView = ({item}) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('Category', {
            categoryId: item.categoryID,
          })
        }
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: 110,
        }}>
        <View style={[styles.donateBoxes]}>
          <Image
            source={{uri: item.image}}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        </View>
        <Text
          style={{
            color: '#000',
            fontFamily: 'Poppins-Regular',
            marginTop: 0,
            fontSize: 12,
          }}>
          {item.title}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} route={route} />
      {sliderData.length === 0 ||
      productData.length === 0 ||
      testimonalData.length === 0 ||
      programmeData.length === 0 ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <Swiper
            style={styles.wrapper}
            showsButtons={true}
            loop={true}
            autoplay={true}>
            {sliderData.map((item, i) => {
              return (
                <View key={i} style={[styles.slider, styles.slides]}>
                  <Image
                    source={{
                      uri: item.image,
                    }}
                    resizeMode="contain"
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
              );
            })}
          </Swiper>

          <View style={[styles.line, {elevation: 10}]}></View>
          <Text
            style={{
              color: '#000',
              fontSize: 24,
              fontFamily: 'Poppins-Regular',
              marginLeft: 10,
            }}>
            Way To Contribute
          </Text>
          <View style={styles.donate}>
            <FlatGrid
              scrollEnabled={false}
              style={{width: '100%'}}
              contentContainerStyle={{
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
              adjustGridToStyles={true}
              keyExtractor={item => item.categoryID}
              itemDimension={80}
              snapToAlignment="start"
              decelerationRate="fast"
              data={categoryData}
              renderItem={({item}) => <DataView item={item} />}
            />
          </View>
          <View style={[styles.line, {elevation: 6}]}></View>
          <View style={styles.testimonial}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 24,
                  fontFamily: 'Poppins-Regular',
                  marginRight: 10,
                }}>
                Testimonials
              </Text>
              <Image source={require('../assets/Icons/testimonial.png')} />
            </View>
            <Swiper
              style={styles.wrapper}
              showsButtons={true}
              showsPagination={false}
              loop={true}
              autoplay={true}>
              {testimonalData.map((item, i) => {
                return (
                  <View
                    key={i}
                    style={[
                      styles.slider,
                      styles.slides,
                      styles.testimonialBox,
                    ]}>
                    <View style={styles.testimonialImage}>
                      <Image
                        source={{uri: item.image}}
                        style={{
                          borderWidth: 1,
                          borderColor: '#ccc',
                          borderRadius: 100,
                          height: 50,
                          width: 50,
                          resizeMode: 'cover',
                        }}
                      />
                    </View>
                    <View style={styles.testimonialDetails}>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 20,
                          textAlign: 'center',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 15,
                          textAlign: 'center',
                          paddingHorizontal: 20,
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {item.message}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </Swiper>
          </View>
          <View style={[styles.line, {elevation: 3}]}></View>
          <View style={styles.gallery}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 24,
                  fontFamily: 'Poppins-Regular',
                  marginRight: 10,
                }}>
                Gallery
              </Text>
              <Image
                source={require('../assets/MenuIcons/Filled/gallery.png')}
                style={{width: 25, height: 25}}
              />
            </View>
            <View style={styles.galleryImages}>
              {productData.slice(0, 3).map((item, i) => (
                <Pressable
                  key={i}
                  onPress={() => navigation.navigate('Gallery')}>
                  <Image
                    source={{uri: item.image}}
                    style={styles.galleryImage}
                  />
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
      <Menu navigation={navigation} route={route} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  slides: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  slider: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    marginTop: 20,
  },
  line: {
    marginVertical: 30,
    width: '100%',
    height: 1,
    borderWidth: 2,
    backgroundColor: '#006CB6',
    borderColor: '#006CB6',
    shadowColor: '#006CB6',
    shadowOffset: {width: -5, height: 10},
    shadowOpacity: 1,
    shadowRadius: 0.6,
    borderRadius: 50,
  },

  donate: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },

  donateBoxes: {
    backgroundColor: '#F5F7FB',
    borderWidth: 1,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginVertical: 10,
    borderColor: '#F5F7FB',
    shadowColor: 'rgba(38, 157, 164, 1)',
    shadowOffset: {width: -5, height: 10},
    shadowOpacity: 1,
    elevation: 10,
    shadowRadius: 0.6,
    overflow: 'hidden',
    padding: 5,
  },
  testimonial: {
    width: '100%',
    paddingHorizontal: 5,
  },
  testimonialBox: {
    flexDirection: 'column',
    alignItems: 'space-around',
    justifyContent: 'center',
  },
  testimonialImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  testimonialDetails: {
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
  },
  gallery: {
    marginBottom: 80,
  },
  galleryImages: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 100,
  },
  galleryImage: {
    marginTop: 20,
    borderColor: '#000',
    borderRadius: 15,
    height: 100,
    width: 100,
    resizeMode: 'cover',
  },
});
