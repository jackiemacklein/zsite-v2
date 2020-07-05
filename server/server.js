/* express utils */
import "isomorphic-fetch";
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import serialize from "serialize-javascript";

import { ServerStyleSheet, StyleSheetManager } from "styled-components";

//import sourceMapSupport from "source-map-support";
/* React utils */

import React from "react";
//import ReactDOMServer from "react-dom/server";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";

/* my componets */
import App from "../src/App";
import routes from "../src/routes";

/* express config */
const PORT = 80;
const app = express();

app.use(cors());
app.use("/static", express.static(path.resolve(__dirname, "..", "build/static")));

app.get("*", (req, res, next) => {
  const activeRoute = routes.find(route => matchPath(req.url, route));
  const sheet = new ServerStyleSheet();

  const requestInitialData = activeRoute && activeRoute.requestInitialData ? activeRoute.requestInitialData() : [];

  Promise.resolve(requestInitialData)
    .then(initialData => {
      const context = { initialData, statusCode: res.statusCode };
      const markup = renderToString(
        <StaticRouter location={req.url} context={context}>
          <StyleSheetManager sheet={sheet.instance}>
            <App initialData={initialData} />
          </StyleSheetManager>
        </StaticRouter>,
      );

      fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
        if (err) return res.status(500).send("internal error");

        res.status(context.statusCode).send(
          injectHTML(data, {
            markup,
            meta: renderHead(activeRoute, initialData),
            initialData,
            sheet: renderToString(sheet.getStyleElement()),
          }),
        );
      });

      /*res.status(context.statusCode).send(`<!DOCTYPE html>
        <html>
          <head>
            ${renderHead(activeRoute)}
            ${renderToString(sheet.getStyleElement())}
            <script>window.__initialData__ = ${serialize(initialData)}</script>
          </head>
          <body>
            <div id="root">${markup}</div>
          </body>
        </html>`);*/
    })
    .catch(next);
});

const injectHTML = (data, { markup, meta, link, scripts, initialData, sheet }) => {
  if (meta) data = data.replace("</head>", `${meta}</head>`);
  if (link) data = data.replace("</head>", `${link}</head>`);
  if (sheet) data = data.replace("</head>", `${sheet}</head>`);
  if (initialData) data = data.replace("</head>", `<script>window.initialData__ = ${serialize(initialData)}</script></head>`);
  if (scripts) data = data.replace("</body>", scripts.join("") + "</body>");

  data = data.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
  return data;
};

const renderHead = (activeRoute, initialData) => {
  if (activeRoute && activeRoute.options && activeRoute.options.Head) {
    return renderToString(<activeRoute.options.Head params={initialData} />);
  } else {
    return "";
  }
};

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
