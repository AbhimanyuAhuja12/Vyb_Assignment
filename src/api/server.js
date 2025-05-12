import express from 'express';
import cors from 'cors';
import { processDish } from '../core/processor.js';
import { logger } from '../utils/logger.js';

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Smart Nutrition Estimator API',
    usage: {
      endpoint: '/api/estimate',
      method: 'POST',
      body: {
        dish: 'Dish name'
      },
      example: 'curl -X POST -H "Content-Type: application/json" -d \'{"dish":"Paneer Butter Masala"}\' http://localhost:3000/api/estimate'
    }
  });
});

// Main estimation endpoint
app.post('/api/estimate', async (req, res) => {
  try {
    const { dish } = req.body;
    
    if (!dish) {
      return res.status(400).json({
        error: 'Missing required parameter: dish'
      });
    }
    
    logger.info(`API request to estimate nutrition for: ${dish}`);
    
    // Optional issues array
    const issues = req.body.issues || [];
    
    // Process the dish
    const result = await processDish(dish, issues);
    
    // Return the result
    res.json(result);
  } catch (error) {
    logger.error('API error:', error);
    res.status(500).json({
      error: 'An error occurred while processing the request',
      message: error.message
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Visit http://localhost:3000/ for API documentation');
});