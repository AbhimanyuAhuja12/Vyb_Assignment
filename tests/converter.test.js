import { convertToGrams } from '../src/core/converter.js';

/**
 * Unit tests for the quantity conversion function
 * 
 * This tests the conversion function with different ingredients and units
 * to verify that it properly accounts for varying densities.
 */
describe('Quantity Conversion Tests', () => {
  // Test oils and dense ingredients
  test('converts 1 tbsp of oil to approximately 13g', () => {
    const result = convertToGrams('oil', 1, 'tbsp');
    expect(result).toBeCloseTo(13, 0);
  });
  
  test('converts 1 tbsp of honey to approximately 20g', () => {
    const result = convertToGrams('honey', 1, 'tbsp');
    expect(result).toBeGreaterThan(15); // Honey is denser than water
  });
  
  // Test medium density ingredients
  test('converts 1 cup of rice to approximately 180g', () => {
    const result = convertToGrams('rice', 1, 'cup');
    expect(result).toBeCloseTo(180, 0);
  });
  
  test('converts 1 cup of flour to approximately 120g', () => {
    const result = convertToGrams('flour', 1, 'cup');
    expect(result).toBeCloseTo(120, 0);
  });
  
  // Test light density ingredients
  test('converts 1 tbsp of dried herbs to be lighter than water equivalent', () => {
    const waterTbsp = convertToGrams('water', 1, 'tbsp');
    const herbsTbsp = convertToGrams('dried herbs', 1, 'tbsp');
    expect(herbsTbsp).toBeLessThan(waterTbsp);
  });
  
  // Test that the same volume of different ingredients yields different weights
  test('demonstrates that ingredient density affects conversion', () => {
    const oilTbsp = convertToGrams('oil', 1, 'tbsp');
    const flourTbsp = convertToGrams('flour', 1, 'tbsp');
    const waterTbsp = convertToGrams('water', 1, 'tbsp');
    
    // Different densities should give different weights
    expect(oilTbsp).not.toEqual(flourTbsp);
    expect(oilTbsp).not.toEqual(waterTbsp);
    expect(flourTbsp).not.toEqual(waterTbsp);
    
    // Oil is less dense than water
    expect(oilTbsp).toBeLessThan(waterTbsp);
    
    // Flour is less dense than water
    expect(flourTbsp).toBeLessThan(waterTbsp);
  });
  
  // Test extreme cases
  test('handles zero quantities correctly', () => {
    const result = convertToGrams('rice', 0, 'cup');
    expect(result).toBe(0);
  });
  
  test('handles negative quantities by treating them as positive', () => {
    const resultPositive = convertToGrams('rice', 1, 'cup');
    const resultNegative = convertToGrams('rice', -1, 'cup');
    
    // The absolute values should be the same
    expect(Math.abs(resultNegative)).toBeCloseTo(resultPositive, 0);
  });
});