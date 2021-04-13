import { Service, Inject } from 'typedi';
import NftMetrics from "../models/NftMetrics";
import { INftMetrics } from "../interfaces/INft";


@Service()
export default class NFTMetricsService {
    constructor(
        @Inject('logger') private logger){}

    public async SendNftToMarketplace(nft: INftMetrics) {
        try {
            const collectibleRecord = await NftMetrics.create({ ...nft });
            return {data: collectibleRecord, status: 201};
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    public async SearchNftsByCategory(category: string) {
       try {
            const nfts = await NftMetrics.find({ category, on_sale: true });
            return {data: {nfts, qty: nfts.length}, status: 200}
       } catch (error) {
            this.logger.error(error);
            throw error;
       }
    }

    public async getNftWithMoreViews() {
        try {
            const nfts = await NftMetrics.find({ views: { $gt: 10 } });
            return {data: {nfts, qty: nfts.length}, status: 200}
       } catch (error) {
            this.logger.error(error);
            throw error;
       }
    }

    public async viewCounter(contract, token_id) {
        try {
            const update = await NftMetrics.findOneAndUpdate({contract, token_id}, {$inc: { views: 1 }});
            return {data: update, status: 201}
       } catch (error) {
            this.logger.error(error);
            throw error;
       }
    }
}