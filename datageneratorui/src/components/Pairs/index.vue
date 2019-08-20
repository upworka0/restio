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
        name: 'Pairs',
        components: {
            DataTypeForm
        },
        props: ['max'],
        data: function () {
            return {
                url: "/pairs",
                rowsCountActive: false
            }
        }
    }
</script>