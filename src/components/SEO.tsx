import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
}

export default function SEO({
  title = "Extractify - Code Extraction Tool",
  description = "Extract code from GitHub repositories and local projects with proper formatting for AI analysis and collaboration.",
  canonicalUrl = "https://extractifycode.com",
  ogImage = "https://extractifycode.com/og-image.png",
  ogType = "website",
}: SEOProps) {
  const fullTitle = title.includes("Extractify")
    ? title
    : `${title} | Extractify`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
    </Head>
  );
}
