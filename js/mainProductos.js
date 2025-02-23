const app = Vue.createApp({
    data() {
        return {
            productos: [],
            fillProducto: {
                id: '',
                nombre: '',
                precio: '',
                cantStock: '',
            }
        };
    },
    methods: {
        async Listar() {
            var url = "https://localhost:44346/api/Values/Listar";

            axios.get(url)
                .then(response => {
                    this.productos = response.data;
                })
                .catch(error => {
                    console.log('Listado incorrecto');
                });
        },

        Grabar() {
            if (this.fillProducto.id === '') {
                this.GrabarPost();
            } else {
                this.EditarPut();
            }
        },

        GrabarPost() {
            var url = "https://localhost:44346/api/Values/Grabar";
            axios.post(url, {
                nombre: this.fillProducto.nombre,
                precio: this.fillProducto.precio,
                cantStock: this.fillProducto.cantStock
            })
                .then(response => {
                    if (response) {
                        toastr.success('Registro creado correctamente.');
                        this.Listar();
                        $("#modalCrearProducto").modal("hide");
                    }
                })
                .catch(error => {
                    console.log('Ocurrió un error', error);
                    toastr.error('Error al crear el producto.');
                });
            this.LimpiarObjeto();
        },

        Editar(producto) {
            console.log(producto);
            $("#modalCrearProducto").modal("show");

            this.fillProducto.id = producto.id;
            this.fillProducto.nombre = producto.nombre;
            this.fillProducto.precio = producto.precio;
            this.fillProducto.cantStock = producto.cantStock;
        },

        EditarPut() {
            var url = "https://localhost:44346/api/Values/Editar";
            axios.put(url, {
                id: this.fillProducto.id,
                nombre: this.fillProducto.nombre,
                precio: this.fillProducto.precio,
                cantStock: this.fillProducto.cantStock
            })
                .then(response => {
                    if (response) {
                        toastr.info('Registro editado correctamente.');
                        this.Listar();
                        $("#modalCrearProducto").modal("hide");
                    }
                })
                .catch(error => {
                    console.log('Ocurrió un error', error);
                    toastr.error('Error al editar el producto.');
                });
            this.LimpiarObjeto();
        },

        Eliminar(id) {
            var url = "https://localhost:44346/api/Values/Eliminar?id=" + id;
            axios.delete(url)
                .then(response => {
                    if (response) {
                        toastr.warning('Registro eliminado correctamente.');
                        this.Listar();
                    }
                })
                .catch(error => {
                    console.log('Ocurrió un error', error);
                    toastr.error('Error al eliminar el producto.');
                });
        },

        LimpiarObjeto() {
            this.fillProducto.id = '';
            this.fillProducto.nombre = '';
            this.fillProducto.precio = '';
            this.fillProducto.cantStock = '';
        },

        ActualizarStock(id, cantStock) {
            console.log(id, cantStock);
            $("#modalActualizarStock").modal("show");

            this.fillProducto.id = id;
            this.fillProducto.cantStock = cantStock;
        },

        ActualizarStockPut() {
            console.log(this.fillProducto); 
            var url = "https://localhost:44346/api/Values/AgregarStock?id=" + this.fillProducto.id + "&cantStock=" + this.fillProducto.cantStock;
            axios.put(url, {
                id: this.fillProducto.id,
                cantStock: this.fillProducto.cantStock
            })
                .then(response => {
                    if (response) {
                        toastr.info('Stock actualizado correctamente.');
                        this.Listar();
                        setTimeout(() => {
                            $("#modalActualizarStock").modal("hide");
                        }, 500); 
                    }
                })
                .catch(error => {
                    console.log('Ocurrió un error al actualizar stock', error);
                    toastr.error('Error al actualizar stock.');
                });
            this.LimpiarObjeto();
        },

        Venta(id, cantidad) {
            if (cantidad <= 0) {
                toastr.error("La cantidad debe ser mayor a 0.");
                return;
            }

            var url = `https://localhost:44346/api/Values/Vender?id=${id}&cantidad=${cantidad}`;
            axios.put(url, { id: id, cantidad: cantidad })
                .then(response => {
                    if (response) {
                        toastr.success('Venta realizada correctamente.');
                        this.Listar();
                        setTimeout(() => {
                            $("#modalVenta").modal("hide");
                        }, 500); 
                    }
                })
                .catch(error => {
                    console.log('Ocurrió un error al realizar la venta', error);
                    toastr.error('Error al realizar la venta.');
                });
            this.LimpiarObjeto();
        },
    },

    created() {
        this.Listar();
    }

});
app.mount('#crudProductos');