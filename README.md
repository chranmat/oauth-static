# OAuth-Static

## Overview

Oauth-Static is a Node.js application that provides Microsoft OAuth-based authentication, session management, and static file hosting. It is designed to serve authenticated users and restrict access to unauthorized ones.

Oauth-Static is built to integrate seamlessly with container-based services such as Docker and Kubernetes but also works well outside of containerized setups. It offers a simple and straightforward solution for hosting static files securely.

## Features

- **OAuth Authentication**:
  - Uses Microsoft OAuth for user authentication.
  - Serves protected content for successful login.

- **Session Management**:
  - Generates session tokens with defined expiration.
  - Validates tokens for secure user sessions.

- **Access Control**:
  - Denies unauthorized users and presents a `403 Forbidden` error page.
  - Validates user permissions based on domain or user patterns.

- **Static File Hosting**:
  - Serves files from a specified directory to authenticated users.

## Requirements

- **Node.js**: v20.15.1 or higher.
- A Microsoft Azure application registered for OAuth credentials.

## Environment Variables

The application uses the following environment variables. **Required** variables must be set for the application to start, while **optional** variables have defaults or can be omitted in specific setups:

### Required
- **CLIENT_ID**: Microsoft OAuth application client ID. Required for authentication.
- **CLIENT_SECRET**: Microsoft OAuth application client secret. Required for authentication.
- **UPN_PATTERNS**: Comma-separated allowed UPN patterns for access (e.g., `*@example.com,admin@example.com`). Required for access control.

### Optional
- **BASE_URL**: Base URL of the application (e.g., `http://localhost:3000`). Defaults to `http://localhost:3000` in development mode but required for production setups.
- **PORT**: Application port (default: 3000). Can be omitted if the default is acceptable.
- **REDIRECT_URI**: Redirect URI for OAuth flow. Defaults to `BASE_URL + /login/callback` if not provided.

## Installation

### Production Installation

1. Install the package globally:
   ```bash
   npm install -g oauth-static
   ```

2. Start the server:
   ```bash
   oauth-static ./folder {port}
   ```
   - Replace `./folder` with the path to the directory containing the static files.
   - Replace `{port}` with the desired port number (optional; default is 3000).

## Developer Guide

### Developer Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies for development:
   ```bash
   npm install --save-dev
   ```

3. Configure environment variables in a `.env` file.

4. Start the application in development mode:
   ```bash
   npm run dev
   ```

### Getting Started

1. **Set Up the Environment**:
   - Ensure Node.js (v20.15.1 or higher) is installed on your system.
   - Install dependencies using `npm install --save-dev`.

2. **Run the Server**:
   - Use the `dev` script for development:
     ```bash
     npm run dev
     ```

3. **Modify or Add Features**:
   - Add new routes in the `routes` folder.
   - Create new middlewares in the `middlewares` folder for custom logic.
   - Update configurations in `src/config.js`.

4. **Testing and Debugging**:
   - Use `console.log` or debugging tools for troubleshooting.
   - Ensure environment variables are correctly defined to avoid configuration errors.

5. **Static File Directory**:
   - For production, pass the static file directory to the `oauth-static` command.
   - For development, specify the directory when running the server:
     ```bash
     node src/index.js ./path-to-static-files
     ```

## Usage

1. For development, access the application at the specified `BASE_URL` and port.
2. For production, use the `oauth-static` command with the desired directory and port.
3. Login via the OAuth login page.
4. Upon successful authentication, access the static resources provided by the application.

## Known Limitations

- The application currently supports only Microsoft OAuth.
- Access is limited to patterns defined in `UPN_PATTERNS`.

## Contribution

Contributions are welcome. Here’s how you can help:
- **Open Pull Requests (PRs)**: Fork the repository, make your changes, and open a PR for review.
- **Submit Issues**: Found a bug or have a feature request? Open an issue to let us know.
- **Provide Feedback**: Share your thoughts or suggestions in the issues section.

Thank you for supporting the project!