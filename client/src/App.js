import { Outlet } from "react-router-dom";
import Nav from "./components/nav";

function App() {
  return (
    <div className="app">
      <Nav/>
      <div className="outletContainer">
        <Outlet/>
      </div>
    </div>
  );
}

export default App;
