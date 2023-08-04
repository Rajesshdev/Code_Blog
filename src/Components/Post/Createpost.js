import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@material-ui/core/DialogContent';
import Alert from '@material-ui/lab/Alert';
import {
  TextField,
  TextareaAutosize,
  Autocomplete,
  createFilterOptions,
  Grid,
  Button,
  Box,
  IconButton,
  Paper,
} from '@mui/material';
import { Col, Row, Spinner, Table } from 'react-bootstrap';
import { Container } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Axios from 'axios';
const filter = createFilterOptions();

const Createpost = ({ open, Close }) => {
  const [Post, SetPost] = useState([{ text: '', code: '' }]);
  const [author, setAuthor] = useState([{ bio: '', name: '', photo: '' }]);
  const [category, setCategory] = useState('');
  const [value, setValue] = React.useState(null);
  const [photourl, setPhotourl] = useState('');
  const [title, setTitle] = useState('');
  const [img, setImg] = useState({
    mainState: 'initial',
    imageUploaded: 0,
    selectedFile: 'avatar.jpg',
  });
  const [img1, setImg1] = useState({
    mainState: 'initial',
    imageUploaded: 0,
    selectedFile: 'avatar.jpg',
  });
  const handleUploadClick = event => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
    // reader.onloadend = function (e) {
    //   setImg({ selectedFile: [reader.result] });
    // }.bind(img);
    if (url != undefined) {
      setPhotourl(url);
      setImg({
        mainState: 'uploaded',
        selectedFile: event.target.files[0],
        imageUploaded: 1,
      });
    }
  };
  const handleUploadClick1 = event => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
    // reader.onloadend = function (e) {
    //   setImg1({ selectedFile: [reader.result] });
    // }.bind(img1);
    if (url != undefined) {
      setImg1({
        mainState: 'uploaded',
        selectedFile: event.target.files[0],
        imageUploaded: 1,
      });
    }
  };
  const [cat, setCat] = useState([
    {
      type: 'rajesh',
    },
  ]);
  const Handleadd = () => {
    const values = [...Post];
    values.push({ text: '', code: '' });
    SetPost(values);
  };
  const submit = () => {
    const authordata = {
      bio: author.bio,
      name: author.name,
      photo: img.selectedFile[0],
    };
    const Category = {
      type: value.type,
    };

    Axios.post('http://localhost:3001/post/add', {
      id: 24,
      author: authordata,
      categories: Category,
      content: Post,
      blogphoto: img1.selectedFile[0],
      title: title,
    })
      .then(res => {
        console.log(res, 'response');
        Close();
        // Getname()
      })
      .catch(err => {
        console.log(err, 'response');
      });
  };

  const COdeonchnage = (i, event, name) => {
    let value_temp = event.target?.value ? event.target.value : event;

    const values = [...Post];
    if (name === 'Code') {
      values[i].code = value_temp;
    }
    if (name === 'Description') {
      values[i].text = value_temp;
    }
    SetPost(values);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={Close}
        fullScreen
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <div style={{ display: 'flex' }}>
            <div style={{ marginLeft: 'auto', marginRight: '0' }}>
              <IconButton onClick={() => Close()}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <div>
            <Container>
              <Box>
                <Paper
                  className='paper'
                  style={{ backgroundColor: 'transparent' }}
                >
                  <div className='add_joborder'>
                    <Container>
                      <div className='Author'>
                        <div>
                          <Avatar
                            alt='Remy Sharp'
                            src={img.selectedFile}
                            className='avatar'
                          />
                          <br />
                          &nbsp; &nbsp; &nbsp;
                          <Button variant='contained' component='label'>
                            Upload
                            <input
                              hidden
                              accept='image/*'
                              multiple
                              type='file'
                              onChange={handleUploadClick}
                            />
                          </Button>
                        </div>
                        &nbsp; &nbsp; &nbsp;
                        <div style={{ width: '100%' }}>
                          <div>
                            <TextField
                              id='jorgst'
                              style={{ width: 300 }}
                              label='Name'
                              value={author.name}
                              onChange={event =>
                                setAuthor({
                                  name: event.target.value,
                                  bio: author.bio,
                                })
                              }
                              name='name'
                              variant='outlined'
                            />
                          </div>
                          <br />
                          &nbsp;
                          <TextareaAutosize
                            id='jordesc'
                            aria-label='minimum height'
                            minRows={3}
                            value={author.bio}
                            onChange={event =>
                              setAuthor({
                                name: author.name,
                                bio: event.target.value,
                              })
                            }
                            placeholder='Bio'
                            style={{
                              width: '70%',
                              padding: 10,
                              backgroundColor: 'transparent',
                            }}
                          />
                        </div>
                      </div>
                      <br />

                      <div className='Author'>
                        <div>
                          <Avatar
                            alt='Remy Sharp'
                            src={img1.selectedFile}
                            className='avatar'
                          />
                          <br />
                          &nbsp; &nbsp; &nbsp;
                          <Button variant='contained' component='label'>
                            Upload
                            <input
                              hidden
                              accept='image/*'
                              multiple
                              type='file'
                              onChange={handleUploadClick1}
                            />
                          </Button>
                        </div>
                        &nbsp; &nbsp; &nbsp;
                        <div style={{ width: '100%' }}>
                          <div>
                            <TextField
                              id='jorgst'
                              style={{ width: 300 }}
                              label='Title'
                              value={title}
                              onChange={event => setTitle(event.target.value)}
                              name='Title'
                              variant='outlined'
                            />
                          </div>
                          <br />
                          &nbsp;
                          <Autocomplete
                            value={value}
                            onChange={(event, newValue) => {
                              if (typeof newValue === 'string') {
                                setValue({
                                  type: newValue,
                                });
                              } else if (newValue && newValue.inputValue) {
                                // Create a new value from the user input
                                setValue({
                                  type: newValue.inputValue,
                                });
                              } else {
                                setValue(newValue);
                              }
                            }}
                            filterOptions={(options, params) => {
                              const filtered = filter(options, params);

                              const { inputValue } = params;
                              // Suggest the creation of a new value
                              const isExisting = options.some(
                                option => inputValue === option.type
                              );
                              if (inputValue !== '' && !isExisting) {
                                filtered.push({
                                  inputValue,
                                  type: `Add "${inputValue}"`,
                                });
                              }

                              return filtered;
                            }}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            id='Style'
                            options={cat}
                            getOptionLabel={option => {
                              // Value selected with enter, right from the input
                              if (typeof option === 'string') {
                                return option;
                              }
                              // Add "xxx" option created dynamically
                              if (option.inputValue) {
                                return option.inputValue;
                              }
                              // Regular option
                              return option.type;
                            }}
                            renderOption={(props, option) => (
                              <li {...props}>{option.type}</li>
                            )}
                            sx={{ width: 220 }}
                            freeSolo
                            disableClearable={true}
                            renderInput={params => (
                              <TextField {...params} label='Category' />
                            )}
                          />
                        </div>
                      </div>
                      <div></div>

                      <br />
                      <React.Fragment>
                        <div>
                          <Table>
                            <thead
                              style={{
                                backgroundColor: '#dde1fa',
                                color: 'black',
                                cursor: 'default',
                              }}
                            >
                              <tr>
                                <th>Description</th>
                                <th>Code</th>
                              </tr>
                            </thead>
                            <br />
                            <tbody>
                              {Post.map((field, idx) => {
                                return (
                                  <tr>
                                    <div style={{ display: 'none' }}>
                                      {idx + 1}
                                    </div>

                                    <td>
                                      <TextareaAutosize
                                        id='jorrat'
                                        minRows={5}
                                        style={{ width: 400 }}
                                        placeholder='Description'
                                        label='Description'
                                        name='Description'
                                        onChange={e =>
                                          COdeonchnage(
                                            idx,
                                            e.target.value,
                                            'Description'
                                          )
                                        }
                                        InputLabelProps={{ shrink: true }}
                                        value={field.text}
                                        variant='outlined'
                                      />
                                    </td>
                                    <td>
                                      <TextareaAutosize
                                        id='jorrat'
                                        minRows={5}
                                        style={{ width: 400 }}
                                        placeholder='Code'
                                        label='Code'
                                        name='Code'
                                        onChange={e =>
                                          COdeonchnage(
                                            idx,
                                            e.target.value,
                                            'Code'
                                          )
                                        }
                                        InputLabelProps={{ shrink: true }}
                                        value={field.code}
                                        variant='outlined'
                                      />
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </div>
                        <div style={{ marginLeft: '80%' }}>
                          <Button
                            aria-label='add'
                            id='jorrawremov'
                            onClick={() => Handleadd()}
                          >
                            Add more +
                          </Button>
                        </div>
                        <Button variant='contained' onClick={submit}>
                          Submit
                        </Button>
                        &nbsp;
                      </React.Fragment>
                    </Container>
                  </div>
                </Paper>
              </Box>
            </Container>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Createpost;
