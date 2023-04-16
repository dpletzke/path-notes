const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const pathSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    photos: {
      type: [String],
      required: true,
      trim: true,
    },
    coverPhoto: {
      type: String,
      required: true,
      trim: true,
    },
    elevationGain: {
      type: Number,
      required: true,
      trim: true,
    },
    elevationLoss: {
      type: Number,
      required: true,
      trim: true,
    },
    elevationMin: {
      type: Number,
      required: true,
      trim: true,
    },
    elevationMax: {
      type: Number,
      required: true,
      trim: true,
    },
    distance: {
      type: Number,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      required: true,
      trim: true,
    },
    routeType: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
pathSchema.plugin(toJSON);
pathSchema.plugin(paginate);

/**
 * @typedef Path
 */
const Path = mongoose.model("Path", pathSchema);

module.exports = Path;
