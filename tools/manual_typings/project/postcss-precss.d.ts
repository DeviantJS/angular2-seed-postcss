declare module 'precss' {

  interface IOptions {

  }

  interface IPreCss {
    (opts?: IOptions): NodeJS.ReadWriteStream;
  }

  const preCss: IPreCss;
  export = preCss;
}
