<script lang="ts" setup>
import { layoutConfig } from '@layouts'
import { can } from '@layouts/plugins/casl'
import { type NavLink, NavLinkStateName } from '@layouts/types'
import { getComputedNavLinkToProp, getDynamicI18nProps, isNavLinkActive } from '@layouts/utils'
import { useNavLinkSelectState } from '@/store/baseStore'

const props = withDefaults(defineProps<Props>(), {
  isSubItem: false,
})

const navlinkState = useNavLinkSelectState()
interface Props {
  item: NavLink

  // ℹ️ We haven't added this prop in vertical nav because we don't need such differentiation in vertical nav for styling
  isSubItem?: boolean
}

function handleNavLinkClick(event: MouseEvent, item: NavLink) {
  navlinkState.selectState.value = item.changeStateName ?? NavLinkStateName.None
}
</script>

<template>
  <li
    v-if="can(item.action, item.subject)"
    class="nav-link"
    :class="[{
      'sub-item': props.isSubItem,
      'disabled': item.disable,
    }]"
  >
    <Component
      :is="item.changeStateName ? 'div' : (item.to ? 'RouterLink' : 'a')"
      v-bind="getComputedNavLinkToProp(item)"
      :class="{ 'router-link-active router-link-exact-active': isNavLinkActive(item, $router), 'nav-item-clickable': !!item.changeStateName }"
      @click="handleNavLinkClick($event, item)"
    >
      <Component
        :is="layoutConfig.app.iconRenderer || 'div'"
        class="nav-item-icon"
        v-bind="item.icon || layoutConfig.verticalNav.defaultNavItemIconProps"
      />
      <Component
        :is="layoutConfig.app.i18n.enable ? 'i18n-t' : 'span'"
        class="nav-item-title"
        v-bind="getDynamicI18nProps(item.title, 'span')"
      >
        {{ item.title }}
      </Component>
    </Component>
  </li>
</template>

<style lang="scss">
.layout-horizontal-nav {
  .nav-link a {
    display: flex;
    align-items: center;
  }
}
.layout-horizontal-nav {
  .nav-link a,
  .nav-link .nav-item-clickable {
    display: flex;
    align-items: center;
  }

  .nav-item-clickable {
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    &.router-link-active {
      background-color: rgba(0, 0, 0, 0.08);
      font-weight: 600;
    }
  }
}
</style>
