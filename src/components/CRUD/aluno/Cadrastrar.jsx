import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Cadastrar = () => {

    const [nome, setNome] = useState("")
    const [curso, setCurso] = useState("")
    const [ira, setIra] = useState("0.0")

    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()
        const aluno = { nome, curso, ira}
        axios.post("http://localhost:3001/alunos/register", aluno)
            .then(
                (response) => {
                    alert(`Aluno ID ${response.data._id} adicionado com sucesso!`)
                    navigate("/listarAluno")
                }
            )
            .catch(error => console.log(error))
    }


    return (
        <>
            <Typography variant="h4" fontWeight="bold">
                Cadastrar Aluno
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nome"
                    label="Nome Completo"
                    name="nome"
                    onChange={(event) => setNome(event.target.value)}
                />

                <FormControl sx={{ width: "100%", mt: 2 }}>
                    <InputLabel id="select-id-label">Curso</InputLabel>
                    <Select
                        labelId="select-id-label"
                        label="curso"
                        value={curso}  /*select para cursos de alunos, igual o de titulação dos profs */
                        onChange={(event) => setCurso(event.target.value)}
                    >
                        <MenuItem value="DD">Design Digital</MenuItem>  
                        <MenuItem value="SI">Sistema da Informação</MenuItem>
                        <MenuItem value="CC">Ciência da Computação</MenuItem>
                        <MenuItem value="ES">Engenharia de Software</MenuItem>
                        <MenuItem value="EC">Engenharia da Computação</MenuItem>
                        <MenuItem value="RC">Redes de Computadores</MenuItem>
                    </Select>
                </FormControl>

                <TextField   /*armazena ira dos alunos */
                    margin="normal"
                    required
                    fullWidth
                    id="ira"
                    label="IRA"
                    name="ira"
                    type="number"
                    inputProps={{
                        maxLength: 10,
                        step: "0.1"
                    }}
                    onChange={(e) => setIra(parseFloat(e.target.value))}
                />

                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2
                }}>
                    <Button
                        variant="contained"
                        type="submit"
                    >
                        Cadastrar
                    </Button>
                </Box>
            </Box>
        </>
    )
}
export default Cadastrar