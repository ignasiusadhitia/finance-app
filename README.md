# Instructions for Running the Application

## Prerequisites
Ensure you have the following installed:

1. **Node.js** (version 16.x or later): [Download Node.js](https://nodejs.org/)
2. **npm** or **yarn**: Comes with Node.js, or install Yarn via [Yarn installation guide](https://yarnpkg.com/getting-started/install).
3. **Expo CLI**: Install globally by running:
   ```bash
   npm install -g expo-cli
   ```
4. **Android Studio** (with an Android emulator) or **Xcode** (for iOS development, macOS only): Optional, but recommended for testing on simulators.

## Steps to Run the Application

### 1. Clone the Repository
Clone the application repository to your local machine:
```bash
git clone <repository_url>
cd <repository_folder>
```

### 2. Install Dependencies
Install all required dependencies by running:
```bash
npm install
```
or, if using Yarn:
```bash
yarn install
```

### 3. Set Up Environment Variables
If the application requires environment variables (e.g., API keys), create a `.env` file in the root folder and add your configurations. Refer to the `.env.example` file if provided.

### 4. Start the Application
Start the Expo development server:
```bash
npm start
```
or:
```bash
yarn start
```
This will open the Expo Developer Tools in your default browser.

### 5. Run on a Device or Emulator
- **On a physical device**:
  1. Install the Expo Go app from the [App Store](https://apps.apple.com/app/expo-go/id982107779) or [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent).
  2. Scan the QR code from the Expo Developer Tools.

- **On an Android emulator or iOS simulator**:
  1. Press `a` in the terminal for Android emulator.
  2. Press `i` in the terminal for iOS simulator (macOS only).

### 6. Testing Features
- Add transactions using the **Add Transaction** screen.
- View your transaction list on the **Transactions** screen.
- Analyze your financial summary on the **Home** screen with the balance and pie chart.

### 7. Debugging
To debug the app:
1. Use `console.log` statements for in-app debugging.
2. Open the Expo Debugger by pressing `d` in the terminal.
3. Use React Native Debugger or React Developer Tools for advanced debugging.

### 8. Build and Deploy (Optional)
To create a standalone app for deployment:
- Run the Expo build command for your target platform:
  ```bash
  expo build:android
  expo build:ios
  ```
- Follow Expo’s guide to publishing: [Publishing your app](https://docs.expo.dev/distribution/introduction/).

---
