const mongoose = require("mongoose");

const { simpleData } = require("../data/data");

const datatype = {
  topicName: String,
  position: Number,
  questions: [
    {
      Done: Boolean,
      Bookmark: Boolean,
      Notes: String,
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
      default: simpleData[0],
    },
    matrix: {
      type: datatype,
      default: simpleData[1],
    },
    string: {
      type: datatype,
      default: simpleData[2],
    },
    searchAndSort: {
      type: datatype,
      default: simpleData[3],
    },
    linkedList: {
      type: datatype,
      default: simpleData[4],
    },
    binaryTrees: {
      type: datatype,
      default: simpleData[5],
    },
    bst: {
      type: datatype,
      default: simpleData[6],
    },
    greedy: {
      type: datatype,
      default: simpleData[7],
    },
    backTracking: {
      type: datatype,
      default: simpleData[8],
    },
    stacksAndQueues: {
      type: datatype,
      default: simpleData[9],
    },
    heap: {
      type: datatype,
      default: simpleData[10],
    },
    graph: {
      type: datatype,
      default: simpleData[11],
    },
    trie: {
      type: datatype,
      default: simpleData[12],
    },
    dynamicProgramming: {
      type: datatype,
      default: simpleData[13],
    },
    bitManipulation: {
      type: datatype,
      default: simpleData[14],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("progress", progressSchema);
