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

export default {
  GET_PRODUCTS_FROM_API({commit}, tagId=0) {
    console.log('TAG =', tagId, allProductsQuery['query']);
    let newAllProductsQuery = Object.assign({}, allProductsQuery); 
    if (tagId != 0) {

      // console.log('Я тут =', tagId, String(newAllProductsQuery['query']).replace(`allProducts  `, `allProducts (tag: ${tagId})`));
      // newAllProductsQuery['query'] = String(newAllProductsQuery['query']).replace(`allProducts  `, `allProducts (tag: ${tagId})`);
      newAllProductsQuery['query'] = newAllProductsQuery['query'].replace('{tag}', `(tag: ${tagId})`);
      console.log('Я тут =', tagId, newAllProductsQuery['query'].replace('{tag}', `(tag: ${tagId})`));

    } else {
      console.log('Пиздец', tagId);
      newAllProductsQuery['query'] = allProductsQuery['query'].replace('{tag}', ``);
    }
    console.log('AAAAAAAAAAAAAAAAAAA', tagId, newAllProductsQuery['query']);
      return axios({
      url: endpoint,
      method: 'post',
      headers: headers,
      data: newAllProductsQuery,
    })
      .then((products) => {
        console.log('products.data.data.allProducts', products.data.data.allProducts);
        commit('SET_PRODUCTS_TO_STATE', products.data.data.allProducts);
        console.log('NEW_PRODUCTS!!!!!',  products.data.data.allProducts);
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
}