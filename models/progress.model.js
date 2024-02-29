const mongoose = require("mongoose");

const { progressData } = require("../data/data");

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
      default: progressData[0],
    },
    matrix: {
      type: datatype,
      default: progressData[1],
    },
    string: {
      type: datatype,
      default: progressData[2],
    },
    search_sort: {
      type: datatype,
      default: progressData[3],
    },
    linked_list: {
      type: datatype,
      default: progressData[4],
    },
    binary_trees: {
      type: datatype,
      default: progressData[5],
    },
    bst: {
      type: datatype,
      default: progressData[6],
    },
    greedy: {
      type: datatype,
      default: progressData[7],
    },
    backtracking: {
      type: datatype,
      default: progressData[8],
    },
    stacks_queues: {
      type: datatype,
      default: progressData[9],
    },
    heap: {
      type: datatype,
      default: progressData[10],
    },
    graph: {
      type: datatype,
      default: progressData[11],
    },
    trie: {
      type: datatype,
      default: progressData[12],
    },
    dynamic_programming: {
      type: datatype,
      default: progressData[13],
    },
    bit_manipulation: {
      type: datatype,
      default: progressData[14],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("progress", progressSchema);
