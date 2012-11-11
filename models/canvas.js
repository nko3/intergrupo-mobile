var CanvasSchema = new Schema({
  title: { type: String },
  public_id: { type: String, required: true, index: { unique: true, sparse: true }},
  postits: { type: Schema.Types.Mixed, default: {} },
  created_at: { type: Date, default: Date.now }
});

CanvasSchema.statics.updatePostits = function(canvasId, postits, cb) {
  this.update({ public_id: canvasId }, { $set: { postits: postits } }, { upsert: true }, function(err) {
    if(err) {
      cb(false);
      throw new Error(err);
    }
    cb(true);
  });
};

mongoose.model('Canvas', CanvasSchema);
