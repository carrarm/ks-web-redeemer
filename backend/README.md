# KsWebRedeemer Backend

This is the backend sub-project for KsWebRedeemer, built with Firebase Cloud Functions. It provides APIs to manage gift codes, retrieve alliance information, and redeem codes for players in the game.

## Features

- **Gift Code Management**: Fetch currently active gift codes.
- **Alliance Information**: Retrieve alliance rosters and details.
- **Governor Information**: Get detailed information about specific players (governors).
- **Code Redemption**: Automate the redemption of gift codes for players.
- **Firestore Integration**: Store redemption results for managed alliances.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 24 or higher recommended as per `package.json`)
- [Firebase CLI](https://firebase.google.com/docs/cli) (`npm install -g firebase-tools`)

## Setup & Installation

1. Navigate to the functions directory:
   ```bash
   cd backend/functions
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` (and/or `.env.local` for local development) file in `backend/functions/` with the following variables:
   - `MIGHTPULSE_API_KEY`: Your API key for MightPulse.
   - `MANAGED_ALLIANCES`: Comma-separated list of alliance IDs to be tracked in Firestore.

## Local Development

To run the functions locally using the Firebase Emulator Suite:

```bash
npm run serve
```

This will start the emulators for Cloud Functions and Firestore.

## Available Functions

The following HTTPS callable functions are exported:

| Name | Expected Parameters | Local URL |
| :--- | :--- | :--- |
| `giftCodes` | None | `http://127.0.0.1:5001/ks-autoredeem/us-central1/giftCodes` |
| `allianceRoster` | `kid` (Kingdom ID), `tag` (Alliance Tag) | `http://127.0.0.1:5001/ks-autoredeem/us-central1/allianceRoster` |
| `allianceInfo` | `kid` (Kingdom ID), `tag` (Alliance Tag) | `http://127.0.0.1:5001/ks-autoredeem/us-central1/allianceInfo` |
| `governorInfo` | `gid` (Governor ID) | `http://127.0.0.1:5001/ks-autoredeem/us-central1/governorInfo` |
| `redeemCode` | `gid` (Governor ID), `codes` (Array of codes), `aid` (Alliance ID) | `http://127.0.0.1:5001/ks-autoredeem/us-central1/redeemCode` |

## Deployment

To deploy the functions to your Firebase project:

```bash
npm run deploy
```

## Technologies

- **Firebase Cloud Functions**: Serverless backend.
- **Firebase Admin SDK**: Interaction with Firestore.
- **MightPulse API**: External data source for alliance and player information.
- **Kingshot API**: Source for gift codes and redemption.
