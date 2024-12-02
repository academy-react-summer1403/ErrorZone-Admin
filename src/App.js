import React, { Suspense, useEffect } from "react";

// ** Router Import
import Router from "./router/Router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

const App = () => {

  
  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  );
};

export default App;
