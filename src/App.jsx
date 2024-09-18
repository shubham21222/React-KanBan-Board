import React, { useState } from "react";
import KanbanBoard from "./components/KanBanBoard";
import AuthContainer from "./AuthContainer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <KanbanBoard />
      ) : (
        <AuthContainer setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default App;
