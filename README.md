# PLAN.IT

Team Kirk aims to solve the issue of scheduling events in groups of people via  **[PLAN.IT](https://github.com/Kirk-Blue-Ocean/planit "PLAN.IT")**.

### Installation:

Clone the project and run the following commands:
1. `yarn` to download all of the required dependancies
2. `yarn dev` to deploy the application in development mode

Optionally, the following commands may be useful:
- `yarn seed` to populate some sample data into the database

### Running a Production Build:

1. Delete the contents of the `.next/` directory
2. Set `dev` to `false` in `server/app.js`
3. Run the client build:
```
$ yarn client-build
```
3. Run the server
```
$ yarn server
```

### API
------------
##### /api/events
GET - *api/events*
```javascript
options : {
	count: 1,
	where: {
		property: 'name',
		value: 'Tarvent'
	}
}
```
returns
```javascript
updates: {
    name: 'Tarvent',
    description: 'Hey everybody come to my event, it\'s going to be lit! ',
    owner: 'Tarrin',
    location: 'Tarrin\'s house',
  	...
}
```
PUT - */api/events*

```javascript
updates: [
    {
      where: { // previous value to search by
        property: '_id',
        value: '1'
      },
      what: { // new value
        method: '$set', <-- $push add to an array
        field: 'name',
        value: 'Canceled event'
      }
    },
	// ... include additional updates
  ]
```
returns
`200 // - if successful `

POST - */api/events*
```javascript
event: {
 	name: String,
 	description: String,
 	owner: String,
 	location: String,
 	duration: Number,
 	status: String,
 	time: String,
	 window: {
  		 start: String,
  		 end: String,
 	},
 	rsvps: []
}
```
returns `200 // - if successful`


