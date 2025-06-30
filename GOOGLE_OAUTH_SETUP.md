# Google OAuth Setup Instructions

To enable Google login functionality, you need to set up Google OAuth credentials.

## Steps to Setup Google OAuth:

### 1. Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API or Google Identity API

### 2. Create OAuth 2.0 Credentials
1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client IDs**
3. Configure the consent screen if not already done
4. Choose **Web application** as the application type
5. Add your domain to **Authorized JavaScript origins**:
   - For development: `http://localhost:3000`
   - For production: `https://penpaperpreparation.com`
6. Add redirect URIs if needed (not required for client-side OAuth)

### 3. Update the Client ID
1. Copy the generated **Client ID**
2. Open `src/components/LoginButton.tsx`
3. Replace `YOUR_GOOGLE_CLIENT_ID_HERE` with your actual Client ID

### 4. Configure Consent Screen
1. Go to **APIs & Services** > **OAuth consent screen**
2. Configure the consent screen with:
   - App name: "Pen and Paper Interview Prep"
   - User support email
   - App logo (optional)
   - Authorized domains: `penpaperpreparation.com`

### 5. Test the Integration
1. Start your development server: `npm start`
2. Hover over the Login button in the top-right corner
3. Click "Login with Google" to test the flow

## Security Notes:
- The Client ID is safe to expose in client-side code
- Never expose the Client Secret in client-side code
- The JWT token is automatically handled and decoded by the component
- User data is stored in localStorage for persistence

## Features:
- Hover to show login popup
- Google OAuth integration
- User profile display after login
- Logout functionality
- Progress saving (can be extended to sync with backend)
