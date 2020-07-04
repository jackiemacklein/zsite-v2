import "./../../configs/dotenv";
import "isomorphic-fetch";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/* import Kieee Rendering */
import { KieeeHead } from "./../../components/Kieee";

/* import images */
import image1 from "./../../assets/images/logo.svg";
import teste from "./../../assets/images/teste.jpeg";

/* import icons */

/* import styles */
import { Container } from "./styles";

function Component(props) {
  const [initialData, setInitialData] = useState(props.staticContext ?? {});

  useEffect(() => {
    async function inicialData() {
      setInitialData(await getInicialData(props.staticContext));
    }
    inicialData();
  }, []);

  return (
    <Container>
      <button onClick={() => console.log(props.staticContext)}>inscrement</button>
      <Link to={"/page2"}>Ir para pagina 2</Link>
      <h2>{JSON.stringify(initialData)}</h2>
    </Container>
  );
}

/* Essential function to obtain initial data */
export async function getInicialData(staticContext) {
  let initialData;
  if (global.window) {
    initialData = window.initialData__ ?? [];
    if (initialData.length <= 0) initialData = await requestInitialData();
  } else {
    initialData = staticContext.initialData;
  }
  return initialData;
}

//Function essential to get data initial in server side
async function requestInitialData() {
  let siteConfig = await fetch("https://api.zukt.com.br/clients/12/sites/12/configs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      page: "index",
    },
  })
    .then(response => response.json())
    .catch(error => console.log(error));

  let news = await fetch("http://api.cromt.org.br/news")
    .then(response => response.json())
    .catch(error => console.log(error));

  return { siteConfig, news };
}

//Preload to render head of html by data server side
function Head({ params }) {
  if (params.siteConfig) {
    return (
      <KieeeHead
        themeColor={params.siteConfig.theme_color}
        title={params.siteConfig.title}
        description={params.siteConfig.description}
        appleIcon={params.siteConfig.image_path}
        icon={params.siteConfig.image_path}
        image={params.siteConfig.image}
        siteName={params.siteConfig.site_name}
        url={"localhost"}
        favicon={params.siteConfig.favicon}
      />
    );
  } else {
    return <></>;
  }
}

export default { Component, requestInitialData, Head };
