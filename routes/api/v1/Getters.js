const { Router } = require('express')

const TryCatch = require('../../../utils/TryCatch')

const { getForum, getForumById, getForumByUser } = require('../../../controllers/api/forumController')
const {GetAllCourses} = require('../../../controllers/api/courseController')
const { getAllChallenges } = require('../../../controllers/api/challengeController')

const Getters = Router();


// forum
Getters.route("/forum")
  .get(TryCatch(getForum))

Getters.route('/forum/:id')
  .get(TryCatch(getForumById));

Getters.route('/forum/user/:id')
  .get(TryCatch(getForumByUser))


// Courses
Getters.route('/course').get(TryCatch(GetAllCourses))

  
  // challenges

// Getters.route('/Challenge')
//   .get(getAllChallenges)

// TODO: make this one later
// Getters.route('/Challenge/:id')
  // .get()

module.exports = Getters;