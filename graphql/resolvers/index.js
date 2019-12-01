const authResolver = require('./auth');
const userResolver = require('./users');

const rootResolver = {
   ...authResolver,
   ...userResolver,
}

const rootAuthResolver = {
    ...authResolver,
    ...userResolver,
}
module.exports.rootResolver = rootResolver;
module.exports.rootAuthResolver = rootAuthResolver;