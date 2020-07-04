import React, { useEffect } from "react";
import logo from "./../assets/images/logo.svg";
import teste from "./../assets/images/teste.jpeg";

import { Image } from "./styles";

function Component() {
  return (
    <>
      <Image src={logo} />
      <Image src={teste} />
    </>
  );
}
export default Component;
