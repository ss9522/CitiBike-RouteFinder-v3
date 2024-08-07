const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Route name is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  waypoints: {
    type: [
      {
        lat: {
          type: Number,
          required: true,
          min: -90,
          max: 90,
        },
        lng: {
          type: Number,
          required: true,
          min: -180,
          max: 180,
        },
      },
    ],
    validate: {
      validator: function (array) {
        return array.length > 0;
      },
      message: 'Route must have at least one waypoint',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updatedAt` on each save
routeSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Static method to find routes by user
routeSchema.statics.findByUser = function (userId) {
  return this.find({ user: userId });
};

// Instance method to add a waypoint
routeSchema.methods.addWaypoint = function (lat, lng) {
  this.waypoints.push({ lat, lng });
  return this.save();
};

// Instance method to remove a waypoint by index
routeSchema.methods.removeWaypoint = function (index) {
  if (index >= 0 && index < this.waypoints.length) {
    this.waypoints.splice(index, 1);
    return this.save();
  }
  throw new Error('Waypoint index out of bounds');
};

// Virtual for formatted created date
routeSchema.virtual('formattedCreatedAt').get(function () {
  return this.createdAt.toDateString();
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
