import gql from 'graphql-tag';

export const GET_GITHUB = gql`
  query ($number_of_repos: Int!) {
    viewer {
      name
      repositories(last: $number_of_repos) {
        nodes {
          name
          description
        }
      }
    }
  }
`;

export const GITHUB_DATA = gql`
query($query: String!) {
  search(first: 20, type: REPOSITORY, query: $query) {
    edges {
      node {
        ... on Repository {
          id
          name
          forks {
            totalCount
          }
          description
          forkCount
          owner {
            avatarUrl
            ... on User {
              id
              name
              login
              bio
              createdAt
              email
              followers {
                totalCount
              }
            }
          }
          createdAt
          stargazerCount
          stargazers {
            totalCount
          }
          languages(first: 1) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
}
`;

