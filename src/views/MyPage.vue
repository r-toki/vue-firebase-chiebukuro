<template>
  <div class="my-page">
    <h1 class="text-center">{{ user.data.displayName }}'s Page</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MyPage',
  computed: {
    ...mapGetters({
      user: 'user'
    })
  }
}
</script>
