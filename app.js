//importar as configurações do servidor
const { set } = require('./config/server');
var app = require('./config/server');

//parametrizar a porta de escuta
var server = app.listen(80, function(){
    console.log("Servidor online");
});

var io = require('socket.io').listen(server);

app.set('io', io);

//criar a conexao por websocket
io.on('connection', function(socket){
    console.log('Usuário conectou');

    socket.on('disconnect', function(){
        console.log('Usuário desconectou');
    });

    socket.on('msgparaServidor', function(data){

        //eventos de diálogo
        socket.emit(
            'msgparaCliente', 
            { apelido: data.apelido, mensagem: data.mensagem }
        );

        socket.broadcast.emit(
            'msgparaCliente', 
            { apelido: data.apelido, mensagem: data.mensagem }
        );

        //participantes
        if(parseInt(data.apelido_atualizado_nos_clientes) == 0 ){
            socket.emit(
                'participantesParaCliente', 
                { apelido: data.apelido }
            );

            socket.broadcast.emit(
                'participantesParaCliente', 
                { apelido: data.apelido }
            );
        }
    });
})
