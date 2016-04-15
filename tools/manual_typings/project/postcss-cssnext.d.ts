declare module 'postcss-cssnext' {

  interface IOptions {

  }

  interface IPostcssCssnext {
    (opts?: IOptions): NodeJS.ReadWriteStream;
  }

  const postcssCssnext: IPostcssCssnext;
  export = postcssCssnext;
}
