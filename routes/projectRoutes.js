const express = require('express');
const db = require('../data/helpers/projectModel');
const router = express.Router();

//C
//create new project
router.post("/", async (req, res) => {
  try {
    const project = await db.insert(req.body);
    if (project.name && project.description) {
      res.status(201).json(project);
    } else {
      res
        .status(400)
        .json({
          message: "Please provide a name and description for the project"
        });
    } //else statement does not run in case of error, goes straight to catch, why?
  } catch (error) {
    res.status(500).json({
      message: "Error adding the project"
    });
  }
});

//R
//get all projects
router.get('/', async (req, res) => { 
  try {
      const projects = await db.get();
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving the projects',
      });
    }
});
//get project by id
router.get('/:id', async (req, res) => { 
  try {
      const project = await db.get(req.params.id)
      if (project) {
          res.status(200).json(project);
      } else {
          res.status(404).json({ message: "Theproject with the specified ID does not exist." })
      }
  } catch (error) {
      res.status(500).json({ error: "The project information could not be retrieved." });
  }
});
//U
//update post by ID
router.put('/:id', async (req, res) => {
  try {
      const project = await db.update(req.params.id, req.body);
      if (project) {
        res.status(200).json({id: req.params.id, ...req.body});
      } else {
        res.status(404).json({ message: 'The project with that ID could not be found' });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Error updating the specified project',
      });
    }
});
//D
router.delete('/:id',  async (req, res) => {
  try {
      const count = await db.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'The project has been deleted' });
      } else {
        res.status(404).json({ message: 'The project could not be found' });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Error removing the project',
      });
    }
});
module.exports = router;