import React, { useState } from 'react';
import { processDish } from '../../src/core/processor';

function App() {
  const [dishName, setDishName] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const data = await processDish(dishName);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Smart Nutrition Estimator</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-4">
            <div>**Right Now you can only enter the dish names which were part of testcase</div>
            <label htmlFor="dishName" className="block text-gray-700 font-medium mb-2">
              Enter Dish Name
            </label>
            <input
              type="text"
              id="dishName"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Paneer Butter Masala"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Calculating...' : 'Calculate Nutrition'}
          </button>
        </form>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{result.dish}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Dish Information</h3>
                <p className="text-gray-600">Type: {result.dishType}</p>
                <p className="text-gray-600">Serving Size: {result.servingSize}g ({result.servingType})</p>
                <p className="text-gray-600">Confidence: {result.confidence}%</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Nutrition per serving</h3>
                <p className="text-gray-600">Energy: {result.nutrition.energy_kcal.toFixed(2)} kcal</p>
                <p className="text-gray-600">Carbohydrates: {result.nutrition.carb_g.toFixed(2)}g</p>
                <p className="text-gray-600">Protein: {result.nutrition.protein_g.toFixed(2)}g</p>
                <p className="text-gray-600">Fat: {result.nutrition.fat_g.toFixed(2)}g</p>
                <p className="text-gray-600">Sugars: {result.nutrition.freesugar_g.toFixed(2)}g</p>
                <p className="text-gray-600">Fiber: {result.nutrition.fibre_g.toFixed(2)}g</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Key Ingredients</h3>
              <ul className="list-disc pl-5 text-gray-600">
                {result.ingredients.slice(0, 5).map((ing, index) => (
                  <li key={index}>{ing.name} ({ing.grams}g)</li>
                ))}
                {result.ingredients.length > 5 && (
                  <li>...and {result.ingredients.length - 5} more ingredients</li>
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-2">Assumptions Made</h3>
              <ul className="list-disc pl-5 text-gray-600">
                {result.assumptions.map((assumption, index) => (
                  <li key={index}>{assumption}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;