# Courier Capacity
Courier API to track the amount of capacity a courier has.

## Prerequisites
- [NodeJS](https://nodejs.org/en/)
- [Docker](https://docs.docker.com/engine/install/)

---


## Installation
Use either npm or yarn to install dependencies:
```
yarn
```
or
```
npm install
```

---

## Tests
To run the tests you can simply type:
```
yarn test
```
```
npm run test
```

---

## Docker
To run the api in Docker you will need to first build the image to run the container (also for deployments):

> ***NOTE: You'll need to generate some data use *`POST /courier/create`* to begin with.***

```
docker build -t courierapi:latest  .

docker run -d -p 3000:3000 courierapi:latest
```

---

## Example Requests

`POST /courier/create`
```
{
	"courier": "{{name}}",
	"max_capacity": "{{capacity}}"
}
```

`POST /courier/find`
```
{
  "courier": "{{name}}"
}
```

`POST /courier/update`
```
{
	"courier": "{{name}}",
	"max_capacity": "{{capacity}}"
}
```

`GET /courier/lookup`
```
{
	"capacity": "{{capacity}}"
}
```

---

## License
[MIT](https://choosealicense.com/licenses/mit/)