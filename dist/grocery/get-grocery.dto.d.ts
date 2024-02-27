export declare class SearchingDto {
    readonly key: string;
    readonly value: string;
}
export declare class GetGroceryDto {
    readonly page: number;
    readonly per_page: number;
    readonly order_by: string;
    readonly search: [SearchingDto];
}
