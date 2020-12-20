import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, View,Image } from 'react-native';

export default function Detail (props) {

    const movie = props.navigation.getParam('movie')

    return (
        <View >
            <Text>Details about {movie.title} </Text>
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
