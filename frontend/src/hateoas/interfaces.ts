export interface Advertisement {
    id: number;
    title: string;
    description: string;
    price: number;
    weight: number;
    address: string;
}

export interface SearchResponse {
    _embedded?: {
        showAdvertisementList: Advertisement[];
    };
    page?: {
        size: number;
        totalElements: number;
        totalPages: number;
        number: number;
    };
    _links?: any;
}
