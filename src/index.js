import Fastify from 'fastify';

async function start (){
    try {
        const fastify = Fastify({logger:true});

        fastify.get('/api', async(request, reply)=>{
            return{success: true};
        });
        
        const addr = await fastify.listen({
            port: '8080'
        })

        console.log('Listening on $(addr)');

    } catch (error){
        // prints the error
        console.error(error);
        // exiits the program with an error code
        process.exit(1);
    }
}

start();