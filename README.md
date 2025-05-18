# Smart Nutrition Estimator for Indian Dishes 🍲🥘
## Live link : https://vyb-assignment-phi.vercel.app/
## Overview

Smart Nutrition Estimator is a robust system designed to estimate nutritional information for Indian dishes, handling real-world complexities in food data and recipe variations.

## 🌟 Key Features

- **Intelligent Ingredient Processing**: Advanced handling of ingredient variations
- **Flexible Data Handling**: Manages messy, partial, or ambiguous recipe data
- **Multi-Interface Support**: Provides CLI and API access
- **Robust Error Handling**: Gracefully manages missing or incomplete information
- **Detailed Nutrition Estimation**: Calculates per-serving nutritional values

## 🚀 Installation

### Prerequisites
- Node.js (v14+ recommended)
- npm (Node Package Manager)

### Setup Steps
1. Clone the repository
```bash
git clone https://github.com/AbhimanyuAhuja12/Vyb_Assignment.git
```

2. Install dependencies
```bash
npm install
```

## 🔧 Usage

### CLI Interface
Estimate nutrition for a dish directly from the command line:
```bash
#Basic command
npm run cli

# Basic usage
npm run cli "Paneer Butter Masala"

# Verbose logging
npm run cli -v "Jeera Aloo"
```

### API Interface
Start the nutrition estimation API:
```bash
# Start the API server
npm run api
```

#### API Endpoint Examples

1. **cURL Request**:
```bash
curl -X POST -H "Content-Type: application/json" \
     -d '{"dish":"Chana Masala"}' \
     http://localhost:3000/api/estimate
```

2. **Postman Request Setup**:
- **Method**: POST
- **URL**: `http://localhost:3000/api/estimate`
- **Headers**:
  - Key: `Content-Type`
  - Value: `application/json`
- **Body (raw JSON)**:
```json
{
  "dish": "Paneer"
}
```

### Request Variations
You can also include optional `issues` to provide context:
```json
{
  "dish": "Paneer Butter Masala",
  "issues": [
    "ingredient variation",
    "serving size uncertainty"
  ]
}
```

## 📋 Output

When you run the estimator, it generates a comprehensive JSON output with detailed nutrition information.

### Sample `output.json` Structure
```json
[
  {
    "dish": "Paneer",
    "ingredients": [
      {
        "name": "paneer",
        "originalQuantity": "100",
        "originalUnit": "grams",
        "quantity": 100,
        "unit": "grams",
        "grams": 100,
        "assumptionMade": false,
        "dbEntry": {
          "food_code": "D001",
          "food_name": "Paneer (Indian cottage cheese)",
          "matchType": "exact"
        },
        "nutrition": {
          "energy_kj": 1205.2,
          "energy_kcal": 288,
          "carb_g": 3.4,
          "protein_g": 18.3,
          "fat_g": 22.8,
          "freesugar_g": 0.1,
          "fibre_g": 0.0
        }
      }
    ]
  }
]
```

### Handling Different Inputs
- Single ingredient names (e.g., "Paneer")
- Full dish names (e.g., "Paneer Butter Masala")
- Partial or ambiguous names will be processed intelligently

## 🧪 Handling Complex Scenarios

The system is designed to handle challenging nutrition estimation scenarios:
- Ingredient synonyms and spelling variations
- Missing ingredient quantities
- Ambiguous dish types
- Non-standard measurement units
- Recipes with flexible ingredients

## 🔍 How It Works

1. **Input Dish Name**: Provide the name of an Indian dish
2. **Ingredient Analysis**: Identify likely ingredients
3. **Unit Standardization**: Convert measurements to standard weights
4. **Nutrition Mapping**: Connect ingredients to nutrition database
5. **Serving Calculation**: Determine nutrition per standard serving

## 🔬 Test Cases Covered

Challenging scenarios tested:
- Jeera Aloo (mild fried)
- Gobhi Sabzi
- Chana Masala
- Paneer Curry with capsicum
- Mixed vegetable dishes

## 🚧 Future Roadmap

- Expand ingredient synonym dictionary
- Add more regional Indian cuisine support
- Implement machine learning for ingredient prediction
- Create a web interface
- Enable user feedback for continuous improvement


## 📊 Project Structure

```
smart-nutrition-estimator/
│
├── src/
│   ├── api/           # API server implementation
│   ├── cli/           # Command-line interface
│   ├── core/          # Core processing logic
│   └── utils/         # Utility functions
│
├── tests/             # Test suites
├── package.json       # Project configuration
└── README.md          # Project documentation
```
