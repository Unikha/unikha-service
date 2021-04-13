import { Router, Request, Response, NextFunction } from "express";
import { Container } from 'typedi';
import NFTService from '../../services/nft';
import { Logger } from 'winston';

import { INftInput } from "../../interfaces/INft";

const route = Router();

export default (app: Router) => {
    app.use("/nft", route);
    /**
     * @route api/nft/create
     */
    route.post("/create", async (req: Request, res: Response, next: NextFunction) => {
        const logger:Logger = Container.get('logger');
        logger.debug('Calling POST Create endpoint with body: %o', req.body);
        try {
            const nftServiceInstance = Container.get(NFTService);
            const response = await nftServiceInstance.Create(req.body as INftInput);
            return res.status(response.status).json(response.data);
        } catch (error) {
            logger.error(error);
            return next(error)
        }
    });

    /**
     * @route api/nft/collectibles
     */
    route.get("/collectibles/:token_id", async (req: Request, res: Response, next: NextFunction) => {
        const logger:Logger = Container.get('logger');
        logger.debug('Calling GET Collectible endpoint with body: %o', req.params);
        try {
            const { token_id } = req.params;
            const idNumber = parseInt(token_id);
            const nftServiceInstance = Container.get(NFTService);
            const response = await nftServiceInstance.SearchNftById(idNumber);
            return res.status(response.status).json(response.data);
        } catch (error) {
            logger.error(error);
            return next(error)
        }
    });
};