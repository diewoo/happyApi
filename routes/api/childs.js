const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const mongoose = require("mongoose");

// Child model
const Child = require("../../models/Child");
const Father = require("../../models/Father");
// Load Input Validation
const validateRegisterInput = require("../../validation/child");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Childs Works" }));

// @route   GET api/childs
// @desc    Get childs
// @access  Public
router.get("/", (req, res) => {
  Child.find()
    .sort({ date: -1 })
    .then(child => res.json(child))
    .catch(err => res.status(404).json({ nochildsFound: "No Childs found" }));
});

// @route   GET api/childs/:id
// @desc    Get childs by id
// @access  Public
router.get("/:id", (req, res) => {
  Father.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No child found with that ID" })
    );
});

// @route   POST api/posts
// @desc    Create post
// @access  public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Child.findOne({
    identityDocumentNumber: req.body.identityDocumentNumber
  }).then(child => {
    if (child) {
      errors.message = "Ya existe el registro";
      return res.status(422).json(errors);
    } else {
      const avatar = gravatar.url(req.body.identityDocumentNumber, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const newChild = new Child({
        names: req.body.names,
        surname: req.body.surname,
        identityDocumentNumber: req.body.identityDocumentNumber,
        gender: req.body.gender,
        avatar
      });
      newChild
        .save()
        .then(child => res.json(child))
        .catch(err => console.log(err));
    }
  });
});

// @route   DELETE api/father/:id
// @desc    Delete father
// @access  public
router.delete("/:id", (req, res) => {
  Child.findById(req.params.id)
    .then(child => {
      // Delete
      child
        .remove()
      Father.findOne({ "childs.child": req.params.id }).then(father => {
        // Get remove index
        const removeIndex = father.childs
          .map(item => item.child.toString())
          .indexOf(req.params.id);
        // Splice comment out of array
        father.childs.splice(removeIndex, 1);
        father.save().then(father => res.json(father));
      });
    })
    .catch(err => res.status(404).json({ childNotFound: "No child found" }));
});
module.exports = router;
