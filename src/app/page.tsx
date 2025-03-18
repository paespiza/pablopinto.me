'use client';  // Add this line at the very top of your file

import { useState, useEffect } from 'react';
import { builder, BuilderComponent } from '@builder.io/react';

builder.init('d0bf5384559844549bb302d300168e05');

export default function HomePage() {
  const [content, setContent] = useState(null);
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';

  useEffect(() => {
    const fetchContent = async () => {
      console.log("Fetching Builder.io content for: /pablos-new-new-home-page");
      const data = await builder
        .get("page", { 
          userAttributes: { urlPath: "/pablos-new-new-home-page" } // Explicitly fetch this page
        })
        .promise();
  
      console.log("Builder.io response:", data);
      setContent(data);
    };
  
    fetchContent();
  }, []);
  
  if (!content) return <h1>Loading content...</h1>;

  return <BuilderComponent model="page" content={content} />;
}
