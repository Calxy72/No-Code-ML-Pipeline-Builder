import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, MinMaxScaler

class DataProcessor:
    def __init__(self, filepath):
        self.df = pd.read_csv(filepath) if filepath.endswith('.csv') else pd.read_excel(filepath)
    
    def apply_preprocessing(self, method, columns):
        df_copy = self.df.copy()
        
        if method == 'standardization':
            scaler = StandardScaler()
            df_copy[columns] = scaler.fit_transform(df_copy[columns])
        elif method == 'normalization':
            scaler = MinMaxScaler()
            df_copy[columns] = scaler.fit_transform(df_copy[columns])
        
        return df_copy
    
    def train_test_split(self, test_size, target_column):
        X = self.df.drop(columns=[target_column])
        y = self.df[target_column]
        
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=42
        )
        
        # Save splits
        train_df = pd.concat([X_train, y_train], axis=1)
        test_df = pd.concat([X_test, y_test], axis=1)
        
        train_path = 'train_split.csv'
        test_path = 'test_split.csv'
        train_df.to_csv(train_path, index=False)
        test_df.to_csv(test_path, index=False)
        
        return {
            'train_path': train_path,
            'test_path': test_path,
            'train_size': len(train_df),
            'test_size': len(test_df)
        }