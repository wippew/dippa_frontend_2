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
import { getDepots, getGroupsWithDepotId } from './api/RestApiCalls';

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

  const renderGroupsForm = () => {    
    if (store.depot1Options != null) {
      const opts = JSON.parse(store.depot1Options);
      return <MyForm optionsDepot={opts}/>;
    }
  }

  const getVehiclesForDepotAsOptions = async () => {
    const depots = await getDepots();
    const jsonDepots = depots;
    const firstDepot = jsonDepots[0];
    const firstDepotId = firstDepot.id;
    const groupsOfFirstDepot = await getGroupsWithDepotId(firstDepotId);
    
    const jsonGroupsOfFirstDepot = groupsOfFirstDepot;
    const returnState = {};
    const options = [];
    for (let i = 0; i < jsonGroupsOfFirstDepot.length; i++) {
      const current = jsonGroupsOfFirstDepot[i];
      const id = current.id;
      const name = current.name;
      const groupObj = { name: name, id: id};
      options.push(groupObj);
    }
    returnState.options = options;

    store.setDepot1Options(JSON.stringify(returnState));
    const test = store.depot1Options;
    const asd = "ASd";
  }


  getVehiclesForDepotAsOptions(); 



  return useObserver(() => (
    <>
      {renderGroupsForm()};
      <div className="mapClass">
        <Map />;
      </div>
      {renderAcceptButton()};
    </>
  ))
};


