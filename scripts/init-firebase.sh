#!/bin/bash

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "🚨 Java is not installed. Installing Java..."
    brew install openjdk
    sudo ln -sfn /opt/homebrew/opt/openjdk/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk
    echo "✅ Java installed successfully"
else
    echo "✅ Java is already installed"
fi

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "🚨 Firebase CLI is not installed. Installing Firebase CLI..."
    pnpm add -g firebase-tools
    echo "✅ Firebase CLI installed successfully"
else
    echo "✅ Firebase CLI is already installed"
fi

# Initialize Firebase if not already initialized
if [ ! -f "firebase.json" ]; then
    echo "🚨 Firebase not initialized. Running initialization..."
    firebase login
    firebase init emulators
    
    # Create default firebase.json if it doesn't exist or is empty
    if [ ! -s "firebase.json" ]; then
        echo "Creating default firebase.json..."
        cat > firebase.json << EOL
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "emulators": {
    "firestore": {
      "port": 8080
    },
    "ui": {
      "enabled": true,
      "port": 4000
    }
  }
}
EOL
    fi
else
    echo "✅ Firebase already initialized"
fi

# Create Firestore rules if they don't exist
if [ ! -f "firestore.rules" ]; then
    echo "Creating default firestore.rules..."
    cat > firestore.rules << EOL
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access based on auth
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Mailing list subscriptions
    match /mailing_list_subscriptions/{subscriptionId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // User visits
    match /user_visits/{visitId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
EOL
fi

# Create Firestore indexes if they don't exist
if [ ! -f "firestore.indexes.json" ]; then
    echo "Creating default firestore.indexes.json..."
    cat > firestore.indexes.json << EOL
{
  "indexes": [],
  "fieldOverrides": []
}
EOL
fi

echo "✨ Firebase local development environment initialized successfully!"
echo "🚀 You can now run 'pnpm db:emulator:start' to start the emulators" 