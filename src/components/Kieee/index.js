import React from "react";

export function KieeeHead({ themeColor, title, description, appleIcon, icon, imagePath, siteName, url, favicon }) {
  return (
    <>
      <meta name="theme-color" content={themeColor} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta name="title" content={title} />
      <meta property="og:description" content={description} />
      <link rel="apple-touch-icon" href={appleIcon} />
      <meta rel="icon" type="image/png" href={icon} />
      <meta property="og:image" content={imagePath} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={url} />
      <link rel="manifest" href="/public/manifest.json" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="800" />
      <meta property="og:image:height" content="420" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:type" content="website" />
      <link rel="icon" href={favicon} />
    </>
  );
}
