
# Intermediary Telegram Api


[![npm version](https://img.shields.io/npm/v/axios.svg?style=flat-square)](https://www.npmjs.org/package/axios)

install node js on your system and use with following command for run

### Install NodeJs on Ubuntu

Using npm:

```bash
$ curl -s https://deb.nodesource.com/setup_17.x | sudo bash
```

```bash
$ sudo apt install nodejs -y
```

```bash
$ sudo apt install nodejs npm
```


### Install NodeJs on CentOs

Using npm:

```bash
$ curl -s https://deb.nodesource.com/setup_17.x | sudo bash
```

```bash
$ sudo yum install nodejs
```

```bash
$ sudo yum install nodejs npm
```

### Install NodeJs on Windows

Using npm:

NodeJs v.18.12.1 [Download Link]("https://nodejs.org/dist/v18.12.1/node-v18.12.1-x64.msi") (MSI)
## Run:

```bash
$ node webserver.js
```

⚠️ Don't forget open port 80 
## API Reference

```http
  GET /apitel/botxxx/action?xxx
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bot`     | `string` | **Required**. Your BotFather Token |
| `action`  | `string` | **Required**. Any [Action]("https://readme.so/editor") You Want |


