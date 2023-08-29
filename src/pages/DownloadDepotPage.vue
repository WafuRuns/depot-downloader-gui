<script setup lang="ts">
import { useSettingsStore } from 'src/stores/settings-store';
import { getApp } from 'src/types/app-data';
import { ref } from 'vue';

const settingsStore = useSettingsStore();

const appId = ref('');
const depotId = ref('');
const manifestId = ref('');
const saveTo = ref('C:\\Games\\GameFolder');
const disabled = ref(true);

function downloadDepot() {
    const username = settingsStore.$state.username;
    const password = settingsStore.$state.password;
    getApp().downloadDepot(
        appId.value,
        depotId.value,
        manifestId.value,
        saveTo.value,
        username,
        password,
    );
}

function validate() {
    const error = [appId.value, depotId.value, manifestId.value].findIndex(
        (value) => {
            return isNaN(parseInt(value)) || value === '';
        },
    );

    if (error === -1 && saveTo.value !== '') {
        disabled.value = false;
    } else {
        disabled.value = true;
    }
}
</script>

<template>
    <q-page class="column q-px-lg">
        <h3>Download Depot</h3>
        <div class="q-gutter-md row">
            <q-input
                v-model="appId"
                outlined
                label="App ID"
                class="fill-space"
                color="light-blue"
                :rules="[(val) => !isNaN(val) && val !== '']"
                @update:model-value="validate"
            >
            </q-input>
            <q-input
                v-model="depotId"
                outlined
                label="Depot ID"
                class="fill-space"
                color="light-blue"
                :rules="[(val) => !isNaN(val) && val !== '']"
                @update:model-value="validate"
            >
            </q-input>
            <q-input
                v-model="manifestId"
                outlined
                label="Manifest ID"
                style="flex: 4 auto"
                color="light-blue"
                :rules="[(val) => !isNaN(val) && val !== '']"
                @update:model-value="validate"
            >
            </q-input>
        </div>
        <div class="q-gutter-md q-mt-xs row">
            <q-input
                v-model="saveTo"
                outlined
                label="Save to…"
                style="flex: 10 auto"
                color="light-blue"
                :rules="[(val) => val !== '']"
                @update:model-value="validate"
            >
            </q-input>
            <q-btn
                round
                color="primary"
                icon="download"
                class="circle-button"
                :disable="disabled"
                @click="downloadDepot"
            />
        </div>
        <p class="q-mt-lg text-warning">
            Make sure to set your login information in the Settings tab and have
            DepotDownloader with .NET 6.0 installed.
        </p>
    </q-page>
</template>
