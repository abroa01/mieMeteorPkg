Here's a detailed `README.md` file for your Meteor package, incorporating the details from your testing app:

---

# MIE API Meteor Package

## Overview

`abroa01:mieapi-meteor` is a Meteor package for integrating with the MIE API. It provides methods for user authentication and API interaction, including fetching and updating data through the API.

## Installation

To use the `mieapi-meteor` package in your Meteor project, follow these steps:

1. **Add the package to your Meteor project:**

   ```sh
   meteor add abroa01:mieapi-meteor
   ```

2. **Ensure you have the necessary dependencies in your `package.json`:**

   ```json
   "dependencies": {
     "@babel/runtime": "^7.20.7",
     "meteor-node-stubs": "^1.2.5",
     "react": "^18.3.1",
     "react-dom": "^18.3.1"
   }
   ```

3. **Update your `.meteor/packages` file to include the package:**

   ```plaintext
   abroa01:mieapi-meteor
   ```

## Usage

### Authentication

To authenticate users, use the `MieApi` object exposed by the package. Here's an example of how to implement login functionality:

#### **Client-Side:**

Create a `Login` component to handle user login:

```jsx
import React, { useState } from 'react';
import { MieApi } from 'meteor/abroa01:mieapi-meteor';

const Login = ({ onLogin, userHandle }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await MieApi.initializeSession(userHandle, username, password);
      if (result.success) {
        onLogin(result.sessionCookie);
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
```

### API Interaction

Use the `MieApi` object to interact with the MIE API. You can get and put data using the following methods:

#### **Client-Side:**

Create an `ApiComponent` to handle API interactions:

```jsx
import React, { useState } from 'react';
import { MieApi } from 'meteor/abroa01:mieapi-meteor';

const ApiComponent = ({ cookie, userHandle, onLogout }) => {
  const [apiName, setApiName] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleGetApi = async () => {
    setError('');
    setResult(null);
    try {
      const data = await MieApi.getApi(apiName, cookie, userHandle);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to get API data');
    }
  };

  const handlePutApi = async () => {
    setError('');
    setResult(null);
    try {
      const jsonData = JSON.parse(jsonInput);
      const data = await MieApi.putApi(apiName, jsonData, cookie, userHandle);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to put API data');
    }
  };

  return (
    <div className="api-container">
      <h2>API Interaction</h2>
      <button onClick={onLogout}>Logout</button>
      <div>
        <input
          type="text"
          value={apiName}
          onChange={(e) => setApiName(e.target.value)}
          placeholder="API Name"
        />
        <button onClick={handleGetApi}>Get API</button>
      </div>
      <div>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="JSON Input for PUT"
        />
        <button onClick={handlePutApi}>Put API</button>
      </div>
      {error && <p className="error">{error}</p>}
      {result && (
        <div>
          <h3>API Response:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ApiComponent;
```

### Server-Side Methods

The package includes server-side methods for interacting with the MIE API:

- `fetchApiData(userHandle, username, password)`: Fetches API data and returns a session cookie.
- `getApi(apiName, cookie, userHandle)`: Retrieves API data using the session cookie.
- `putApi(apiName, jsonData, cookie, userHandle)`: Updates API data with the provided JSON input.


## Documentation

The package's documentation is located in `README.md`. For detailed usage, refer to the examples provided in the `imports/ui` directory.

## Contribution

If you would like to contribute to the development of this package, please fork the repository and submit a pull request.

## Sample Meteor Application (for reference)
If you want to refer to a sample meteor app which uses this package to get a reference, Please see the sample project in GitHub (https://github.com/abroa01/mieMeteorApp)

If you would like to contribute to the development of this package, please fork the repository and submit a pull request.

---

Feel free to adjust any specific details or add more sections as needed.