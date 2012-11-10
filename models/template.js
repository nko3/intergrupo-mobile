var TemplateSchema = new Schema({
  name: { type: String },
  type: { type: String },
  template: { type: Schema.Types.Mixed }
});

mongoose.model('Template', TemplateSchema);