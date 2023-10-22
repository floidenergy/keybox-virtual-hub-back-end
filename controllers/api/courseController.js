const Course = require('../../model/courseModel')

const getCourseById = async (req, res) => {
  const { id } = req.params
  try {
    const course = await Course.findById(id)
    res.json(course)
  } catch (error) {
    next(error)
  }
}

const GetAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate('teacher')

    const teachersEdited = []

    courses.forEach(course => {

      if (teachersEdited.find(teacherID => teacherID === course.teacher._id))
        return course

      // deleting sensitive information
      const teacherObject = course.teacher.toObject();

      delete teacherObject.hash
      delete teacherObject.salt
      delete teacherObject.status
      delete teacherObject.email
      delete teacherObject.mobile
      delete teacherObject.points
      delete teacherObject.status

      teacherObject.thumb = `${process.env.SERVER_LINK}/public/user/${course.teacher.thumb}`
      course.teacher = teacherObject;

      teachersEdited.push(course.teacher._id);
      return course
    })
    res.json(courses)
  } catch (error) {
    next(error)
  }
}

module.exports = { getCourseById, GetAllCourses }