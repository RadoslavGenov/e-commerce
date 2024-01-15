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

    return `mongodb+srv://${user}:${pass}@${host}/`;
  }
}

const configService = new ConfigService(process.env);

export { configService };
