const Progress = require("../models/progress.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");

// Get User Progress Based on AuthToken
const getUserProgress = async (req, res) => {
  try {
    const userid = req.user._id;
    const { position, questionPosition } = req.body;
    const progress = await Progress.findOne({ userid: userid });
    const data = [
      progress.array,
      progress.matrix,
      progress.string,
      progress.searchAndSort,
      progress.linkedList,
      progress.binaryTrees,
      progress.bst,
      progress.greedy,
      progress.backTracking,
      progress.stacksAndQueues,
      progress.heap,
      progress.graph,
      progress.trie,
      progress.dynamicProgramming,
      progress.bitManipulation,
    ];
    res.status(200).json(new ApiResponse(200, data, "Success"));
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json(new ApiError(500, [], "Internal Server Error : " + error.message));
  }
};
// Update User Progress Based on AuthToken
const updateUserProgress = async (req, res) => {
  try {
    const userid = req.user._id;
    const { position, questionPosition } = req.body;
    const progress = await Progress.findOne({ userid: userid });
    progress[topics[position]].questions[questionPosition].Done = true;
    const saved = await progress.save();
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          saved[topics[position]].questions[questionPosition],
          "Success"
        )
      );
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json(new ApiError(500, [], "Internal Server Error : " + error.message));
  }
};

module.exports = {
  getUserProgress,
  updateUserProgress,
};
