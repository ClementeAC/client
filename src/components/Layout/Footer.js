import React from 'react'
import MadeWithLove from 'react-made-with-love'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    root: {
        textAlign: 'center',
        marginTop: 30
    }
}

const Footer = ({ classes }) => (
    <div className = {classes.root}>
        <MadeWithLove
            emoji= {{
                verb: '💻'
            }}
            by = 'Clemente Castejon'
            link = 'https://github.com/ClementeAC'
        />
    </div>
)

export default withStyles(styles)(Footer)