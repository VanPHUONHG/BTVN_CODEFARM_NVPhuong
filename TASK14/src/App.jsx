import React from "react";
import Header from "./Header";
import Foodter from "./Foodter";
import Products from "./Products";
import students from "./data";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Header />
      <Products students={students} />
      <Foodter />
    </div>
  );
};

export default App;
