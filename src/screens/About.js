import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Animated,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import AntDesign from 'react-native-vector-icons/AntDesign';

const About = ({navigation, route}) => {
  const [about, setAbout] = useState(null);
  const scrollView = useRef(null);

  useEffect(() => {
    const aboutFunc = async () => {
      const aboutData = await fetch(
        '',
        {
          method: 'GET',
        },
      )
        .then(res => res.json())
        .catch(err => console.log(err));

      if (aboutData) {
        setAbout(JSON.parse(JSON.parse(JSON.stringify(aboutData)).msg).about);
      }
    };

    aboutFunc();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} route={route} />
      {about !== null ? (
        <ScrollView
          style={styles.container}
          ref={scrollView}
          onContentSizeChange={() =>
            scrollView.current.scrollToEnd({animated: true})
          }>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: about.WhoweareImage}}
              style={styles.aboutImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.headingBox}>
            <Text style={styles.heading}>{about.Whowearetitle}</Text>
          </View>

          <View style={styles.detailBox}>
            <Text style={styles.detail}>{about.Whowearesubtitle}</Text>
          </View>

          <View
            style={{
              width: '100%',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <Pressable
              style={styles.arrow}
              onPress={() =>
                navigation.navigate('Category', {
                  menu: true,
                })
              }>
              <Text style={[styles.donateText]}>Donate Now</Text>
              <AntDesign name="arrowright" color="#eee" size={20} />
            </Pressable>
          </View>

          <View style={styles.detail2Box}>
            <Text style={styles.detail2}>{about.WhoweareContent}</Text>
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <Menu navigation={navigation} route={route} />
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 23,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: '100%',
    height: 150,
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#ccc',
    overflow: 'hidden',
  },
  aboutImage: {
    width: '100%',
    height: 150,
  },
  heading: {
    color: '#FF6A00',
    fontWeight: '400',
    fontSize: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    width: 210,
    fontFamily: 'Poppins-Regular',
  },
  detail: {
    marginTop: 30,
    marginBottom: 20,
    color: '#004E7E',
    fontSize: 19,
    fontFamily: 'Poppins-Regular',
  },

  detail2Box: {
    marginTop: 20,
    marginBottom: 80,
  },

  detail2: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  arrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    paddingVertical: 3,
    borderRadius: 20,
    width: 140,
    height: 30,
  },

  donateText: {
    color: '#eee',
    marginRight: 10,
    fontSize: 15,
  },
});
