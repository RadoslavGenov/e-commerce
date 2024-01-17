export class CreateUserDto {
  constructor(
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly username: string,
    readonly password: string,
  ) {}
}
