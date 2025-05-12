/**
 * Sample recipe database for ingredient fetching
 * In a real application, this would be a database or API call
 */
export const recipeDatabase = [
  {
    name: "Jeera Aloo (mild fried)",
    ingredients: [
      { name: "potato", quantity: "2", unit: "piece" },
      { name: "cumin seeds", quantity: "1", unit: "tsp" },
      { name: "turmeric powder", quantity: "1/2", unit: "tsp" },
      { name: "coriander powder", quantity: "1", unit: "tsp" },
      { name: "red chilli powder", quantity: "1/2", unit: "tsp" },
      { name: "garam masala", quantity: "1/4", unit: "tsp" },
      { name: "cooking oil", quantity: "2", unit: "tbsp" },
      { name: "salt", quantity: "", unit: "" },
      { name: "coriander leaves", quantity: "", unit: "" }
    ]
  },
  {
    name: "Gobhi Sabzi",
    ingredients: [
      { name: "cauliflower", quantity: "1", unit: "piece" },
      { name: "potato", quantity: "1", unit: "piece" },
      { name: "onion", quantity: "1", unit: "piece" },
      { name: "tomato", quantity: "1", unit: "piece" },
      { name: "garlic", quantity: "4", unit: "clove" },
      { name: "ginger", quantity: "1", unit: "inch" },
      { name: "cumin seeds", quantity: "1", unit: "tsp" },
      { name: "turmeric powder", quantity: "1/2", unit: "tsp" },
      { name: "coriander powder", quantity: "1", unit: "tsp" },
      { name: "red chilli powder", quantity: "1", unit: "tsp" },
      { name: "garam masala", quantity: "1/2", unit: "tsp" },
      { name: "cooking oil", quantity: "2", unit: "tbsp" },
      { name: "salt", quantity: "1", unit: "tsp" },
      { name: "water", quantity: "1/4", unit: "cup" }
    ]
  },
  {
    name: "Chana masala",
    ingredients: [
      { name: "chickpeas", quantity: "1", unit: "cup" },
      { name: "onion", quantity: "1", unit: "piece" },
      { name: "tomato", quantity: "2", unit: "piece" },
      { name: "garlic", quantity: "4", unit: "clove" },
      { name: "ginger", quantity: "1", unit: "inch" },
      { name: "green chilli", quantity: "2", unit: "piece" },
      { name: "cumin seeds", quantity: "1", unit: "tsp" },
      { name: "coriander powder", quantity: "2", unit: "tsp" },
      { name: "turmeric powder", quantity: "1/2", unit: "tsp" },
      { name: "red chilli powder", quantity: "1", unit: "tsp" },
      { name: "garam masala", quantity: "1", unit: "tsp" },
      { name: "amchur powder", quantity: "1/2", unit: "tsp" }, // This is a missing ingredient in DB
      { name: "cooking oil", quantity: "2", unit: "tbsp" },
      { name: "salt", quantity: "1", unit: "tsp" },
      { name: "water", quantity: "1", unit: "cup" },
      { name: "coriander leaves", quantity: "2", unit: "tbsp" }
    ]
  },
  {
    name: "Paneer Curry with capsicum",
    ingredients: [
      { name: "paneer", quantity: "200", unit: "g" },
      { name: "capsicum", quantity: "1", unit: "piece" }, // Spelling variation
      { name: "onion", quantity: "1", unit: "piece" },
      { name: "tomato", quantity: "2", unit: "piece" },
      { name: "garlic", quantity: "3", unit: "clove" },
      { name: "ginger", quantity: "1", unit: "inch" },
      { name: "green chilli", quantity: "2", unit: "piece" },
      { name: "cumin seeds", quantity: "1", unit: "tsp" },
      { name: "turmeric powder", quantity: "1/2", unit: "tsp" },
      { name: "red chilli powder", quantity: "1", unit: "tsp" },
      { name: "coriander powder", quantity: "1", unit: "tsp" },
      { name: "garam masala", quantity: "1/2", unit: "tsp" },
      { name: "cream", quantity: "1", unit: "glass" }, // Glass unit
      { name: "cooking oil", quantity: "2", unit: "tbsp" },
      { name: "salt", quantity: "1", unit: "tsp" },
      { name: "coriander leaves", quantity: "2", unit: "tbsp" }
    ]
  },
  {
    name: "Mixed veg",
    ingredients: [
      { name: "carrot", quantity: "1", unit: "piece" },
      { name: "potato", quantity: "1", unit: "piece" },
      { name: "cauliflower", quantity: "1/2", unit: "piece" },
      { name: "beans", quantity: "10", unit: "piece" },
      { name: "peas", quantity: "1/4", unit: "cup" },
      { name: "onion", quantity: "1", unit: "piece" },
      { name: "tomato", quantity: "1", unit: "piece" },
      { name: "garlic", quantity: "3", unit: "clove" },
      { name: "ginger", quantity: "1", unit: "inch" },
      { name: "green chilli", quantity: "1", unit: "piece" },
      { name: "cumin seeds", quantity: "1", unit: "tsp" },
      { name: "turmeric powder", quantity: "1/2", unit: "tsp" },
      { name: "coriander powder", quantity: "1", unit: "tsp" },
      { name: "red chilli powder", quantity: "1/2", unit: "tsp" },
      { name: "garam masala", quantity: "1/2", unit: "tsp" },
      { name: "cooking oil", quantity: "2", unit: "tbsp" },
      { name: "salt", quantity: "1", unit: "tsp" },
      { name: "water", quantity: "1/2", unit: "cup" },
      { name: "coriander leaves", quantity: "1", unit: "tbsp" }
    ]
  },
  {
    name: "Generic Vegetable Curry",
    ingredients: [
      { name: "mixed vegetables", quantity: "2", unit: "cup" },
      { name: "onion", quantity: "1", unit: "piece" },
      { name: "tomato", quantity: "1", unit: "piece" },
      { name: "garlic", quantity: "2", unit: "clove" },
      { name: "ginger", quantity: "1", unit: "inch" },
      { name: "curry powder", quantity: "2", unit: "tsp" },
      { name: "turmeric powder", quantity: "1/2", unit: "tsp" },
      { name: "red chilli powder", quantity: "1/2", unit: "tsp" },
      { name: "cooking oil", quantity: "2", unit: "tbsp" },
      { name: "salt", quantity: "1", unit: "tsp" },
      { name: "water", quantity: "1", unit: "cup" }
    ]
  },
  {
    name: "Generic Meat Curry",
    ingredients: [
      { name: "meat", quantity: "500", unit: "g" },
      { name: "onion", quantity: "2", unit: "piece" },
      { name: "tomato", quantity: "2", unit: "piece" },
      { name: "garlic", quantity: "4", unit: "clove" },
      { name: "ginger", quantity: "2", unit: "inch" },
      { name: "curry powder", quantity: "2", unit: "tbsp" },
      { name: "turmeric powder", quantity: "1", unit: "tsp" },
      { name: "red chilli powder", quantity: "1", unit: "tsp" },
      { name: "garam masala", quantity: "1", unit: "tsp" },
      { name: "cooking oil", quantity: "3", unit: "tbsp" },
      { name: "salt", quantity: "1.5", unit: "tsp" },
      { name: "water", quantity: "2", unit: "cup" }
    ]
  }
];