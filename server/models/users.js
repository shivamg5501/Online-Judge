import mongoose from "mongoose";

// Schema for activity tracking
const ActivitySchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., "PROBLEM_SOLVED", "CONTEST_PARTICIPATED"
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
  language: { type: String },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Schema for contest performance
const ContestPerformanceSchema = new mongoose.Schema({
  contestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contest' },
  rating: { type: Number, default: 0 },
  rank: { type: Number },
  problemsSolved: { type: Number, default: 0 },
  participationDate: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], default: "Other" },
  imageUrl: { type: String, default: null },
  bio: { type: String, default: "" },
  
  // Problem solving statistics
  problemsSolved: { type: Number, default: 0 },
  
  // Contest and ranking related fields
  contestRating: { type: Number, default: 0 },
  globalRank: { type: Number },
  contestHistory: [ContestPerformanceSchema],
  
  // Social and engagement metrics
  reputation: { type: Number, default: 0 },
  
  // Activity tracking
  recentActivity: [ActivitySchema],
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true // Automatically manage updatedAt
});

// Virtual field for calculating rank tier based on contest rating
UserSchema.virtual('rankTier').get(function() {
  if (this.contestRating >= 2000) return 'Master';
  if (this.contestRating >= 1800) return 'Expert';
  if (this.contestRating >= 1600) return 'Advanced';
  return 'Beginner';
});

// Method to add new activity
UserSchema.methods.addActivity = async function(activityData) {
  this.recentActivity.unshift(activityData);
  if (this.recentActivity.length > 10) { // Keep only recent 10 activities
    this.recentActivity.pop();
  }
  return this.save();
};

// Method to update contest rating
UserSchema.methods.updateContestPerformance = async function(contestData) {
  this.contestHistory.push(contestData);
  this.contestRating = contestData.rating;
  return this.save();
};

const User = mongoose.model("User", UserSchema);
export default User;