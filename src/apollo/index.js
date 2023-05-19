import ApolloClient from'@apollo/client/core'

export default options => {
    return new ApolloClient({
        uri: options.uri
    })
}