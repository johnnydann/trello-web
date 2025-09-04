// export const API_ROOT = 'http://localhost:5000'
let apiRoot = ''
console.log('process.env: ', process.env)
if (process.env.BUILD_MODE === 'dev') {
    apiRoot = 'http://localhost:5000'
}

if (process.env.BUILD_MODE === 'production') {
    apiRoot = 'https://trello-backend-y8vj.onrender.com'
}

console.log('🚀 ~ apiRoot:', apiRoot)

export const API_ROOT = apiRoot
