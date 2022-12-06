import { gql } from "@apollo/client";

export const UPLOAD = gql`
  mutation Upload($input: DatafeedInput!) {
    upload(input: $input)
  }
`