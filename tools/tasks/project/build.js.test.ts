import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as cssnext from 'postcss-cssnext';
import * as precss from 'precss';
import * as reporter from 'postcss-reporter';
import {join} from 'path';
import {BOOTSTRAP_MODULE, APP_SRC, APP_DEST, BROWSER_LIST, TOOLS_DIR} from '../../config';
import {makeTsProject} from '../../utils';
const plugins = <any>gulpLoadPlugins();

const processors = [
  precss(),
  cssnext({
    autoprefixer: {
      browsers: BROWSER_LIST
    }
  }),
  reporter({ clearMessages: true })
];

export = () => {
  let tsProject = makeTsProject();
  let src = [
    'typings/browser.d.ts',
    TOOLS_DIR + '/manual_typings/**/*.d.ts',
    join(APP_SRC, '**/*.ts'),
    '!' + join(APP_SRC, '**/*.e2e.ts'),
    '!' + join(APP_SRC, `${BOOTSTRAP_MODULE}.ts`)
  ];
  let result = gulp.src(src)
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.inlineNg2Template({
      base: APP_SRC,
      useRelativePaths: false,
      styleProcessor: function processor(ext:string , file: string) {
        return file = plugins.postcss(processors);
      }
    }))
    .pipe(plugins.typescript(tsProject));

  return result.js
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(APP_DEST));
}
