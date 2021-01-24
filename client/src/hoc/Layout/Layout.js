import React from "react";
import Aux from "../Auxillary/Auxillary";
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Classes from './Layout.module.css';
const layout = (props) => {
  return (
    <Aux>
      <Header />
      <main  className={Classes.footer} >{props.children}</main>
      <Footer />

    </Aux>
  );
};
export default layout;

