import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Category = ({route, navigation}) => {
  const {params} = route;

  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
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
        setCategoryId(
          JSON.parse(JSON.parse(JSON.stringify(sliderDataApi)).msg).category[0]
            .categoryID,
        );
      }
    };

    sliderDataFunc();
  }, []);

  console.log(categoryId);
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
          <View style={{marginVertical: 15, paddingHorizontal: 15}}>
            <FlatList
              horizontal={true}
              adjustGridToStyles={true}
              keyExtractor={item => item.categoryID}
              data={categoryData}
              renderItem={({item}) => (
                <Pressable
                  onPress={() => setCategoryId(item.categoryID)}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    height: 110,
                    marginHorizontal: 10,
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

          <ScrollView style={{paddingHorizontal: 20}}>
            <FlatList
              keyExtractor={item => item.productId}
              data={productData}
              renderItem={({item}) => {
                return (
                  <>
                    {categoryId === item.categoryID ? (
                      <View style={[styles.donateBoxes2]}>
                        <View style={{flexDirection: 'row', paddingLeft: 10}}>
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
                          <View style={styles.productBox}>
                            <Text style={styles.text}>{item.title}</Text>
                            <Text style={styles.desc}>{item.content}</Text>
                            <Text style={styles.desc}>
                              Price: &#8377;{item.price}
                            </Text>
                          </View>
                        </View>
                        <Pressable
                          style={styles.arrow}
                          onPress={() =>
                            navigation.navigate('Donate', {
                              productId: item.productId,
                              title: item.title,
                              img: item.image,
                              content: item.content,
                              price: item.price,
                            })
                          }>
                          <AntDesign name="arrowright" color="#777" size={30} />
                        </Pressable>
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

  donateBoxes2: {
    backgroundColor: '#F5F7FB',
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 15,
    marginVertical: 10,
    borderColor: '#ccc',
    shadowRadius: 0.6,
    overflow: 'hidden',
    paddingVertical: 10,
    flexDirection: 'row',
  },

  donateImage: {
    width: 60,
    height: 60,
  },

  productBox: {
    marginLeft: 15,
    flex: 0.9,
  },

  text: {
    color: '#000',
    fontSize: 18,
  },
  desc: {
    color: '#555',
    fontSize: 15,
    marginTop: 5,
  },
  arrow: {
    flex: 0.5,
    marginLeft: -60,
  },
});
