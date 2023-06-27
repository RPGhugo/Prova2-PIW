import React, { useState } from "react";
import { AppBar, Box, Button, Container, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";

const MyMenu = () => {
  const [anchorElProfessores, setAnchorElProfessores] = useState(null);
  const [anchorElAlunos, setAnchorElAlunos] = useState(null);

  function handleOpenProfessoresDropMenu(event) {
    setAnchorElProfessores(event.currentTarget);
  }

  function handleCloseProfessoresDropMenu() {
    setAnchorElProfessores(null);
  }

  function handleOpenAlunosDropMenu(event) {
    setAnchorElAlunos(event.currentTarget);
  }

  function handleCloseAlunosDropMenu() {
    setAnchorElAlunos(null);
  }

  function professoresDropMenu() {
    return (
      <Box>
        <Button
          sx={{ color: "white", mt: 1 }}
          onClick={handleOpenProfessoresDropMenu}
        >
          Professores
        </Button>
        <Menu
          anchorEl={anchorElProfessores}
          open={Boolean(anchorElProfessores)}
          onClose={handleCloseProfessoresDropMenu}
        >
          <MenuItem
            onClick={handleCloseProfessoresDropMenu}
            component={Link}
            to="/cadastrarProfessor"
          >
            Cadastrar
          </MenuItem>
          <MenuItem
            onClick={handleCloseProfessoresDropMenu}
            component={Link}
            to="/listarProfessor"
          >
            Listar
          </MenuItem>
        </Menu>
      </Box>
    );
  }

  function alunosDropMenu() {
    return (
      <Box>
        <Button
          sx={{ color: "white", mt: 1 }}
          onClick={handleOpenAlunosDropMenu}
        >
          Alunos
        </Button>
        <Menu
          anchorEl={anchorElAlunos}
          open={Boolean(anchorElAlunos)}
          onClose={handleCloseAlunosDropMenu}
        >
             <MenuItem
            onClick={handleCloseAlunosDropMenu}
            component={Link}
            to="/cadastrarAluno"
          >
            Cadastrar
          </MenuItem>
          <MenuItem
            onClick={handleCloseAlunosDropMenu}
            component={Link}
            to="/listarAluno"
          >
            Listar
          </MenuItem>
          {/* Opções do dropdown de Alunos */}
        </Menu>
      </Box>
    );
  }

  return (
    <AppBar>
      <Container>
        <Toolbar>
          <AdbIcon sx={{ mr: 1 }} />
          <Typography
            variant="h5"
            component="a"
            href="/"
            sx={{
              textDecoration: "none",
              color: "white",
              fontFamily: "monospace",
              fontWeight: 800,
              letterSpacing: ".2rem"
            }}
          >
            CRUD_V1
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            {professoresDropMenu()} {/* Dropdown de Professores */}
            {alunosDropMenu()} {/* Dropdown de Alunos */}
            <Button sx={{ color: "white", mt: 1 }}>
              Sobre
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MyMenu;
