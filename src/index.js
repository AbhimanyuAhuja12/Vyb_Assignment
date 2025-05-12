import { processTestDishes } from './core/processor.js';
import { writeOutputJson } from './utils/fileHelpers.js';
import { logger } from './utils/logger.js';

// Main function to demonstrate the nutrition estimator
async function main() {
  try {
    logger.info('Starting Smart Nutrition Estimator');
    
    // Process the test dishes and get results
    const results = await processTestDishes();
    
    // Write results to output file
    await writeOutputJson(results, 'output.json');
    
    logger.info('Processing complete. Results written to output.json');
    
    // Print summary
    console.log('\nSummary of processed dishes:');
    results.forEach(result => {
      console.log(`\n${result.dish}:`);
      console.log(`  Estimated calories: ${result.nutrition.energy_kcal.toFixed(2)} kcal per serving`);
      console.log(`  Serving size: ${result.servingSize}g (${result.servingType})`);
      console.log(`  Confidence: ${result.confidence}%`);
    });
  } catch (error) {
    logger.error('Error in main process:', error);
  }
}

// Run the main function
main();

// Export for use in other modules
export { main };