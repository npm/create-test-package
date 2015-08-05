# create-test-package

create a directory with a package.json suitable for tests.

## API

### `createPackage(nameTemplate[, json]) -> Promise`
### `createPackage(nameTemplate[, json], ready)`

Creates a temp directory with a `package.json` file provided
by the `json` argument. The `json` value may be a `Promise`.

The `nameTemplate` will replace `"%s"` with a random value.

The `package.json` `name` field will be overridden by the `nameTemplate`.

## License

ISC
