import './App.css';
import RootRoutes from './router/RootRoutes';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <RootRoutes/>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
