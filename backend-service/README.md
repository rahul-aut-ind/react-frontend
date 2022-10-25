### Provides data from MongoDB as a backend service

-------
### Steps to get it working:
Install MongoDB community edition in local 

Start MongoDB as a service or start process

Jump to Mongo shell and use a new database called `workouts`

Navigate to https://json-generator.com/# and use below snippet to generate data for the service

`
[
'{{repeat(600, 7)}}',
{
isAvailable: '{{bool()}}',
image: 'https://picsum.photos/150/200',
pName: '{{company().toUpperCase()}} {{company().toUpperCase()}} Workout',
desc: '{{lorem(1, "paragraphs")}}',
date: function (tags) {
var months = [new Date("2022-01-01"), new Date("2022-02-01"),new Date("2022-03-01"),new Date("2022-04-01"),new Date("2022-05-01"),new Date("2022-06-01"),new Date("2022-07-01"),new Date("2022-08-01"),new Date("2022-09-01"),new Date("2022-10-01"),new Date("2022-11-01"),new Date("2022-12-01")];
return months[tags.integer(0, months.length - 1)];
},
category: function (tags) {
var categories = ['Dance', 'Yoga',
'Meditation','Cardio','Walking','Stretching','Jogging','Mindful Breathing'];
return categories[tags.integer(0, categories.length - 1)];
}
}
]
`

Copy the generated data and using below command add to mongo 
`db.workouts.insertMany(<copied data from above step>)`

Once above step is completed, open a terminal & issue command `node server.js`

to check if everything is fine, open a terminal & issue below command or check the below endpoint in postman.
`curl "http://localhost:5000/workouts/all"`

Have a wonderful day!!