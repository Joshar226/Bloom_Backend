import server from './server'

const port = 4000

server.listen(port, () => {
    console.log((`REST API funcionando en el puerto ${port}`));
})