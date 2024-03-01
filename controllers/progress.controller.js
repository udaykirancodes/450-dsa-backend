const Progress = require("../models/progress.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { topics } = require("../utils/constants");
const { data } = require("../data/QuestionData");

const questions = data;

// Get User Progress Based on AuthToken
const getUserProgress = async (req, res) => {
  try {
    // take the user  id from from middleware
    const userid = req.user._id;
    // get the user progress
    const progress = await Progress.findOne({ userid: userid });
    if (!progress) {
      return res.status(400).json(new ApiError(400, [], "Not Progress Found"));
    }
    // generate data by combining questions and progress
    const data = topics.map((topic, index) => {
      return {
        topicName: questions[index].topicName,
        position: questions[index].position,
        started: questions[index].started,
        doneQuestions: questions[index].doneQuestions,
        questions: questions[index].questions.map((q, nested_index) => {
          return {
            Topic: questions[index].topicName,
            Problem: questions[index].questions[nested_index].Problem,
            Done: progress[topics[index]].questions[nested_index].Done,
            Bookmark: progress[topics[index]].questions[nested_index].Bookmark,
            Notes: progress[topics[index]].questions[nested_index].Notes,
            URL: questions[index].questions[nested_index].URL,
            URL2: questions[index].questions[nested_index].URL2,
          };
        }),
      };
    });
    res.status(200).json(new ApiResponse(200, data, "Success"));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiError(500, [], "Internal Server Error : " + error.message));
  }
};

// Mark Question as Done | Un-Done
const handleToogleMarkDone = async (req, res) => {
  try {
    const userid = req.user._id;
    const { position, questionPosition, mark } = req.body;
    // find user's progress
    const progress = await Progress.findOneAndUpdate({ userid });
    // go to topic and update question fields
    progress[topics[position]].questions[questionPosition].Done = mark;
    await progress.save();
    if (mark) {
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Question Marked as Done"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Question Marked as Not Done"));
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json(new ApiError(500, [], "Internal Server Error : " + error.message));
  }
};
// Mark Question as BookMarked | Un-BookMark
const handleToogleBookMark = async (req, res) => {
  try {
    const userid = req.user._id;
    const { position, questionPosition, mark } = req.body;
    // find user's progress
    const progress = await Progress.findOneAndUpdate({ userid });
    // go to topic and update question fields

    progress[topics[position]].questions[questionPosition].Bookmark = mark;

    await progress.save();
    if (mark) {
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Question Marked as Bookmarked"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Question Marked as Not Bookmarked"));
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json(new ApiError(500, [], "Internal Server Error : " + error.message));
  }
};
// Update Or Add Notes to a question
const handleUpdateNotes = async (req, res) => {
  try {
    const userid = req.user._id;
    const { position, questionPosition, notes } = req.body;
    // find user's progress
    const progress = await Progress.findOneAndUpdate({ userid });
    // go to topic and update question fields
    progress[topics[position]].questions[questionPosition].Notes = notes;
    await progress.save();
    return res.status(200).json(new ApiResponse(200, {}, "Notes Updated"));
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json(new ApiError(500, [], "Internal Server Error : " + error.message));
  }
};

module.exports = {
  getUserProgress,
  handleToogleMarkDone,
  handleToogleBookMark,
  handleUpdateNotes,
};
