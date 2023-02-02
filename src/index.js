/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
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
