<script setup lang="ts">
import TheHeader from "./components/TheHeader.vue";
import {onMounted, ref, toRefs} from "vue";
import {useUsersDataStore} from "@/stores/usersStore.ts";

const usersStore = useUsersDataStore();

const {usersData, validateMessage} = toRefs(usersStore);
const {saveData, getData, deleteRecord} = usersStore;

onMounted(() => {
  getData();
})

const possibleTypeOptions = [
  {key: 'local', label:'Локальный'},
  {key: 'ldap', label: 'LDAP'}
];
</script>

<template>
  <div class="container">
    <TheHeader />
    <Message severity="info" :closable="false">
      <i class="pi pi-info-circle"/>
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </Message>
    <Message severity="error" :closable="false" v-show="validateMessage">
      <i class="pi pi-exclamation-circle"/>
      {{validateMessage}}
    </Message>
    <DataTable
      :value="usersData"
    >
      <Column
        field="marker"
        header="Метки"
      >
        <template #body="{data}">
          <InputText
              fluid
              v-model="data.marker"
          />
        </template>
      </Column>
      <Column
        field="type"
        header="Тип записи"
      >
        <template #body="{data}">
          <Select
              option-label="label"
              option-value="key"
              fluid
              v-model="data.type"
              :options="possibleTypeOptions"
          />
        </template>
      </Column>
      <Column
          field="login"
          header="Логин"
      >
        <template #body="{data}">
          <InputText
              fluid
              v-model="data.login"
              :invalid="!data.login"
          />
        </template>
      </Column>
      <Column
          field="password"
          header="Пароль"
      >
        <template #body="{data}">
          <Password
              fluid
              toggle-mask
              v-show="data.type !== 'ldap'"
              v-model="data.password"
              :invalid="!data.password"
          />
        </template>
      </Column>
      <Column>
        <template #body="{index}">
          <i
              class="pi pi-trash"
              @click="() => deleteRecord(index)"
          />
        </template>
      </Column>
      <template #footer>
        <div class="table-footer">
          <Button
              label="Сохранить"
              icon="pi pi-save"
              class="table-footer__save-button"
              @click="saveData"
          />
        </div>
      </template>
    </DataTable>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pi-trash {
  cursor: pointer;
  user-select: none;
}

.table {
  &-input {
    width: 100%;
  }

  &-footer {
    display: flex;
    flex-direction: row;
    width: calc(100% - 60px);
    justify-content: end;
    margin: 0 30px;
  }
}

.password:deep(.p-inputtext) {
  width: 100%;
}
</style>