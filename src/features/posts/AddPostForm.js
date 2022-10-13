import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

// MUI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

const AddPostForm = () => {
  const [name, setName] = useState("");
  const handleChange = (event) => {
    setName(event.target.value);
  };

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map((user) => (
    <MenuItem key={user.id} value={user.id}>
      {user.name}
    </MenuItem>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            variant="filled"
            id="outlined-name"
            label="Post Title"
            value={title}
            onChange={onTitleChanged}
          />
        </Box>

        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "100%" },
          }}
        >
          <FormControl variant="filled" fullWidth>
            <InputLabel id="demo-simple-select-label">Author</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="postAuthor"
              value={userId}
              label="Age"
              onChange={onAuthorChanged}
            >
              {usersOptions}
            </Select>
          </FormControl>
        </Box>

        <TextField
          sx={{
            "& > :not(style)": { m: 1, width: "100%" },
          }}
          id="postContent"
          label="Content"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="filled"
          value={content}
          onChange={onContentChanged}
        />
        <Button
          variant="filled"
          onClick={onSavePostClicked}
          disabled={!canSave}
        >
          Send
        </Button>
      </form>
    </section>
  );
};
export default AddPostForm;
