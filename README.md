# Note-Keeping Web App

This project is a **full-stack note-keeping app** built using the **PERN stack**. It allows users to take notes, create drawings, and collaborate in live meetings, all in one place.

## Technologies Used

- **Frontend**: React, Next.js, Tailwind CSS, React Icons, React Sketch Canvas
- **State Management**: React Redux Toolkit
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL
- **Live Meeting**: ZegoUIKitPrebuilt

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd app
   ```
Install the necessary dependencies:

  ```bash
  npm install
```
### Start the frontend development server:

```bash
npm run dev
```
The frontend will be running on http://localhost:3000.

## Backend
Navigate to the backend directory:
```bash
cd app/server
```
### Install backend dependencies:
```bash
npm install
```
### Start the backend server:
```bash
npm run dev
```
The backend server will be running on http://localhost:3009.


.env Setup
Create a .env file at the root of your project with the following parameters for configuring both the database and JWT authentication:

# Backend Configuration
PORT=3009

PGUSER=<your_postgresql_user>
PGPASSWORD=<your_postgresql_password>
PGHOST=localhost
PGPORT=5432
PGDATABASE=<your_database_name>
JWT_SECRET=<your_jwt_secret_key>

## Meeting Configuration (ZegoCloud)
NEXT_PUBLIC_MEETINGSECRET=<your_zegocloud_meeting_secret>
NEXT_PUBLIC_MEETINGAPPID=<your_zegocloud_meeting_appid>
Replace the placeholders (<...>) with your actual environment variables.

## ZegoCloud Meeting Settings
To configure the live meeting functionality:

Go to your project directory and navigate to the space -> room -> [meetingID] settings.

Use the following .env parameters for ZegoCloud:

NEXT_PUBLIC_MEETINGSECRET=<your_zegocloud_meeting_secret>
NEXT_PUBLIC_MEETINGAPPID=<your_zegocloud_meeting_appid>
These parameters are required for the live meeting functionality in the app.
