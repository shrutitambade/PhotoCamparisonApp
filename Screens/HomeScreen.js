import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  SafeAreaView,
} from "react-native";
import CardComponent from "../component/Card";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../Service/getList";
import * as photoAction from "../store/photo-actions";
const HomeScreen = (props) => {
  const [photoList, setPhotoList] = useState([]);
  const dispatch = useDispatch();
  let compareList = useSelector((state) => state.photos.photos);

  useEffect(() => {
    dispatch(photoAction.loadPhotos());
    let mounted = true;
    getList().then((items) => {
      if (mounted) {
        const newArr = items.map((v) => ({ ...v, isAddedToCompare: false }));
        setPhotoList(newArr);
      }
    });
    return () => (mounted = false);
  }, [dispatch]);
  const addToCompareHandler = (item) => {
    item.isAddedToCompare = true;
    setPhotoList(photoList);
    dispatch(photoAction.addPhoto(item.id, item.url, item.title));
  };
  const removeFromCompareHandler = (item) => {
    item.isAddedToCompare = false;
    setPhotoList(photoList);
    dispatch(photoAction.removePhoto(item.id));
  };

  const compareListUI = () => {
    return (
      <>
        <Text style={styles.titleText}>Compare List</Text>
        <FlatList
          data={compareList}
          renderItem={({ item }) => (
            <CardComponent
              key={compareList}
              data={item}
              onClick={() => {
                removeFromCompareHandler(item);
              }}
              compareList={compareList}
              isFromCompareList={true}
              
            />
          )}
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
      </>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {compareList.length > 0 ? compareListUI() : null}
      <Text style={styles.titleText}>Main List</Text>
      <FlatList
        data={photoList}
        renderItem={({ item }) => (
          <CardComponent
            key={photoList}
            data={item}
            compareList={compareList}
            onClick={() => {
              addToCompareHandler(item);
            }}
            removePhotofromCampare={(item) => {
              removeFromCompareHandler(item);
            }}
          />
        )}
        numColumns={2}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  titleText: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default HomeScreen;
