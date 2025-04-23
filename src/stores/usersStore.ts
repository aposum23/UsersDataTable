import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {IUser} from "@/types/userTypes.ts";

export const useUsersDataStore = defineStore('usersData', () => {
  const usersData = ref<IUser[]>([]);
  const validateMessage = ref<string>('');

  const validateData = () => {
    for(const user: IUser of usersData.value) {
      if (!user.login) {
        validateMessage.value = 'Логин должен быть заполнен'
        return false;
      }
      if (!user.password && user.type !== 'ldap') {
        validateMessage.value = 'Пароль должен быть заполнен'
        return false;
      }
    }

    validateMessage.value = '';

    return true;
  }

  const transformData = () => {
    return usersData.value.map(({marker, ...rest}) => {
      const splitMarker = marker.split(';');
      return {
        marker: splitMarker.map((element): {text: string} => {return {text: element}}),
        ...rest
      }
    })
  }

  const saveData = (validate: boolean = true) => {
    try {
      const validation = validate ? validateData() : true;
      if (validation) {
        const transformedData = transformData();
        const dataJSON = JSON.stringify(transformedData);
        window.localStorage.setItem('users', dataJSON);
      }
    }
    catch (e) {
      console.error('json stringify error:', e);
    }
  }

  const getData = () => {
    try {
      const users = JSON.parse(window.localStorage.getItem('users'));
      usersData.value = users.map(({marker, ...rest}) => {
        let markerStr = '';
        for (let index = 0; index <= marker.length; index++) {
          markerStr += marker[index]?.text || '';
          markerStr += index < marker.length - 1 ? ';' : ''
        }
        return {
          marker: markerStr,
          ...rest
        }
      })
    } catch (e) {
      console.error('Could`t get data because it`s empty:', e);
    }
  }

  const addNewRecord = () => {
    usersData.value.push(
        {
          marker: '',
          type: 'ldap',
          login: '',
          password: null
        }
    );
  };

  const deleteRecord = (index: number) => {
    usersData.value.splice(index, 1);
    saveData(false);
  }

  return {
    usersData,
    validateMessage,
    saveData,
    getData,
    addNewRecord,
    deleteRecord
  }
})
