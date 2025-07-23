export interface AdvertisementList {
    id: number;
    title: string;
    price: number;
    weight: number;
    address: string;
}

export interface SearchResponse {
    _embedded?: {
        showAdvertisementList: AdvertisementList[];
    };
    page?: {
        size: number;
        totalElements: number;
        totalPages: number;
        number: number;
    };
    _links?: any;
}

export interface PageAdvertisement {
    id: number;
    title: string;
    description: string;
    price: number;
    weight: number;
    address: string;
}
