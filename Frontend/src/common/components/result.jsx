import {Button, makeStyles, Typography} from "@material-ui/core";
import {format, addMonths} from "date-fns";
import React, {useState} from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

const useStyles = makeStyles({
    button: {margin: '2vh ', display:'flex', color: '#ecf0f1', background:'#3f51b5',
        '&:hover': {
            backgroundColor: '#2036bd',
            color: '#ecf0f1',
        }},
    title: { margin: '5vh ', color: '#041eba', justifyContent: 'center'},
    value: { margin: '5vh ', color: '#000000', justifyContent: 'center'},
});

export default (props) => {
    const classes = useStyles()
    let base_url = process.env.REACT_APP_API_URL || 'http://localhost:5001';
    let [loan, setLoan] = useState(props.props);
    let parcelas = []

    for(let i = 0 ; i < loan.num_parcelas; i++){
        parcelas.push(format(addMonths(new Date() ,i+1), 'dd/MM/yyyy'))
    }

    console.log(parcelas)
    const setResult =  async (parameters) => {
        axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
        await axios.post(base_url + "/finalizar", parameters)
            .then((response) => {
                toast.success('Empréstimo efetivado com sucesso!')
            })
    }

    const handleEfetivar = async (props) => {
        console.log(props)
        let resultado = {
            cpf: props.cpf,
            valor_parcela: props.valor_parcela,
            valor_requerido: props.valor,
            valor_total: props.valor_parcela * props.num_parcelas,
            num_parcelas: props.num_parcelas,
            juros: props.juros
        }
        await setResult(resultado)
    }

    return (
        <div className={'d-flex flex-column'}>
            <ToastContainer autoClose={2000} />
            <Typography variant="h4" className={classes.title}><strong>Veja a simulação do empréstimo antes de efetivar:</strong></Typography>
            <div className={'d-flex flex-row justify-content-center'} >
                <div >
                    <Typography variant="h5" className={classes.title}>Valor requerido:</Typography>
                    <Typography className={classes.value}><strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(loan.valor)}</strong></Typography>
                </div>
                <div >
                    <Typography variant="h5" className={classes.title}>Taxa de juros:</Typography>
                    <Typography className={classes.value}><strong>{(loan.juros*100).toFixed(2)}%</strong></Typography>
                </div>
                <div >
                    <Typography variant="h5" className={classes.title}>Pagar em:</Typography>
                    <Typography className={classes.value}><strong>{loan.num_parcelas} meses</strong></Typography>
                </div>
            </div>
            <div>
                <Typography variant="h5" className={classes.title}>Projeção das parcelas:</Typography>
            </div>
            <div className={'d-flex flex-column justify-content-center'}>
                {parcelas.map((parcela) => {
                        return (
                            <div className={'d-flex flex-row'}>
                                <Typography className={classes.value}><strong>{parcela}</strong></Typography>
                                <div className={'d-flex flex-fill justify-content-end'}>
                                    <Typography className={classes.value}><strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(loan.valor_parcela)}</strong></Typography>
                                </div>

                            </div>
                        )
                    }
                )}
            <div className={'d-flex flex-row'}>
                <Typography className={classes.value}><strong>TOTAL:</strong></Typography>
                <div className={'d-flex flex-fill justify-content-end'}>
                    <Typography className={classes.value}><strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(loan.valor_parcela*loan.num_parcelas)}</strong></Typography>
                </div>
            </div>
                <Button fullWidth={true} className={classes.button} onClick={() => handleEfetivar(loan)} >Efetivar empréstimo</Button>
            </div>
        </div>
    )
}