<template>
  <!-- <v-flex> -->
  <v-card class="elevation-0" min-width="350" max-height="400" max-width="350">
    <!-- <v-toolbar flat dense color="transparent">
      <v-toolbar-title>
        <h4>Notification</h4>
      </v-toolbar-title>
    </v-toolbar>-->
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-list two-line class="pa-0">
        <template v-for="(item,index) in notifications">
          <v-divider v-if="index>0" :key="'divider'+index"></v-divider>
          <v-list-item :key="index" @click="handleClick">
            <v-list-item-avatar :color="item.color">
              <v-icon dark>{{ item.icon }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle v-html="item.title"></v-list-item-subtitle>
            </v-list-item-content>
            <!-- <v-list-item-action class="caption">{{ item.timeLabel }}</v-list-item-action> -->
          </v-list-item>
        </template>
        <v-list-item v-if="notifications.length==0">
          <v-list-item-content>
            <v-list-item-title>没有消息</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- <v-divider></v-divider>
        <v-btn block class="ma-0">查看所有消息</v-btn>
      <v-divider></v-divider>-->
    </v-card-text>
  </v-card>
  <!-- <v-btn block class="ma-0">查看所有消息</v-btn>
  </v-flex>-->
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        title: "New user registered",
        color: "light-green",
        icon: "account_circle",
        timeLabel: "Just now"
      },
      {
        title: "New order received",
        color: "light-blue",
        icon: "shopping_cart",
        timeLabel: "2 min ago"
      },
      {
        title: "New payment made",
        color: "cyan",
        icon: "payment",
        timeLabel: "24 min ago"
      }
    ]
  }),
  methods: {
    handleClick: e => {
    }
  },
  computed: {
    notifications() {
      return this.items;//this.$store.getters.notifications;
    }
  }
};
</script>