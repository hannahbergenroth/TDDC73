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
