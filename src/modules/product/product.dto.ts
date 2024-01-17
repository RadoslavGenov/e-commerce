export class CreateProductDto {
  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly amount?: number,
  ) {}
}
