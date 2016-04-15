declare module 'stylelint' {

  interface IOptions {
    config?: Object;
    configFile?: string;
    configBasedir?: string;
    configOverrides?: Object;
    syntax?: Object;
  }

  interface IStylelint {
    (opts?: IOptions): NodeJS.ReadWriteStream;
  }

  const stylelint: IStylelint;
  export = stylelint;
}
