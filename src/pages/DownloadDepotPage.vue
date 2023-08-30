<script setup lang="ts">
import { useSettingsStore } from 'src/stores/settings-store';
import { getApp } from 'src/types/app-data';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { Game } from 'src/types/game';
import gamesJson from '../../presets/presets.json';

const settingsStore = useSettingsStore();

let games: Game[] = [];
let localGames: string[] = [];

const appId = ref('');
const depotId = ref('');
const manifestId = ref('');
const saveTo = ref('C:\\Games\\GameFolder');
const disabled = ref(true);
const game = ref('');
const version = ref('');
const gameOptions = ref(localGames);
const versionOptions = ref<string[]>([]);

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

function filterGames(value: string, update: (callback: () => void) => void) {
    update(() => {
        const search = value.toLowerCase();
        gameOptions.value = localGames.filter(
            (gameName) => gameName.toLowerCase().indexOf(search) > -1,
        );
    });
}

function selectGame() {
    const gameResult = games.find((foundGame) => {
        return foundGame.name === game.value;
    });

    if (gameResult) {
        appId.value = gameResult.appId;
        versionOptions.value =
            gameResult.versions.map((version) => version.name) || [];
    }
}

function selectVersion() {
    const gameResult = games.find((foundGame) => foundGame.name === game.value);

    if (gameResult) {
        const versionResult = gameResult.versions.find(
            (foundVersion) => foundVersion.name === version.value,
        );
        if (versionResult) {
            appId.value = gameResult.appId;
            depotId.value = versionResult.depotId;
            manifestId.value = versionResult.manifestId;
        }
    }
}

function fetchGames() {
    axios
        .get<Game[]>(
            'https://raw.githubusercontent.com/WafuRuns/depot-downloader-gui/main/presets/presets.json',
        )
        .then((result) => {
            games = result.data;
            localGames = games.map((game) => game.name);
        })
        .catch(() => {
            games = gamesJson as Game[];
            localGames = games.map((game) => game.name);
        });
}

onMounted(() => {
    fetchGames();
});
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
        <h5>Select Preset</h5>
        <div class="q-gutter-md row">
            <q-select
                outlined
                v-model="game"
                use-input
                hide-selected
                fill-input
                :options="gameOptions"
                input-debounce="0"
                color="light-blue"
                label="Game"
                @filter="filterGames"
                @update:model-value="selectGame"
            >
                <template v-slot:no-option>
                    <q-item>
                        <q-item-section class="text-grey">
                            No results
                        </q-item-section>
                    </q-item>
                </template>
            </q-select>
            <q-select
                outlined
                v-model="version"
                use-input
                hide-selected
                fill-input
                :options="versionOptions"
                color="light-blue"
                label="Version"
                @update:model-value="selectVersion"
            >
                <template v-slot:no-option>
                    <q-item>
                        <q-item-section class="text-grey">
                            No results
                        </q-item-section>
                    </q-item>
                </template>
            </q-select>
        </div>
        <p class="q-mt-lg text-warning">
            Make sure to set your login information in the Settings tab and have
            DepotDownloader with .NET 6.0 installed.
        </p>
    </q-page>
</template>
