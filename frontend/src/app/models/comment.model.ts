export class Comment {
    commentId: number;
    productId: number;
    comment: string;
    constructor(httpResponse: any){
        this.commentId= httpResponse.commentId;
        this.productId= httpResponse.productId;
        this.comment= httpResponse.comment;
    }
}