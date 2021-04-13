import { Service, Inject } from 'typedi';
import { INftInput } from "../interfaces/INft";
import NftModel from "../models/Nft";


@Service()
export default class NFTService {
    constructor(
        @Inject('logger') private logger){}

    public async Create(nft: INftInput) {
        try {
            const collectibleRecord = await NftModel.create({ ...nft });
            return {data: collectibleRecord, status: 201};
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    public async SearchNftById(id: number) {
       try {
            const { attributes, name, description, image } = await NftModel.findOne({ token_id: id });
            
            return {data: { attributes, name, description, image }, status: 200}
       } catch (error) {
            this.logger.error(error);
            throw error;
       }
    }
}