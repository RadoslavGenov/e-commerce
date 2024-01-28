export class CreateProductDto {
  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly imageUrl?: string,
    public readonly amount?: number,
  ) {}
}
