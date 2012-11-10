var ChatSchema = new Schema({
  canvas: { type: Schema.ObjectId, ref: 'Canvas' },
  created_at: { type: Date, default: Date.now }
});