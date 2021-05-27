const user = {
    state: {
        uid: '',
        token: '',
        roles: [],
        email: '',
        phone: '',
        organizations: '',
        avatar: '',
        introduction: '',
        language: 'zh_CN',
        timeZone: 'Asia/Shanghai'
    },
    mutations: {
        UID: (state, value) => {
            state.uid = value;
        },
        TOKEN: (state, value) => {
            state.token = value;
        },
        ROLES: (state, value) => {
            state.roles = value;
        },
        AVATAR: (state, value) => {
            state.avatar = value;
        },
        LANGUAGE: (state, value) => {
            state.language = value;
        },
        TIMEZONE: (state, value) => {
            state.timeZone = value;
        },

    },
    actions: {
        setUid(context, value) {
            context.commit("UID", value);
        },
        setToken(context, value) {
            context.commit("TOKEN", value);
        },
        setRoles(context, value) {
            context.commit("ROLES", value);
        },
        setAvatar(context, value) {
            context.commit("AVATAR", value);
        },
        setLanguage(context, value) {
            context.commit("LANGUAGE", value);
        },
        setTimezone(context, value) {
            context.commit("TIMEZONE", value);
        }
    }
}
export default user;