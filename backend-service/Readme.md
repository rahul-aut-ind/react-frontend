### Provides data from MongoDB as a backend service

#### Steps to get it working:
Install MongoDB community edition in local 
Start MongoDB as a service or start process
Jump to Mongo shell and use a new database called `workouts`
Navigate to https://json-generator.com/# and use below snippet to generate data for the service
`[
'{{repeat(1, 7)}}',
{
isAvailable: '{{bool()}}',
image: 'https://picsum.photos/150/200',
pName: '{{company().toUpperCase()}} Workout',
desc: '{{lorem(1, "paragraphs")}}',
date: function (tags) {
var months = ['January', 'February', 'March','April','May','June','July','August','September','October','November','December'];
return months[tags.integer(0, months.length - 1)];
},
category: function (tags) {
var categories = ['Dance', 'Yoga', 'Meditation','Cardio','Walking','Stretching'];
return categories[tags.integer(0, categories.length - 1)];
}
}
]`

Copy the generated data and using below command add to mongo 
`db.workouts.insertMany(<copied data from above step>)`

Once above step is completed, open a terminal & issue command `node server.js`

to check if everything is fine, open a terminal & issue below command or check the below endpoint in postman.
`curl "http://localhost:5000/workouts/all"`

Have a wonderful day!!