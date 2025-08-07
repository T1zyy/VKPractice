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

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    photoUrl: string;
}

export interface PageAdvertisement {
    id: number;
    userId: number;
    title: string;
    description: string;
    price: number;
    weight: number;
    address: string;
    contacts: string;
}
