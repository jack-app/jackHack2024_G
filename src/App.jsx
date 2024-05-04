import { useState } from "react";
import Top from "@features/Top/components/Top";
import LostForm from "./features/Form/components/LostForm.jsx";
import "@common/styles/Layout.css";

function App() {
  return (
    <>
      <Top />
      <LostForm />
    </>
  );
}

export default App;
