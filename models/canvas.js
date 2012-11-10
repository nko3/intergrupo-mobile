var CanvasSchema = new Schema({
  title: { type: String },
  public_id: { type: String },
  created_at: { type: Date, default: Date.now }
});

mongoose.model('Canvas', CanvasSchema);