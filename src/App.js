import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./routes";
import { User } from "./Pages/User";
import Team from "./Pages/Team";
import Sidebar from "./components/Navigation/Sidebar";
import EditTeam from "./Pages/EditTeam";

function App() {
  return (
    <div className="App">
      <Sidebar>
        <Routes>
          <Route path={routes.user.path} element={<User />} />
          <Route path={routes.team.path} element={<Team />} />
          <Route path={routes.editTeam.path} element={<EditTeam />} />
        </Routes>
      </Sidebar>
    </div>
  );
}

export default App;
