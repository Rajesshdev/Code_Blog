import React, { useState, useEffect } from 'react'
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from '@mui/icons-material/Info';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Logo from '../../assets/Logo1.jpg'
import { Button } from '@mui/material';
import Axios from 'axios';
import Createpost from '../Post/Createpost'
const Body = () => {
  const [data, setData] = useState([])
  const [blogdata, setBlogdata] = useState([])

  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)

  const handlechange = (id) => {
    setData(id)
    console.log(id)
  }
  const handleClose = () => {
    setOpen(false)
    Getname()
  }
  const handleClose1 = () => {
    setOpen1(false)
  }
  const Getname = () => {
    Axios.get('http://localhost:3001/read')
      .then((res) => {
        console.log(res, "response")
        setBlogdata(res.data)
        // setRowdata(res.data)
      })
      .catch((err) => {
        console.log(err, "response")

      })
  }
  useEffect(() => {
    Getname()
  }, [])

  return (
    <div>
            <br/>
      <div style={{display:"flex"}}>
        <img src={Logo} className='Logo' alt='logo'/>
        <Button variant='contained' onClick={()=>setOpen(true)} style={{marginLeft:"auto",backgroundColor:"white",color:"black",marginRight:"0",padding:"0 50px"}}>Create</Button>
        &nbsp;
      </div>
      <br/>
      <ImageList gap={30} cols={3}>
        {blogdata.map((item) => (
          <div>
            <ImageListItem key={item.author}>
              <img
                src={`data:image/png;base64,${item.blogphoto}`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.author.name}
                actionIcon={

                  <IconButton
                    aria-label={`info about ${item.title}`}
                  >
                    <Button sx={{ color: 'rgba(255, 255, 255)' }} onClick={() => handlechange(item)} startIcon={<EditRoundedIcon />}></Button>
                    <Button sx={{ color: 'rgba(255, 255, 255)' }} onClick={() => handlechange(item)} startIcon={<DeleteRoundedIcon />}></Button>

                  </IconButton>
                }
              />
            </ImageListItem>
          </div>
        ))}
      </ImageList>
      <Createpost open={open} Close={handleClose}  />
    </div>
  )
}

export default Body
