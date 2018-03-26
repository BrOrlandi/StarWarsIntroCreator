const Bundler = require('parcel-bundler');
const Path = require('path');
const fs = require('fs');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const BUILD = process.argv.indexOf('build') > -1;

// Entrypoint file location
const file = Path.join(__dirname, './src/index.html');

const options = {
  hmr: false,
  port: 8080,
};

const bundler = new Bundler(file, options);

if (BUILD) {
  process.env.NODE_ENV = 'production';
  options.publicURL = '/';
  bundler.bundle();
} else {
  bundler.serve(8080);
}

bundler.on('buildEnd', () => {
  const data = fs.readFileSync('src/html/termsOfService.html');
  fs.writeFileSync('dist/termsOfService.html', data);

  if (BUILD) {
    process.exit();
  }
});
