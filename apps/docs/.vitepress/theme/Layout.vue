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

<style>
.VPDoc {
  background: transparent;
}

.VPDoc .container {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
}

.VPDoc h1 {
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--color-foreground);
}

.VPDoc h2 {
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1.3;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  color: var(--color-foreground);
}

.VPDoc h3 {
  font-size: 1.375rem;
  font-weight: 600;
  line-height: 1.4;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--color-foreground);
}

.VPDoc p {
  font-size: 1rem;
  line-height: 1.75;
  margin-bottom: 1.25rem;
  color: var(--color-foreground);
}

.VPDoc a {
  color: var(--color-sidebar-primary);
  text-decoration: none;
  font-weight: 500;
}

.VPDoc a:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.VPDoc code {
  background: var(--color-secondary);
  color: var(--color-foreground);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.VPDoc pre {
  background: var(--color-secondary);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
  margin-bottom: 1.5rem;
}

.VPDoc pre code {
  background: transparent;
  padding: 0;
  border-radius: 0;
  font-size: 0.875rem;
  line-height: 1.6;
}

.VPDoc blockquote {
  border-left: 4px solid var(--color-sidebar-primary);
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: var(--color-muted-foreground);
  font-style: italic;
}

.VPDoc ul,
.VPDoc ol {
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
}

.VPDoc li {
  margin-bottom: 0.5rem;
  line-height: 1.75;
  color: var(--color-foreground);
}

.VPDoc table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
  font-size: 0.9375rem;
}

.VPDoc th {
  background: var(--color-secondary);
  font-weight: 600;
  text-align: left;
  padding: 0.75rem 1rem;
  border-bottom: 2px solid var(--color-border);
  color: var(--color-foreground);
}

.VPDoc td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-foreground);
}

.VPDoc tr:hover td {
  background: var(--color-secondary);
}
</style>
