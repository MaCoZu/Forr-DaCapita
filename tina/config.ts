import { defineConfig } from "tinacms";

export default defineConfig({
  branch: 'main',
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "news",
        label: "Posts",
        path: "src/content/news",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Date Posted",
            required: true,
          },
          {
            type: "image",
            name: "thumbnail",
            label: "Thumbnail",
            // uploadDir: () => "public/uploads",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
            description: "Save as draft"
          }
        ],
      },
    ],
  },
  // Use Netlify Functions for the API
  // apiUrl: "/api/tina", // Points to your Netlify Function
});

