import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, View,Image, Button, AsyncStorage,TextInput, TouchableOpacity  } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Auth(props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [regView, setRegView] = useState(false)

    useEffect(()=>{
        getData();
    },[])

    const auth = () =>{
      if(regView)
      {
        const djangoUrls = (Platform.OS == "android" ? 
          `http://192.168.0.101:8000/api/users/`
          :`http://192.168.0.101:8000/auth/`);
          fetch(djangoUrls,{
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password})
          })
          .then( res=> res.json() )
          .then( res => {
            console.log(res.token);
            setRegView(false);
          })
          .catch(error => console.log(error))

      }
      else{
          const djangoUrls = (Platform.OS == "android" ? 
          `http://192.168.0.101:8000/auth/`
          :`http://192.168.0.101:8000/auth/`);
          fetch(djangoUrls,{
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password})
          })
          .then( res=> res.json() )
          .then( res => {
            console.log(res.token);
            saveData(res.token);
            props.navigation.navigate('MovieList')
          })
          .catch(error => console.log(error))
        }
      //props.navigation.goBack();
    };

    const saveData = async (token) =>{
        await AsyncStorage.setItem("MR_TOKEN",token)
    }

    const getData = async () =>{
        const token = await AsyncStorage.getItem("MR_TOKEN");
        if( token )  props.navigation.navigate('MovieList');
    }

    const toogleView =() =>{
      setRegView(!regView);
    }

    return (
        <View style={styles.container}>            
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText = { text => setUsername(text) }
              value ={username}
              autoCapitalize={"none"}
            />
            <Text style={styles.label}>password </Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText = { text => setPassword(text) }
              value ={password}
              secureTextEntry ={true}
              autoCapitalize={"none"}
            />
            <Button onPress={ () => auth() } title = {regView?"Regiser":"Login"} />
            <TouchableOpacity onPress={()=> toogleView()}>
              {regView?
                <Text style={styles.viewStyle}>Already have an account? Go back to login</Text>:
                <Text style={styles.viewStyle}>Don't have an account Register here.</Text>
              }
            </TouchableOpacity>
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
  },
  viewStyle:{
    color: "white",
    fontSize: 20,
    padding: 20,
  }
});
