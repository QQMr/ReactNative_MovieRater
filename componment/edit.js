import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, View,Image, Button } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { TextInput } from 'react-native-gesture-handler';

export default function Edit (props) {

    const movie = props.navigation.getParam('movie')
    const [title, setTitle] = useState(movie.title)
    const [description, setDescription] = useState(movie.description)

    const saveMovie = () =>{
      if( movie.id ){
          const djangoUrls = (Platform.OS == "android" ? 
          `http://192.168.0.101:8000/api/movies/${movie.id}/`
          :`http://192.168.0.101:8000/api/movies/${movie.id}/`);
          fetch(djangoUrls,{
            method: 'PUT',
            headers: {
              'Authorization': `Token 00899e358115a9ecd55a2fec3a88b74c28ed6076`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({title: title, description: description})
          })
          .then( res=> res.json() )
          .then( movie => {
            console.log(movie);
            props.navigation.navigate('Detail',{movie: movie,title:movie.title})
          })
          .catch(error => console.log(error))
      }
      else{
        const djangoUrls = (Platform.OS == "android" ? 
        `http://192.168.0.101:8000/api/movies/`
        :`http://192.168.0.101:8000/api/movies/`);
        fetch(djangoUrls,{
          method: 'POST',
          headers: {
            'Authorization': `Token 00899e358115a9ecd55a2fec3a88b74c28ed6076`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({title: title, description: description})
        })
        .then( res=> res.json() )
        .then( movie => {
          console.log(movie);
          props.navigation.navigate('MovieList')
        })
        .catch(error => console.log(error))
      }
      //props.navigation.goBack();
    };

    return (
        <View style={styles.container}>            
            <Text style={styles.label}>Title  </Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              onChangeText = { text => setTitle(text) }
              value ={title}
            />
            <Text style={styles.label}>Description </Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              onChangeText = { text => setDescription(text) }
              value ={description}
            />
            <Button onPress={ () => saveMovie() } title = {movie.id ? "Edit": "Add"} />
        </View>
    );
}

Edit.navigationOptions = screenProps => (
  {title: screenProps.navigation.getParam("title"),
  headerStyle: {
    backgroundColor: "orange"
  },
  headerTintColor: "#fff",
  headerTitleStyle:{
    fontWeight: "bold",
    fontSize: 24,
  },
  headerRight: () => {
    return(
      <Button title="Removie" color="#841584" 
      onPress = {()=> removeClicked(screenProps)}
      />
    )
  }
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
