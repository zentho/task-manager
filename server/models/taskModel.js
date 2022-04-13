const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  name: {
    type: String,
  },
  status: {
    type: Boolean,
  },
});

module.exports = mongoose.model("task", taskSchema);
