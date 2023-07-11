import React, { useState } from "react";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { clearAuthState } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
} from "reactstrap";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();

  return (
    <header>
      <Navbar expand="md">
        <NavbarBrand href="/home">
          <LocalLibraryIcon /> Keeper
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar style={{ flexGrow: "0" }}>
          <Nav className="me-auto" navbar>
            <NavItems>
              <NavItem>
                <Wrapper>
                  <Button
                    outline={false}
                    color="#f5ba13"
                    size="lg"
                    onClick={() => {
                      navigate("/write-review");
                    }}
                  >
                    Write a review
                  </Button>
                </Wrapper>
              </NavItem>
              <NavItem style={{ margin: "0 1rem", cursor: "pointer" }}>
                <PersonIcon
                  onClick={() => {
                    navigate("/profile");
                  }}
                />
              </NavItem>
              <NavItem style={{ cursor: "pointer" }}>
                <LogoutIcon
                  onClick={() => {
                    dispatch(clearAuthState);
                    localStorage.removeItem("keeper-user");
                    navigate("/");
                  }}
                />
              </NavItem>
            </NavItems>
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
}

export default Header;

const Wrapper = styled.section`
  border: 4px solid white;
  border-radius: 50px;
`;

const NavItems = styled.section`
  align-items: center;
  display: flex;
  justify-content: center;
`;
