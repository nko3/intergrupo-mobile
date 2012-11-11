var utils = require('../utils/utils');

var CanvasSchema = new Schema({
  title: { type: String },
  public_id: { type: String, default: utils.generateId(72), required: true, index: { unique: true, sparse: true }},
  created_at: { type: Date, default: Date.now }
});

mongoose.model('Canvas', CanvasSchema);