import { processDish } from '../core/processor.js';
import { logger } from '../utils/logger.js';

// Get command line arguments
const args = process.argv.slice(2);

// Display help message if requested
if (args.includes('--help') || args.includes('-h') || args.length === 0) {
  displayHelp();
  process.exit(0);
}

// Process the command
async function main() {
  // Check for verbose flag
  if (args.includes('--verbose') || args.includes('-v')) {
    logger.setLogLevel('debug');
    // Remove the flag from args
    const index = args.indexOf('--verbose') !== -1 ? args.indexOf('--verbose') : args.indexOf('-v');
    args.splice(index, 1);
  }
  
  // Get the dish name (rest of the arguments combined)
  const dishName = args.join(' ');
  
  try {
    console.log(`\nEstimating nutrition for: "${dishName}"`);
    console.log('Processing...\n');
    
    // Process the dish
    const result = await processDish(dishName);
    
    // Display the result
    displayResult(result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Display help message
function displayHelp() {
  console.log(`
Smart Nutrition Estimator CLI
-----------------------------

Usage: node src/cli/index.js [options] <dish name>

Options:
  -h, --help     Display this help message
  -v, --verbose  Display verbose logs

Examples:
  node src/cli/index.js "Paneer Butter Masala"
  node src/cli/index.js -v "Chana Masala"
  
Description:
  Estimates nutrition information for Indian dishes based on their name.
  Handles messy data and provides per-serving nutrition values.
  `);
}

// Display the result
function displayResult(result) {
  console.log(`\n=== Results for ${result.dish} ===`);
  
  if (result.error) {
    console.log(`Error: ${result.error}`);
    return;
  }
  
  console.log(`\nDish Type: ${result.dishType}`);
  console.log(`Serving Size: ${result.servingSize}g (${result.servingType})`);
  
  console.log('\nNutrition per serving:');
  console.log(`  Energy: ${result.nutrition.energy_kcal.toFixed(2)} kcal`);
  console.log(`  Carbohydrates: ${result.nutrition.carb_g.toFixed(2)}g`);
  console.log(`  Protein: ${result.nutrition.protein_g.toFixed(2)}g`);
  console.log(`  Fat: ${result.nutrition.fat_g.toFixed(2)}g`);
  console.log(`  Sugars: ${result.nutrition.freesugar_g.toFixed(2)}g`);
  console.log(`  Fiber: ${result.nutrition.fibre_g.toFixed(2)}g`);
  
  console.log(`\nConfidence: ${result.confidence}%`);
  
  console.log('\nKey Ingredients:');
  result.ingredients.slice(0, 5).forEach(ing => {
    console.log(`  ${ing.name} (${ing.grams}g)`);
  });
  
  if (result.ingredients.length > 5) {
    console.log(`  ... and ${result.ingredients.length - 5} more ingredients`);
  }
  
  console.log('\nAssumptions made:');
  result.assumptions.forEach(assumption => {
    console.log(`  - ${assumption}`);
  });
  
  console.log('\nNOTE: These values are estimates and may not be exact.');
}

// Run the main function
main();