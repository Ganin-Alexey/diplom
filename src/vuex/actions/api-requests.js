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

const userQuery = {
  "query": `
  mutation {
    viewer (token: $token} ) {
      firstName
      lastName
      email
      avatar
      bankcardNumber
    }
  }
  `,
  "variables": {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0BtYWlsLnJ1IiwiZXhwIjoxNjg0NTg5MDU3LCJvcmlnSWF0IjoxNjg0NTg4NzU3fQ.iHnVoBLg-p7ElaVZF1wJPY5s2hpb0Gx5YA7rSXZ-vuA"}
};

export default {
  GET_PRODUCTS_FROM_API({commit}, tagId=0) {
    console.log('TAG =', tagId, allProductsQuery['query']);
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
        console.log( tags.data.data.tagsWithCountOfProducts);
        return tags.data;
      })
      .catch((error) => {
        console.log(error)
        return error;
      })
  },
  GET_USER_FROM_API({commit}) {

    // let newUserQuery = Object.assign({}, userQuery); 
    userQuery.variables = {token:  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0BtYWlsLnJ1IiwiZXhwIjoxNjg0NTg5MDU3LCJvcmlnSWF0IjoxNjg0NTg4NzU3fQ.iHnVoBLg-p7ElaVZF1wJPY5s2hpb0Gx5YA7rSXZ-vuA"}
    console.log('USER', userQuery['query']);
    return axios({
      url: endpoint,
      method: 'post',
      headers: headers,
      data: userQuery
    })
      .then((user) => {
        commit('SET_USER_TO_STATE', user.data.data.viewer);
        console.log(user.data.data.viewer);
        return user.data;
      })
      .catch((error) => {
        console.log(error)
        return error;
      })
  },
}