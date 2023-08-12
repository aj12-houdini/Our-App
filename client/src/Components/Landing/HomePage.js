import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@material-ui/core";
import Navbar from "../Common/navbar";
import Body from "./home-body";
import Footer from "../Common/Footer";

function HomePage({ socket }) {
  return (
    <section style={{ backgroundColor: "#F5F5F5" }}>
      <Navbar socket={socket} />
      <Body />
      <Footer />
    </section>
  );
}

export default HomePage;
