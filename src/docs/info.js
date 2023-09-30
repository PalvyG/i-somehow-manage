import 'dotenv/config'

export const info = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'I Somehow Manage',
            version: '3.0.0',
            description: 'An API for, well... managing. What, you say? Well... users, products, carts, and more!'
        },
        servers: [
            { 
                url: 'http://localhost:' +  `${process.env.PORT}`,
                description: 'Internal server for testing.'
            }
        ]
    },
    apis: ['./src/docs/data/*/*.yml']
}