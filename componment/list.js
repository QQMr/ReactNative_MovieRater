import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, View,Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MovieList (props) {

    //const [movies, setMovies] = useState([{id:100,title: "Rambo"},{id:200,title: "Predator"}]);
    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        const djangoUrls = (Platform.OS == "android" ? 
                            'http://192.168.0.101:8000/api/movies/'
                            :'http://192.168.0.101:8000/api/movies/');
        fetch(djangoUrls,{
            method: 'GET',
            headers: {
                'Authorization': `Token 00899e358115a9ecd55a2fec3a88b74c28ed6076`
            }
        })
        .then( res=> res.json() )
        .then(jsonRes => setMovies(jsonRes))
        .catch(error => console.log(error))
    },[])
    
    const movieclicked = (movie) =>{
        props.navigation.navigate('Detail',{movie: movie,title:movie.title})
    }

    return (
        <View >
            <Image source={require("../assets/MR_Log.png")}
            style = {{width:'100%',height: 135, paddingTop: 200}}
            resizeMode ="contain"
            />
            <FlatList
                data ={movies}
                renderItem = { ({item}) => (
                    <TouchableOpacity onPress={ () => movieclicked(item) }>
                        <View style={styles.item}>
                            <Text style={styles.itemText}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                ) }
                keyExtractor  ={(item) => item.id.toString()}
            />
            <StatusBar StatusBar="auto"></StatusBar>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  }
});
