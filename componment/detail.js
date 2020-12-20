import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, View,Image } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Detail (props) {

    const movie = props.navigation.getParam('movie')

    return (
        <View >
            <Text>{movie.title} </Text>
            <View style={styles.starConatiner}>
                <FontAwesomeIcon style={movie.avg_rating > 0? styles.orange : styles.white} icon={faStar}/>
                <FontAwesomeIcon style={movie.avg_rating > 1? styles.orange : styles.white} icon={faStar}/>
                <FontAwesomeIcon style={movie.avg_rating > 2? styles.orange : styles.white} icon={faStar}/>
                <FontAwesomeIcon style={movie.avg_rating > 3? styles.orange : styles.white} icon={faStar}/>
                <FontAwesomeIcon style={movie.avg_rating > 4? styles.orange : styles.white} icon={faStar}/>
                <Text>({movie.no_of_ratings})</Text>
           </View>
            <Text>{movie.description} </Text>
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
      color: "black"
  }
});
