from flask import Flask, request, jsonify, session
import pandas as pd
import joblib
import numpy as np
from flask_cors import CORS
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__)
app.secret_key = "your_secret_key"  # Secret key for session handling
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})  # Allow Angular frontend access

# Load dataset
df = pd.read_csv("stressleveldataset.csv")

# Prepare data
X = df.drop("stress_level", axis=1)
y = df["stress_level"]

# Train model (Only do this once, then save the model)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save trained model
joblib.dump(model, "stress_model.pkl")

# Load trained model
model = joblib.load("stress_model.pkl")

# Temporary user database (can be replaced with an actual database)
users = {}

# ✅ **User Registration Endpoint**
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    
    if data["email"] in users:
        return jsonify({"message": "User already exists"}), 400
    
    users[data["email"]] = {
        "password": data["password"],
        "name": data["name"]
    }
    
    return jsonify({"message": "Registration successful"}), 201

# ✅ **User Login Endpoint**
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    
    if data["email"] in users and users[data["email"]]["password"] == data["password"]:
        session["user"] = data["email"]  # Store session for the logged-in user
        return jsonify({"message": "Login successful"}), 200
    
    return jsonify({"message": "Invalid credentials"}), 401

# ✅ **Stress Level Prediction Endpoint (Only for Logged-in Users)**
@app.route("/predict", methods=["POST"])
def predict():
    if "user" not in session:
        return jsonify({"message": "Unauthorized. Please log in."}), 403

    data = request.get_json()

    # Ensure input values match dataset structure
    required_features = [
        "anxiety_level", "mental_health_history", "depression", "headache", 
        "sleep_quality", "breathing_problem", "living_conditions", 
        "academic_performance", "study_load", "future_career_concerns", 
        "extracurricular_activities"
    ]

    if not all(key in data for key in required_features):
        return jsonify({"message": "Invalid input data"}), 400

    # Convert input to NumPy array and reshape for prediction
    input_data = np.array([list(data.values())]).reshape(1, -1)
    prediction = model.predict(input_data)[0]

    return jsonify({
        "message": "Prediction successful",
        "stress_level": int(prediction),
        "user": session["user"]  # Return user email
    })

# ✅ **Logout Endpoint**
@app.route("/logout", methods=["POST"])
def logout():
    session.pop("user", None)  # Remove user session
    return jsonify({"message": "Logout successful"}), 200

if __name__ == "__main__":
    app.run(debug=True)
