const toNxFilesArg = (files) => files.join(',');

module.exports = {
  '*.{ts,tsx,js,jsx,mjs,cjs,json,md,html,css,scss,yml,yaml}': (files) => [
    `npx nx format:write --files=${toNxFilesArg(files)}`,
  ],
  '*.{ts,tsx,js,jsx,mjs,cjs}': (files) => [
    `npx eslint --fix ${files.join(' ')}`,
  ],
};
