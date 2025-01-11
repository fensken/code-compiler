# Code Compiler

This repository, `code-compiler`, contains two distinct projects:

1. **Code Compiler**: A simple tool to quickly run your code on the web, accessible through the root route (`/`).
2. **UI for Courses**: A dedicated UI interface for courses, located under the `/courses` route.

## Getting Started

To run this project locally, follow these steps:

###1. Clone the Repository
   ```bash
   git clone <repository-url>
   cd code-compiler
```

### 2. Install Dependencies
You can use any of the package managers. We use pnpm. Ensure you have `pnpm` installed, then run:
```bash
pnpm i
```

### 3. Create an Environment File
Add a `.env` file in the root directory with the following format:
```plaintext
NEXT_PUBLIC_WS_URL=<Your WebSocket URL>
```

### 4. Run the Development Server
Start the development server:
```bash
pnpm dev
```

### 5. View the Project
Open [http://localhost:3000](http://localhost:3000) in your browser:
- The **Code Compiler** is accessible via the root route (`/`).
- The **UI for Courses** can be found under the `/courses` route.

## Disclaimers regarding courses page.
- I am not an expert in animations, but based on my findings, I have implemented some animations to enhance the user experience. These animations do not cover all the designs found in the Figma file.
- It is also essential to know that the courses page is not responsive.



