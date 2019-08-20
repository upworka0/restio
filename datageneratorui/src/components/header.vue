<template>
    <nav class="navbar navbar-light navbar-expand-lg">
        <a href="/"><img id="takelogo" src='../assets/logo.png'> </a>
        <!-- <span href="/"><span class="navbar-brand mb-0 h1">TakeRest DataGen</span></a> -->
        <div class="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
            <ul class="navbar-nav" v-if="role=='admin'">
                <li class="nav-item">
                    <a v-bind:class="active=='/custom'? 'nav-link active':'nav-link '" href="/custom" v-show="authInfo.custome_rows">Custom Rows</a>
                </li>
                <li class="nav-item">
                    <a v-bind:class="active=='/combinations'? 'nav-link active':'nav-link '" href="/combinations" v-show="authInfo.all_combinations">All Combinations</a>
                </li>
                <li class="nav-item">
                    <a v-bind:class="active=='/pairs'? 'nav-link active':'nav-link '" href="/pairs" v-show="authInfo.all_pairs">All Pairs(Pairwise)</a>
                </li>
                <li class="nav-item">
                    <a v-bind:class="active=='/usersetting'? 'nav-link float-left active':'nav-link float-left '" href="/usersetting">Profile</a>
                </li>
                <li class="nav-item">
                    <a v-bind:class="active=='/role'? 'nav-link float-left active':'nav-link float-left '" href="/role">User</a>
                </li>
            </ul>
            <ul class="navbar-nav" v-else-if="role=='user'">
                <li class="nav-item">
                    <a v-bind:class="active=='/custom'? 'nav-link active':'nav-link '" href="/custom" v-show="authInfo.custome_rows">Custom Rows</a>
                </li>
                <li class="nav-item">
                    <a v-bind:class="active=='/combinations'? 'nav-link active':'nav-link '" href="/combinations" v-show="authInfo.all_combinations">All Combinations</a>
                </li>
                <li class="nav-item">
                    <a v-bind:class="active=='/pairs'? 'nav-link active':'nav-link '" href="/pairs" v-show="authInfo.all_pairs">All Pairs(Pairwise)</a>
                </li>
                <li class="nav-item">
                   <a v-bind:class="active=='/usersetting'? 'nav-link active':'nav-link '" href="/usersetting">Profile</a>
                </li>
            </ul>
        </div>
        <div class="nav-item float-right header_right_menu">
            <ul class="navbar-nav mr-auto align-items-center" v-if="role=='admin'">
                <li class="nav-item position-relative mr-2 bell">
                    <icon name="bell"></icon>
                    <!--<b-badge variant="warning">3</b-badge> -->
                </li>
                <li class="nav-item">
                    <b-dropdown id="dropdown-1" right v-bind:text="authInfo.name+'  '" class="m-md-2">
                        <b-dropdown-item href="/login" @click="signout">Sign Out</b-dropdown-item>
                    </b-dropdown>
                </li>
                <img class='circle mr-auto' src='../assets/admin.png'>
            </ul>
            <ul class="navbar-nav mr-auto align-items-center" v-else-if="role=='user'">
                <li class="nav-item position-relative mr-2 bell">
                    <icon name="bell"></icon>
                    <!--<b-badge variant="warning">4</b-badge>-->
                </li>
                <li class="nav-item">
                    <b-dropdown id="dropdown-1" right v-bind:text="authInfo.name+'  '" class="m-md-2">
                        <b-dropdown-item href="/login" @click="signout">Sign Out</b-dropdown-item>
                    </b-dropdown>
                </li>
                <img class='circle mr-auto' src='../assets/avatar.png'>
            </ul>
            <ul class="navbar-nav mr-auto align-items-center" v-else>
                <li class="nav-item">
                    <a class="nav-link text-primary" href="/login" @click="signout">Sign In</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'

export default {
    name: 'Header',
    data: function () {
        return {
            role: 'free',
            visible: false,
            authInfo: this.auth
        }
    },
    components: {
        Icon
    },
    props: ['auth', 'active'],
    mounted: function () {
        const _role = this.auth.role
        if(_role) {
            this.role = _role
            this.visible = true
        }else{
            this.role = 'free'
            this.visible = false
        }
    },
    methods: {
        signout: function() {
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
}
.navbar-light .navbar-nav:not(.mr-auto) .nav-link.active {
  border-bottom: 3px solid white;
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
.bell .fa-icon{
    color: white;
    width: 24px;
    height: 24px;
}
.badge {
    position: absolute;
    top: -5px;
    right: -5px;
    border-radius: 50%;
}
.dropdown.btn-group.b-dropdown {
    border-left: 2px solid #473c61;
}
</style>
