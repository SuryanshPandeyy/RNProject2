import {
  ScrollView,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Linking,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';

const Contact = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [subject, setSubject] = useState('');
  const [about, setAbout] = useState(null);
  const [popupMsg, setPopupMsg] = useState('');

  const show = () => {
    setPopupMsg('');
  };

  useEffect(() => {
    const aboutFunc = async () => {
      const aboutData = await fetch(
        'https://api.webdesire.in/tensmiles/api/whoweare',
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

  const submit = async () => {
    if (
      name !== '' &&
      email !== '' &&
      // phone !== '' &&
      subject !== '' &&
      msg !== ''
    ) {
      const formdata = {
        name,
        email,
        // phone,
        subject,
        message: msg,
      };

      const data = await fetch(
        'https://api.webdesire.in/tensmiles/api/contactForm',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formdata),
        },
      )
        .then(res => res.json())
        .catch(err => console.log(err));

      const data2 = JSON.parse(JSON.stringify(data));

      if (data2.type) {
        setPopupMsg(data2.msg);
        setTimeout(show, 2000);

        setName('');
        setEmail('');
        setMsg('');
        setSubject('');
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} route={route} />
      {about === null ? (
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
          <View style={styles.address}>
            <View style={styles.topContainer}>
              <Image source={require('../../assets/Icons/address.png')} />

              <View style={styles.topTextContainer}>
                <Pressable
                  onPress={() =>
                    Linking.openURL(`tel:${about.contactNumber1}`)
                  }>
                  <Text style={styles.topText}>{about.contactNumber1}</Text>
                </Pressable>
                <Text style={styles.topText}>{about.emailID}</Text>
              </View>
            </View>
            <View style={styles.topContainer}>
              <Image source={require('../../assets/Icons/phone.png')} />

              <View style={styles.topTextContainer}>
                <Pressable
                  onPress={() =>
                    Linking.openURL(`tel:${about.contactNumber2}`)
                  }>
                  <Text style={styles.topText}>{about.contactNumber2}</Text>
                </Pressable>
                <Text style={styles.topText}>{about.emailID}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.line, {elevation: 3}]}></View>

          <View style={styles.formContainer}>
            <Text style={styles.formHeading}>Contact Us</Text>

            <View style={styles.form}>
              <View style={styles.textInputContainer}>
                <Image
                  source={require('../../assets/Icons/user.png')}
                  style={styles.formIcon}
                />
                <TextInput
                  placeholder="Name"
                  style={styles.textInput}
                  placeholderTextColor="#bbb"
                  value={name}
                  onChangeText={text => setName(text)}
                />
              </View>
              <View style={styles.textInputContainer}>
                <Image
                  source={require('../../assets/Icons/email.png')}
                  style={styles.formIcon}
                />
                <TextInput
                  placeholder="Email Address"
                  style={styles.textInput}
                  placeholderTextColor="#bbb"
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
              </View>
              <View style={styles.textInputContainer}>
                <Image
                  source={require('../../assets/Icons/message.png')}
                  style={styles.formIcon}
                />
                <TextInput
                  placeholder="Subject"
                  style={styles.textInput}
                  placeholderTextColor="#bbb"
                  value={subject}
                  onChangeText={text => setSubject(text)}
                />
              </View>
              {/* <View style={styles.textInputContainer}>
              <Image
                source={require('../../assets/Icons/phone2.png')}
                style={styles.formIcon}
              />
              <TextInput
                placeholder="Phone No,"
                style={styles.textInput}
                placeholderTextColor="#bbb"
                value={phone}
                onChangeText={text => setPhone(text)}
              />
            </View> */}
              <View
                style={[
                  styles.textInputContainer,
                  {justifyContent: 'flex-start'},
                ]}>
                <Image
                  source={require('../../assets/Icons/message.png')}
                  style={[styles.formIcon, {top: 25}]}
                />
                <TextInput
                  placeholder="Enter Your Message"
                  style={[styles.textInput]}
                  textAlignVertical="top"
                  multiline={true}
                  numberOfLines={7}
                  placeholderTextColor="#bbb"
                  value={msg}
                  onChangeText={text => setMsg(text)}
                />
              </View>

              <View style={styles.submitView}>
                <Pressable
                  style={styles.submit}
                  onPress={submit}
                  android_ripple={{
                    color: '#ccc',
                    borderless: false,
                    radius: 140,
                  }}>
                  <Text style={styles.submitText}>Send Message</Text>
                  <Image
                    style={styles.submitImage}
                    source={require('../../assets/Icons/send.png')}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
      {popupMsg !== '' && (
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <Text style={styles.popuptext}>{popupMsg}</Text>
          </View>
        </View>
      )}
      <Menu navigation={navigation} route={route} />
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },

  address: {
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    borderColor: '#ccc',
    backgroundColor: '#eee',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  topTextContainer: {
    marginLeft: 19,
    flex: 0,
    flexGrow: 0,
  },
  topText: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  line: {
    marginVertical: 10,
    width: '100%',
    height: 1,
    borderWidth: 2,
    backgroundColor: '#0097C0',
    borderColor: '#0097C0',
    shadowColor: '#0097C0',
    shadowOffset: {width: -5, height: 10},
    shadowOpacity: 1,
    shadowRadius: 0.6,
    borderRadius: 50,
  },
  formContainer: {
    alignItems: 'center',
  },
  formHeading: {
    fontSize: 32,
    color: 'rgba(255, 106, 0, 1)',
    fontFamily: 'Poppins-Regular',
  },
  form: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  textInput: {
    width: '100%',
    backgroundColor: '#F5F7FB',
    borderRadius: 15,
    paddingHorizontal: 11,
    paddingVertical: 16,
    paddingLeft: 40,
    marginVertical: 8,
    fontSize: 18,
    color: '#000',
  },
  formIcon: {
    position: 'absolute',
    zIndex: 1,
    left: 10,
  },
  submitView: {
    width: '100%',
    height: 70,
    borderRadius: 15,
    marginBottom: 80,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  submit: {
    borderRadius: 15,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    backgroundColor: '#E4701D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0,
    flexGrow: 0,
    overflow: 'hidden',
  },
  submitText: {
    fontSize: 20,
    marginRight: 15,
    fontFamily: 'Poppins-Regular',
  },
  submitImage: {
    height: 24,
    width: 32,
  },

  popupContainer: {
    width: '100%',
    position: 'absolute',
    background: 'red',
    zIndex: 200,
    bottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  popupContainer: {
    width: '100%',
    position: 'absolute',
    background: 'red',
    zIndex: 200,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  popup: {
    backgroundColor: 'lightgreen',
    width: '70%',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 20,
  },

  popuptext: {
    fontSize: 17,
    color: '#000',
    // flexDirection: 'row',
    textAlign: 'center',
  },
  popuptextContainer: {
    marginVertical: 5,
  },
});
