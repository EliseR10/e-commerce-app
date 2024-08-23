const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { getAllFromDatabase, getFromDatabaseById, 
        addToDatabase, updateInstanceInDatabase,
        deleteFromDatabasebyId, deleteAllFromDatabase }  = require('./server/db.js');

module.exports = app;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middware for parsing request bodies here:
app.use(bodyParser.json());

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
const checkMillionDollarIdea = require('./server/checkMillionDollarIdea.js');
const mountRouter = express.Router();

app.use('/api', mountRouter);

//Routes
/* /API/MINIONS */

/* Retrieve minions */
app.get('/api/minions', (req, res, next) => {
const getMinions = getAllFromDatabase('minions');

if (getMinions) {
  res.send(getMinions);
} else {
  res.status(404).send('Minions not found!');
}
});

/* Create a new minion */
app.post('/api/minions', (req, res, next) => {
const createMinions = addToDatabase('minions', req.body);

if (createMinions) {
  res.status(201).send(createMinions); //send the status and the resource back
} else {
  res.status(404).send("Minions not created!");
}
});

/* Retrieve a specific minion ID */
app.get('/api/minions/:minionId', (req, res, next) => {
const getMinionsId = getFromDatabaseById('minions', req.params.minionId);

if (getMinionsId) {
  res.send(getMinionsId);
} else {
  res.status(404).send("Minions ID not found.")
}
});

/* Update a specific minion ID */
app.put('/api/minions/:minionId', (req, res, next) => {
const updateMinionsId = updateInstanceInDatabase('minions', req.body);

if (updateMinionsId) {
  res.send(updateMinionsId);
} else {
  res.status(404).send("Minions ID not updated!");
}
});

/* Delete a specific minion ID */
app.delete('/api/minions/:minionId', (req, res, next) => {
  const deleteMinionsId = deleteFromDatabasebyId('minions', req.params.minionId);

  if (deleteMinionsId) {
    res.status(204).send(deleteMinionsId);
  } else {
    res.status(404).send("Minions ID not deleted.")
  }
});

/* /API/IDEAS */
/* Retrieve all ideas */
app.get('/api/ideas', (req, res, next) => {
  const getIdeas = getAllFromDatabase("ideas");

  if (getIdeas) {
    res.send(getIdeas);
  } else {
    res.status(404).send('Ideas not found!');
  }
});

/* Create a new idea */
app.post('/api/ideas', checkMillionDollarIdea, (req, res, next) => {
  const createIdeas = addToDatabase("ideas", req.body);

  if (createIdeas) {
    res.status(201).send(createIdeas);
  } else {
    res.status(404).send("Ideas not updated!");
  }
});

/* Retrieve a specific idea by ID */
app.get('/api/ideas/:ideaId', (req, res, next) => {
  const getIdeasId = getFromDatabaseById("ideas", req.params.ideaId);

  if (getIdeasId) {
    res.send(getIdeasId);
  } else {
    res.status(404).send("Ideas ID not found.")
  }
});

/* Updated a specific idea by ID */
app.put('/api/ideas/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    //Check if ideadId is numeric
    const ideaId = req.params.ideaId; //extract ideaId from request parameters

    //Validate that data is numeric
    if (isNaN(parseInt(ideaId, 10))) {
      res.status(404).send("Idea Id not found");
    }

    //Check if the idea exist in the database
    const existingIdea = getFromDatabaseById("ideas", ideaId);
    if (!existingIdea) {
      res.status(404).send("Idea not found"); //Return 404 if ID does not exist
    }

  //If it exist, update it
  req.body.id = ideaId;
  const updateIdeasId = updateInstanceInDatabase('ideas', req.body);

  if (updateIdeasId) {
    res.status(201).send(updateIdeasId);
  } else {
    res.status(404).send("Ideas ID not updated!");
  }
});

/* Delete a specific idea by ID */
app.delete('/api/ideas/:ideaId', (req, res, next) => {
  const deleteIdeasId = deleteFromDatabasebyId("ideas", req.params.ideaId);

  if (deleteIdeasId) {
    res.status(204).send(deleteIdeasId);
  } else {
    res.status(404).send("Ideas ID not deleted.")
  }
});

/* /API/MEETINGS */
/* Retrieve all meetings */
app.get('/api/meetings', (req, res, next) => {
  const getMeetings = getAllFromDatabase("meetings");

  if (getMeetings) {
    res.send(getMeetings);
  } else {
    res.status(404).send();
  }
});

//Initialize meeting ID counter if not already present
let meetingIdCounter = 1;

const creatingMeeting = () => {
  //Predefined options for the meeting note
  const options = ['Discussion about', 'Meeting for', 'Brainstorm'];
  const option = options[Math.floor(Math.random() * options.length)];

  //Generate a future date
  const date = new Date();
  date.setDate(date.getDate() + 1); //Set the day to one day in the future

  //Create the meeting object
  return {
    id: `${meetingIdCounter++}`,
    time: date.toTimeString().slice(0, 5), // Extract HH:MM format
    date: date,
    day: date.toDateString(), // Get the full day string (e.g., "Tue Aug 22 2024")
    note: `${option} Important Company Discussion`, // Static text for the note
  }
}

/* Create a new meeting */
app.post('/api/meetings', (req, res, next) => {
  try {
  const createMeetings = addToDatabase("meetings", creatingMeeting());

  if (createMeetings) {
    res.status(201).send(createMeetings);
  } else {
    res.status(404).send({error: "Failed to create meeting. Invalid data"});
  }
  } catch (error) {
    console.log("Error creating meeting: ", error);
    res.status(500).send({error: "Internal Server Error"});
}
});

/* Delete all meetings */
app.delete('/api/meetings', (req, res, next) => {
  const deleteMeetings = deleteAllFromDatabase("meetings", req.body);

  if (deleteMeetings) {
    res.status(204).send(deleteMeetings);
  } else {
    res.status(404).send()
  }
});

// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
app.listen(PORT, () => {
  console.log(`Port is listening! ${PORT}`);
})
}
