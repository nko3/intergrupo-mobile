var CanvasSchema = new Schema({
  title: { type: String },
  public_id: { type: String, default: generateId(8), unique: true },
  created_at: { type: Date, default: Date.now }
});

mongoose.model('Canvas', CanvasSchema);

function generateId(length) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

  if (! length) {
    length = Math.floor(Math.random() * chars.length);
  }

  var alias = '';
  for (var i = 0; i < length; i++) {
    alias += chars[Math.floor(Math.random() * chars.length)];
  }
  return alias;
}