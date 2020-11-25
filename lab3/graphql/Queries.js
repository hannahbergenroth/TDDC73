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

export const GITHUBB = gql`
query MyQuery {
  search(first: 10, type: REPOSITORY, query: "language:Java stars:>10000") {
    repositoryCount
    edges {
      node {
        ... on Repository {
          name
          descriptionHTML
          stargazers {
            totalCount
          }
          forks {
            totalCount
          }
          updatedAt
        }
      }
    }
  }
}
`;
