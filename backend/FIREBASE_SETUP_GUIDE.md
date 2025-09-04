# Firebase Admin Setup Guide

## Step 1: Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Create Project" or select existing project
3. Enable Authentication (Email/Password)
4. Enable Storage for file uploads

## Step 2: Generate Service Account Key
1. Go to Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Download the JSON file

## Step 3: Configure Environment Variables
Update `backend/.env` with your Firebase credentials:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
```

## Step 4: Format Private Key Properly
The private key from Firebase should be formatted with actual newlines, not escaped `\n` characters.

Example of proper format:
```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
-----END PRIVATE KEY-----
"
```

## Step 5: Enable Required Services
- **Authentication**: Email/Password sign-in
- **Storage**: For resume and document uploads
- **Cloud Messaging**: For real-time notifications (optional)

## Step 6: Security Rules
Set up Firebase Security Rules for Storage:

```javascript
// Storage Rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /resumes/{userId}/{documentId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /company-docs/{companyId}/{documentId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Step 7: Test Configuration
Restart backend server to verify Firebase Admin initializes successfully.
