import { Router } from "express";

export const healthRouter =  new Router();

healthRouter.get('/', (req, res) => {
    res.status(200).json({
        "status": "ok"
    })
});