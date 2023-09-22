import { readFile, readFileSync } from "fs";
import path from "path";

export default async function handler(req, res) {
  const urlGithub =
    "https://github.com/FedericoSebas/IotMarket/tree/main/3dModels";
  if (req.method === "GET") {
    // Set the endpoint URL and the access token
    let endpoint = "https://api.github.com/graphql";
    let token = "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";
    let uri = new URL(urlGithub, "https://github.com");
    let pathParts = uri.pathname.split("/");

    const [, owner, repo, type, branch, ...path] = pathParts;
    if (type !== "tree") {
      return res.status(406).json({ message: "Only tree type allowed" });
    }

    if (pathParts.length < 3) {
      return null;
    }

    // Set the GraphQL query
    let query = `
    {
    repository(name: "${repo}", owner: "${owner}") {
      id
      object(expression: "${branch}":"${path}") {
        ... on Tree {
          id
          entries {
            path
          }
        }
      }
    }
  }
  `;

    // Create the request options
    let options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query }),
    };

    // Send the request and log the response
    var arrayPaths = await fetch(endpoint, options)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error(error));

    // const baseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/`;
    // const urls = arrayPaths.map((file) => {
    //   const extensionIndex = file.lastIndexOf(".");
    //   return {
    //     pathName: baseUrl + file.path,
    //     extension: file.slice(extensionIndex),
    //   };
    // });

    // if (extension !== ".png" || extension !== ".stl") {
    //   return res.status(406).json({ message: `${extension} not allowed` });
    // }

    // var filesData = urls.map(async (url) => {
    //   let data = await fetch(url.pathName);

    //   if (url.extension === ".png") {
    //     const blob = new Blob([data], { type: "image/png" });
    //     const imageUrl = URL.createObjectURL(blob);
    //     data = imageUrl;
    //   }
    //   return {
    //     extension: url.extension,
    //     data,
    //   };
    // });
  }

  res.status(200).json({ arrayPaths });
}
