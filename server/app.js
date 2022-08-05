const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const rateLimit = require('express-rate-limit');


// Middlewares
const middleware = require('./middleware');
const routes = require('./routes');
const publicAPIKeyRoute = require('./PublicRoute');

// ENV 
const {
    COOKIE_SECRET,
    CLIENT_URL,
    PORT
} = process.env;

// Create express App
const app = express();

// Setup Cookie parser
app.use(cookieParser(COOKIE_SECRET));

// Setup cors
app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}));


// Setup express middlewares'
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Setup Middleware
app.use(morgan('dev'));
app.use(compression());
app.use(helmet());


// Swagger options
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'BUET Hackathon',
            version: '1.0.0',
            description: "This is a sample server for Tuni.",
            termsOfService: `${CLIENT_URL}/terms/`,
            contact: {
                name: "API Support",
                url: `${CLIENT_URL}/support`,
                email: "istiyak.riyad@gmail.com"
            },
            license: {
                name: "Apache 2.0",
                url: "https://www.apache.org/licenses/LICENSE-2.0.html"
            }
        },
        servers: [
            {
                description: 'Local server',
                url: `http://localhost:${PORT}/api/{version}`,
                variables: {
                    version: {
                        enum: [
                            "v1"
                        ],
                        default: "v1"
                    }
                }
            },
            {
                definition: 'Production Server',
                url: 'https://azure.com/api/{version}',
                variables: {
                    version: {
                        enum: [
                            "v1"
                        ],
                        default: "v1"
                    }
                }
            }
        ]
    },
    apis: ['./server/routes/**/*.js', './server/PublicRoute/**/*.js']
}


const openapiSpecification = swaggerJsdoc(options);
// console.log(openapiSpecification);
app.use('/api/docs-swagger', swaggerUI.serve, swaggerUI.setup(openapiSpecification));


// Rate limiter
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window`
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// External API Key Routes
app.use('/api/v1/external', apiLimiter, publicAPIKeyRoute);

// Main Routes
app.use(`/api/v1`, routes);




// Not Found and Error handler
app.use(middleware.notFoundError);
app.use(middleware.errorHandler);

module.exports = app;