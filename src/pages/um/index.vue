<script setup lang="ts">
</script>

<template>
  <RouterView>
    <div class="welcome-msg-container">
      <h2>{{ $t('welcometoum') }}</h2>
      <p>{{ $t('selectyouraction') }}</p>
    <!--
      <div class="loader" />
      <img class="auth-footer-mask" :src="authThemeMask" alt="auth-footer-mask" height="280" width="100">
    -->
    </div>
  </RouterView>
</template>
