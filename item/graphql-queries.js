const ITEM_DETAIL =  `
    query{
    repository(name: $repo, owner: $owner) {
      id
      object(expression: $branch:$path) {
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
