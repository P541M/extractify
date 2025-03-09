import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Extract code from GitHub repositories and local projects with proper formatting for AI analysis and collaboration. Save time and focus on building great code."
        />
        <meta
          name="keywords"
          content="code extraction, GitHub code, code formatting, AI analysis, code sharing, development tools, code snippets, repository extraction"
        />
        <meta name="author" content="Extractify" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://extractifycode.com/" />
        <meta property="og:title" content="Extractify - Code Extraction Tool" />
        <meta
          property="og:description"
          content="Extract code from GitHub repositories and local projects with proper formatting for AI analysis and collaboration."
        />
        <meta
          property="og:image"
          content="https://extractifycode.com/og-image.png"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://extractifycode.com/" />
        <meta
          property="twitter:title"
          content="Extractify - Code Extraction Tool"
        />
        <meta
          property="twitter:description"
          content="Extract code from GitHub repositories and local projects with proper formatting for AI analysis and collaboration."
        />
        <meta
          property="twitter:image"
          content="https://extractifycode.com/og-image.png"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://extractifycode.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
