import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, View,Image, Button } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { TextInput } from 'react-native-gesture-handler';

export default function Auth(props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const auth = () =>{
   
      //     const djangoUrls = (Platform.OS == "android" ? 
      //     `http://192.168.0.101:8000/api/movies/${movie.id}/`
      //     :`http://192.168.0.101:8000/api/movies/${movie.id}/`);
      //     fetch(djangoUrls,{
      //       method: 'PUT',
      //       headers: {
      //         'Authorization': `Token 00899e358115a9ecd55a2fec3a88b74c28ed6076`,
      //         "Content-Type": "application/json"
      //       },
      //       body: JSON.stringify({title: title, description: description})
      //     })
      //     .then( res=> res.json() )
      //     .then( movie => {
      //       console.log(movie);
      //       props.navigation.navigate('Detail',{movie: movie,title:movie.title})
      //     })
      //     .catch(error => console.log(error))
      
      // props.navigation.goBack();
    };

    return (
        <View style={styles.container}>            
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText = { text => setUsername(text) }
              value ={username}
            />
            <Text style={styles.label}>password </Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText = { text => setPassword(text) }
              value ={password}
            />
            <Button onPress={ () => auth() } title = "Login" />
        </View>
    );
}

Auth.navigationOptions = screenProps => (
  {title: "Login",
  headerStyle: {
    backgroundColor: "orange"
  },
  headerTintColor: "#fff",
  headerTitleStyle:{
    fontWeight: "bold",
    fontSize: 24,
  },
})

const removeClicked = (props) => {

  const movie = props.navigation.getParam('movie');
  console.log(movie);
  const djangoUrls = (Platform.OS == "android" ? 
          `http://192.168.0.101:8000/api/movies/${movie.id}/`
          :`http://192.168.0.101:8000/api/movies/${movie.id}/`);
          fetch(djangoUrls,{
            method: 'DELETE',
            headers: {
              'Authorization': `Token 00899e358115a9ecd55a2fec3a88b74c28ed6076`,
              "Content-Type": "application/json"
            },
          })
          .then( res=> res.json() )
          .then( res => {
            console.log(res);
            props.navigation.navigate('MovieList');
          })
          .catch(error => console.log(error))
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c35',
    padding: 10
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  item:{
    flex: 10,
    padding: 10,
    height: 50,
    backgroundColor:"#282c35"
  },
  itemText:{
    color: "#fff",
    fontSize: 24
  },
  description:{
    fontSize:20,
    color: "white",
    padding: 10,
  },
  label:{
    fontSize: 24,
    color: '#fff',
    padding: 10,
  },
  input:{
    fontSize: 20,
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
  }
});
