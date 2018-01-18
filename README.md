# Service Consuption POC

## Instalation
```sh
$ git clone
$ cd all-apis
$ npm install
$ node index.js
```

## Usage
All the service type are created in 
POST /resources

 - Creating a new REST API service

```json
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
 - Creating a new SOAP request service

```json
{
  "name": "soap0",
  "sevice": "soap",
  "options": {
    "method": "SI_WF_AuthenticationFunction_SYNC_OUT",
    "wsld": "c:\folder\file.wsdl"
  }
  "request": {
    "username": "MOBI-DEV",
    "password": "test"
  },
  "response": ["RETURN", "USER", "DATA"]
}
```

 - Creating a new database service
```json
{
  "name": "mongo0",
  "service": "mongodb",
  "options": {
    "modelName": "User",
    "method": "findOne",
    "model": {
      "username": "String",
      "password": "String",
      "email": "String"
    },
    "query": {
      "name": "test0"
    }
  },
  "request": {
    "username": "user0",
    "password": "test"
  },
  "response": ["_id", "name", "email"]
}
```

## Retriving data:

GET /resourses/<resource name>

Should return an JSON with the same format of the creation JSON "resource" item.
