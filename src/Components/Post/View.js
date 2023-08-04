import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Alert from '@material-ui/lab/Alert';
import { TextField, Autocomplete, createFilterOptions,Grid, Button, Box,IconButton} from '@mui/material';

const View = ({open,Close,Data}) => {
  return (
    <div>
      <Dialog
            open={open}
            onClose={Close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
      >
<DialogContent>
        <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
      </Dialog>
      
    </div>
  )
}

export default View
