const { Router } = require('express')

const { getForum, getForumById, getForumByUser } = require('../../../controllers/api/forumController')
const {GetAllCourses} = require('../../../controllers/api/courseController')
const { getAllChallenges } = require('../../../controllers/api/challengeController')

const Getters = Router();


// forum
Getters.route("/forum")
  .get(getForum)

Getters.route('/forum/:id')
  .get(getForumById);

Getters.route('/forum/user/:id')
  .get(getForumByUser)


// Courses
Getters.route('/course').get(GetAllCourses)

  
  // challenges

// Getters.route('/Challenge')
//   .get(getAllChallenges)

// TODO: make this one later
// Getters.route('/Challenge/:id')
  // .get()

module.exports = Getters;