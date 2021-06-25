<template>
  <Disclosure as="nav" class="bg-green-400" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0 flex items-center">
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div v-if="!isActive" class="flex space-x-4">
              <router-link  class="font-semibold text-l tracking-tight px-6 hover:underline" to="/"> Login </router-link>
            </div>
            <div v-if="isActive && !this.$route.path.includes('/inicio')" class="flex space-x-4">
              <router-link v-for="item in navigation" :key="item.name" :to="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-white hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" :aria-current="item.current ? 'page' : undefined"> {{ item.name }}</router-link>
            </div>
            <div v-if="isActive && this.$route.path.includes('/inicio') " class="flex space-x-4">
              <router-link v-for="item in navigationCliente" :key="item.name" :to="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-white hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" :aria-current="item.current ? 'page' : undefined"> {{ item.name }}</router-link>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

          <!-- Profile dropdown -->
          <Menu v-if="isActive" as="div" class="ml-3 relative">
            <div>
              <MenuButton class="bg-green-400 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                <span class="sr-only">Open user menu</span>
                <UserIcon class="block h-6 w-6" aria-hidden="true" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Your Profile</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <a href="#" @click="cerrarSesion()" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign out</a>
                    </MenuItem>
                </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import { ref } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { MenuIcon, XIcon, UserIcon } from '@heroicons/vue/outline'
import { mapActions, mapGetters } from "vuex";



const navigation = [
    { name: 'Clientes', href: '/clientes', current: false },
    { name: 'Ingredientes', href: '/ingredientes', current: false },
    { name: 'Planes Alimenticios', href: '/planesAlim', current: false },
    { name: 'Menus', href: '/menus', current: false },
    { name: 'Cronograma', href: '/cronograma', current: false },
    { name: 'Consejos', href: '/consejos', current: false }
] 

const navigationCliente = [
    { name: 'Inicio', href: '/inicio', current: false }
  ]

export default {
    name: 'PxHeader',
    components: {
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        MenuIcon,
        XIcon,
        UserIcon,
    },
    setup() {
    const open = ref(false)

    return {
        navigation,
        open,
        navigationCliente,
    }
    },
    methods: {
      ...mapActions(['cerrarSesion'])
    },
    computed: {
        ...mapGetters(["isActive"]),
    },
}
</script>
