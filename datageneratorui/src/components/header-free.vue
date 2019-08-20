<template>
    <nav class="navbar navbar-light navbar-expand-lg">
        <a href="/"><img id="takelogo" src='../assets/logo.png'> </a>
        <div class="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" id="/custom-row" href="/fcustom">Custom Rows</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="/combinations" href="/fcombinations">All Combinations</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="/pairs" href="/fpairs">All Pairs (Pairwise)</a>
                </li>
            </ul>
        </div>
        <div class="nav-item float-right header_right_menu">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link text-white" href="/login" @click="signin">Sign in</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'

export default {
    name: 'HeaderFree',
    data: function () {
        return {

        }
    },
    components: {
        Icon
    },
    mounted: function () {
    },
    methods: {
        signin: function() {
            localStorage.clear();
        }
    },
}
</script>

<style>
.navbar {
  /* border-radius: 4px; */
  padding: 0 1.5rem !important;
  margin-right: -16px;
  margin-left: -16px;
  margin-top: -1px;
  background: #1f0853 !important;
}
.navbar ul.navbar-nav:not(.mr-auto) li {
  line-height: 2.5rem;
  border-left: .5px solid #473c61;
  border-right: .5px solid #473c61;
}
.navbar-light .navbar-nav:not(.mr-auto) .nav-link {
  color: white;
  margin: 0 5px;
  /* border-bottom: 3px solid white; */
}
.navbar ul.navbar-nav:not(.mr-auto) li:hover {
  background: #502da3;
  color: white;
}
.navbar-light {
  background-color: #f8f8f8;
  border: 1px solid #e7e7e7;
}
.navbar-light .navbar-brand {
  font-size: 18px;
  color: #666 !important;
}
.corner_label {
    background: #dfdfdf;
}
#navbarSupportedContent {
    margin: 3px;
}
img.circle {
    height: 50px;
    width: 50px;
    border-radius: 50%;
}
.btn.dropdown-toggle {
    min-width: 100px;
    background-color: transparent !important;
    border-color: transparent !important;
}
.btn-secondary.dropdown-toggle:focus {
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
}
.badge {
    position: absolute;
    top: -5px;
    right: -5px;
    border-radius: 50%;
}
</style>
