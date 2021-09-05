import { model, Schema } from 'mongoose';

const emprestimo = new Schema(
    {
        cpf: {type: String, required: true},
        valor_parcela: {type: Number, required: true},
        valor_requerido: {type: Number, required: true},
        valor_total: {type: Number, required: true},
        num_parcelas: {type: Number, required: true},
        juros: {type: Number, required: true}
    }
);

const Emprestimo = model('Emprestimo', emprestimo, 'Emprestimo');

export { Emprestimo };
