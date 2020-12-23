import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, View,Image, Button, Alert } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Detail (props) {

    const movie = props.navigation.getParam('movie')
    const [ highlight,setHighlight] = useState(0);

    const rateClick = () => {
      console.log(highlight);
      if(highlight > 0 && highlight <6)
      {
          const djangoUrls = (Platform.OS == "android" ? 
          `http://192.168.0.101:8000/api/movies/${movie.id}/rate_movie/`
          :`http://192.168.0.101:8000/api/movies/${movie.id}/`);
          fetch(djangoUrls,{
            method: 'POST',
            headers: {
              'Authorization': `Token 00899e358115a9ecd55a2fec3a88b74c28ed6076`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({stars: highlight})
          })
          .then( res=> res.json() )
          .then( res => {
            setHighlight(0);
            Alert.alert("Rating", res.message);
          })
          .catch(error => Alert.alert("Error", error)) 
      }
    }

    return (
        <View style={styles.container}>
            <View style={styles.starConatiner}>
                <FontAwesomeIcon style={movie.avg_rating > 0? styles.orange : styles.white} icon={faStar}/>
                <FontAwesomeIcon style={movie.avg_rating > 1? styles.orange : styles.white} icon={faStar}/>
                <FontAwesomeIcon style={movie.avg_rating > 2? styles.orange : styles.white} icon={faStar}/>
                <FontAwesomeIcon style={movie.avg_rating > 3? styles.orange : styles.white} icon={faStar}/>
                <FontAwesomeIcon style={movie.avg_rating > 4? styles.orange : styles.white} icon={faStar}/>
                <Text style={styles.white}>({movie.no_of_ratings})</Text>
           </View>
            <Text style={styles.description}>{movie.description} </Text>
            <View style={{borderBottomColor:"white", borderBottomWidth: 4}} />
            <Text style={styles.description}>Rate it</Text>
            <View style={styles.starConatiner}>
                <FontAwesomeIcon style={highlight > 0? styles.purple : styles.grey} icon={faStar} size={48} onPress ={ ()=> {setHighlight(1); console.log("1"); } }/>
                <FontAwesomeIcon style={highlight > 1? styles.purple : styles.grey} icon={faStar} size={48} onPress ={ ()=> setHighlight(2)}/>
                <FontAwesomeIcon style={highlight > 2? styles.purple : styles.grey} icon={faStar} size={48} onPress ={ ()=> setHighlight(3)}/>
                <FontAwesomeIcon style={highlight > 3? styles.purple : styles.grey} icon={faStar} size={48} onPress ={ ()=> setHighlight(4)}/>
                <FontAwesomeIcon style={highlight > 4? styles.purple : styles.grey} icon={faStar} size={48} onPress ={ ()=> setHighlight(5)}/>
                <Text style={styles.white}>({movie.no_of_ratings})</Text>
           </View>
           <Button title="Rate" onPress={ ()=> rateClick() }></Button>
        </View>
    );
}

Detail.navigationOptions = screenProps => (
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
      <Button title="Edit" color="#841584" 
      onPress = {()=> screenProps.navigation.navigate("Edit",{movie: screenProps.navigation.getParam("movie")})}
      />
    )
  }
})

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
  starConatiner:{
    alignItems: "center",
    justifyContent: "center",
    flexDirection:"row"
  },
  orange:{
      color: "orange"
  },
  white:{
      color: "white"
  },
  purple:{
    color: "purple"
  },
  grey:{
    color: "#ccc"
  }
});
