export default {
    options: {
        displayAllowedValues: ['flex', 'inline-flex'],
    },
    inherit: {
        type: 'ww-layout',
    },
    editor: {
        label: {
            en: 'Breadcrumbs',
        },
        icon: 'map',
        customStylePropertiesOrder: [
            ['colorsTitle', 'linkColor', 'activeColor', 'separatorColor', 'iconColor'],
            ['typographyTitle', 'fontSize', 'activeItemFontWeight', 'hoverDecoration'],
            ['spacingLayoutTitle', 'itemSpacing'],
            ['separatorsBordersTitle', 'separatorSpacing', 'separatorSize'],
            ['pillBackgroundColor', 'activePillBackgroundColor', 'arrowBackgroundColor'],
        ],
        customSettingsPropertiesOrder: [
            ['mode'],
            ['displayStyle', 'separatorType', 'customSeparator', 'collapse'],
            ['items', 'labelPropertyPath', 'urlPropertyPath', 'iconPropertyPath'],
        ],
    },
    properties: {
        // Style section titles
        colorsTitle: {
            type: 'Title',
            label: 'Colors',
            section: 'style',
            editorOnly: true,
        },
        typographyTitle: {
            type: 'Title',
            label: 'Typography',
            section: 'style',
            editorOnly: true,
        },
        spacingLayoutTitle: {
            type: 'Title',
            label: 'Spacing & Layout',
            section: 'style',
            editorOnly: true,
        },
        separatorsBordersTitle: {
            type: 'Title',
            label: 'Separators & Borders',
            section: 'style',
            editorOnly: true,
        },

        // Data settings
        items: {
            label: { en: 'Breadcrumb Items' },
            type: 'Array',
            section: 'settings',
            bindable: true,
            hidden: content => content.mode === 'auto',
            defaultValue: [
                {
                    label: 'Home',
                    link: '/',
                },
                { label: 'Products', link: '/products' },
                { label: 'Category', link: '/products/category' },
                { label: 'Current Page', link: '/products/category/item' },
            ],
            options: {
                expandable: true,
                getItemLabel(item, index) {
                    return item?.label || `Item ${index + 1}`;
                },
                item: {
                    type: 'Object',
                    defaultValue: {
                        label: 'New Item',
                        url: '#',
                        icon: null,
                    },
                    options: {
                        item: {
                            label: {
                                label: 'Label',
                                type: 'Text',
                                options: { placeholder: 'Item Label' },
                            },
                            link: {
                                label: 'Link',
                                type: 'Link',
                                defaultValue: {
                                    en: '#',
                                },
                            },
                            icon: {
                                label: 'Icon',
                                type: 'SystemIcon',
                                /* wwEditor:start */
                                bindingValidation: {
                                    type: 'string',
                                    tooltip: 'Icon to display before the breadcrumb item text',
                                },
                                propertyHelp: {
                                    tooltip: 'Choose an icon to be displayed before this breadcrumb item',
                                },
                                /* wwEditor:end */
                            },
                        },
                    },
                },
            },
            /* wwEditor:start */
            bindingValidation: {
                type: 'array',
                tooltip: 'Bind to an array of objects with label, url, and optional icon properties',
            },
            propertyHelp: {
                tooltip:
                    'In Auto mode, breadcrumbs are generated from the page URL path. In Manual mode, you can define the items to display in the breadcrumb navigation here.',
            },
            /* wwEditor:end */
        },
        mode: {
            label: { en: 'Mode' },
            type: 'TextRadioGroup',
            section: 'settings',
            bindable: true,
            defaultValue: 'manual',
            options: {
                choices: [
                    { value: 'manual', title: 'Manual', icon: 'pencil' },
                    { value: 'auto', title: 'Auto', icon: 'refresh' },
                ],
            },
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The mode for generating breadcrumbs: manual (custom items) or auto (based on URL path)',
            },
            propertyHelp: {
                tooltip: 'Choose how breadcrumbs are generated - manually defined or automatically from URL path',
            },
            /* wwEditor:end */
        },
        labelPropertyPath: {
            label: { en: 'Label Property' },
            type: 'ObjectPropertyPath',
            section: 'settings',
            bindable: true,
            options: content => ({
                object: content.items?.[0] || {},
            }),
            defaultValue: 'label',
            hidden: (content, sidepanelContent, boundProps) =>
                !Array.isArray(content.items) || !content.items?.length || !boundProps.items,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The property path to use for item labels',
            },
            propertyHelp: {
                tooltip: 'Select which property from your items to use as the display label',
            },
            /* wwEditor:end */
        },
        urlPropertyPath: {
            label: { en: 'URL Property' },
            type: 'ObjectPropertyPath',
            section: 'settings',
            bindable: true,
            options: content => ({
                object: content.items?.[0] || {},
            }),
            defaultValue: 'link',
            hidden: (content, sidepanelContent, boundProps) =>
                content.mode === 'auto' || !Array.isArray(content.items) || !content.items?.length || !boundProps.items,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The property path to use for item URLs',
            },
            propertyHelp: {
                tooltip: 'Select which property from your items to use as the URL',
            },
            /* wwEditor:end */
        },
        iconPropertyPath: {
            label: { en: 'Icon Property' },
            type: 'ObjectPropertyPath',
            section: 'settings',
            bindable: true,
            options: content => ({
                object: content.items?.[0] || {},
            }),
            defaultValue: 'icon',
            hidden: (content, sidepanelContent, boundProps) =>
                !Array.isArray(content.items) || !content.items?.length || !boundProps.items,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The property path to use for item icons (SVG)',
            },
            propertyHelp: {
                tooltip: 'Select which property from your items to use as the icon',
            },
            /* wwEditor:end */
        },

        // Display settings
        displayStyle: {
            label: { en: 'Display Style' },
            type: 'TextRadioGroup',
            section: 'settings',
            bindable: true,
            defaultValue: 'standard',
            options: {
                choices: [
                    { value: 'standard', title: 'Standard', icon: 'align-left' },
                    { value: 'pills', title: 'Pills', icon: 'badge-check' },
                    { value: 'arrows', title: 'Arrows', icon: 'chevron-right' },
                    { value: 'underline', title: 'Underline', icon: 'underline' },
                ],
            },
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The visual style of the breadcrumbs: standard, pills, arrows, or underline',
            },
            propertyHelp: {
                tooltip: 'Choose how the breadcrumbs should be visually displayed',
            },
            /* wwEditor:end */
        },
        separatorType: {
            label: { en: 'Separator Type' },
            type: 'TextSelect',
            section: 'settings',
            bindable: true,
            defaultValue: 'slash',
            options: {
                options: [
                    { value: 'slash', label: 'Slash (/)' },
                    { value: 'arrow', label: 'Arrow (›)' },
                    { value: 'chevron', label: 'Chevron (>)' },
                    { value: 'dot', label: 'Dot (•)' },
                    { value: 'pipe', label: 'Pipe (|)' },
                    { value: 'dash', label: 'Dash (-)' },
                    { value: 'custom', label: 'Custom' },
                ],
            },
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The type of separator between breadcrumb items',
            },
            propertyHelp: {
                tooltip: 'Choose what separator to use between breadcrumb items',
            },
            /* wwEditor:end */
        },
        customSeparator: {
            label: { en: 'Custom Separator' },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: '',
            hidden: content => content.separatorType !== 'custom',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Custom separator text or HTML/SVG',
            },
            propertyHelp: {
                tooltip: 'Enter custom text or HTML/SVG to use as separator',
            },
            /* wwEditor:end */
        },
        collapse: {
            label: { en: 'Collapse the breacrumb' },
            type: 'OnOff',
            section: 'settings',
            bindable: true,
            defaultValue: false,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'Whether to collapse the breadcrumbs',
            },
            propertyHelp: {
                tooltip:
                    'This property should be enabled on small screens, show only first and last items with ellipsis',
            },
            /* wwEditor:end */
        },

        // Styling - Colors
        linkColor: {
            label: { en: 'Link Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#6B7280',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The color of breadcrumb links',
            },
            propertyHelp: {
                tooltip: 'Set the text color for breadcrumb links',
            },
            /* wwEditor:end */
        },
        activeColor: {
            label: { en: 'Active Item Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#111827',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The color of the active/current breadcrumb item',
            },
            propertyHelp: {
                tooltip: 'Set the text color for the current/active breadcrumb item',
            },
            /* wwEditor:end */
        },
        separatorColor: {
            label: { en: 'Separator Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#9CA3AF',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The color of the separators between breadcrumb items',
            },
            propertyHelp: {
                tooltip: 'Set the color for the separators between breadcrumb items',
            },
            /* wwEditor:end */
        },
        iconColor: {
            label: { en: 'Icon Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#4B5563',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The color of icons in breadcrumb items',
            },
            propertyHelp: {
                tooltip: 'Set the color for icons displayed in breadcrumb items',
            },
            /* wwEditor:end */
        },

        // Style-specific colors
        pillBackgroundColor: {
            label: { en: 'Pill Background' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#f0f0f0',
            hidden: content => content.displayStyle !== 'pills',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The background color of pill-style breadcrumb items',
            },
            propertyHelp: {
                tooltip: 'Set the background color for pill-style breadcrumb items',
            },
            /* wwEditor:end */
        },
        activePillBackgroundColor: {
            label: { en: 'Active Pill Background' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#e0e0e0',
            hidden: content => content.displayStyle !== 'pills',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The background color of the active pill-style breadcrumb item',
            },
            propertyHelp: {
                tooltip: 'Set the background color for the active/current pill-style breadcrumb item',
            },
            /* wwEditor:end */
        },
        arrowBackgroundColor: {
            label: { en: 'Arrow Background' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#f0f0f0',
            hidden: content => content.displayStyle !== 'arrows',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The background color of arrow-style breadcrumb items',
            },
            propertyHelp: {
                tooltip: 'Set the background color for arrow-style breadcrumb items',
            },
            /* wwEditor:end */
        },

        // Styling - Typography
        fontSize: {
            label: { en: 'Font Size' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: '14px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The font size for breadcrumb text',
            },
            propertyHelp: {
                tooltip: 'Set the font size for all breadcrumb text',
            },
            /* wwEditor:end */
        },
        activeItemFontWeight: {
            label: { en: 'Active Item Font Weight' },
            type: 'TextSelect',
            section: 'style',
            bindable: true,
            defaultValue: '600',
            options: {
                options: [
                    { value: 'normal', label: 'Normal' },
                    { value: 'bold', label: 'Bold' },
                    { value: '100', label: '100 (Thin)' },
                    { value: '200', label: '200' },
                    { value: '300', label: '300' },
                    { value: '400', label: '400 (Normal)' },
                    { value: '500', label: '500 (Medium)' },
                    { value: '600', label: '600 (Semi-Bold)' },
                    { value: '700', label: '700 (Bold)' },
                    { value: '800', label: '800' },
                    { value: '900', label: '900 (Black)' },
                ],
            },
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The font weight for the active/current breadcrumb item',
            },
            propertyHelp: {
                tooltip: 'Set the font weight for the current/active breadcrumb item',
            },
            /* wwEditor:end */
        },
        hoverDecoration: {
            label: { en: 'Hover Text Decoration' },
            type: 'TextSelect',
            section: 'style',
            bindable: true,
            defaultValue: 'none',
            options: {
                options: [
                    { value: 'none', label: 'None' },
                    { value: 'underline', label: 'Underline' },
                    { value: 'overline', label: 'Overline' },
                    { value: 'line-through', label: 'Line Through' },
                ],
            },
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The text decoration for breadcrumb links on hover',
            },
            propertyHelp: {
                tooltip: 'Set the text decoration when hovering over breadcrumb links',
            },
            /* wwEditor:end */
        },

        itemSpacing: {
            label: { en: 'Item Spacing' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: '8px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The spacing between breadcrumb items',
            },
            propertyHelp: {
                tooltip: 'Set the spacing between individual breadcrumb items',
            },
            /* wwEditor:end */
        },
        separatorSpacing: {
            label: { en: 'Separator Spacing' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: '12px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The spacing around separators',
            },
            propertyHelp: {
                tooltip: 'Set the spacing around the separators between breadcrumb items',
            },
            /* wwEditor:end */
        },
        separatorSize: {
            label: { en: 'Separator Size' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: '12px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The font size of separators',
            },
            propertyHelp: {
                tooltip: 'Set the size of the separators between breadcrumb items',
            },
            /* wwEditor:end */
        },
        linkElement: {
            hidden: true,
            defaultValue: { isWwObject: true, type: 'ww-flexbox' },
        },
        iconElement: {
            hidden: true,
            defaultValue: { isWwObject: true, type: 'ww-icon' },
        },
        textElement: {
            hidden: true,
            defaultValue: { isWwObject: true, type: 'ww-text' },
        },
    },
    triggerEvents: [
        {
            name: 'click',
            label: { en: 'On item click' },
            event: { value: null },
        },
    ],
    actions: [],
};
