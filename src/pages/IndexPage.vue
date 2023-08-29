<script setup lang="ts"></script>

<template>
    <q-page class="column q-px-lg">
        <h3>Info</h3>
        <p class="text-body1">
            This application is designed to simplify working with
            DepotDownloader, a tool that allows you to download older game
            versions from Steam (assuming that they were published).
        </p>
        <p class="text-body1">
            Please, bear in mind that this exists so that we don't need to teach
            people to use the command line or for those who feel like it is
            tedious. It's not as flexible and doesn't support all
            DepotDownloader's features. If you need any of those, CLI is the way
            to go.
        </p>
        <p class="text-body1 text-warning">
            Before using the app, go to the Settings tab, install
            DepotDownloader, .NET 6.0 and set your Steam username and password.
            The password is stored locally and shouldn't be accessible outside
            of your computer. However, using Steam Guard is still very
            recommended.
        </p>
        <h5>How to get the IDs</h5>
        <p class="text-body1">
            To download the game's data, you will need to go to the SteamDB tab.
            This will open your browser and you'll be able to find your game
            there. Once you find it, there should be a table that says
            <b>App ID</b>. Afterwards, head to Depots and choose the one that
            seems to be relevant. Sometimes, you have to download more of them,
            this is because some games have separate Binaries (or
            Bins/Executables) and Content (sometimes Common) or even the
            languages. There is no easy way to tell if any of them is required,
            but they're usually labeled well enough to know what's mandatory,
            sometimes you have to do a bit of trial and error. Select the depot
            and copy its <b>Depot ID</b> in the first column and click on it.
            Finally, head to the Manifests tab and select the date that seems to
            match the patch you're looking for and copy its <b>Manifest ID</b>.
            Now you just fill this data in the Download Depot tab, set the
            folder where you want the game to be and click the download button.
        </p>
        <p class="text-body1 text-warning">
            If downloading more than one depot, make sure all of them make sense
            together. For example, getting a 2023 binaries and 2020 content
            would likely cause some issues. The date doesn't have to match
            exactly, but you have to find the closest match, that way it makes
            sense with the way Steam would download the game natively at the
            time of the manifest.
        </p>
    </q-page>
</template>
