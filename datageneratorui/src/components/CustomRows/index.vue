<template>
    <DataTypeForm
            v-bind:url="url"
            v-bind:rowsCountActive="rowsCountActive"
            :maxValue={max}
    ></DataTypeForm>
</template>
<script>
    import DataTypeForm from "../DataTypeForm";

    export default {
        name: 'CustomRows',
        components: {
            DataTypeForm
        },
        props: ['max'],
        data: function () {
            return {
                url: "/custom-rows",
                rowsCountActive: true
            }
        }
    }
</script>