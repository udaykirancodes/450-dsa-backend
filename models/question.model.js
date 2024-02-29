const mongoose = require("mongoose");

const { data } = require("../data/QuestionData");

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

const questionSchema = new mongoose.Schema(
  {
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
    search_sort: {
      type: datatype,
      default: data[3],
    },
    linked_ist: {
      type: datatype,
      default: data[4],
    },
    binary_trees: {
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
    backtracking: {
      type: datatype,
      default: data[8],
    },
    stacks_queues: {
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
    dynamic_programming: {
      type: datatype,
      default: data[13],
    },
    bit_manipulation: {
      type: datatype,
      default: data[14],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("question", questionSchema);
