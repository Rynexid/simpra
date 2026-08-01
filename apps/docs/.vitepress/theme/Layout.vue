<script setup lang="ts">
import { computed } from 'vue'
import { useData, Content } from 'vitepress'
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from './components/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './components/collapsible'
import { ChevronRight, GalleryVerticalEnd } from 'lucide-vue-next'

const { theme, page } = useData()

const sidebarConfig = computed(() => theme.value.sidebar || {})

const isActive = (link: string) => {
  const rel = page.value.relativePath.replace(/\.md$/, '')
  const linkPath = link.replace(/^\//, '').replace(/\/$/, '')
  return rel === linkPath || rel.startsWith(linkPath + '/')
}
</script>

<template>
  <SidebarProvider>
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" as-child>
              <a href="/">
                <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd class="size-4" />
                </div>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">Simpra Docs</span>
                  <span class="truncate text-xs">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup v-for="(items, base) in sidebarConfig" :key="base">
          <SidebarGroupLabel>{{ base.replace(/^\//, '').replace(/\/$/, '') || 'Root' }}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <template v-for="item in items" :key="item.text">
                <SidebarMenuItem v-if="item.items && item.items.length > 0">
                  <Collapsible default-open class="group/collapsible">
                    <CollapsibleTrigger as-child>
                      <SidebarMenuButton>
                        <span>{{ item.text }}</span>
                        <ChevronRight class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuItem v-for="sub in item.items" :key="sub.text">
                          <SidebarMenuButton as-child :is-active="isActive(sub.link)">
                            <a :href="sub.link">
                              <span>{{ sub.text }}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarMenuItem>
                <SidebarMenuItem v-else>
                  <SidebarMenuButton as-child :is-active="isActive(item.link)">
                    <a :href="item.link">
                      <span>{{ item.text }}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </template>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Content />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
