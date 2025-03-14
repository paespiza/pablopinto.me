"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { builder, BuilderComponent } from "@builder.io/react";

// Use environment variable securely
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || "");

export default function DynamicPage() {
  const pathname = usePathname(); // Get the current page path
  const [content, setContent] = useState(null);

  useEffect(() => {
    console.log("Fetching Builder.io content for:", pathname); // Debugging Log

    builder
      .get("page", { userAttributes: { urlPath: pathname } }) // Fetch content dynamically

      .toPromise()
      .then((data) => {
        console.log("Builder.io response:", data); // Debugging log
        setContent(data);
      })
      .catch((error) =>
        console.error("Error fetching Builder.io content:", error)
      );
  }, [pathname]);

  if (!content) {
    return <h1>404 - Page not found</h1>; // Fallback in case no content is found

  }

  return <BuilderComponent model="page" content={content} />;
}

