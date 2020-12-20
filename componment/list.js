import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';

export default function MovieList () {

    //const [movies, setMovies] = useState([{id:100,title: "Rambo"},{id:200,title: "Predator"}]);
    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        const djangoUrls = (Platform.OS == "android" ? 
                            'http://10.0.2.2:8000/api/movies/'
                            :'http://127.0.0.1:8000/api/movies/');
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
    
    return (
        <View style={styles.container}>
            <Text>QQ2</Text>
            <Text>QQ</Text>
            <Text>QQ2</Text>
            <FlatList
                data ={movies}
                renderItem = { ({item}) => (
                    <Text >{item.title}</Text>
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
});
