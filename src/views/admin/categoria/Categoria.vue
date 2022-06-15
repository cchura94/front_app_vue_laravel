<template>
  <div class="card">
      <h1>Gestión Categorias</h1>

      <Toast />

        <Button label="Nueva Categoria" icon="pi pi-external-link" @click="abrirModal" />
        <Dialog header="Nueva Categoria" v-model:visible="categoriaModal" :style="{width: '50vw'}" :modal="true">
            
            <div class="p-fluid grid pt-4">
                <div class="field col-12 md:col-12">
                    <span class="p-float-label">
                        <InputText id="id-nombre" type="text" v-model="categoria.nombre" />
                        <label for="id-nombre">Ingrese Nombre</label>
                    </span>
                </div>
                <div class="field col-12 md:col-12">
                  <Textarea v-model="categoria.detalle" rows="5" cols="30" />
                </div>
            </div>

            <template #footer>
                <Button label="Cerrar" icon="pi pi-times" @click="cerrarModal" class="p-button-text"/>
                <Button label="Guardar Categoria" icon="pi pi-check" @click="guardarCat" autofocus />
            </template>
        </Dialog>


        <Dialog header="Editar Categoria" v-model:visible="categoriaEditModal" :style="{width: '50vw'}" :modal="true">
            
            <div class="p-fluid grid pt-4">
                <div class="field col-12 md:col-12">
                    <span class="p-float-label">
                        <InputText id="id-nombre" type="text" v-model="categoria.nombre" />
                        <label for="id-nombre">Ingrese Nombre</label>
                    </span>
                </div>
                <div class="field col-12 md:col-12">
                  <Textarea v-model="categoria.detalle" rows="5" cols="30" />
                </div>
            </div>

            <template #footer>
                <Button label="Cerrar" icon="pi pi-times" @click="cerrarModal2" class="p-button-text"/>
                <Button label="Guardar Categoria" icon="pi pi-check" @click="modificarCat(categoria.id)" autofocus />
            </template>
        </Dialog>

      <DataTable :value="categorias" ref="dt" responsiveLayout="scroll">
            <template #header>
                <div style="text-align: right">
                    <Button icon="pi pi-external-link" label="Exportar excel" @click="exportCSV($event)" />
                </div>
            </template>
            <Column field="id" header="ID"></Column>
            <Column field="nombre" header="NOMBRE"></Column>
            <Column field="detalle" header="DETALLE"></Column>
            <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="abrirModalEdit(slotProps.data)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteCategoria(slotProps.data)" />
                    </template>
                </Column>
        </DataTable>
        {{ categoria }}
  </div>
</template>

<script>

import { ref, onMounted } from 'vue'
import { useToast } from "primevue/usetoast";
import * as categoriaService from "@/services/categoria.service.js";

export default {

  setup(){
    const toast = useToast();

    const contador = ref(0);
    const categorias = ref();
    const categoria = ref({nombre: '', detalle: ''})
    const categoriaModal = ref(false)
    const categoriaEditModal = ref(false)
    const dt = ref();

    function aumentar(){
      contador.value++;
    }

    onMounted(() => {
      getCategorias();
      //productService.value.getProductsSmall().then(data => products.value = data);
    })

    function getCategorias(){
      categoriaService.listarCategorias().then(function(res){
        categorias.value = res.data
      })
    }

    async function guardarCat(){
      const {data} = await categoriaService.guardarCategoria(categoria.value);
      cerrarModal()
      getCategorias()
      mostrarToastCorrecto();
    }
    
    async function modificarCat(id){
      const {data} = await categoriaService.modificarCategoria(id, categoria.value);
      cerrarModal2()
      getCategorias()
      mostrarToastCorrecto();
    }

    const abrirModal = () => {
        categoriaModal.value = true;
    };

    const cerrarModal = () => {
        categoriaModal.value = false;
    }

    const cerrarModal2 = () => {
        categoriaEditModal.value = false;
    }

    const abrirModalEdit = (cat) => {
      categoria.value = cat
        categoriaEditModal.value = true;
    };

    const mostrarToastCorrecto = () => {
            toast.add({severity:'success', summary: 'Categoria Registrada', detail:'Se ha registrado la Categoria', life: 3000});
        }
    
    const exportCSV = () => {
      dt.value.exportCSV();
    };

    const editCategoria = (cat) => {
      console.log(cat)
      categoria.value = cat
      abrirModal();
    }


    return {
      contador,
      aumentar,
      categorias,
      guardarCat,
      categoria,
      categoriaModal,
      cerrarModal,
      abrirModal,
      exportCSV,
      dt,
      editCategoria,
      abrirModalEdit,
      categoriaEditModal,
      modificarCat,
      cerrarModal
    }
  }

}
</script>

<style>

</style>