import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "./component/Header";
import HomeScreen from "./Screens/HomeScreen";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import photoReducer from "./store/photo-reducer";
import { init } from "./helper/db";
const rootReducer = combineReducers({
  photos: photoReducer,
});
init()
  .then(() => {
    console.log("Initialise Database");
  })
  .catch((err) => {
    console.log("Initialise Database Falied", err);
  });
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default function App() {
  let content = <HomeScreen />;

  return (
    <Provider store={store}>
      <View style={styles.screen}>
        <Header title={"Compare Photo"} />
        {content}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
