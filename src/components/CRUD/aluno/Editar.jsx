import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const Editar = () => {

    const [nome, setNome] = useState("")
    const [curso, setCurso] = useState("")
    const [ira, setIra] = useState("0.0")

    const { id } = useParams()
    const navigate = useNavigate()


    useEffect(
        () => {
            axios.get(`http://localhost:3001/alunos/retrieve/${id}`)
                .then(
                    (response) => {
                        setNome(response.data.nome)
                        setCurso(response.data.curso)
                        setIra(response.data.ira)
                    }
                )
                .catch(error => console.log(error))

        }
        ,
        []
    )


    function handleSubmit(event) {
        event.preventDefault()
        const alunoAtualizado = { nome, curso, ira}
        axios.put(`http://localhost:3001/alunos/update/${id}`, alunoAtualizado)
            .then(
                (response) => {
                    alert(`Aluno ID ${response.data._id} atualizado!`)
                    navigate("/listarAluno")
                }
            )
            .catch(error => console.log(error))
    }



    return (
        <>
            <Typography variant="h4" fontWeight="bold">
                Editar Aluno {id}
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
                    value={nome}
                />

                <FormControl sx={{ width: "100%", mt: 2 }}>   {/*select para cursos de alunos, igual o de titulação dos profs */}
                    <InputLabel id="select-id-label">Curso</InputLabel>
                    <Select
                        labelId="select-id-label"
                        label="curso"
                        value={curso}
                        onChange={(event) => setCurso(event.target.value)} /*att edição dos alunos */
                    >
                        <MenuItem value="DD">Design Digital</MenuItem>
                        <MenuItem value="SI">Sistema da Informação</MenuItem>
                        <MenuItem value="CC">Ciência da Computação</MenuItem>
                        <MenuItem value="ES">Engenharia de Software</MenuItem>
                        <MenuItem value="EC">Engenharia da Computação</MenuItem>
                        <MenuItem value="RC">Redes de Computadores</MenuItem>
                    </Select>
                </FormControl>


                <TextField
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
                    value={ira}
                />

                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2
                }}>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ mb: 2 }}
                    >
                        Atualizar
                    </Button>
                </Box>
            </Box>
        </>
    )
}
export default Editar