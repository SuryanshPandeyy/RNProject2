import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  TouchableHighlight,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Header from '../components/Header';

import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {FlatGrid} from 'react-native-super-grid';

const Category = ({route, navigation}) => {
  const {params} = route;

  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [categoryId, setCategoryId] = useState(params.categoryId);

  const [showText, setShowText] = useState();
  const donateText = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    // Change the state every second or the time given by User.
    Animated.loop(
      Animated.sequence([
        Animated.timing(donateText, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(donateText, {
          toValue: 1,
          duration: 500,
          ease: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(donateText, {
          toValue: 1,
          duration: 500,
          ease: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(donateText, {
          toValue: 0,
          duration: 200,
          ease: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  useEffect(() => {
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
        setProductData(
          JSON.parse(JSON.parse(JSON.stringify(sliderDataApi)).msg).product,
        );

        setCategoryData(
          JSON.parse(JSON.parse(JSON.stringify(sliderDataApi)).msg).category,
        );

        const data = JSON.parse(
          JSON.parse(JSON.stringify(sliderDataApi)).msg,
        ).category;

        params.menu && setCategoryId(data[0].categoryID);
      }
    };

    sliderDataFunc();
  }, []);

  console.log(productData);

  return (
    <>
      <Header navigation={navigation} route={route} />
      {productData.length === 0 ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <View
            style={{
              marginVertical: 15,
              paddingHorizontal: 10,
              position: 'relative',
            }}>
            <FlatGrid
              scrollEnabled={false}
              style={{width: '100%'}}
              contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              adjustGridToStyles={true}
              keyExtractor={item => item.categoryID}
              itemDimension={100}
              snapToAlignment="start"
              decelerationRate="fast"
              data={categoryData}
              renderItem={({item}) => (
                <Pressable
                  onPress={() => setCategoryId(item.categoryID)}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginHorizontal: 5,
                  }}>
                  <View
                    style={[
                      styles.donateBoxes,
                      categoryId === item.categoryID && {borderColor: 'grey'},
                    ]}>
                    <Image
                      source={{uri: item.image}}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                      }}
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
              )}
            />
          </View>

          <ScrollView style={{paddingHorizontal: 20}} indicatorStyle="black">
            <FlatList
              keyExtractor={item => item.productId}
              data={productData}
              renderItem={({item}) => {
                return (
                  <>
                    {categoryId === item.categoryID ? (
                      <View style={[styles.donateBoxes2]}>
                        <View style={[styles.donateImage]}>
                          <Image
                            source={{uri: item.image}}
                            style={{
                              width: '100%',
                              height: '100%',
                              resizeMode: 'contain',
                            }}
                          />
                        </View>
                        <View
                          style={{
                            marginLeft: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              width: '100%',
                            }}>
                            <Text style={styles.price}>
                              Price: &#8377;{item.price}
                            </Text>
                            {item.closeproduct !== '1' && (
                              <Pressable
                                style={styles.arrow}
                                onPress={() =>
                                  navigation.navigate('Donate', {
                                    productId: item.productId,
                                    title: item.title,
                                    img: item.image,
                                    content: item.content,
                                    price: item.price,
                                    isJoin: item.OptionForJoin,
                                  })
                                }>
                                <Animated.View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    opacity: donateText,
                                  }}>
                                  <Text style={[styles.donateText]}>
                                    Donate Now
                                  </Text>
                                  <AntDesign
                                    name="arrowright"
                                    color="#eee"
                                    size={20}
                                  />
                                </Animated.View>
                              </Pressable>
                            )}
                          </View>
                          <View style={styles.productBox}>
                            <Text style={styles.text}>{item.title}</Text>
                            <Text style={styles.desc}>{item.content}</Text>
                          </View>
                        </View>
                      </View>
                    ) : (
                      <></>
                    )}
                  </>
                );
              }}
            />
          </ScrollView>
        </>
      )}
    </>
  );
};

export default Category;

const styles = StyleSheet.create({
  donate: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },

  donateBoxes: {
    backgroundColor: '#F5F7FB',
    borderWidth: 1,
    width: 100,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginVertical: 4,
    borderColor: '#F5F7FB',
    shadowColor: 'rgba(38, 157, 164, 1)',
    shadowOffset: {width: -5, height: 10},
    shadowOpacity: 1,
    elevation: 10,
    shadowRadius: 0.6,
    overflow: 'hidden',
    padding: 5,
  },

  donateBoxes2: {
    backgroundColor: '#F5F7FB',
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 10,
    borderColor: '#ccc',
    shadowRadius: 0.6,
    overflow: 'hidden',
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },

  donateImage: {
    width: 100,
    height: 200,
  },

  productBox: {
    width: '100%',
    marginVertical: 16,
  },
  text: {
    color: '#000',
    fontSize: 18,
    width: 150,
  },
  desc: {
    width: 200,
    color: '#555',
    fontSize: 15,
    marginTop: 5,
  },
  price: {
    color: '#555',
    fontSize: 15,
    marginTop: 5,
  },
  arrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    paddingVertical: 3,
    borderRadius: 20,
    width: 110,
    height: 25,
    marginLeft: 10,
  },

  donateText: {
    color: '#eee',
    marginRight: 10,
    fontSize: 12,
  },
});
