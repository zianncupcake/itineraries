import {NavLink, Container, ListGroup, ListGroupItem} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useState } from "react";


const NavComponent = () => {
    const { id } = useParams();

    const [isActive, setIsActive] = useState(false);

    const handleToggleActive = () => {
      setIsActive(!isActive);
    };
  return (
    <Container className="border border-3 rounded mt-3 p-3 ">
        <ListGroup>

        <ListGroup.Item as={Link} to={`/dashboard/${id}`} className={`text-muted p-3 ${window.location.pathname === `/dashboard/${id}` ? 'bg-light' : ''}`} action>
        <i className="bi bi-house-fill"></i> Dashboard
      </ListGroup.Item>
      <ListGroup.Item as={Link} to={`/destination/${id}`} className={`text-muted p-3 ${window.location.pathname === `/destination/${id}` ? 'bg-light' : ''}`} action>
        <i className="bi bi-wallet-fill"></i> Destinations
      </ListGroup.Item>
      {/* <ListGroup.Item as={Link} to={`/buckets/${userid}`} className={`text-muted p-3 ${window.location.pathname === `/buckets/${userid}` ? 'bg-light' : ''}`} action>
        <i className="bi bi-bookmarks-fill"></i> Buckets
      </ListGroup.Item>
      <ListGroup.Item as={Link} to={`/transactions/${userid}`} className={`text-muted p-3 ${window.location.pathname === `/transactions/${userid}` ? 'bg-light' : ''}`} action>
        <i className="bi bi-currency-exchange"></i> Transactions
      </ListGroup.Item> */}
      <ListGroup.Item as={Link} to={`/profile/${id}`} className={`text-muted p-3 ${window.location.pathname === `/profile/${id}` ? 'bg-light' : ''}`} action>
        <i className="bi bi-person-fill"></i> Profile
      </ListGroup.Item>
        </ListGroup>       

    </Container>
  );
}

export default NavComponent;