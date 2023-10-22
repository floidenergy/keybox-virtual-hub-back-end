const Challenge = require('../../model/challengeModel')


const getAllChallenges = async (req, res) => {
  try {
    const getTheChallenge = await Challenge.find()
    res.json(getTheChallenge)
  } catch (error) {
    throw new Error(error)
  }
}


module.exports = { getAllChallenges }