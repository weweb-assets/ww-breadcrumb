<template>
    <nav
        class="breadcrumbs-container"
        :class="[`style-${content.displayStyle || 'standard'}`, { collapsed: content.collapse }]"
        aria-label="Breadcrumb"
    >
        <ol class="breadcrumbs-list">
            <li
                v-for="(item, index) in breadcrumbItems"
                :key="index"
                class="breadcrumb-item"
                :class="{
                    active: item.isActive,
                    'with-icon': item.icon,
                }"
            >
                <wwLayoutItemContext is-repeat :index="index" :data="item">
                    <wwElement
                        v-bind="content.linkElement"
                        class="breadcrumb-link"
                        :ww-props="{ wwLink: item.link, noDropzone: true }"
                    >
                        <wwElement
                            :ww-props="{ icon: item.icon, color: content.iconColor }"
                            v-bind="content.iconElement"
                            class="breadcrumb-icon"
                            v-if="item.iconEnabled && item.icon"
                        />

                        <wwElement
                            :ww-props="{ text: item.label }"
                            v-bind="content.textElement"
                            class="breadcrumb-text"
                        />
                    </wwElement>

                    <!-- Separator -->
                    <span
                        v-if="index < breadcrumbItems.length - 1"
                        class="breadcrumb-separator"
                        :style="{
                            color: content.separatorColor,
                            fontSize: content.separatorSize,
                        }"
                    >
                        <span
                            v-if="content.separatorType === 'custom' && content.customSeparator"
                            v-html="content.customSeparator"
                        ></span>
                        <template v-else>
                            {{ getSeparator(content.separatorType) }}
                        </template>
                    </span>
                </wwLayoutItemContext>
            </li>
        </ol>
    </nav>
</template>

<script>
import { computed, watch, ref, watchEffect } from 'vue';
import { useBrowserLocation } from '@vueuse/core';

export default {
    props: {
        content: {
            type: Object,
            required: true,
        },
        uid: {
            type: String,
            required: true,
        },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: ['trigger-event'],
    setup(props, { emit }) {
        // Use VueUse's useBrowserLocation for reactive location
        const location = useBrowserLocation();

        // Create a map to store icon HTML for each item
        const itemIconsHTML = ref({});

        // Get current editor path if in editor
        const getEditorPath = () => {
            /* wwEditor:start */
            const currentPaths = wwLib.wwWebsiteData.getCurrentPage().paths;
            return currentPaths[wwLib.wwLang.lang] || currentPaths.default;
            /* wwEditor:end */
            return null;
        };

        // Reactive path that uses the editor path in editor, or browser location in preview
        const currentPath = computed(() => {
            const editorPath = getEditorPath();
            return editorPath || location.value.pathname;
        });

        // Match a path and return the matched page if found
        const matchPath = path => {
            // Get all website pages
            const pages = wwLib.wwWebsiteData.getPages();

            // Normalize input path (remove leading slash if present)
            const normalizedPath = path.startsWith('/') ? path.substring(1) : path;

            for (const page of pages) {
                // Get the correct path for current language
                const pagePath = page.paths[wwLib.wwLang.lang] || page.paths.default;

                // Skip pages without paths
                if (!pagePath) continue;

                if (normalizedPath === '' && pagePath === 'home') {
                    return page;
                }

                // Convert page path pattern to regex
                // Replace {{varName|defaultValue}} with regex that matches any value
                const pathPattern = pagePath.replace(/\{\{[^}]+\}\}/g, '[^/]+');
                const pathRegex = new RegExp(`^${pathPattern}$`);

                // Check if normalized path matches the pattern
                if (pathRegex.test(normalizedPath)) {
                    return page;
                }
            }

            return null;
        };

        // Generate breadcrumbs from the reactive URL path
        const generateBreadcrumbsFromUrl = () => {
            // Split the path into segments and filter out empty segments
            const pathSegments = currentPath.value.split('/').filter(segment => segment);
            if (pathSegments[0] !== '') {
                pathSegments.unshift('');
            }

            // Create breadcrumb items from path segments
            const items = [];

            // Add items for each path segment
            let currentUrl = '';
            const currentPageId = wwLib.wwWebsiteData.getCurrentPage().linkId;

            for (let i = 0; i < pathSegments.length; i++) {
                const segment = pathSegments[i];
                if (segment !== '') {
                    currentUrl += `/${segment}`;
                }

                // Format the segment for display (capitalize, replace hyphens with spaces)
                const formattedLabel = segment.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

                // Check if the path exists
                const matchedPage = matchPath(currentUrl);

                items.push({
                    label: segment === '' ? 'Home' : formattedLabel,
                    icon: null,
                    isActive: matchedPage && matchedPage.linkId === currentPageId,
                    ...(matchedPage
                        ? {
                              link: { type: 'internal', pageId: matchedPage.linkId, targetBlank: false },
                          }
                        : undefined),
                });
            }
            return items;
        };

        // Update the breadcrumbItems computed property
        const rawBreadcrumbItems = computed(() => {
            // If in auto mode, generate breadcrumbs from URL path
            if (props.content?.mode === 'auto') {
                return generateBreadcrumbsFromUrl();
            }

            // Otherwise, use the manual items
            // Handle both array of objects and simple array of strings
            if (!Array.isArray(props.content?.items)) return [];

            const currentPageId = wwLib.wwWebsiteData.getCurrentPage().linkId;

            return props.content.items.map(item => {
                if (typeof item === 'string') {
                    return { label: item, hasLink: false };
                }

                // If it's an object, ensure it has a label
                if (typeof item === 'object') {
                    const label = wwLib.wwUtils.resolveObjectPropertyPath(
                        item,
                        props.content?.labelPropertyPath || 'label'
                    );

                    const link = wwLib.wwUtils.resolveObjectPropertyPath(
                        item,
                        props.content?.urlPropertyPath || 'link'
                    );

                    const icon = wwLib.wwUtils.resolveObjectPropertyPath(
                        item,
                        props.content?.iconPropertyPath || 'icon'
                    );

                    // Check if this item is active (if it has an internal link to the current page)
                    const isActive = link?.type === 'internal' && link?.pageId === currentPageId;

                    const data = {
                        ...item,
                        label: label || 'Unnamed',
                        link: link || null,
                        icon: icon || null,
                        isActive: isActive,
                    };

                    return data;
                }

                return { label: 'Invalid item' };
            });
        });

        const links = new Map();

        for (let i = 0; i < rawBreadcrumbItems.value.length; i++) {
            const item = rawBreadcrumbItems.value[i];
            if (item.link) {
                links.set(i, wwLib.wwElement.useLink({ forcedLinkRef: item.link }));
            }
        }

        const breadcrumbItems = computed(() => {
            return rawBreadcrumbItems.value.map((item, index) => {
                if (item.link) {
                    const { hasLink, tag, properties } = links.get(index);

                    return {
                        ...item,
                        hasLink: hasLink.value,
                        linkTag: tag.value,
                        linkProperties: properties.value,
                    };
                }

                return item;
            });
        });

        // Editor state
        const isEditing = computed(() => {
            /* wwEditor:start */
            return props.wwEditorState.isEditing;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        });

        // Methods
        const getSeparator = type => {
            switch (type) {
                case 'slash':
                    return '/';
                case 'arrow':
                    return '›';
                case 'chevron':
                    return '>';
                case 'dot':
                    return '•';
                case 'pipe':
                    return '|';
                case 'dash':
                    return '-';
                default:
                    return '/';
            }
        };

        const onItemClick = (item, index) => {
            if (isEditing.value) return;

            emit('trigger-event', {
                name: 'click',
                event: { value: item, index },
            });

            // Handle navigation using wwLib.wwApp.goTo
            if (item.url && typeof wwLib !== 'undefined' && wwLib.wwApp) {
                wwLib.wwApp.goTo(item.url);
            }
        };

        return {
            breadcrumbItems,
            getSeparator,
            onItemClick,
            isEditing,
            itemIconsHTML,
        };
    },
};
</script>

<style lang="scss">
.breadcrumbs-container {
    width: 100%;
    font-size: v-bind('content.fontSize || "14px"');

    .breadcrumbs-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        list-style: none;
        margin: 0;
        padding: 0;
        gap: v-bind('content.itemSpacing || "4px"');
    }

    .breadcrumb-item {
        display: flex;
        align-items: center;
        white-space: nowrap;

        &.with-icon {
            display: flex;
            align-items: center;
        }

        .breadcrumb-icon {
            display: inline-flex;
            align-items: center;
            margin-right: 4px;

            svg {
                width: 16px;
                height: 16px;
            }
        }

        .breadcrumb-link {
            text-decoration: none;
            transition: color 0.2s ease;
            color: v-bind('content.linkColor || "#6B7280"');
        }

        .breadcrumb-text {
            transition: text-decoration 0.2s ease;
        }

        .breadcrumb-link:hover .breadcrumb-text {
            text-decoration: v-bind('content.hoverDecoration || "none"');
        }

        .breadcrumb-separator {
            margin: 0 v-bind('content.separatorSpacing || "8px"');
        }

        &.active {
            .breadcrumb-link,
            .breadcrumb-text {
                font-weight: v-bind('content.activeItemFontWeight || "600"');
                color: v-bind('content.activeColor || "#111827"');
            }
        }
    }

    // Different styles
    &.style-standard {
        // Default style already applied
    }

    &.style-pills {
        .breadcrumb-item {
            background-color: v-bind('content.pillBackgroundColor || "#f0f0f0"');
            padding: 4px 12px;
            border-radius: 16px;

            .breadcrumb-separator {
                background-color: transparent;
            }

            &.active {
                background-color: v-bind('content.activePillBackgroundColor || "#e0e0e0"');
            }
        }
    }

    &.style-arrows {
        .breadcrumb-item {
            position: relative;
            padding: 4px 20px 4px 30px;
            background-color: v-bind('content.arrowBackgroundColor || "#f0f0f0"');

            &:first-child {
                padding-left: 15px;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
            }

            &:last-child {
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
            }

            &:not(:last-child):after {
                content: '';
                position: absolute;
                top: 0;
                right: -10px;
                width: 20px;
                height: 100%;
                background-color: inherit;
                clip-path: polygon(0 0, 50% 50%, 0 100%, 0 0, 100% 0, 50% 50%, 100% 100%, 0 100%);
                z-index: 1;
            }

            .breadcrumb-separator {
                display: none;
            }
        }
    }

    &.style-underline {
        .breadcrumb-item {
            .breadcrumb-link {
                text-decoration: underline;
            }
        }
    }

    // Collapsed behavior
    &.collapsed {
        .breadcrumbs-list {
            position: relative;

            // Hide all middle items
            .breadcrumb-item:not(:first-child):not(:last-child) {
                display: none;
            }

            // Show ellipsis between first and last items
            .breadcrumb-item:first-child {
                &::after {
                    content: '...';
                    display: inline-block;
                    margin: 0 8px;
                }
            }

            // Adjust separator for the first item
            .breadcrumb-item:first-child .breadcrumb-separator {
                display: none;
            }
        }
    }
}
</style>
