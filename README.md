# Code Compiler

A simple tool to quickly run your code on the web, accessible through the root route (`/`).


## Getting Started

To run this project locally, follow these steps:

### 1. Clone the Repository
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


