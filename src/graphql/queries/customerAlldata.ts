import { gql } from 'graphql-request'

export const customerAllDataQuery = gql`
  query CustomerAllData($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
      phone
      orders(first: 1) {
        totalCount
      }
      createdAt
      defaultAddress {
        formatted
        address1
      }
      addresses(first: 5) {
        edges {
          node {
            address1
          }
        }
      }
    }
  }
`
