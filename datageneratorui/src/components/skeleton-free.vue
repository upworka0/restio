<template>
    <div id="app" class="container-fluid">
        <HeaderFree :max="maxResult"/>
        <div class="row">
            <component :is="component" :max="maxResult"></component>
        </div>
        <div v-if="component==''" class="row mt-5 justify-content-center align-items-center">
            <h1 style="color:#03f;">Welcome to TakeRest.io</h1>
        </div>
    </div>
</template>

<script>
    import HeaderFree from './header-free'

    export default {
        name: 'skeletonfree',
        mounted: function () {
        },
        data: function () {
            return {
              component: "",
              maxResult: 0
            }
        },
        components: {
          HeaderFree
        }
    }
</script>

<style src="./../main.css"></style>
