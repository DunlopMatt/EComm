import "./App.css";

import { Nav } from "./components/Nav";
import { Header } from "./components/Header";
import { Products } from "./containers/Products";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
        <Nav />
      </header>
      <div className="container">
        {/** Replace products with a react router with your different pages */}
        {/** Research React Hooks  */}
        {/** If you need to share state globally look at React Context Api  */}
        <Products />
      </div>
    </div>
  );
}

export default App;
