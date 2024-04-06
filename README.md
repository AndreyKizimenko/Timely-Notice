## Timely Notice: A Web App for Efficient Issue Management

This repository contains the codebase for Timely Notice, a web application built to streamline bug reporting and management. It empowers developers and testers to collaborate effectively on resolving software issues.

# Tech Stack

Timely Notice leverages a modern and robust tech stack to deliver a performant and user-friendly experience:

- **Frontend:** React, Next.js, NextAuth.js, Radix UI, Tailwind CSS
- **Backend:** TypeScript, Prisma (ORM), MySQL
- **Data Validation:** zod
- **State Management:** Zustand
- **Authentication:** NextAuth.js (with bcrypt for password hashing)
- **Testing:** Cypress

## Features

Timely Notice offers comprehensive functionalities for efficient bug management:

- **Authentication:** Secure user login and registration
- **Bug Logging:** Easy creation of bug reports with detailed descriptions
- **Collaboration:** Assign bugs to specific developers for resolution, track progress
- **Filtering and Searching:** Efficiently search for bugs based on various criteria

## Getting Started

```bash
npm run dev
# or
yarn dev

Create a `.env.local` file in the project root directory and configure environment variables for database connection:
DATABASE_URL=mysql://your_username:your_password@localhost:3306/bug_tracker
Replace `your_username`, `your_password`, and `bug_tracker` with your actual MySQL credentials and database name.
```

### Testing
Timely Notice utilizes Cypress for comprehensive automated testing. Refer to the project's `cypress` directory for test cases and execution instructions.