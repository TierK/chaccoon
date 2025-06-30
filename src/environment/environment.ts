import pkg from '../../package.json';

export const environment = {
  production: false,
  version: pkg.version,
  buildTime: new Date().toISOString()
};