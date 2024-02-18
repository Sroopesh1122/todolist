import * as React from 'react';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';

export default function Alert({message,type}) {
  const [open, setOpen] = React.useState(true);

  return (
    <React.Fragment>
      <Snackbar
        variant="soft"
        color={type}
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        // startDecorator=}
        endDecorator={
          <Button
            onClick={() => setOpen(false)}
            size="sm"
            variant="soft"
            color={type}
          >
            Dismiss
          </Button>
        }
      >
        {message}
      </Snackbar>
    </React.Fragment>
  );
}