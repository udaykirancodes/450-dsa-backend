const mongoose = require("mongoose");

const { data } = require("../data/ProgressData");

const datatype = {
  topicName: String,
  position: Number,
  started: Boolean,
  doneQuestions: Number,
  questions: [
    {
      Topic: String,
      Problem: String,
      Done: Boolean,
      Bookmark: Boolean,
      Notes: String,
      URL: String,
      URL2: String,
    },
  ],
};

const progressSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    array: {
      type: datatype,
      default: data[0],
    },
    matrix: {
      type: datatype,
      default: data[1],
    },
    string: {
      type: datatype,
      default: data[2],
    },
    searchAndSort: {
      type: datatype,
      default: data[3],
    },
    linkedList: {
      type: datatype,
      default: data[4],
    },
    binaryTrees: {
      type: datatype,
      default: data[5],
    },
    bst: {
      type: datatype,
      default: data[6],
    },
    greedy: {
      type: datatype,
      default: data[7],
    },
    backTracking: {
      type: datatype,
      default: data[8],
    },
    stacksAndQueues: {
      type: datatype,
      default: data[9],
    },
    heap: {
      type: datatype,
      default: data[10],
    },
    graph: {
      type: datatype,
      default: data[11],
    },
    trie: {
      type: datatype,
      default: data[12],
    },
    dynamicProgramming: {
      type: datatype,
      default: data[13],
    },
    bitManipulation: {
      type: datatype,
      default: data[14],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("progress", progressSchema);
