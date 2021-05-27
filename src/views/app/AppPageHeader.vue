<template>
  <v-layout class="align-center px-3 pb-1">
    <v-flex class="pl-3">
      <v-breadcrumbs divider="/" :items="breadcrumbs" class="px-2 py-1">
        <template v-slot:item="item">
          <v-breadcrumbs-item v-if="item.item.href=='home'" :href="item.item.href">
            <v-icon>home</v-icon>
          </v-breadcrumbs-item>
          <a
            @click="goto(item.item)"
            v-if="item.item.href!='home' && !item.item.disabled"
            class="v-breadcrumbs__item"
          >{{ item.item.text?item.item.text:'无' }}</a>
          <span
            class="v-breadcrumbs__item"
            v-if="item.item.disabled"
          >{{ item.item.text?item.item.text:'无' }}</span>
        </template>
      </v-breadcrumbs>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: "apm-app-pageheader",
  data() {
    return {
      breadcrumbs: []
    };
  },
  created: function() {
    window.theApp.$on("ROUTER_GOBACK", () => {
      this.goBack();
      this.init();
    });
    window.theApp.$on("ROUTER_ROUTE", (route, source) => {
      this.generateBreadcrumbs(route);
    });
    this.init();
  },
  methods: {
    goto(item) {
      this.breadcrumbs = this.breadcrumbs.slice(0, item.index);
      this.$router.apmRoute(item.href, item.query);
    },
    goBack() {
      if (this.breadcrumbs.length <= 1) {
        return;
      }
      this.breadcrumbs.pop();
      if (this.breadcrumbs.length > 1) {
        this.breadcrumbs[this.breadcrumbs.length - 1].disabled = true;
      }
    },
    init() {
      if (this.breadcrumbs.length <= 1) {
        this.generateBreadcrumbs({});
      }
    },
    generateBreadcrumbs(info) {
      let route = this.$router.history.current;
      let item = info;
      if (!info || !info.meta) {
        if (route.name) {
          item = this.$router.routerInfo(route.name);
        } else {
          item = this.$router.routerInfo(route.path);
        }
      }
      if (info.source == "menu") {
        clear(this.breadcrumbs);
      }
      if (item) {
        var breadcrumb = {
          text:
            item.meta.name ||
            (item.router.meta && item.router.meta.title) ||
            item.router.name,
          href: item.router.path,
          query: info.query,
          disabled: false
        };
        pushPath(breadcrumb, this.breadcrumbs);
      }
    }
  }
};

function pushPath(item, stack) {
  if (stack.length == 0) {
    let home = {
      index: 0,
      text: "首页",
      href: "home",
      disabled: false
    };
    stack.push(home);
  }
  item.index = stack.length;
  stack[stack.length - 1].disabled = false;
  stack.push(item);
  stack[stack.length - 1].disabled = true;
}

function clear(stack) {
  while (stack.length) {
    stack.pop();
  }
}
</script>