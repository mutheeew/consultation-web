import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient,QueryClientProvider } from 'react-query';
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from './Context/User.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'
// import './index.css'

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
)
