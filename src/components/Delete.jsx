import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../Firebase';
/* In order to style our MoreVertIcon component from MUI */
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
  kebab: {
    color: 'black'
  },
  kebabBg:{
    backgroundColor: '#969696d1',
    '&:hover':{
      backgroundColor: '#c0c0c0fd'
    }
  }
});


export default function BasicMenu({messagePath, messageId}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  /* Showing id */
  const deleteMessage = async (id) => {
    /* alert(messageId); */
    await deleteDoc(doc(db, messagePath, messageId));
  }
  /* in order to style our MoreVertIcon component */
  const classes = useStyles();
  return (
    <div>
      <IconButton
        className={classes.kebabBg}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon className={classes.kebab}/>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={deleteMessage}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
