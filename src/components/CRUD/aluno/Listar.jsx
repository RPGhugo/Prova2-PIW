import { Paper, Box, TableContainer, TableHead, Typography, Table, TableBody, TableRow, TableCell } from "@mui/material"
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { red, blue } from '@mui/material/colors'


const Listar = () => {

    const [alunos, setAlunos] = useState([])
    const [mediaIRA, setMediaIRA] = useState(0) /* calcular e atualizar media automaticamente */

    useEffect(
        () => {
            axios.get("http://localhost:3001/alunos/listar")
                .then(
                    (response) => {
                        //console.log(response)
                        setAlunos(response.data)
                        calcularMediaIRA(response.data)
                    }
                )
                .catch(error => console.log(error))
        },
        []
    )

    const calcularMediaIRA = (alunos) => {
        if (alunos.length > 0) {
            const somaIRA = alunos.reduce((total, aluno) => total + aluno.ira, 0)
            const media = somaIRA / alunos.length
            setMediaIRA(media.toFixed(2))
        } else {
            setMediaIRA(0)
        }
    }

    function deleteAlunoById(id) {
        if (window.confirm("Deseja Excluir? " + id)) {
            //alert("Aluno " + id + " Excluído!")
            axios.delete(`http://localhost:3001/alunos/delete/${id}`)
                .then(
                    (response) => {
                        const resultado = alunos.filter(aluno => aluno._id !== id)
                        setAlunos(resultado)
                    }
                )
                .catch(error => console.log(error))
        }
    }

    return (
        <>
            <Typography variant="h4" fontWeight="bold">
                Listar Alunos
            </Typography>

            <TableContainer component={Paper} sx={{ mt: 2, mb: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>NOME</StyledTableCell>
                            <StyledTableCell>CURSO</StyledTableCell>
                            <StyledTableCell>IRA</StyledTableCell>
                            <StyledTableCell>AÇÕES</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {alunos.map((aluno) => {
                            {/*percorre tabela dos alunos */ }
                            return (
                                <StyledTableRow key={aluno._id}> {/*apresenta os dados em cada linha da tabela*/}
                                    <StyledTableCell>{aluno._id}</StyledTableCell>
                                    <StyledTableCell>
                                        <Box color={aluno.ira < mediaIRA ? 'red' : 'inherit'} fontWeight={aluno.ira < mediaIRA ? 'bold' : 'normal'}>
                                            {aluno.nome} {/*verifica se o ira do aluno está abaixo da média da turma e ajusta o peso da font e cor*/}
                                        </Box>
                                    </StyledTableCell>
                                    <StyledTableCell>{aluno.curso}</StyledTableCell>
                                    <StyledTableCell>{aluno.ira}</StyledTableCell>
                                    <StyledTableCell>
                                        <Box>
                                            <IconButton aria-label="edit" sx={{ color: blue[400] }} component={Link} to={`/editarAluno/${aluno._id}`}>
                                                <EditIcon />
                                            </IconButton> {/*cores bonitinhas para editar e excluir */}
                                            <IconButton aria-label="delete" sx={{ color: red[500] }} onClick={() => deleteAlunoById(aluno._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                        })}
                        <StyledTableRow>
                            <StyledTableCell colSpan={3}><b>Média do IRA de todos os alunos:</b></StyledTableCell> {/* ocupa 3 colunas e exibe na tabela a média  */}
                            <StyledTableCell>{mediaIRA}</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default Listar