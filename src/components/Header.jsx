import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Video } from 'react-feather';
import { Link } from 'react-router-dom';


function Header() {
  return (


    <div>
       <Navbar className="bg-white">
        <Container>
          <Navbar.Brand href="#home">
           
            <Link to={'/'} style={{textDecoration:"none"}}>
            <Video/>
            <span className='ms-4'>Video Upload</span>
            </Link>


          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>


  )
}

export default Header
