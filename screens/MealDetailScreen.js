import { useLayoutEffect, useContext } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import IconButton from "../components/IconButton";
import List from "../components/MealDetail/List";
import Subtitle from "../components/MealDetail/Subtitle";
import MealDetails from "../components/MealDetails";

import {FavouritesContext} from '../store/context/favourites-context'

import { MEALS } from "../data/dummy-data";

const MealDetailScreen = ({ route, navigation }) => {
  const favouriteMealCtx = useContext(FavouritesContext)

  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const mealIsFavourite = favouriteMealCtx.ids.includes(mealId)

  function headerButtonPressHandler() {
    if(mealIsFavourite) {
      favouriteMealCtx.removeFavourite(mealId)
    } else {
      favouriteMealCtx.addFavourite(mealId)
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton icon={mealIsFavourite ? 'star' : 'star-outline'} onPress={headerButtonPressHandler} color='white' />
        );
      },
    });
  }, [navigation, headerButtonPressHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <View>
        <MealDetails
          duration={selectedMeal.duration}
          complexity={selectedMeal.complexity}
          affordability={selectedMeal.affordability}
          textStyle={styles.detailText}
        />
      </View>
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>ingredients</Subtitle>
          <List selectedMeal={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List selectedMeal={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listContainer: {
    width: "80%",
  },
  listOuterContainer: {
    alignItems: "center",
  },
});
