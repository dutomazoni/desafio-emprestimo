import React from 'react'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
export default props => {
    return (
        <div>
            <AppBar position="static" color={'primary'}  style={{marginBottom: '1vh'}}>
                <Toolbar>
                    <IconButton edge="start" aria-label="menu" href={'/'} style={{color:'#ecf0f1'}}>
                        <AccountBalanceIcon style={{fontSize: 40}}/>
                    </IconButton>
                    <Typography variant="h5" href={'/'} style={{marginRight: "2vw", color: '#ecf0f1'}}>
                        Empréstimos
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

