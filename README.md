This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies the development server:

```bash
    npm i 
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Web Application:

1. **Frontend Interface**:
   - The UI allows users to:
     - Create a new plate.
     - Add information to an empty well.
     - View information in an existing well.
     - Edit information in an existing well.
     - Delete a plate.

2. **Backend API**:
   - Implement API endpoints for:
     - `POST /api/plates`: Create a new plate.
     - `PATCH /api/plates/:plateId`: Edit information in an existing plate.
     - `DELETE /api/plates/:plateId`: Delete a plate.

### REST API Documentation:

Below the REST API endpoints:

#### POST /api/plates

Creates a new plate with the provided information.

**Request Body:**
```json
{
  "name": "Plate Name",
  "dimension": "96",
  "wells": {
    "28": {
      "index": 28,
      "type": "reagent",
      "value": "R282"
    }
  }
}
```

**Response:**
```json
{
  "message": "Plate created successfully",
  "plate": {
    "id": "e3e904ac-f540-4cc3-bcab-814d123ed45b",
    "name": "Plate Name",
    "dimension": "96",
    "wells": {
      "28": {
        "index": 28,
        "type": "reagent",
        "value": "R282"
      }
    }
  }
}
```

#### PATCH /api/plates/:plateId

Edits information in an existing well of the specified plate.

**Request Parameters:**
- `plateId` (string): The ID of the plate.

**Request Body:**
```json
{
  "name": "Plate Name",
  "dimension": "96",
  "wells": {
      "28": {
        "index": 28,
        "type": "antibody",
        "value": "A123"
      }
    }
}
```

**Response:**
```json
{
  "message": "Well information updated successfully",
  "plate": {
    "id": "e3e904ac-f540-4cc3-bcab-814d123ed45b",
    "name": "Plate Name",
    "dimension": "96",
    "wells": {
      "28": {
        "index": 28,
        "type": "antibody",
        "value": "A123"
      }
    }
  }
}
```

#### DELETE /api/plates/:plateId

Deletes the plate with the specified ID.

**Request Parameters:**
- `plateId` (string): The ID of the plate to delete.

**Response:**
```json
{
  "message": "Plate deleted successfully",
  "plateId": "e3e904ac-f540-4cc3-bcab-814d123ed45b"
}
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
