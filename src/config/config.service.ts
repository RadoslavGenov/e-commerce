require('dotenv').config();

class ConfigService {
  constructor(private env: { [key: string]: string | undefined }) {}

  private getValue(val: string): string {
    const value = this.env[val];

    if (!value) {
      throw new Error(`config error - missing ${val} key`);
    }

    return value;
  }

  public isProd() {
    const mode = this.getValue('ENV');
    return mode !== 'production';
  }

  public getDbConfig(): string {
    const user = this.getValue('DB_USER');
    const pass = this.getValue('DB_PASS');
    const host = this.getValue('DB_HOST');
    const port = this.getValue('DB_PORT');
    const identifier = this.getValue('DB_SCHEMA_IDENTIFIER');
    const dbName = this.getValue('DB_NAME');

    return `${identifier}://${user}:${pass}@${host}:${port}/${dbName}`;
  }
}

const configService = new ConfigService(process.env);

export { configService };
