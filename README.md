# BaseFeedback

BaseFeedback is a mobile-first Base Mini App for sending short feedback notes to the `BaseFeedback` smart contract on Base Mainnet.

## Features

- Submit feedback with a 200 character limit
- Read the live onchain feedback count
- Show recent local submission status and preview
- Connect with Coinbase Wallet or an injected browser wallet
- Include Base Mini App attribution and verification meta tags

## Contract

- Address: `0xb0bb1588145ff42eaf8b0ff299896084e344c5c9`
- Chain: `Base Mainnet (8453)`
- Methods:
  - `submit(string message)`
  - `count()`

## Base Mini App Meta

- `base:app_id`: `69cb26d06b6a2cd82c727edb`
- `talentapp:project_verification`: `d0347e902b44255ff25580af81b7f843f1780cabd9fba4bad76cf77fe7701dd50bf3911f80c7e2b63e852ee65145a67ecbdd2539c7278d6219a21d01d17af8d7`
- Builder code: `bc_rvo7lsj1`
- Encoded attribution string: `0x62635f72766f376c736a310b0080218021802180218021802180218021`

## Local Run

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run build
vercel deploy --prod
```

