const { defineConfig } = require('@vue/cli-service')
module.exports = {
    css: {
        loaderOptions: {
           sass: {
            additionalData: `@import "@/assets/styles/styles.scss";`
           }
        }
    },
    // defineConfig({
    //   transpileDependencies: true
    // })
};

// module.exports = {
// defineConfig({
//     transpileDependencies: true
//   })
// };

