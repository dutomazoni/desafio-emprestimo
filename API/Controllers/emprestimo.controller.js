import {Emprestimo, Simulacao} from '../Models';

let emprestimo_routes = {};

emprestimo_routes.get_standard_message = async (req, res) => {
    try {
        return res.status(200).json({ message: "Fullstack Challenge" });
    } catch (error) {
        return res.status(400).json({});
    }
};

emprestimo_routes.post_emprestimo = async (req, res) => {
    try {
        let new_emprestimo = req.body
        let juros, valor_parcela;

        switch (new_emprestimo.uf) {
            case 'ES':
                juros = 0.011
                break;
            case 'MG':
                juros = 0.01
                break;
            case 'SP':
                juros = 0.008
                break;
            case 'RJ':
                juros = 0.009
                break;
            default:
                return ("UF não encontrada!")
        }

        valor_parcela = (new_emprestimo.valor * ( (1 + juros) ** new_emprestimo.num_parcelas))/new_emprestimo.num_parcelas
        new_emprestimo.valor_parcela = valor_parcela
        new_emprestimo.juros = juros
        await Simulacao.create(new_emprestimo)

        return res.status(201).json({ valor_parcela: valor_parcela, emprestimo: new_emprestimo });
    } catch (error) {
        return res.status(401).json({error});
    }
};
emprestimo_routes.post_resultado = async (req, res) => {
    try {
        let new_result = req.body;
        await Emprestimo.create(new_result)
        return res.status(201).json({ efetivado: new_result });
    } catch (error) {
        return res.status(401).json({error});
    }
};

export { emprestimo_routes };
