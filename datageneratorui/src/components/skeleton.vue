<template>
    <div id="app" class="container-fluid">
        <Header v-show="component.name === 'Signin' || component.name === 'Forgot' || component.name === 'Reset'? false : true" :auth="authInfo ? authInfo : ''" :active="active"/>
        <div class="row justify-content-center">
            <component :is="component" :auth="authInfo ? authInfo : ''" :max="maxResult"></component>
        </div>
    </div>
</template>

<script>
    import Header from './header'

    export default {
        name: 'skeleton',
        mounted: function () {
        },
        data: function () {
            return {
              component: "",
              authInfo: "",
              maxResult: 0,
              active: ""
            }
        },
        components: {
          Header
        }
    }
</script>

<style src="./../main.css"></style>