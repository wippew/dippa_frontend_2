/* src/App.js */
import React, { useContext } from 'react';
import './App.css';
import { MyForm } from './components/MyForm';
import { Map } from './components/Map';
import { useObserver } from 'mobx-react'
import { isEmpty } from 'lodash'
import { StoreContext } from './components/Store';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { saveAssignments } from './api/AssignService';

//<pre>{process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}</pre>

export const App = () => {
  const store = useContext(StoreContext);
  const pressAccept = () => {
    alert("You are now pointing routes to their corresponding groups");
    const test = store.fetchedRoutesJson;
    saveAssignments(store.fetchedRoutesJson);
  }

  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 35,
      borderRadius: 4,
      width: 200,
      backgroundColor: '#00FF00',
      top: "90%",
      position: 'absolute',
      left: "45%"
    },
    text: {
      fontSize: 30,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });

  const renderAcceptButton = () => {
    if (!isEmpty(store.getPositions())) {
      return <Pressable style={styles.button} onPress={pressAccept}>
        <Text style={styles.text}>Hyväksy</Text>
      </Pressable>
    }
  }


  return useObserver(() => (
    <>
      <MyForm />;
      <div className="mapClass">
        <Map />;
      </div>
      {renderAcceptButton()};
    </>
  ))
};


