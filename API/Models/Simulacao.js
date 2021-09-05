import { model, Schema } from 'mongoose';

const simulacao = new Schema(
    {
            cpf: {type: String, required: true},
            uf: {type: String, required: true},
            nasc: {type: String, required: true},
            valor: {type: Number, min: 50000},
            num_parcelas: {type: Number, max: 360},
            valor_parcela: {type: Number, required: true},
            juros: {type: Number, required: true}
    }
);

const Simulacao = model('Simulacao', simulacao, 'Simulacao');

export { Simulacao };
