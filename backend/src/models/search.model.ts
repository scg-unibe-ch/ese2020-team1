export interface SearchRequest {
    title: string;
    location: string;
    minPrice: number;
    maxPrice: number;
    delivery: boolean;
    // category: string
}
