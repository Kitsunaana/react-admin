import Loader from "./loader.svg"

const App = () => {
    return <div><Loader /></div>
}

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);