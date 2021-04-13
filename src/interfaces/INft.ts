export interface INft {
    token_id: number;
    name: string;
    description: string;
    image: string;
    attributes: any[];
}

export interface INftInput {
    name: string;
    description: string;
    image: string;
    attributes: any[];
}

export interface INftMetrics {
    contract: string;
    token_id: number;
    creator: string;
    views: number;
    category: string;
    on_sale: boolean;
}