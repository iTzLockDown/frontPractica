const app = Vue.createApp({
    data() {
        return {
            personas: [],
            fillPersona:{
                id:'',
                nombre: '',
                apellidos: '',
                sueldo: '',
                email: '',
            }
        };
    },
    methods: {
        async Listar() {
            var url = "https://localhost:44346/api/Persona/Listar";

            axios.get(url).
            then(response => {
                this.personas = response.data;
            }).
            catch(
                error=>{
                    console.log('Listado incorrecto');
                }
            );
        },

        Grabar()
        {
            if(this.fillPersona.id==0){
                this.GrabarPost();

            }
            else {
                this.EditarPut();
            }
        },
        GrabarPost() {
            var url = "https://localhost:44346/api/Persona/Grabar";
            axios.post(url,{
                nombre : this.fillPersona.nombre,
                apellidos : this.fillPersona.apellidos,
                sueldo : this.fillPersona.sueldo,
                email : this.fillPersona.email
            }).
            then(response => {
                if(response){
                     toastr.success('Registro creado correctamente.');
                    this.Listar();
                    $("#modalCrearPersona").modal("hide");
                }
            }).
            catch(error=>{
               console.log('ocurrio un error'+ error)
            });
            this.LimpiarObjeto();
        },

        Editar(persona){
            console.log(persona);
            $("#modalCrearPersona").modal("show");

            this.fillPersona.id = persona.id;
            this.fillPersona.nombre = persona.nombre;
            this.fillPersona.apellidos = persona.apellidos;
            this.fillPersona.sueldo = persona.sueldo;
            this.fillPersona.email = persona.email;
        },

        EditarPut(){
            var url = "https://localhost:44346/api/Persona/Editar";
            axios.put(url,{
                id: this.fillPersona.id,
                nombre : this.fillPersona.nombre,
                apellidos : this.fillPersona.apellidos,
                sueldo : this.fillPersona.sueldo,
                email : this.fillPersona.email
            }).then(response => {
                if(response){
                    toastr.info('Registro editado correctamente.');
                    this.Listar();
                    $("#modalCrearPersona").modal("hide");
                }
            }).
            catch(error=>{
                console.log('ocurrio un error')
            });
            this.LimpiarObjeto();
        },
        Eliminar(id){
            var url = "https://localhost:44346/api/Persona/Eliminar?id="+id;
            axios.delete(url).then(response => {
                if(response){
                    toastr.warning('Registro eliminado correctamente.');
                    this.Listar();
                }
            }).
            catch(error=>{
                console.log('ocurrio un error')
            });

        },
        LimpiarObjeto(){
            this.fillPersona.id = '';
            this.fillPersona.nombre = '';
            this.fillPersona.apellidos = '';
            this.fillPersona.sueldo = '';
            this.fillPersona.email = '';

        }
    },
    created() {
        this.Listar();
    }
});
app.mount('#crudPersona');