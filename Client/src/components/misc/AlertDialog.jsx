import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function AlertDialog(props){
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    
    const handleClose = () => setOpen(false);
 
    return (
        <div>
        {/* Button to trigger the opening of the dialog */}
        <button className="delete-btn" onClick={handleClickOpen}> {props.buttonName} </button>
        {/* Dialog that is displayed if the state open is true */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirmation"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure that you want to delete you account?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={e => {props.handleCancel();
                                    handleClose();
                                }} color="primary">
              Cancel
            </Button>
            <Button onClick={e => {props.handleOk();
                                    handleClose();
                                }} color="primary" autoFocus>
              Yes, Delete My Account
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default AlertDialog;