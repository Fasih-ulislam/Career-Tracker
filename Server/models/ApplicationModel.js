const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, //
    companyName: { type: String, required: true }, //
    positionTitle: { type: String, required: true }, //
    location: { type: String }, //
    applicationDate: { type: Date, required: true }, //
    applicationStatus: {
      type: String,
      enum: [
        "Applied",
        "Under Review",
        "Phone Interview",
        "Final Interview",
        "Technical Interview",
        "Offer Received",
        "Rejected",
        "Withdrawn",
      ],
      default: "Applied",
    }, //
    source: { type: String }, //
    jobType: {
      type: String,
      enum: ["Internship", "Full-Time", "Part-Time", "Freelance"],
    }, //
    jobURL: { type: String }, //
    resumeUsed: { type: mongoose.Schema.Types.ObjectId, ref: "Resume" },
    notes: { type: String }, //
    salaryMin: {
      type: Number,
      required: false,
      min: 0,
    }, //
    salaryMax: {
      type: Number,
      required: false,
      min: 0,
    }, //
    salaryCurrency: {
      type: String,
      enum: ["USD", "EUR", "PKR", "Other"],
      default: "PKR",
    }, //
    salaryPeriod: {
      type: String,
      enum: ["year", "month", "week", "day", "hour"],
      default: "month",
    }, //
  },

  {
    timestamps: true,
  }
);

applicationSchema.pre("save", function (next) {
  if (!this.salaryMin && !this.salaryMax) {
    this.salaryCurrency = undefined;
    this.salaryPeriod = undefined;
  }
  next();
});

module.exports = mongoose.model("Application", applicationSchema);
