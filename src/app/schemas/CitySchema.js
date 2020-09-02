import mongoose, { Schema } from 'mongoose';

const CitySchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    estadoId: {
      type: Schema.Types.ObjectId,
      ref: 'States',
    },
  },
  {
    timestamps: true,
  }
);

const City = mongoose.model('Cities', CitySchema);

export { City };
