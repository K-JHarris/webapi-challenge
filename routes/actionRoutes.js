const express = require("express");
const router = express.Router();
const db = require("../data/helpers/actionModel");

//C
//Create new action on project by ID
router.post("/", async (req, res) => {
  try {
    const action = await db.insert(req.body);
    if (action.project_id && action.description && action.notes) {
      res.status(201).json(action);
    } else {
      res.status(400).json({
        message: "Please provide an id, description and notes for the action"
      });
    } //else statement does not run in case of error, goes straight to catch, why?
  } catch (error) {
    res.status(500).json({
      message: "Error adding the action"
    });
  }
});
//R
//this is in projectRoutes.js line 28

//U
//update action by ID
router.put("/:id", async (req, res) => {
  try {
    const action = await db.update(req.params.id, req.body);
    if (action) {
      res.status(200).json({ id: req.params.id, ...req.body });
    } else {
      res
        .status(404)
        .json({ message: "The action with that ID could not be found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating the specified action"
    });
  }
});
//D
//delete an action
router.delete("/:id", async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The action has been deleted" });
    } else {
      res.status(404).json({ message: "The action could not be found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error removing the action"
    });
  }
});

module.exports = router;
