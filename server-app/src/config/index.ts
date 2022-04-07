import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(__dirname, 'server.env')});

export const config = {
    env: {
        dbUser: process.env.DB_USER,
        dbPassword: process.env.DB_PWD,
        dbName: process.env.DB_NAME,
        dbServer: process.env.DB_HOST,
        dbPort: process.env.DB_PORT,
        port: process.env.PORT,
        secretKey: process.env.SECRET_KEY,
        host: process.env.HOST,
        build:process.env.BUILD_TYPE
    },
    cors: async (req: any, res: any, next: any) => {
        res.header(
            "Access-Control-Allow-Origin",
            "*"
        );
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, x-Requested-With, Content-Type, Accept,token"
        );
        if (req.method == "OPTIONS") {
            res.header(
                "Access-Control-Allow-Methods",
                "PUT, POST, PATCH, DELETE, GET"
            );
            return res.status(200).json({});
        }
        next();
    }
}

