<script setup lang="ts">
import axios from 'axios';
import { useSettingsStore } from 'src/stores/settings-store';
import { getApp } from 'src/types/app-data';
import { RepositoryResponse } from 'src/types/repository-response';
import { onMounted, ref } from 'vue';

const settingsStore = useSettingsStore();

const username = ref('');
const password = ref('');
const uiProgress = ref(0);
const showProgressBar = ref(false);

onMounted(() => {
    username.value = settingsStore.$state.username;
    password.value = settingsStore.$state.password;
});

function saveSettings() {
    settingsStore.$patch({
        username: username.value,
        password: password.value,
    });
}

function downloadDepotDownloader() {
    axios
        .get(
            'https://api.github.com/repos/SteamRE/DepotDownloader/releases/latest',
        )
        .then((response: RepositoryResponse) => {
            const url = response?.data?.assets?.find((asset) => {
                return asset.name.includes('windows-x64');
            })?.browser_download_url;
            if (url) {
                getApp().downloadFile(url);
                showProgressBar.value = true;
                getApp().onProgress((progress) => {
                    uiProgress.value =
                        progress.transferredBytes / progress.totalBytes;
                });
                getApp().onDownloaded(() => {
                    showProgressBar.value = false;
                });
            }
        });
}

function downloadDotNet() {
    getApp().downloadDotNet();
}
</script>

<template>
    <q-page class="column q-px-lg">
        <h3>Settings</h3>
        <div class="q-gutter-md row">
            <q-input
                v-model="username"
                outlined
                label="Steam Username"
                class="fill-space"
                color="light-blue"
            >
            </q-input>
            <q-input
                v-model="password"
                outlined
                type="password"
                label="Steam Password"
                class="fill-space"
                color="light-blue"
            >
            </q-input>
            <q-btn
                round
                color="primary"
                icon="save"
                class="circle-button"
                @click="saveSettings"
            />
        </div>
        <div class="q-mt-lg q-gutter-x-md">
            <q-btn
                color="primary"
                label="Install DepotDownloader"
                @click="downloadDepotDownloader"
            />
            <q-btn
                color="primary"
                label="Download .NET 6.0"
                @click="downloadDotNet"
            />
        </div>
        <div class="q-mt-md text-subtitle1" v-if="showProgressBar">
            Downloading…
        </div>
        <q-linear-progress
            :value="uiProgress"
            v-if="showProgressBar"
            class="q-mt-md"
        />
    </q-page>
</template>
