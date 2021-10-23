import React from "react";
import { View, StyleSheet, Button, ImageBackground } from "react-native";
const Card = (props) => {
  return (
    <View style={styles.card}>
      <ImageBackground
        style={styles.imageThumbnail}
        source={{ uri: props.data.url + ".png" }}
      >
        <Button
          onPress={() => {
            props.data.isAddedToCompare
              ? props.removePhotofromCampare(props.data)
              : props.onClick();
          }}
          title={
            props.isFromCompareList || props.data.isAddedToCompare
              ? "Remove"
              : "Compare"
          }
        ></Button>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "column",
    margin: 5,
    alignItems: "stretch",
    justifyContent: "center",
  },
  imageThumbnail: {
    flexGrow: 1,
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
  },
});
export default Card;
