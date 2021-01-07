import React from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
const PagesDropdown = ({ size, to }) => {

    const [toggle, setToggle] = React.useState(false);
    const toggler = () => {
        setToggle(!toggle);
    }
    return (
        <Dropdown isOpen={toggle} toggle={toggler}>
            <DropdownToggle caret>Pages</DropdownToggle>
            <DropdownMenu>
                {[...Array(size)].map((val, index) => (
                    <DropdownItem key={index}>
                        <Link to={`${index+1}`}>Page {index+1}</Link>
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}

export default PagesDropdown;
