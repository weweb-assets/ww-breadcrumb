<template>
    <nav
        class="breadcrumbs-container"
        :class="[`style-${content.displayStyle || 'standard'}`, { responsive: content.responsiveCollapse }]"
        aria-label="Breadcrumb"
    >
        <ol class="breadcrumbs-list">
            <li
                v-for="(item, index) in breadcrumbItems"
                :key="index"
                class="breadcrumb-item"
                :class="{
                    active: index === breadcrumbItems.length - 1,
                    'with-icon': item.icon,
                }"
            >
                <!-- Home icon special case -->
                <span
                    v-if="index === 0 && content.showHomeIcon"
                    class="breadcrumb-icon home-icon"
                    :style="{ color: content.iconColor }"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="16"
                        height="16"
                    >
                        <path
                            d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"
                        />
                        <path
                            d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"
                        />
                    </svg>
                </span>

                <!-- Item icon if present -->
                <span v-else-if="item.icon" class="breadcrumb-icon" :style="{ color: content.iconColor }">
                    <span v-html="item.icon"></span>
                </span>

                <!-- Item link or text -->
                <a
                    v-if="index !== breadcrumbItems.length - 1 || !content.disableLastItemLink"
                    href="#"
                    class="breadcrumb-link"
                    :style="{
                        color: index === breadcrumbItems.length - 1 ? content.activeColor : content.linkColor,
                        fontWeight:
                            index === breadcrumbItems.length - 1 ? content.activeItemFontWeight : content.fontWeight,
                        fontSize: content.fontSize,
                        fontFamily: content.fontFamily,
                    }"
                    @click.prevent="onItemClick(item, index)"
                >
                    {{ item.label }}
                </a>
                <span
                    v-else
                    class="breadcrumb-text"
                    :style="{
                        color: content.activeColor,
                        fontWeight: content.activeItemFontWeight,
                        fontSize: content.fontSize,
                        fontFamily: content.fontFamily,
                    }"
                >
                    {{ item.label }}
                </span>

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
            </li>
        </ol>
    </nav>
</template>

<script>
import { computed, ref, watch } from 'vue';

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
        // Add this function inside the setup function, before the breadcrumbItems computed property
        const generateBreadcrumbsFromUrl = () => {
            // Get the current page URL path
            const currentPath = wwLib.getFrontWindow().location.pathname;

            // Split the path into segments and filter out empty segments
            const pathSegments = currentPath.split('/').filter(segment => segment);

            // Create breadcrumb items from path segments
            const items = [];

            // Always add home item
            items.push({
                label: 'Home',
                url: '/',
                icon: props.content?.showHomeIcon
                    ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" /><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" /></svg>'
                    : null,
            });

            // Add items for each path segment
            let currentUrl = '';
            for (let i = 0; i < pathSegments.length; i++) {
                const segment = pathSegments[i];
                currentUrl += `/${segment}`;

                // Format the segment for display (capitalize, replace hyphens with spaces)
                const formattedLabel = segment.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

                items.push({
                    label: formattedLabel,
                    url: currentUrl,
                    icon: null,
                });
            }

            return items;
        };

        // Update the breadcrumbItems computed property
        const breadcrumbItems = computed(() => {
            // If in auto mode, generate breadcrumbs from URL path
            if (props.content?.mode === 'auto') {
                return generateBreadcrumbsFromUrl();
            }

            // Otherwise, use the manual items
            // Handle both array of objects and simple array of strings
            if (!Array.isArray(props.content?.items)) return [];

            return props.content.items.map(item => {
                if (typeof item === 'string') {
                    return { label: item };
                }

                // If it's an object, ensure it has a label
                if (typeof item === 'object') {
                    const label = wwLib.wwUtils.resolveObjectPropertyPath(
                        item,
                        props.content?.labelPropertyPath || 'label'
                    );

                    const url = wwLib.wwUtils.resolveObjectPropertyPath(item, props.content?.urlPropertyPath || 'url');

                    const icon = wwLib.wwUtils.resolveObjectPropertyPath(
                        item,
                        props.content?.iconPropertyPath || 'icon'
                    );

                    return {
                        ...item,
                        label: label || 'Unnamed',
                        url: url || '#',
                        icon: icon || null,
                    };
                }

                return { label: 'Invalid item' };
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

        // Internal value for selected item
        const { value: selectedItem, setValue: setSelectedItem } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'selectedItem',
            type: 'object',
            defaultValue: null,
        });

        // Computed properties

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

            setSelectedItem(item);

            emit('trigger-event', {
                name: 'click',
                event: { value: item, index },
            });
        };

        // Watch for changes to initialValue
        watch(
            () => props.content?.initialValue,
            newValue => {
                if (newValue !== undefined && newValue !== null) {
                    setSelectedItem(newValue);
                    emit('trigger-event', {
                        name: 'initValueChange',
                        event: { value: newValue },
                    });
                }
            },
            { immediate: true }
        );

        return {
            breadcrumbItems,
            selectedItem,
            setSelectedItem,
            getSeparator,
            onItemClick,
            isEditing,
        };
    },
};
</script>

<style lang="scss" scoped>
.breadcrumbs-container {
    width: 100%;
    padding: v-bind('content.verticalPadding || "8px"') v-bind('content.horizontalPadding || "0px"');
    border-radius: v-bind('content.borderRadius || "0px"');

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

            &:hover {
                text-decoration: v-bind('content.hoverDecoration');
            }
        }

        .breadcrumb-separator {
            margin: 0 v-bind('content.separatorSpacing || "8px"');
        }

        &.active {
            .breadcrumb-link,
            .breadcrumb-text {
                pointer-events: v-bind('content.disableLastItemLink ? "none" : "auto"');
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

    // Responsive behavior
    &.responsive {
        @media (max-width: 768px) {
            .breadcrumbs-list {
                .breadcrumb-item {
                    &:not(:first-child):not(:last-child) {
                        display: none;
                    }

                    &:first-child + .breadcrumb-item:not(:last-child) {
                        display: flex;

                        &:before {
                            content: '...';
                            margin: 0 8px;
                        }

                        .breadcrumb-link,
                        .breadcrumb-text {
                            display: none;
                        }
                    }
                }
            }
        }
    }
}
</style>
