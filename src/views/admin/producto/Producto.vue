<template>
  <div class="card">
    <Toolbar class="mb-4">
      <template #start>
        <Button
          label="Nuevo Producto"
          icon="pi pi-plus"
          class="p-button-success mr-2"
          @click="abrirNuevoModal"
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          class="p-button-danger"
          @click="confirmDeleteSelected"
          :disabled="!selectedProducts || !selectedProducts.length"
        />
      </template>

      <template #end>
        <FileUpload
          mode="basic"
          accept="image/*"
          :maxFileSize="1000000"
          label="Import"
          chooseLabel="Import"
          class="mr-2 inline-block"
        />
        <Button
          label="Export"
          icon="pi pi-upload"
          class="p-button-help"
          @click="exportCSV($event)"
        />
      </template>
    </Toolbar>

    <Dialog
      v-model:visible="productoDialog"
      :style="{ width: '450px' }"
      header="Detalles del Producto"
      :modal="true"
      class="p-fluid"
    >
    {{producto}}
      <img
        src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
        :alt="producto.image"
        class="product-image"
        v-if="producto.image"
      />
      <div class="field">
        <label for="name">Nombre</label>
        <InputText
          id="name"
          v-model.trim="producto.nombre"
          required="true"
          autofocus
          :class="{ 'p-invalid': enviar && !producto.nombre }"
        />
        <small class="p-error" v-if="enviar && !producto.nombre"
          >El campo nombre es requerido.</small
        >
      </div>
      <div class="field">
        <label for="description">Descripción</label>
        <Textarea
          id="description"
          v-model="producto.descripcion"
          required="true"
          rows="3"
          cols="20"
        />
      </div>

      <div class="field">
        <label class="mb-3">Categoria</label>
        <div class="formgrid grid">
          <div class="field-radiobutton col-6" v-for="cat in categorias" :key="cat.id">
            <RadioButton
              id="category1"
              name="category"
              :value="cat.id"
              v-model="producto.categoria_id"
            />
            <label for="category1">{{ cat.nombre }}</label>
          </div>
        </div>
      </div>

      <div class="formgrid grid">
        <div class="field col">
          <label for="price">Precio</label>
          <InputNumber
            id="price"
            v-model="producto.precio"
            mode="currency"
            currency="USD"
            locale="en-US"
          />
        </div>
        <div class="field col">
          <label for="quantity">Cantidad</label>
          <InputNumber id="quantity" v-model="producto.stock" integeronly />
        </div>
      </div>
      <template #footer>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          class="p-button-text"
          @click="ocultarDialog"
        />
        <Button
          label="Guardar"
          icon="pi pi-check"
          class="p-button-text"
          @click="guardarProducto"
        />
      </template>
    </Dialog>

    <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
                <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
						<h5 class="mb-2 md:m-0 p-as-md-center">Gestión Productos</h5>
						<span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
					</div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="id" header="ID" :sortable="true" style="min-width:12rem"></Column>
                <Column field="nombre" header="NOMBRE" :sortable="true" style="min-width:16rem"></Column>
                <Column header="IMAGEN">
                     <template #body="slotProps">
                        <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.image" class="product-image" />
                    </template>
                </Column>
                <Column field="precio" header="PRECIO" :sortable="true" style="min-width:8rem">
                    <template #body="slotProps">
                        {{formatCurrency(slotProps.data.price)}}
                    </template>
                </Column>
                <Column field="categoria.nombre" header="Categoria" :sortable="true" style="min-width:10rem"></Column>
               
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
  </div>
  <Toast/>
</template>

<script>
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import { FilterMatchMode } from 'primevue/api';
import * as productoService from '@/services/producto.service.js'
import * as categoriaService from '@/services/categoria.service.js'

export default {
  setup() {
      onMounted(async () => {

            listarProductos()

            const datos_categoria = await categoriaService.listarCategorias();
            categorias.value = datos_categoria.data


        })
        
    const toast = useToast();
    const producto = ref({});
    const enviar = ref(false);
    const productoDialog = ref(false);
    const products = ref();
    const categorias = ref();
    const selectedProducts = ref();
    const filters = ref({
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        });

    const formatCurrency = (value) => {
            if(value)
				return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
			return;
        };

        const listarProductos = async() => {
            const {data} = await productoService.listarProductos();
            products.value = data.data
        }

    const abrirNuevoModal = () => {
      producto.value = {};
      enviar.value = false;
      productoDialog.value = true;
    };

    const guardarProducto = async () => {
            enviar.value = true;

			if (producto.value.nombre.trim()) {
                if (producto.value.id) {
                    product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
                    products.value[findIndexById(product.value.id)] = product.value;
                    toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
                }
                else {
                     await productoService.guardarProducto(producto.value)
                    products.value.push(producto.value);
                    listarProductos()
                    toast.add({severity:'success', summary: 'Successful', detail: 'Producto Creado', life: 3000});
                }

                productoDialog.value = false;
                producto.value = {};
            }
        };

    return {
      abrirNuevoModal,
      producto,
      enviar,
      productoDialog,
      products,
      selectedProducts,
      filters,
      formatCurrency,
      categorias,
      guardarProducto
    };
  },
};
</script>

<style lang="scss" scoped>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 960px) {
        align-items: start;
	}
}

.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
    width: 50px;
    margin: 0 auto 2rem auto;
    display: block;
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
@media screen and (max-width: 960px) {
	::v-deep(.p-toolbar) {
		flex-wrap: wrap;
        
		.p-button {
            margin-bottom: 0.25rem;
        }
	}
}
</style>
