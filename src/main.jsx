import App from './App.jsx'
import './index.css'
import ReactDOM from "react-dom/client";
import { Providers } from './redux/Provider.jsx';
import { PersistGate } from 'redux-persist/lib/integration/react.js';
import store, { persistor } from './redux/store.jsx';


ReactDOM.createRoot(document.getElementById("root")).render(
    <Providers store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Providers>
  );
  