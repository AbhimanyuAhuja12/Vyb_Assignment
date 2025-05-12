/**
 * Measurement conversions to standardize units
 */
export const measurementConversions = {
  // General conversions (per unit to grams)
  general: {
    'cup': 240,      // 1 cup = 240g (for water, ~240ml)
    'katori': 150,   // 1 katori = ~150g (varies by food type)
    'tbsp': 15,      // 1 tablespoon = ~15g
    'tsp': 5,        // 1 teaspoon = ~5g
    'g': 1,          // 1 gram = 1g
    'kg': 1000,      // 1 kg = 1000g
    'oz': 28,        // 1 ounce = ~28g
    'lb': 454,       // 1 pound = ~454g
    'ml': 1,         // 1 ml = ~1g (for water)
    'l': 1000,       // 1 liter = 1000g (for water)
    'glass': 250,    // 1 glass = ~250g
    'piece': 30,     // Highly variable, default assumption
    'pinch': 0.5     // 1 pinch = ~0.5g
  },
  
  // Specific ingredient conversions (ingredient to unit to grams)
  specificIngredients: {
    // Oils and fats
    'oil': {
      'tbsp': 13,     // 1 tbsp of oil = ~13g
      'tsp': 4.3      // 1 tsp of oil = ~4.3g
    },
    'butter': {
      'tbsp': 14,     // 1 tbsp of butter = ~14g
      'tsp': 4.7      // 1 tsp of butter = ~4.7g
    },
    'ghee': {
      'tbsp': 13,
      'tsp': 4.3
    },
    
    // Spices
    'salt': {
      'tbsp': 18,     // 1 tbsp of salt = ~18g
      'tsp': 6,       // 1 tsp of salt = ~6g
      'pinch': 0.4    // 1 pinch of salt = ~0.4g
    },
    'turmeric': {
      'tbsp': 9,
      'tsp': 3,
      'pinch': 0.2
    },
    'chilli powder': {
      'tbsp': 8,
      'tsp': 2.7
    },
    'garam masala': {
      'tbsp': 7,
      'tsp': 2.3
    },
    
    // Grains
    'rice': {
      'cup': 180,     // 1 cup rice = ~180g
      'katori': 124   // per serving reference
    },
    'flour': {
      'cup': 120,     // 1 cup flour = ~120g
      'tbsp': 8
    },
    
    // Vegetables/common ingredients
    'onion': {
      'piece': 110,   // Medium onion
      'cup': 160      // 1 cup chopped
    },
    'tomato': {
      'piece': 90,    // Medium tomato
      'cup': 180      // 1 cup chopped
    },
    'potato': {
      'piece': 150    // Medium potato
    },
    'carrot': {
      'piece': 60,    // Medium carrot
      'cup': 110      // 1 cup chopped
    },
    'garlic': {
      'clove': 5,     // 1 clove of garlic
      'tbsp': 9       // 1 tbsp minced
    },
    'ginger': {
      'piece': 15,    // 1 inch piece
      'tbsp': 6       // 1 tbsp minced
    }
  }
};

/**
 * Standard serving sizes for different dish types
 * Based on the household measurement reference provided
 */
export const standardServings = {
  'Dry Rice Item': { unit: 'Katori', weight: 124 },
  'Wet Rice Item': { unit: 'Katori', weight: 150 },
  'Veg Gravy': { unit: 'Katori', weight: 150 },
  'Veg Fry': { unit: 'Katori', weight: 100 },
  'Non - Veg Gravy': { unit: 'Katori', weight: 150 },
  'Non - Veg Fry': { unit: 'Katori', weight: 100 },
  'Dals': { unit: 'Katori', weight: 150 },
  'Wet Breakfast Item': { unit: 'Katori', weight: 130 },
  'Dry Breakfast Item': { unit: 'Katori', weight: 100 },
  'Chutneys': { unit: 'Tbsp', weight: 15 },
  'Plain Flatbreads': { unit: 'Piece', weight: 50 },
  'Stuffed Flatbreads': { unit: 'Piece', weight: 100 },
  'Salads': { unit: 'Katori', weight: 100 },
  'Raita': { unit: 'Katori', weight: 150 },
  'Plain Soups': { unit: 'Katori', weight: 150 },
  'Mixed Soups': { unit: 'Cup', weight: 250 },
  'Hot Beverages': { unit: 'Cup', weight: 250 },
  'Beverages': { unit: 'Cup', weight: 250 },
  'Snacks': { unit: 'Katori', weight: 100 },
  'Sweets': { unit: 'Katori', weight: 120 },
  // Default in case the dish type is not recognized
  'default': { unit: 'Katori', weight: 150 }
};