import axios from "axios";

// const express = require('express')
// const { graphql, buildSchema } = require('graphql')
// const graphqlHTTP = require('express-graphql')
// const cors = require('cors')

const endpoint = "http://localhost:8000/graphql";
const headers = {
	"content-type": "application/json",
    "Authorization": "<token>"
};
const allProductsQuery = {
    "query": ` 
    query {
      allProducts {tag} {
        id
        title
        price
        description
        publishDate
        dateModified
        published
        metaDescription
        slug
        photo
        company {
          id
          name
        }
        languages {
          nameEn
        }
        operatingSystems {
          name
        }
        tags {
          id
          name
        }
      }
    }
    `,
    "variables": {}
};

const tagsQuery = {
  "query": `
  query {
    tagsWithCountOfProducts {
      countProducts
      nameTag
      id
    }
  }
  `,
  "variables": {}
};
import gql from 'graphql-tag'
export default {
  GET_PRODUCTS_FROM_API({commit}, tagId=0) {
    let newAllProductsQuery = Object.assign({}, allProductsQuery); 
    if (tagId != 0) {
      newAllProductsQuery['query'] = newAllProductsQuery['query'].replace('{tag}', `(tag: ${tagId})`);
    } else {
      newAllProductsQuery['query'] = allProductsQuery['query'].replace('{tag}', ``);
    }
      return axios({
      url: endpoint,
      method: 'post',
      headers: headers,
      data: newAllProductsQuery,
    })
      .then((products) => {
        commit('SET_PRODUCTS_TO_STATE', products.data.data.allProducts);
        return products.data;
      })
      .catch((error) => {
        console.log(error)
        return error;
      })
  },
  GET_TAGS_FROM_API({commit}) {
    return axios({
      url: endpoint,
      method: 'post',
      headers: headers,
      data: tagsQuery
    })
      .then((tags) => {
        commit('SET_TAGS_TO_STATE', tags.data.data.tagsWithCountOfProducts);
        return tags.data;
      })
      .catch((error) => {
        console.log(error)
        return error;
      })
  },
  GET_USER_FROM_API({commit}, token) {
    this.$apollo.mutate({
      // Query
      mutation: gql`mutation ($token: String!) {
        viewer(token: $token) {
          email
          firstName
          lastName
        }
      }`,
      // Parameters
      variables: {
        token: token,
      },
    }).then((result) => {
      // Result
      let data = {token: token, data: result.viewer}
      commit('SET_USER_TO_STATE', data);
      console.log('Пользователь получен по токену!', data)});
  },
}