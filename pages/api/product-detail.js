import { readFile, readFileSync } from 'fs';
import { map } from 'lodash';

export default async function handler(req, res) {
  const urlImages = 'https://github.com/FedericoSebas/IotMarket/tree/main/images';

  const urlGithubModels =
    'https://github.com/FedericoSebas/IotMarket/tree/main/3dModels';

  const urlGithubElectronicDesigns =
    'https://github.com/FedericoSebas/IotMarket/tree/main/electronicDesigns';
  const urls = [urlImages, urlGithubModels, urlGithubElectronicDesigns]
  if (req.method === 'GET') {
    var errorExtension = {
      extension: null,
      folder: null,
      wrongExtension: null,
      wrongFolder: null,
      message: null
    };

    var errorType = {
      type: null,
    };

    const foldersConfig = [{
      folderName: "images",
      extension: "png",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores, facilis obcaecati? Repellat similique accusantium, quod repudiandae eligendi deleniti at dignissimos quasi quis esse nemo tempore aspernatur cum, magnam nostrum corrupti optio facilis eveniet! Deserunt commodi sequi pariatur sit magni accusantium quod? Illum ducimus fugit reiciendis quis nam, amet iure sequi nesciunt debitis, atque officia cupiditate voluptas distinctio architecto nulla, nemo dignissimos velit voluptatibus animi eaque nobis praesentium fugiat natus. Voluptatibus voluptate deserunt eveniet vel itaque maxime dolor et nesciunt, non aspernatur optio, dolorem explicabo impedit cumque sapiente, obcaecati perspiciatis aperiam modi officiis expedita ipsum! Impedit qui fugit quisquam labore ab sequi repellat quia voluptas molestiae cumque officia aperiam ipsa, consectetur asperiores recusandae velit saepe deserunt. Aliquam adipisci provident ex officia aspernatur minus accusamus odio dignissimos vero, laudantium culpa nemo amet. Nemo nesciunt dicta tenetur eligendi deserunt quo aperiam voluptates eveniet animi vero assumenda, consequatur excepturi aliquid, ut asperiores incidunt fuga quos laborum officia et sint. Accusamus esse quo sapiente omnis impedit ipsa neque modi animi fugit non eius, tempora aperiam vel recusandae autem sed ex quas aspernatur optio illo alias minima enim. Perspiciatis ipsum harum velit consequuntur officia necessitatibus, ex quo sed neque exercitationem, eaque fuga omnis quae modi cupiditate."
    }, {
      folderName: "3dModels",
      extension: "stl",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores, facilis obcaecati? Repellat similique accusantium, quod repudiandae eligendi deleniti at dignissimos quasi quis esse nemo tempore aspernatur cum, magnam nostrum corrupti optio facilis eveniet! Deserunt commodi sequi pariatur sit magni accusantium quod? Illum ducimus fugit reiciendis quis nam, amet iure sequi nesciunt debitis, atque officia cupiditate voluptas distinctio architecto nulla, nemo dignissimos velit voluptatibus animi eaque nobis praesentium fugiat natus. Voluptatibus voluptate deserunt eveniet vel itaque maxime dolor et nesciunt, non aspernatur optio, dolorem explicabo impedit cumque sapiente, obcaecati perspiciatis aperiam modi officiis expedita ipsum! Impedit qui fugit quisquam labore ab sequi repellat quia voluptas molestiae cumque officia aperiam ipsa, consectetur asperiores recusandae velit saepe deserunt. Aliquam adipisci provident ex officia aspernatur minus accusamus odio dignissimos vero, laudantium culpa nemo amet. Nemo nesciunt dicta tenetur eligendi deserunt quo aperiam voluptates eveniet animi vero assumenda, consequatur excepturi aliquid, ut asperiores incidunt fuga quos laborum officia et sint. Accusamus esse quo sapiente omnis impedit ipsa neque modi animi fugit non eius, tempora aperiam vel recusandae autem sed ex quas aspernatur optio illo alias minima enim. Perspiciatis ipsum harum velit consequuntur officia necessitatibus, ex quo sed neque exercitationem, eaque fuga omnis quae modi cupiditate."
    }, {
      folderName: "electronicDesigns",
      extension: ["kicad_pcb", "kicad_sch"],
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores, facilis obcaecati? Repellat similique accusantium, quod repudiandae eligendi deleniti at dignissimos quasi quis esse nemo tempore aspernatur cum, magnam nostrum corrupti optio facilis eveniet! Deserunt commodi sequi pariatur sit magni accusantium quod? Illum ducimus fugit reiciendis quis nam, amet iure sequi nesciunt debitis, atque officia cupiditate voluptas distinctio architecto nulla, nemo dignissimos velit voluptatibus animi eaque nobis praesentium fugiat natus. Voluptatibus voluptate deserunt eveniet vel itaque maxime dolor et nesciunt, non aspernatur optio, dolorem explicabo impedit cumque sapiente, obcaecati perspiciatis aperiam modi officiis expedita ipsum! Impedit qui fugit quisquam labore ab sequi repellat quia voluptas molestiae cumque officia aperiam ipsa, consectetur asperiores recusandae velit saepe deserunt. Aliquam adipisci provident ex officia aspernatur minus accusamus odio dignissimos vero, laudantium culpa nemo amet. Nemo nesciunt dicta tenetur eligendi deserunt quo aperiam voluptates eveniet animi vero assumenda, consequatur excepturi aliquid, ut asperiores incidunt fuga quos laborum officia et sint. Accusamus esse quo sapiente omnis impedit ipsa neque modi animi fugit non eius, tempora aperiam vel recusandae autem sed ex quas aspernatur optio illo alias minima enim. Perspiciatis ipsum harum velit consequuntur officia necessitatibus, ex quo sed neque exercitationem, eaque fuga omnis quae modi cupiditate."
    }]

    var extensionsAllowed = ["png", "stl", "kicad_pcb", "kicad_sch"]

    let isExtensionInConfigOrIndex;

    // Set the endpoint URL and the access token
    let endpoint = 'https://api.github.com/graphql';
    let token = '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';

    let data = await Promise.all(urls.map(async (url, directoryIndex) => {
      let uri = new URL(url, 'https://github.com');
      let pathParts = uri.pathname.split('/');

      const [, owner, repo, type, branch, path] = pathParts;

      if (type !== 'tree') {
        errorType["type"] = type;
        errorType["value"] = true;
      }

      if (pathParts.length < 3) {
        return null;
      }

      // Set the GraphQL query
      let query = `
    
      query ListFiles($owner: String!, $expression: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          object(expression: $expression) {
            ... on Tree {
              entries {
                name
              }
            }
          }
        }
      }
  `;

      // Create the request options
      let options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: {
            owner,
            repo,
            expression: `${branch}:${path}`
          }
        }),
      };

      // Send the request and log the response
      return fetch(endpoint, options)
        .then((response) => response.json())
        .then(async ({ data: oldData }) => {
          const data = oldData.repository.object
          data["info"] = {
            repo,
            owner,
            branch,
            path,
            description: foldersConfig[directoryIndex].description
          }
          data.entries = await Promise.all(data.entries.map(async (fileObject) => {
            const baseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}/`;
            


            const bufferExtension = fileObject.name
            const extensionIndex = bufferExtension.lastIndexOf('.');
            const extension = bufferExtension.slice(extensionIndex + 1)


            isExtensionInConfigOrIndex = foldersConfig.some(function (folderConfig, folderIndex) {
              if (Array.isArray(folderConfig.extension)) {

                errorExtension["folder"] = folderConfig.folderName
                if (!extensionsAllowed.includes(extension)) {
                  errorExtension["wrongExtension"] = true;
                  errorExtension["extension"] = extension
                }
                else if (directoryIndex !== folderIndex) {
                  errorExtension["wrongFolder"] = true;
                }
                return folderConfig.extension.includes(extension) && directoryIndex === folderIndex;
              } else {
                errorExtension["folder"] = folderConfig.folderName

                if (!extensionsAllowed.includes(extension)) {
                  errorExtension["wrongExtension"] = true;
                  errorExtension["extension"] = folderConfig.extension
                }
                else if (directoryIndex !== folderIndex) {
                  errorExtension["wrongFolder"] = true;
                }
                return folderConfig.extension === extension && directoryIndex === folderIndex;
              }
            });

            if (!isExtensionInConfigOrIndex) {
              if (errorExtension.wrongExtension) {
                errorExtension["message"] = `extension ${errorExtension.extension} not allowed`
              }
              else if (errorExtension.wrongFolder) {
                errorExtension["message"] = `extension ${errorExtension.extension} not allowed in folder ${errorExtension.folder}`
              }
            }
            else {
              errorExtension['wrongFolder'] = false
              errorExtension['wrongExtension'] = false
            }

            fileObject["url"] = baseUrl + fileObject.name
            


            // if (extension === 'png') {
            //   fileObject['data'] = await fetch(fileObject.url)
            //   const buffer = await response.buffer();
            //   const base64Image = buffer.toString('base64');
            //   const blob = new Blob([fileObject.data], { type: 'image/png' });
            //   const imageUrl = URL.createObjectURL(blob);
            //   fileObject['data'] = imageUrl;
            // }

            return fileObject;

          }))

          return data
        })
        .catch((error) => console.error(error));
    }))

    if (!isExtensionInConfigOrIndex) {
      return res.status(406).json({ message: errorExtension.message });
    }


    if (errorType.value) {
      return res.status(406).json({ message: 'Only tree type allowed' });
    }

    res.status(200).json(data);
  }
}