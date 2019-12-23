const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const keys = require('../../config/keys');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');

// Load User model
const Father = require('../../models/Father');
const Child = require('../../models/Child');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Fathers Works' }));


// @route   GET api/fathers
// @desc    Get fathers
// @access  Public
router.get('/', (req, res) => {
	Father.find()
		.sort({ date: -1 })
		.then(fathers => res.json(fathers))
		.catch(err => res.status(404).json({ nofathersfound: 'No fathers found' }));
});

// @route   GET api/fathers/:id
// @desc    Get fathers by id
// @access  Public
router.get('/:id', (req, res) => {
	Father.findById(req.params.id)
		.then(father => res.json(father))
		.catch(err =>
			res.status(404).json({ nopostfound: 'No father found with that ID' })
		);
});

// @route   GET api/fathers/email
// @desc    Get fathers by id
// @access  Public
router.get('/email/findByEmail', (req, res) => {
	Father.findOne({ email: req.body.email }).then(father => {
	if (father) {
			return res.status(200).json(father);
	} else {
		res.status(404).json({ fatherNotFound: 'No father found' })
	}
	})		
});

// @route   POST api/posts
// @desc    Create post
// @access  public
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	Father.findOne({ email: req.body.email }).then(father => {
		if (father) {
			errors.email = 'Ya existe el correo';
			return res.status(400).json(errors);
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			});

			const newFather = new Father({
				names: req.body.names,
				surname: req.body.surname,
				email: req.body.email,
				identityDocumentNumber: req.body.identityDocumentNumber,
				phoneNumber: req.body.phoneNumber,
				gender: req.body.gender,
				birthday: req.body.birthday,
				specialOffer: req.body.specialOffer,
				line: req.body.line || '',
				district: req.body.district || '',
				avatar
			});
			newFather
				.save()
				.then(father => res.json(father))
				.catch(err => console.log(err));

		}
	});
});

// @route   DELETE api/father/:id
// @desc    Delete father
// @access  public
router.delete(
	'/:id',
	(req, res) => {

		Father.findById(req.params.id)
			.then(father => {
				// Delete
				father.remove().then(() => res.json({
					success: true,
					message: "Borrado con éxito"
				}));
			})
			.catch(err => res.status(404).json({ fatherNotFound: 'No father found' }));
	}
);

// @route   POST api/fathers/child/:id
// @desc    Add child to father
// @access  public
router.post(
	'/child/:id',
	(req, res) => {
		//   const { errors, isValid } = validatePostInput(req.body);

		//   // Check Validation
		//   if (!isValid) {
		// 	// If any errors, send 400 with errors object
		// 	return res.status(400).json(errors);
		//   }

		Father.findById(req.params.id)
			.then(father => {
				const newChild = {
					names: req.body.names,
					identityDocumentNumber: req.body.identityDocumentNumber,
				};
				console.log(newChild)

				// Add to comments array
				father.childs.unshift(newChild);

				// Save
				father.save().then(father => res.json(father));
			})
			.catch(err => res.status(404).json({ fathernotfound: 'No father found' }));
	}
);


// @route   POST api/profile
// @desc     edit father profile
// @access  Private
router.put(
	'/:id',
	(req, res) => {
		const { errors, isValid } = validateRegisterInput(req.body);

		// Check Validation
		if (!isValid) {
			// Return any errors with 400 status
			return res.status(400).json(errors);
		}

		// Get fields
		const profileFields = {};
		if (req.body.names) profileFields.names = req.body.names;
		if (req.body.surname) profileFields.surname = req.body.surname;
		if (req.body.identityDocumentNumber) profileFields.identityDocumentNumber = req.body.identityDocumentNumber;
		if (req.body.email) profileFields.email = req.body.email;
		if (req.body.gender) profileFields.gender = req.body.gender;
		if (req.body.birthday) profileFields.birthday = req.body.birthday;
		if (req.body.specialOffer)
			profileFields.specialOffer = req.body.specialOffer;
		if (req.body.line) profileFields.line = req.body.line;
		if (req.body.district) profileFields.district = req.body.district;



		Father.findByIdAndUpdate(req.params.id, { $set: profileFields }, function (err, product) {
			if (err) return next(err);
			res.send('Father udpated');
		});


	}
);
module.exports = router;