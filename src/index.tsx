import { createRoot } from "react-dom/client"
import Loader from "./loader.svg"

const App = () => (
  <div>
    <Loader />
    123
  </div>
)
const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App />)
