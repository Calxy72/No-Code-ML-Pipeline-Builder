import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report
import json

class ModelTrainer:
    def train_model(self, model_name, train_path, test_path, target_column):
        # Load data
        train_df = pd.read_csv(train_path)
        test_df = pd.read_csv(test_path)
        
        # Prepare features and target
        X_train = train_df.drop(columns=[target_column])
        y_train = train_df[target_column]
        X_test = test_df.drop(columns=[target_column])
        y_test = test_df[target_column]
        
        # Initialize model
        if model_name == 'logistic_regression':
            model = LogisticRegression(max_iter=1000)
        elif model_name == 'decision_tree':
            model = DecisionTreeClassifier(random_state=42)
        else:
            raise ValueError(f"Unknown model: {model_name}")
        
        # Train model
        model.fit(X_train, y_train)
        
        # Predictions
        y_pred = model.predict(X_test)
        
        # Calculate metrics
        accuracy = accuracy_score(y_test, y_pred)
        report = classification_report(y_test, y_pred, output_dict=True)
        
        return {
            'model_name': model_name,
            'accuracy': round(accuracy, 4),
            'classification_report': report,
            'feature_importance': self.get_feature_importance(model, X_train.columns),
            'predictions_sample': y_pred[:10].tolist()
        }
    
    def get_feature_importance(self, model, feature_names):
        if hasattr(model, 'feature_importances_'):
            importance = model.feature_importances_
            return dict(zip(feature_names, importance.tolist()))
        elif hasattr(model, 'coef_'):
            importance = np.abs(model.coef_[0])
            return dict(zip(feature_names, importance.tolist()))
        return {}