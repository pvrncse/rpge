import React, { useEffect, useState } from "react";
// import { useQuery, gql, useMutation} from "@apollo/client";
// import { useQuery, useMutation} from "react-apollo-hooks";
import { useQuery, useMutation} from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Avatar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@material-ui/core";
import { LOAD_USERS } from "../GraphQL/Queries";
import { CREATE_USER_MUTATION, DELETE_USER_MUTATION, UPDATE_USER_MUTATION } from "../GraphQL/Mutations";

const useStyles = makeStyles({
  root: {
    margin: "10px",
    width:"410px",
    minHeight:"180px"
  },
});
interface User {
  id: number;
  name: string;
  email: string,
  bio: string,
}
export default function Users() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [delUid, setDelUid] = useState(0);
  const [updUid, setUpdUid] = useState(0);
  const {data: usersData, loading:userLoading, error: loadError} = useQuery(LOAD_USERS);
  useEffect(() => {
    usersData ? setUsers(usersData.allUsers): null;
  }, [usersData]);
  const [createUser, {error:createError}] = useMutation(CREATE_USER_MUTATION,{
    refetchQueries: [{ query: LOAD_USERS }]
  });
  const [deleteUser, {error:deleteError}] = useMutation(DELETE_USER_MUTATION,{
    refetchQueries:[{query: LOAD_USERS}]
  })
  const [updateUser, {error: updateError}] = useMutation(UPDATE_USER_MUTATION,{
    refetchQueries:[{query: LOAD_USERS}]
  })
  const handleDeleteModal = (id:number) => {
    console.log(id);
    setDelUid(id);
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };
  const handleAddModal = () =>{
    setAddModal(true);
  }
  const closeAddModal = () => {
    setAddModal(false);
    resetFields();
  }
  const handleUpdateModal = (user: User) =>{
    setName(user.name);
    setUpdUid(user.id);
    setEmail(user.email);
    setBio(user.bio);
    setUpdateModal(true);
  }
  const closeUpdateModal = () => {
    setUpdateModal(false);
    resetFields();
  }
  const resetFields = () =>{
    setName("");
    setEmail("");
    setBio("");
  }
  const addUser = () =>{
    console.log(name, email, bio);
    let obj = {name,email,bio}
    createUser({
      variables:{
        data:obj
      }
    })
    if(createError){
      console.log(createError);
    }else{
      setAddModal(false);
      resetFields();
      alert('Added!!!');
    }
  }
  const deleteCurrentUser = () => {
    deleteUser({
      variables:{
        id: delUid
      }
    })
    if(deleteError){
      console.log(deleteError);
    }else{
      setDeleteModal(false);
      alert('Deleted!!!');
    }
  }
  const updateCurrentUser = () =>{
    const obj = {name, email, bio};
    updateUser({
      variables:{
        data:obj,
        id: updUid
      }
    })
    if(updateError){
      console.log(updateError);
    }else{
      setUpdateModal(false);
      resetFields();
      alert('Updated!!!');
    }
  }
  return (
    <div>
      <div style={{marginTop:"10px", float:"right", marginRight:"5px"}}>
      <Button onClick={handleAddModal}>
        Add User
      </Button>
      </div>
    <Grid container style={{marginLeft:"auto",marginRight:"auto"}}>
      {users.length > 0 && 
      users.map((user: User) => (
        <Grid item lg={4} key={user.id}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <div style={{ display: "flex" }}>
                <Avatar alt={user.name.toUpperCase()} src="some url" />
                <Typography
                  style={{ marginLeft: "10px", marginTop: "4px" }}
                  variant="h5"
                  component="h2"
                >
                  {user.name}
                </Typography>
              </div>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{ marginTop: "5px" }}
              >
                {user.bio}
              </Typography>
              <p>react me at <strong>{user.email}</strong></p>
            </CardContent>
          </CardActionArea>
          <CardActions style={{ float: "right" }}>
            <Button size="small" color="primary" onClick={()=>handleUpdateModal(user)}>
              Edit
            </Button>
            <Button size="small" color="secondary" onClick={()=>handleDeleteModal(user.id)}>
              Delete
            </Button>
          </CardActions>
        </Card>
        </Grid>
      ))}
    </Grid>
    <Dialog onClose={closeDeleteModal} aria-labelledby="simple-dialog-title" open={deleteModal}>
        <DialogContent>
          <DialogContentText>
            Are you sure want to delete?
          </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button onClick={closeDeleteModal} color="primary">
            No
          </Button>
          <Button onClick={deleteCurrentUser} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={addModal} onClose={closeAddModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add user</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Enter Name"
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Enter Email"
            type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            multiline
            maxRows={4}
            margin="dense"
            label="Enter bio"
            type="text"
            value={bio}
            onChange={(e)=>setBio(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddModal}>
            Cancel
          </Button>
          <Button onClick={addUser} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={updateModal} onClose={closeUpdateModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update user</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Enter Name"
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Enter Email"
            type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            multiline
            maxRows={4}
            margin="dense"
            label="Enter bio"
            type="text"
            value={bio}
            onChange={(e)=>setBio(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUpdateModal}>
            Cancel
          </Button>
          <Button onClick={updateCurrentUser} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}
