import LoanForm from '../common/components/loanForm'
import {makeStyles, Typography,} from "@material-ui/core";
import 'react-toastify/dist/ReactToastify.min.css';

const useStyles = makeStyles({
    title: { margin: '1vh ', color: '#000000'}
});

export default () => {
    const classes = useStyles()
    return (
        <div style={{width: '80%'}}>
            <Typography variant="h2" className={classes.title}><strong>Simule e solicite seu empréstimo</strong></Typography>
            <LoanForm/>
        </div>
    )
}
