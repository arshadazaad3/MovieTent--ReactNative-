
import React, { Component, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Modal
} from 'react-native';

import axios from 'axios';

export default function App() {
  const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=63f4910d";
  const [state, setState] = useState({
    s: "Enter A Movie",
    results: [],
    selected: {},
  });

  const search = () => {
    axios(apiurl + "&s=" + state.s).then(({ data }) => {
      let results = data.Search
      console.log(results)
      setState(prevState => {
        return { ...prevState, results: results }
      })
    })

  }

  const openPopup = id => {
    axios(apiurl + "&t=" + id).then(({ data }) => {
      let result = data;
      console.log(result)
      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require('./logo.png')} style={{ height: 100, width: 300, position: 'relative', top: 15 }} />
      </View>


      <View style={styles.row}>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.searchBox}
            // value={state.s}
            placeholder="Search For Movie..."
            textAlign="center"

            onChangeText={text => setState(prevState => {
              return { ...prevState, s: text }
            })}
            onSubmitEditing={search}
          />
        </View>
        <View style={styles.inputWrap}>
          <TouchableOpacity style={styles.searchButton} onPress={search}>
            {/* <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>Search</Text> */}
            <Image source={require('./search.png')} style={{ height: 25, width: 25, position: 'relative', left: 15, top: 15 }} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.results}>
        {state.results.map(result => (
          <TouchableHighlight
            key={result.imdbID}
            onPress={() => openPopup(result.Title)}
          >
            <View style={styles.result}>
              <Image
                source={{ uri: result.Poster }}
                style={{
                  width: "100%",
                  height: 300,
                }}
                resizeMode="cover"
              />
              <Text style={styles.heading} >{result.Title}  </Text>
            </View>
          </TouchableHighlight>
        ))}

      </ScrollView>
      <Modal
        animationType='fade'
        transparent={false}
        visible={(typeof state.selected.Title != "undefined")}
      >
        <ScrollView style={styles.popup}>
          <View style={styles.popupBody}>
            <Text style={styles.poptitle}>{state.selected.Title}</Text>
            <Text style={{ marginBottom: 20, marginLeft: 3 }}>Rating : {state.selected.imdbRating}</Text>
            <Text style={{ marginLeft: 3, }}>{state.selected.Plot}{'\n'}</Text>
            <Text style={{ marginLeft: 3, }}>Actors: {state.selected.Actors}{'\n'}</Text>
            <Text style={{ marginLeft: 3, }}>Director: {state.selected.Director}{'\n'}</Text>
            <Text style={{ marginLeft: 3, }}>Year: {state.selected.Year}{'\n'}</Text>
            <Text style={{ marginLeft: 3, }}>Genre: {state.selected.Genre}{'\n'}</Text>
            <Text style={{ marginLeft: 3, }}>Awards: {state.selected.Awards}{'\n'}</Text>
            <Text style={{ marginLeft: 3, }}>RunTime : {state.selected.Runtime}{'\n'}</Text>
            <Text style={{ marginLeft: 3, }}>Release Date: {state.selected.Released}{'\n'}</Text>
          </View>
        </ScrollView>
        <TouchableHighlight
          onPress={() => setState(prevState => {
            return { ...prevState, selected: {} }
          })}
        >
          <Text style={styles.closeBTN}>Close</Text>
        </TouchableHighlight>
      </Modal>
    </View >
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-start",
    // backgroundColor: "#0e153a",
    paddingTop: 10

  },

  popupBody: {
    color: 'white'
  },
  image: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch',
    height: 700
  },
  appTitle: {
    fontSize: 40,
    // textAlign: "center",
    margin: 10,
    color: '#ee5a5a',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  row: {
    // flex: 1,
    flexDirection: "row"

  },
  inputWrap: {
    flex: 1,

  },

  logo:{
    alignContent:'center',
    alignItems:'center'
  },

  searchBox: {
    fontSize: 17,
    fontWeight: '300',
    // padding: 10,
    // width: "90%",
    // backgroundColor: "#fff",
    backgroundColor: '#ABA29C',
    borderRadius: 42,
    marginBottom: 40,
    width: '150%',
    height: 45,
    marginLeft: 10,
    top:10,
    marginTop: 10,
    left: 18

  },
  searchButton: {
    backgroundColor: "#22eaaa",
    borderRadius: 40,
    paddingBottom: 4,
    position: 'relative',
    top: 13,
    left: 98,
    fontSize: 10,
    width: 57,
    height: 57
  },
  results: {
    flex: 1,
  },
  result: {
    flex: 1,
    // width: '90%',
    width: '100%',
    marginBottom: 20,
    // marginLeft:"5%",
  },
  heading: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#086972'
  }
  ,

  popup: {
    paddingBottom: 20,
    flex: 1
  },
  poptitle: {
    fontSize: 34,
    fontWeight: '600',
    marginBottom: 10,
    marginLeft: 3,
  },
  closeBTN: {
    padding: 20,
    fontSize: 21,
    color: 'white',
    fontWeight: '700',
    backgroundColor: '#0c78af',


  }
})