import mongoose from 'mongoose';

const StateSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    abreviacao: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const State = mongoose.model('States', StateSchema);

export { State };
