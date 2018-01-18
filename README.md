# Service Consuption POC

## Instalation
```sh
$ git clone
$ cd all-apis
$ npm install
$ node index.js
```

```JSON
{
  "name": "rest0",
  "sevice": "rest",
  "options": {
    "method": "post",
    "url": "http://localhost",
    "port": 8802,
    "uri": "login",
    "httpOptions": {}
  }
  "request": {
    "username": "test0",
    "password": "test"
  },
  "response": ["id", "username", "password", "created_at"]
}
```