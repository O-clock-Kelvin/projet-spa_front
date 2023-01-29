/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
// module de react pour la gestion des routes
import { BrowserRouter } from 'react-router-dom';

// module de redux
import { Provider } from 'react-redux';

import App from './components/App/App';
import store from './store/index';

import './styles/index.scss';

// insertion du composant App dans l'index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
  });

root.render(
	<Provider store={store}>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</BrowserRouter>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
