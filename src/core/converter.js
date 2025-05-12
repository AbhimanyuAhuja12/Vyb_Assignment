import { measurementConversions } from '../data/measurements.js';
import { logger } from '../utils/logger.js';

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
  
  // Find the conversion factor
  let factor = 0;
  
  // Check if we have a specific conversion for this ingredient
  const specificConversion = measurementConversions.specificIngredients[ingredient.toLowerCase()];
  
  if (specificConversion && specificConversion[normalizedUnit]) {
    factor = specificConversion[normalizedUnit];
  } 
  // Otherwise use the general conversion
  else if (measurementConversions.general[normalizedUnit]) {
    factor = measurementConversions.general[normalizedUnit];
  }
  
  // Adjust the factor based on ingredient density
  factor = adjustForDensity(factor, ingredient, normalizedUnit);
  
  return Math.round(quantity * factor * 10) / 10; // Round to 1 decimal place
}

/**
 * Normalize unit names to handle variations
 */
function normalizeUnit(unit) {
  const unitMap = {
    'tbsp': ['tablespoon', 'tablespoons', 'table spoon', 'tblsp'],
    'tsp': ['teaspoon', 'teaspoons', 'tea spoon'],
    'cup': ['cups', 'glass', 'glasses'],
    'g': ['gram', 'grams', 'gm', 'gms'],
    'kg': ['kilogram', 'kilograms', 'kilo'],
    'ml': ['milliliter', 'milliliters', 'millilitre'],
    'l': ['liter', 'liters', 'litre'],
    'oz': ['ounce', 'ounces'],
    'lb': ['pound', 'pounds'],
    'pinch': ['dash', 'pinches'],
    'piece': ['pc', 'pcs', 'pieces']
  };
  
  // Convert to lowercase
  const lowercaseUnit = unit.toLowerCase();
  
  // Check if it's already a normalized unit
  if (Object.keys(unitMap).includes(lowercaseUnit)) {
    return lowercaseUnit;
  }
  
  // Check if it's a variation of a normalized unit
  for (const [normalized, variations] of Object.entries(unitMap)) {
    if (variations.includes(lowercaseUnit)) {
      return normalized;
    }
  }
  
  // Return the original unit if no match
  return lowercaseUnit;
}

/**
 * Adjust conversion factor based on ingredient density
 */
function adjustForDensity(factor, ingredient, unit) {
  // Only adjust volume measurements (not weight)
  if (!['cup', 'tbsp', 'tsp'].includes(unit)) {
    return factor;
  }
  
  const lowercaseIngredient = ingredient.toLowerCase();
  
  // Heavier ingredients
  if (/sugar|jaggery|rice|dal|lentil/.test(lowercaseIngredient)) {
    return factor * 1.2;
  }
  // Lighter ingredients
  else if (/flour|powder|spice|masala/.test(lowercaseIngredient)) {
    return factor * 0.8;
  }
  // Very light ingredients
  else if (/leaf|cilantro|coriander|mint/.test(lowercaseIngredient)) {
    return factor * 0.4;
  }
  // Very dense ingredients
  else if (/oil|ghee|butter|honey/.test(lowercaseIngredient)) {
    return factor * 1.3;
  }
  
  return factor;
}

/**
 * Guess appropriate unit for an ingredient when none is provided
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
 */
function getDensityBasedWeight(ingredientName, quantity, unit) {
  // Weight categories from the household measurement reference
  // These are based on the provided reference table
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
      'Chutneys': 15,  // tbsp
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