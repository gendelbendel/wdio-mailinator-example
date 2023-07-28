# wdio-mailinator-example

WIP

The goal of this project is to show how simple it is to interact with the Mailinator API in a WDIO project.

This project was created via:

1. Creating the wdio base project

```
npm create wdio@latest ./
```

2. Install mailinator client and dotenv

```
npm i mailinator-client dotenv
```

3. Modify `baseUrl` and setup dotenv in `onPrepare` in file `wdio.conf.js` (see blog post)
4. Modify page objects to interact with forgot password page (see blog post)
5. Add Mailinator functions to check email (see blog post)
6. Modify test spec (see blog post)

## Configuration

You need to create a `.env` file with these values set:

```
MAILINATOR_API_KEY=
```

- `MAILINATOR_API_KEY`: Your API key in your mailinator account

## Install

```
npm i
```

## Running

```
npm test
```
