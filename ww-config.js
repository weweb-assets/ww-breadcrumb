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
    },
    properties: {
        // Data settings
        items: {
            label: { en: 'Breadcrumb Items' },
            type: 'Array',
            section: 'settings',
            bindable: true,
            defaultValue: [
                {
                    label: 'Home',
                    url: '/',
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" /><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" /></svg>',
                },
                { label: 'Products', url: '/products' },
                { label: 'Category', url: '/products/category' },
                { label: 'Current Page', url: '/products/category/item' },
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
                            url: {
                                label: 'URL',
                                type: 'Text',
                                options: { placeholder: '/path/to/page' },
                            },
                            icon: {
                                label: 'Icon (SVG)',
                                type: 'Text',
                                options: { placeholder: '<svg>...</svg>' },
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
                tooltip: content =>
                    content.mode === 'auto'
                        ? 'In Auto mode, breadcrumbs are generated from the page URL path'
                        : 'The items to display in the breadcrumb navigation',
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
            defaultValue: 'url',
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
        initialValue: {
            label: { en: 'Initial selected item' },
            type: 'Text',
            bindable: true,
            section: 'settings',
            defaultValue: null,
            /* wwEditor:start */
            bindingValidation: {
                type: 'object',
                tooltip: 'The initially selected breadcrumb item',
            },
            propertyHelp: {
                tooltip: 'Set the initially selected breadcrumb item',
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
        showHomeIcon: {
            label: { en: 'Show Home Icon' },
            type: 'OnOff',
            section: 'settings',
            bindable: true,
            defaultValue: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'Whether to show a home icon for the first item',
            },
            propertyHelp: {
                tooltip: 'Display a home icon for the first breadcrumb item',
            },
            /* wwEditor:end */
        },
        disableLastItemLink: {
            label: { en: 'Disable Last Item Link' },
            type: 'OnOff',
            section: 'settings',
            bindable: true,
            defaultValue: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'Whether to disable the link for the last (current) item',
            },
            propertyHelp: {
                tooltip: 'Make the last breadcrumb item non-clickable',
            },
            /* wwEditor:end */
        },
        responsiveCollapse: {
            label: { en: 'Collapse on Mobile' },
            type: 'OnOff',
            section: 'settings',
            bindable: true,
            defaultValue: false,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'Whether to collapse the breadcrumbs on mobile devices',
            },
            propertyHelp: {
                tooltip: 'On small screens, show only first and last items with ellipsis',
            },
            /* wwEditor:end */
        },

        // Styling - Colors
        linkColor: {
            label: { en: 'Link Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#0066cc',
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
            defaultValue: '#333333',
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
            defaultValue: '#999999',
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
            defaultValue: '#666666',
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
        fontFamily: {
            label: { en: 'Font Family' },
            type: 'FontFamily',
            section: 'style',
            bindable: true,
            defaultValue: null,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The font family for breadcrumb text',
            },
            propertyHelp: {
                tooltip: 'Set the font family for all breadcrumb text',
            },
            /* wwEditor:end */
        },
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
        fontWeight: {
            label: { en: 'Font Weight' },
            type: 'TextSelect',
            section: 'style',
            bindable: true,
            defaultValue: 'normal',
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
                tooltip: 'The font weight for breadcrumb text',
            },
            propertyHelp: {
                tooltip: 'Set the font weight for breadcrumb items',
            },
            /* wwEditor:end */
        },
        activeItemFontWeight: {
            label: { en: 'Active Item Font Weight' },
            type: 'TextSelect',
            section: 'style',
            bindable: true,
            defaultValue: 'bold',
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
            defaultValue: 'underline',
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

        // Styling - Layout
        horizontalPadding: {
            label: { en: 'Horizontal Padding' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: '0px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The horizontal padding of the breadcrumbs container',
            },
            propertyHelp: {
                tooltip: 'Set the left and right padding for the breadcrumbs container',
            },
            /* wwEditor:end */
        },
        verticalPadding: {
            label: { en: 'Vertical Padding' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: '8px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The vertical padding of the breadcrumbs container',
            },
            propertyHelp: {
                tooltip: 'Set the top and bottom padding for the breadcrumbs container',
            },
            /* wwEditor:end */
        },
        itemSpacing: {
            label: { en: 'Item Spacing' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: '4px',
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
            defaultValue: '8px',
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
            defaultValue: '14px',
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
        borderRadius: {
            label: { en: 'Border Radius' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: '0px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The border radius of the breadcrumbs container',
            },
            propertyHelp: {
                tooltip: 'Set the border radius for the breadcrumbs container',
            },
            /* wwEditor:end */
        },
    },
    triggerEvents: [
        {
            name: 'click',
            label: { en: 'On item click' },
            event: { value: null },
        },
        {
            name: 'change',
            label: { en: 'On selection change' },
            event: { value: null },
            default: true,
        },
        {
            name: 'initValueChange',
            label: { en: 'On init value change' },
            event: { value: null },
        },
    ],
    actions: [
        {
            action: 'setSelectedItem',
            label: { en: 'Set selected item' },
            args: [
                {
                    name: 'item',
                    type: 'object',
                    label: { en: 'Item' },
                },
            ],
        },
    ],
};
