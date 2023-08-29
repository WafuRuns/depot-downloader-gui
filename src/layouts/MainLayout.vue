<script setup lang="ts">
import { getApp } from 'src/types/app-data';

function maximizeApp() {
    getApp().maximize();
}

function minimizeApp() {
    getApp().minimize();
}

function closeApp() {
    getApp().close();
}

function openSteamDB() {
    getApp().openSteamDB();
}
</script>

<template>
    <q-layout view="hHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <div class="drag-bar">
                    <q-toolbar-title>Depot Downloader GUI</q-toolbar-title>
                </div>
                <q-btn flat round icon="minimize" @click="minimizeApp" />
                <q-btn flat round icon="fullscreen" @click="maximizeApp" />
                <q-btn flat round icon="close" @click="closeApp" />
            </q-toolbar>
        </q-header>
        <q-drawer
            :model-value="true"
            :width="250"
            :breakpoint="0"
            elevated
            class="bg-primary text-white"
        >
            <q-scroll-area class="fit">
                <q-list padding>
                    <router-link to="/" replace>
                        <q-item clickable v-ripple>
                            <q-item-section avatar>
                                <q-icon name="info" />
                            </q-item-section>
                            <q-item-section>Info</q-item-section>
                        </q-item>
                    </router-link>
                    <q-item clickable v-ripple @click="openSteamDB">
                        <q-item-section avatar>
                            <q-icon name="storage" />
                        </q-item-section>
                        <q-item-section>SteamDB</q-item-section>
                    </q-item>
                    <router-link to="/downloadDepot" replace>
                        <q-item clickable v-ripple>
                            <q-item-section avatar>
                                <q-icon name="inbox" />
                            </q-item-section>
                            <q-item-section>Download Depot</q-item-section>
                        </q-item>
                    </router-link>
                    <router-link to="/settings" replace>
                        <q-item clickable v-ripple>
                            <q-item-section avatar>
                                <q-icon name="settings" />
                            </q-item-section>
                            <q-item-section>Settings</q-item-section>
                        </q-item>
                    </router-link>
                </q-list>
            </q-scroll-area>
        </q-drawer>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>
