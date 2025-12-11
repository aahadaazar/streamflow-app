# Streamflow Claim App

A React application built with TypeScript and Vite that allows users to claim tokens from Streamflow Airdrops on the Solana Devnet.

## Features

- **Wallet Connection**: Supports Phantom and other Solana wallets via `@solana/wallet-adapter`.
- **Airdrop Lookup**: Users can enter a Distributor ID to fetch airdrop details.
- **Allocation View**: Displays unlocked, locked, and claimable token amounts.
- **Claim Functionality**: claiming tokens directly to the user's wallet.
- **Real-time Feedback**: React Query integration for efficient data fetching and caching.
- **Success UI**: Displays transaction details and success messages upon claiming.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **Blockchain**: `@solana/web3.js`, `@streamflow/distributor` SDK
- **State Management**: TanStack Query (React Query)

## Prerequisites

- **Node.js** (v18 or higher)
- **Yarn** package manager
- **Solana Wallet** (e.g., Phantom) configured for **Devnet**
- **SOL on Devnet** (for transaction fees)

## Getting Started

1.  **Install Dependencies**

    ```bash
    yarn install
    ```

2.  **Run Development Server**

    ```bash
    yarn dev
    ```

3.  **Open in Browser**

    The app typically runs at `http://localhost:5173`. When using ngrok, ensure you access the provided ngrok URL.

## What to Expect

1.  **Connect Wallet**: Click the "Select Wallet" button in the top right to connect your Solana wallet. Ensure you are on **Devnet**.
2.  **Enter Airdrop ID**: Input a valid Streamflow Distributor Account address (Public Key) into the lookup field.
3.  **View Details**:
    *   If valid, the detailed token information (Mint, Total Amount, etc.) will appear.
    *   Your specific allocation (Claimable amount) will be shown below.
4.  **Claim**:
    *   Click "Claim Tokens" to initiate the transaction.
    *   Approve the transaction in your wallet.
    *   Upon success, a green banner will display the amount claimed and a link to the transaction on Solana Explorer.

## Troubleshooting

- **"Airdrop not found"**: Ensure the ID is a valid Streamflow Distributor address on **Devnet**.
- **Transaction Failed**: Check if you have enough Devnet SOL for gas fees.
- **CORS/Network Issues**: If accessing via ngrok, ensure `vite.config.ts` allows the host (already configured).
