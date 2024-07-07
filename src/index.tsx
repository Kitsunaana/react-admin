import Loader from "./loader.svg"

const App = () => {
    return <div><Loader />123</div>
}

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);