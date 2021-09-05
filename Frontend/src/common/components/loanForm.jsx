import {Button, Input, InputLabel, makeStyles, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import React, {useState} from "react";
import axios from "axios";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {format} from "date-fns";
import Result from './result'

const useStyles = makeStyles({
    button: {margin: '2vh ', display:'flex'},
    input: {margin: '2vh ', display:'flex', color: '#3f51b5', background:'#ecf0f1', fontSize: '1.5rem'},
    inputLabel: {marginLeft:'2vh', display:'flex', color: '#3f51b5'},
    menuItem: {margin: '2vh ', display:'flex', color: '#3f51b5', background:'#ecf0f1'},
    title: { margin: '5vh ', color: '#041eba', display: 'flex', justifyContent: 'center'}
});
const ufs = [ { value: 'MG', label: 'MG'}, { value: 'ES', label: 'ES'}, { value: 'SP', label: 'SP'}, { value: 'RJ', label: 'RJ'} ]

export default () => {
    const classes = useStyles()
    let base_url = process.env.REACT_APP_API_URL || 'http://localhost:5001';
    let [loan, setLoan] = useState('');
    let [cpf, setCpf] = useState('')
    let [uf, setUf] = useState('')
    let [dob, setDob] = useState(null)
    let [valor, setValor] = useState('')
    let [parcelas, setParcelas] = useState('')
    let [open, setOpen] = useState(false)

    const getLoan =  async (parameters) => {
        axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
        await axios.post(base_url + "/emprestimo", parameters)
            .then((response) => {
                    setLoan(response.data.emprestimo)
            })
    }

    const handleSimular = async (cpf, uf, dob, valor, parcelas) => {
        let fields = {
            cpf: cpf,
            uf: uf,
            nasc: format(new Date(dob), 'dd/MM/yyyy'),
            valor: valor,
            num_parcelas: parcelas
        }
        await getLoan(fields)
        setOpen(true)
    }

    const handleNovaSimulacao = () => {
        setCpf('');
        setUf('');
        setDob(null)
        setValor('')
        setParcelas('');
        setOpen(false);
    }

    return (
        <div>
            <form>
                <Typography variant="h4" className={classes.title}><strong>Preencha o formulário abaixo para simular:</strong></Typography>
                <InputLabel className={classes.inputLabel}>CPF</InputLabel>
                <TextField fullWidth className={classes.input} value={cpf} onChange={e => setCpf(e.target.value)} InputProps={{style: {color: '#3f51b5', fontSize: '1.5rem'}}}/>
                <InputLabel className={classes.inputLabel}>UF</InputLabel>
                <Select displayEmpty fullWidth className={classes.input} value={uf} onChange={e => setUf(e.target.value)} SelectProps={{style: {fontSize: '1.5rem'}}} >
                    {ufs.map((option) => (
                        <MenuItem key={option.value} value={option.value} className={classes.menuItem} >
                            {option.label}
                        </MenuItem>
                        )
                    )}
                </Select>
                <InputLabel className={classes.inputLabel}>DATA DE NASCIMENTO</InputLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                    <KeyboardDatePicker fullWidth value={dob} onChange={e => setDob(e)} InputProps={{style: {margin: '2vh', color: '#3f51b5', fontSize: '1.5rem'}}}/>
                </MuiPickersUtilsProvider>
                <InputLabel className={classes.inputLabel}>VALOR REQUERIDO</InputLabel>
                <TextField type={'number'} fullWidth className={classes.input} value={valor} onChange={e => setValor(e.target.value)} error={valor < 50000} helperText={"Valor mínimo R$ 50000"} InputProps={{style: {color: '#3f51b5', fontSize: '1.5rem'}}}/>
                <InputLabel className={classes.inputLabel}>MESES PARA PAGAR</InputLabel>
                <TextField type={'number'}  fullWidth className={classes.input} value={parcelas} onChange={e => setParcelas(e.target.value)}  error={parcelas > 360} helperText={"Valor máximo 360 meses"} InputProps={{style: {color: '#3f51b5', fontSize: '1.5rem'}}} />
                <Button fullWidth={true} className={classes.button} variant={'contained'} color={'primary'} onClick={() => handleSimular(cpf, uf, dob, valor, parcelas)}>Simular</Button>
                { open ? <Result props={loan}/> : <div/> }
                <Button fullWidth disabled={!open} className={classes.button} variant={'contained'} color={'secondary'} onClick={() => handleNovaSimulacao()}>Nova Simulação</Button>

            </form>
        </div>


    )

}