import { Router, Request, Response, NextFunction } from "express";
import { Container } from 'typedi';
import NFTMetricsService from '../../services/metrics';
import { Logger } from 'winston';

import { INftMetrics } from "../../interfaces/INft";

const route = Router();

export default (app: Router) => {
    app.use("/metrics", route);
    /**
     * @route api/metrics/marketplace
     */
    route.post("/marketplace", async (req: Request, res: Response, next: NextFunction) => {
        const logger:Logger = Container.get('logger');
        logger.debug('Calling POST Marketplace endpoint with body: %o', req.body);
        try {
            const nftMetricsServiceInstance = Container.get(NFTMetricsService);
            const response = await nftMetricsServiceInstance.SendNftToMarketplace(req.body as INftMetrics);
            return res.status(response.status).json(response.data);
        } catch (error) {
            logger.error(error);
            return next(error)
        }
    });

    /**
     * @route api/metrics/category/:category
     */
    route.get("/category/:category", async (req: Request, res: Response, next: NextFunction) => {
        const logger:Logger = Container.get('logger');
        logger.debug('Calling GET Category endpoint with body: %o', req.params);
        try {
            const { category } = req.params;
            const nftMetricsServiceInstance = Container.get(NFTMetricsService);
            const response = await nftMetricsServiceInstance.SearchNftsByCategory(category);
            return res.status(response.status).json(response.data);
        } catch (error) {
            logger.error(error);
            return next(error)
        }
    });

    /**
     * @route api/metrics/hot
     */
     route.get("/hot", async (req: Request, res: Response, next: NextFunction) => {
        const logger:Logger = Container.get('logger');
        logger.debug('Calling GET Hot metrics endpoint with body: %o');
        try {
            const nftMetricsServiceInstance = Container.get(NFTMetricsService);
            const response = await nftMetricsServiceInstance.getNftWithMoreViews();
            return res.status(response.status).json(response.data);
        } catch (error) {
            logger.error(error);
            return next(error)
        }
    });

    /**
     * @route api/metrics/view/:contract/:id
     */
     route.get("/view/:contract/:token_id", async (req: Request, res: Response, next: NextFunction) => {
        const logger:Logger = Container.get('logger');
        logger.debug('Calling GET Views endpoint with body: %o', req.params);
        try {
            const { contract, token_id } = req.params;
            const nftMetricsServiceInstance = Container.get(NFTMetricsService);
            const response = await nftMetricsServiceInstance.viewCounter(contract, token_id);
            return res.status(response.status).json(response.data);
        } catch (error) {
            logger.error(error);
            return next(error)
        }
    });

};