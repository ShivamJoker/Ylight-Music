import React, { useState } from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const DownloadDeleteDialog = ({ isOpen, handleCancel, handleDelete }) => {
  const [checkBox, setCheckBox] = useState(false);

  React.useEffect(() => {
    console.log(checkBox);
  }, [checkBox]);

  return (
    <div>
      <Dialog
        style={{ zIndex: 1500 }}
        open={isOpen}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete this song from your device ?"}
        </DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={checkBox}
                onChange={e => setCheckBox(e.target.checked)}
                value="checkBox"
              />
            }
            label="Don't ask again"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(checkBox)} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DownloadDeleteDialog;
