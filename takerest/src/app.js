import bodyParser from "body-parser";
import httpStatus from "http-status";
import cors from "cors";
import express, { Router } from "express";
import routes from "./routes";
import { AppError } from "./helpers";
import config from './config';

const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: true,
    credentials: true
}));

app.use('/', routes);

var con = require('./dbconnect/db')

const router = Router();

router.use((req, res, next) => next(new AppError('NOT_FOUND', httpStatus.NOT_FOUND)));

router.use((err, req, res, next) => {
    if (!err) {
        return next();
    }

    res
        .status(err.status)
        .json({
            message: err.message,
            details: err.details,
            code: err.code
        });

    return next();
});

app.use((err, req, res, next) => {
    if (!err) {
        return next();
    }

    if (config.get('debug')) {
        console.log("error", {
            message: err.message,
            details: err.details,
            code: err.code
        });
    }

    res.status(err.status || 500).json({
        message: err.message,
        details: err.details,
        code: err.code
    });
});

app.use(router);


export default app;