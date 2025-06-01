import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";

const OrderDialogButton = ({ title, buttonLabel, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        {buttonLabel}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {React.cloneElement(children, { onClose: () => setOpen(false) })}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderDialogButton;
