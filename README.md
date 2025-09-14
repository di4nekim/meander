# Meander - Social Location App

![Demo Ready](https://img.shields.io/badge/Demo-Ready%20to%20Run-brightgreen?style=for-the-badge)
![No Setup Required](https://img.shields.io/badge/Setup-Not%20Required-blue?style=for-the-badge)

A React Native mobile application for sharing and discovering study abroad experiences, built with Expo and Firebase.

## Set Up

1. **Clone and run**:

   ```bash
   git clone https://github.com/yourusername/meander.git
   cd meander/meander/meander-app
   yarn install && expo start
   ```

2. **Use demo credentials**:

   - USER: `alice@demo.com` / PW: `demo123`
   - Or create a new account with any email

3. **Fully functional** - All features work with local mock data!

## 📸 Demo Preview

<!-- Add screenshots/GIFs here when you have them -->

_Screenshots coming soon! Clone and run to see the full experience._

## Features

### Core Functionality

- **User Authentication**: Sign up and sign in with email/password
- **Social Chat**: Real-time messaging between users
- **Location-based Lists**: Create and share curated lists of places
- **Forum Discussions**: Community posts and conversations
- **Profile Management**: User profiles and settings

### User Journey

1. **Sign Up**: Create a new account with email and password
2. **Profile Setup**: Complete your profile information
3. **Explore**: Browse forum posts and location lists
4. **Chat**: Message other users in real-time
5. **Create**: Add your own lists of favorite places

## Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Firebase (Firestore, Authentication, Real-time Database)

## Project Structure

```
meander-app/
├── components/          # React Native components
│   ├── Auth/           # Authentication screens
│   ├── Chat/           # Chat functionality
│   ├── Lists/          # Location lists
│   └── Forum/          # Forum components
├── context/            # React Context providers
├── assets/             # Images and fonts
├── firebase.js         # Firebase configuration
└── App.js             # Main application entry
```
