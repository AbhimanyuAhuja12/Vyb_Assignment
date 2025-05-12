import { logger } from '../utils/logger.js';

/**
 * Measurement Conversions Data
 * Provides comprehensive conversion factors for ingredients
 */
export const measurementConversions = {
  specificIngredients: {
    'oil': {
      'tbsp': 13,  // Light density
      'cup': 218
    },
    'honey': {
      'tbsp': 21,  // Dense liquid
      'cup': 340
    },
    'rice': {
      'cup': 180,  // Medium density
      'tbsp': 12
    },
    'flour': {
      'cup': 120,  // Light, less packed
      'tbsp': 8
    },
    'dried herbs': {
      'tbsp': 2,   // Very light
      'cup': 30
    },
    'water': {
      'tbsp': 15,
      'cup': 240
    }
  },
  general: {
    'tbsp': 15,  // Generic tablespoon conversion
    'cup': 240   // Generic cup conversion
  }
};

/**
 * Converts ingredient units to grams
 * @param {Array} ingredients - List of ingredients with units
 * @returns {Object} Converted ingredients and assumptions
 */
export function convertIngredientUnits(ingredients) {
  logger.info('Converting ingredient units to grams');
  
  const convertedIngredients = [];
  const assumptions = [];
  
  for (const ingredient of ingredients) {
    const { name, quantity, unit } = ingredient;
    let convertedQuantity = parseFloat(quantity) || 0;
    let convertedUnit = unit ? unit.toLowerCase() : '';
    let grams = 0;
    let assumptionMade = false;
    
    logger.debug(`Converting: ${quantity} ${unit} of ${name}`);
    
    // Handle missing units
    if (!unit || unit === '') {
      convertedUnit = guessAppropriateUnit(name);
      assumptions.push(`Assumed unit "${convertedUnit}" for ${name} since no unit was provided`);
      assumptionMade = true;
    }
    
    // Handle "glass" unit (from test case)
    if (convertedUnit === 'glass') {
      convertedUnit = 'cup';
      convertedQuantity = convertedQuantity * 1.5; // Assuming 1 glass = 1.5 cups
      assumptions.push(`Converted "glass" to "cup" for ${name} (1 glass = 1.5 cups)`);
      assumptionMade = true;
    }
    
    // Handle special case for "katori" - keep as is for later use
    if (convertedUnit === 'katori') {
      grams = getDensityBasedWeight(name, convertedQuantity, convertedUnit);
    } 
    // Convert to grams based on measurement conversions
    else {
      grams = convertToGrams(name, convertedQuantity, convertedUnit);
      
      if (grams === 0 && convertedQuantity > 0) {
        // If conversion failed but we have a quantity, make an assumption
        grams = assumeDefaultWeight(name, convertedQuantity, convertedUnit);
        assumptions.push(`No conversion found for ${convertedQuantity} ${convertedUnit} of ${name}. Assumed ${grams}g.`);
        assumptionMade = true;
      }
    }
    
    convertedIngredients.push({
      name,
      originalQuantity: quantity,
      originalUnit: unit,
      quantity: convertedQuantity,
      unit: convertedUnit,
      grams,
      assumptionMade
    });
  }
  
  return { 
    convertedIngredients, 
    conversionAssumptions: assumptions 
  };
}

/**
 * Convert a quantity from a given unit to grams
 * @param {string} ingredient - Ingredient name
 * @param {number} quantity - Quantity in original unit
 * @param {string} unit - Original unit
 * @returns {number} - Weight in grams
 */
export function convertToGrams(ingredient, quantity, unit) {
  // Normalize the unit
  const normalizedUnit = normalizeUnit(unit);
  
  // Normalize the ingredient name
  const normalizedIngredient = ingredient.toLowerCase();
  
  // Absolute value to handle negative quantities
  const absQuantity = Math.abs(quantity);
  
  // Check for specific ingredient conversion
  const specificIngredients = measurementConversions.specificIngredients;
  
  // First, check for a specific ingredient and unit conversion
  if (specificIngredients[normalizedIngredient] && 
      specificIngredients[normalizedIngredient][normalizedUnit]) {
    return specificIngredients[normalizedIngredient][normalizedUnit] * absQuantity;
  }
  
  // If no specific conversion, check for general unit conversion
  const generalConversions = measurementConversions.general;
  if (generalConversions[normalizedUnit]) {
    return generalConversions[normalizedUnit] * absQuantity;
  }
  
  // Fallback to water density if no conversion found
  return 15 * absQuantity;
}

/**
 * Normalize unit names to handle variations
 * @param {string} unit - Unit to normalize
 * @returns {string} - Normalized unit
 */
function normalizeUnit(unit) {
  if (!unit) return 'cup';  // Default to cup if no unit provided
  
  const unitMap = {
    'tbsp': ['tablespoon', 'tablespoons', 'table spoon', 'tblsp'],
    'cup': ['cups', 'glass', 'glasses'],
    'tsp': ['teaspoon', 'teaspoons', 'tea spoon']
  };
  
  // Convert to lowercase
  const lowercaseUnit = unit.toLowerCase().trim();
  
  // Check if it's already a normalized unit
  if (['tbsp', 'cup', 'tsp'].includes(lowercaseUnit)) {
    return lowercaseUnit;
  }
  
  // Check if it's a variation of a normalized unit
  for (const [normalized, variations] of Object.entries(unitMap)) {
    if (variations.includes(lowercaseUnit)) {
      return normalized;
    }
  }
  
  // Default to cup if unrecognized
  return 'cup';
}

/**
 * Guess appropriate unit for an ingredient when none is provided
 * @param {string} ingredientName - Name of the ingredient
 * @returns {string} - Guessed unit
 */
function guessAppropriateUnit(ingredientName) {
  const name = ingredientName.toLowerCase();
  
  if (/salt|pepper|spice|powder|masala|jeera|cumin|coriander|chilli|turmeric/.test(name)) {
    return 'tsp';
  }
  else if (/oil|water|milk|vinegar|juice/.test(name)) {
    return 'tbsp';
  }
  else if (/onion|tomato|potato|carrot|capsicum|ginger|garlic|chilli|lemon/.test(name)) {
    return 'piece';
  }
  else {
    return 'cup';
  }
}

/**
 * Assume a default weight when conversion fails
 * @param {string} ingredientName - Name of the ingredient
 * @param {number} quantity - Quantity of the ingredient
 * @param {string} unit - Unit of measurement
 * @returns {number} - Estimated weight in grams
 */
function assumeDefaultWeight(ingredientName, quantity, unit) {
  // Default values for common ingredients (in grams per unit)
  const defaults = {
    // Spices (per teaspoon)
    'tsp': {
      default: 5,
      'salt': 6,
      'sugar': 4,
      'oil': 5,
      'spice': 3,
      'powder': 3
    },
    // Per tablespoon
    'tbsp': {
      default: 15,
      'oil': 13,
      'ghee': 13,
      'butter': 14,
      'honey': 20
    },
    // Per cup
    'cup': {
      default: 150,
      'rice': 180,
      'flour': 120,
      'water': 240,
      'milk': 240
    },
    // Per piece
    'piece': {
      default: 50,
      'onion': 150,
      'tomato': 100,
      'potato': 150,
      'carrot': 60,
      'garlic': 5,
      'chilli': 10
    }
  };
  
  // Get the default weight for this unit
  const unitDefaults = defaults[unit] || { default: 50 };
  
  // Check if we have a specific default for this ingredient
  for (const [key, value] of Object.entries(unitDefaults)) {
    if (key !== 'default' && ingredientName.toLowerCase().includes(key)) {
      return value * quantity;
    }
  }
  
  // Use the default value for this unit
  return unitDefaults.default * quantity;
}

/**
 * Get weight based on density for katori and other specific measurements
 * @param {string} ingredientName - Name of the ingredient
 * @param {number} quantity - Quantity of the ingredient
 * @param {string} unit - Unit of measurement
 * @returns {number} - Weight in grams
 */
function getDensityBasedWeight(ingredientName, quantity, unit) {
  // Weight categories from the household measurement reference
  const weightCategories = {
    'katori': {
      'Dry Rice Item': 124,
      'Wet Rice Item': 150,
      'Veg Gravy': 150,
      'Veg Fry': 100,
      'Non - Veg Gravy': 150,
      'Non - Veg Fry': 100,
      'Dals': 150,
      'Wet Breakfast Item': 130,
      'Dry Breakfast Item': 100,
      'Chutneys': 15,  
      'Raita': 150,
      'default': 150
    }
  };
  
  // Determine the category based on ingredient name
  let category = 'default';
  
  if (/rice|pulao|biryani/.test(ingredientName.toLowerCase())) {
    category = /gravy|curry/.test(ingredientName.toLowerCase()) ? 'Wet Rice Item' : 'Dry Rice Item';
  }
  else if (/dal|lentil/.test(ingredientName.toLowerCase())) {
    category = 'Dals';
  }
  else if (/chutney/.test(ingredientName.toLowerCase())) {
    category = 'Chutneys';
  }
  else if (/raita|yogurt|curd/.test(ingredientName.toLowerCase())) {
    category = 'Raita';
  }
  else if (/chicken|mutton|fish|egg|non-veg|non veg/.test(ingredientName.toLowerCase())) {
    category = /gravy|curry/.test(ingredientName.toLowerCase()) ? 'Non - Veg Gravy' : 'Non - Veg Fry';
  }
  else {
    category = /gravy|curry/.test(ingredientName.toLowerCase()) ? 'Veg Gravy' : 'Veg Fry';
  }
  
  // Get the weight for this category and unit
  const unitWeights = weightCategories[unit] || { default: 100 };
  const weight = unitWeights[category] || unitWeights.default;
  
  return weight * quantity;
}