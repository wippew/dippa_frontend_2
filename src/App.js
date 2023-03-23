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
      return <MyForm optionsDepot={opts} />;
    }
  }

  const getVehiclesForDepotAsOptions = async () => {
    const depots = await getDepots();
    const jsonDepots = JSON.parse(depots);

    const firstDepot = jsonDepots[0];
    const readyFirstDepot = await createOptionsForDepot(firstDepot)
    const firstDepotCoords = [firstDepot.latitude, firstDepot.longitude];
    store.firstDepotCoords = firstDepotCoords; 
    store.setDepot1Options(JSON.stringify(readyFirstDepot));

    const secondDepot = jsonDepots[1];
    const readySecondDepot = await createOptionsForDepot(secondDepot);
    const secondDepotCoords = [secondDepot.latitude, secondDepot.longitude];
    store.secondDepotCoords = firstDepotCoords; 
    store.setDepot2Options(JSON.stringify(readySecondDepot));
  }

  const createOptionsForDepot = async (depot) => {
    

    const depotId = depot.id;
    const groupsOfDepot = await getGroupsWithDepotId(depotId);

    const jsonGroupsOfDepot = JSON.parse(groupsOfDepot);
    const returnState = {};
    const options = [];
    options.depotId = 0;
    for (let i = 0; i < jsonGroupsOfDepot.length; i++) {
      const current = jsonGroupsOfDepot[i];
      const id = current.resourceId;
      const name = current.name;
      const groupObj = { name: name, id: id, depotId: depotId};
      
      options.push(groupObj);
    }
    returnState.options = options;
    returnState.depotId = depotId;
    return returnState

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


