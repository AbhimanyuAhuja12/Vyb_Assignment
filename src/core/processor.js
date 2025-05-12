import { fetchIngredients } from './fetcher.js';
import { convertIngredientUnits } from './converter.js';
import { mapIngredientsToDb } from './mapper.js';
import { calculateNutrition } from './calculator.js';
import { identifyDishType } from './identifier.js';
import { logger } from '../utils/logger.js';
import { testDishes } from '../data/testDishes.js';
import { standardServings } from '../data/measurements.js';

/**
 * Process a single dish and return nutrition information
 * @param {string} dishName - Name of the dish
 * @param {Array} issues - Known issues with this dish
 * @returns {Object} - Processed dish with nutrition info
 */
export async function processDish(dishName, issues = []) {
  logger.info(`Processing dish: ${dishName}`);
  logger.info(`Known issues: ${issues.join(', ')}`);
  
  const assumptions = [];
  let confidence = 100; // Start with 100% confidence
  
  try {
    // Step 1: Fetch ingredients
    logger.info('Step 1: Fetching ingredients');
    const { ingredients, fetchAssumptions } = await fetchIngredients(dishName);
    assumptions.push(...fetchAssumptions);
    
    if (fetchAssumptions.length > 0) {
      confidence -= 10; // Reduce confidence if we made assumptions
    }
    
    // Step 2: Convert units to household measurements
    logger.info('Step 2: Converting units');
    const { convertedIngredients, conversionAssumptions } = convertIngredientUnits(ingredients);
    assumptions.push(...conversionAssumptions);
    
    if (conversionAssumptions.length > 0) {
      confidence -= 5; // Reduce confidence if we made unit conversion assumptions
    }
    
    // Step 3: Map ingredients to nutrition DB
    logger.info('Step 3: Mapping ingredients to nutrition database');
    const { mappedIngredients, mappingAssumptions } = mapIngredientsToDb(convertedIngredients);
    assumptions.push(...mappingAssumptions);
    
    if (mappingAssumptions.length > 0) {
      confidence -= 15; // Reduce confidence if we made mapping assumptions
    }
    
    // Step 4: Identify dish type
    logger.info('Step 4: Identifying dish type');
    const { dishType, typeAssumptions } = identifyDishType(dishName, ingredients);
    assumptions.push(...typeAssumptions);
    
    if (typeAssumptions.length > 0) {
      confidence -= 10; // Reduce confidence if we made dish type assumptions
    }
    
    // Get standard serving size based on dish type
    const servingInfo = standardServings[dishType] || standardServings.default;
    
    // Step 5: Calculate nutrition
    logger.info('Step 5: Calculating nutrition information');
    const { nutrition, totalWeight, calculationAssumptions } = calculateNutrition(
      mappedIngredients, 
      servingInfo.weight
    );
    assumptions.push(...calculationAssumptions);
    
    if (calculationAssumptions.length > 0) {
      confidence -= 10; // Reduce confidence if we made calculation assumptions
    }
    
    // Ensure confidence doesn't go below 0
    confidence = Math.max(0, confidence);
    
    // Return full result
    return {
      dish: dishName,
      issues,
      ingredients: mappedIngredients,
      dishType,
      servingType: servingInfo.unit,
      servingSize: servingInfo.weight,
      totalWeight,
      nutrition,
      assumptions,
      confidence
    };
  } catch (error) {
    logger.error(`Error processing dish ${dishName}:`, error);
    return {
      dish: dishName,
      issues,
      error: error.message,
      assumptions,
      confidence: 0
    };
  }
}

/**
 * Process all test dishes
 * @returns {Array} Results for all dishes
 */
export async function processTestDishes() {
  const results = [];
  
  for (const testDish of testDishes) {
    const result = await processDish(testDish.dish, testDish.issues || []);
    results.push(result);
    
    // Write to debug log
    logger.debug(`===== DISH: ${testDish.dish} =====`);
    logger.debug(`Issues: ${testDish.issues ? testDish.issues.join(', ') : 'none'}`);
    logger.debug(`Assumptions: ${result.assumptions.join('\n  ')}`);
    logger.debug(`Confidence: ${result.confidence}%`);
    logger.debug('=================================\n');
  }
  
  return results;
}