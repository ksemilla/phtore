import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from "apollo-upload-client"
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const uploadLink = createUploadLink({
  uri: import.meta.env.VITE_GRAPHQL_URL
})

export const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache({
    addTypename: false
  }),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)
