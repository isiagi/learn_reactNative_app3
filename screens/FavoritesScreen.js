import { useContext } from "react";
import { FavouritesContext } from "../store/context/favourites-context";
import MealsList from "../components/mealsList/MealsList";
import { MEALS } from "../data/dummy-data";
import { StyleSheet, Text, View } from "react-native";

const FavoritesScreen = () => {
  const favouriteMealCtx = useContext(FavouritesContext);

  const favouriteMeals = MEALS.filter((meal) =>
    favouriteMealCtx.ids.includes(meal.id)
  );

  if (favouriteMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite meals yet.</Text>
      </View>
    );
  }

  return <MealsList items={favouriteMeals} />;
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
