<template>
    <v-app style="background-color:#f5f5f5">
        <div class="login-banner"></div>
        <v-content style="margin-top:100px;">
            <v-card class="mx-auto" max-width="500" style="padding:20px 55px;">
                <v-layout class="d-flex flex-column pl-2 pr-2" jusity-content="center" align-items="center">
                    <!-- <v-avatar color="indigo" size="64" class="mx-auto">
                      <v-icon dark size="40">mdi-account-circle</v-icon>
                    </v-avatar>-->
                    <v-layout class="d-flex justify-center align-center">
                        <img src="avator.png" height="48" alt="appmd"/>
                    </v-layout>
                    <!-- <v-card-subtitle style="text-align:center;color:black;font-size:large;">快速开发平台</v-card-subtitle> -->
                    <v-text-field autofocus placeholder="用户名" v-model="username"></v-text-field>
                    <v-text-field
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'"
                            @click:append="showPassword = !showPassword"
                            :error-messages="erroMessage"
                            v-model="password"
                            placeholder="密码"
                    ></v-text-field>
                    <v-checkbox dense hide-details label="记住我"></v-checkbox>
                </v-layout>
                <v-card-actions
                        class="d-flex flex-column pl-2 pr-2"
                        jusity-content="center"
                        align-items="center"
                >
                    <v-btn
                            tile
                            color="primary"
                            :loading="queryLoading"
                            large
                            style="width:120px;"
                            @click="doLogin"
                    >登录
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-content>
    </v-app>
</template>
<script>
    import ApmMinxins from "@/minxins/ApmMinxins";
    import envConfig from '@/config/'

    export default {
        name: "v-login",
        mixins: [ApmMinxins],
        data: function () {
            return {
                showPassword: false,
                username: null,
                password: null,
                erroMessage: null
            };
        },
        methods: {
            doLogin: function () {
                let params = {
                    username: this.username,
                    password: this.password
                };
                this.$request.request("APP_LOGIN", {}, {params: params}).then(response => {
                    if (response.code == 200) {
                        localStorage.setItem("token", response.data.token);
                        let user = {
                            displayName: this.username,
                            id: this.username,
                            uid: this.username
                        }
                        this.storeUserInfo(user);
                        window.location.href="./";
                    } else {
                        this.loginFaild();
                    }
                });
            },
            storeUserInfo(user) {
                let userProfile = {
                    id: user.id,
                    uid: user.uid,
                    displayName: user.displayName,
                    origin: user
                }
                localStorage.setItem("profile", JSON.stringify(userProfile));
            },
            loginFaild() {
                this.erroMessage = "用户名或密码错误";
                localStorage.clear();
            }
        }
    };
</script>