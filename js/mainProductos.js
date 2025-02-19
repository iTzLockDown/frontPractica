const app = Vue.createApp({
    data() {
        return {
            productos: [],
            fillProducto:{
                id:'',
                nombre: '',
                precio: '',
                stock: '',
            }
        };
    },
    methods: {
        async Listar() {
            var url = "https://localhost:44346/api/Values/Listar";

            axios.get(url).
            then(response => {
                this.productos = response.data;
            }).
            catch(
                error=>{
                    console.log('Listado incorrecto');
                }
            );
        },

        Grabar()
        {
            if(this.fillProducto.id===''){
                this.GrabarPost();

            }
            else {
                this.EditarPut();
            }
        },
        GrabarPost() {
            var url = "https://localhost:44346/api/Values/Grabar";
            axios.post(url,{
                nombre : this.fillProducto.nombre,
                precio : this.fillProducto.precio,
                stock : this.fillProducto.stock
            }).
            then(response => {
                if(response){
                     toastr.success('Registro creado correctamente.');
                    this.Listar();
                    $("#modalCrearProducto").modal("hide");
                }
            }).
            catch(error=>{
               console.log('ocurrio un error'+ error)
            });
            this.LimpiarObjeto();
        },

        Editar(producto){
            console.log(producto);
            $("#modalCrearProducto").modal("show");

            this.fillProducto.id = producto.id;
            this.fillProducto.nombre = producto.nombre;
            this.fillProducto.precio = producto.precio;
            this.fillProducto.stock = producto.stock;
        },

        EditarPut(){
            var url = "https://localhost:44346/api/Values/Editar";
            axios.put(url,{
                id: this.fillProducto.id,
                nombre : this.fillProducto.nombre,
                precio : this.fillProducto.precio,
                stock : this.fillProducto.stock
            }).then(response => {
                if(response){
                    toastr.info('Registro editado correctamente.');
                    this.Listar();
                    $("#modalCrearProducto").modal("hide");
                }
            }).
            catch(error=>{
                console.log('ocurrio un error')
            });
            this.LimpiarObjeto();
        },
        Eliminar(id){
            var url = "https://localhost:44346/api/Values/Eliminar?id="+id;
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
            this.fillProducto.id = '';
            this.fillProducto.nombre = '';
            this.fillProducto.precio = '';
            this.fillProducto.stock = '';
        }
    },
    created() {
        this.Listar();
    }
});
app.mount('#crudProductos');