# Market Trend Prediction App

## Team Name

Markets Mad Scientists

## Project Description

Markets Mad Scientists is a capstone project designed to make market data easier for beginners to understand.

The application allows users to search for companies, view current and historical market information, examine price trends over time, and explore machine-learning-based predictions created from historical market data.

The project is intended as an educational tool that helps users better understand market movement through clear visualizations, historical data, and simple predictive analysis.

## Project Goals

The main goals of the project are to:

- Display real market data in an easy-to-understand format
- Show historical prices with actual dates
- Allow users to search for supported companies
- Visualize market trends using charts
- Use historical data to train a machine learning model
- Generate simple market predictions
- Evaluate prediction performance using appropriate metrics
- Maintain a responsive and user-friendly website

## Current Features

- Market dashboard
- Market search
- Historical trend chart
- Market price display
- Trend indicators
- Prediction display
- Prediction confidence / model result area
- Market explorer
- Demo login
- Responsive website design
- Mobile and tablet support
- Search input validation

## Data Plan

The current prototype uses sample market values for demonstration purposes.

The next phase of development will replace sample values with real historical market data from a reliable financial data provider.

The data will include information such as:

- Date
- Open price
- High price
- Low price
- Closing price
- Trading volume

Historical dates will be displayed clearly so users can identify exactly when market changes occurred.

## Machine Learning Plan

The project will use historical market data to create and evaluate a prediction model.

Initial models may include:

- Linear Regression
- Random Forest
- Gradient Boosting

Potential model inputs include:

- Previous closing prices
- Daily price changes
- Moving averages
- Trading volume
- High-low price differences
- Previous market returns

The prediction system may be used to estimate:

- Future closing price
- Expected percentage change
- Whether the market is likely to increase or decrease

The model will be trained using older historical data and tested using newer unseen data.

Prediction performance will be evaluated before the results are displayed as part of the final application.

## Current Technologies

### Front End

- HTML
- CSS
- JavaScript

### Backend

Planned technologies:

- Python
- Flask or FastAPI

The backend will be responsible for:

- Retrieving market data
- Processing historical data
- Communicating with the machine learning model
- Returning results to the website

### Data Analysis and Machine Learning

Planned technologies:

- Pandas
- NumPy
- Scikit-learn

### Database

Planned database:

- Firebase

The database may be used to store application data such as user information, saved markets, and other project data.

## Proposed Project Structure

```text
Market-Trend-Prediction-App/
│
├── index.html
│
├── README.md
├── .gitignore
│
├── css/
│   └── styles.css
│
├── js/
│   └── app.js
│
├── backend/
│   ├── app.py
│   ├── market_data.py
│   ├── model.py
│   └── requirements.txt
│
├── data/
│   └── historical_data.csv
│
└── models/
    └── market_model.pkl
