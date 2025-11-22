// src/styles/DraculaTheme.js or .ts

const DraculaTheme = {
  // 1. Theme Metadata
  name: 'dracula-v1-2-5-custom', // Unique identifier
  type: 'dark', // Must be 'light' or 'dark'

  // 2. Base Colors (Equivalent to the background/foreground on the <pre> tag)
  colors: {
    'editor.background': '#282A36', // Background of the code block
    'editor.foreground': '#F8F8F2', // Default text color
  },

  // 3. Token Color Rules (Equivalent to the individual .highlight .c, .highlight .k CSS rules)
  settings: [
    // --- Default Foreground ---
    {
      scope: [
        'source',
        'meta.embedded',
        'text',
        // General tokens that often inherit the default foreground
        'error', // .err
        'generic', // .g
        'literal', // .l
        'name.constant', // .no
        'name.decorator', // .nd
        'name.entity', // .ni
        'name.exception', // .ne
        'name.namespace', // .nn
        'name.other', // .nx
        'name.property', // .py
        'text.whitespace', // .w
      ],
      settings: {
        foreground: '#F8F8F2',
      }
    },

    // --- Comments (C, CH, CM, C1, CS) ---
    {
      scope: [
        'comment',
        'comment.block',
        'comment.line',
        'comment.documentation'
      ],
      settings: {
        foreground: '#6272A4'
      }
    },

    // --- Keywords and Operators (K, O, KC, KN, KP, KR, OW) ---
    {
      scope: [
        'keyword',
        'storage.type',
        'storage.modifier',
        'operator',
        'keyword.control.directive' // For preprocessor commands (CP)
      ],
      settings: {
        foreground: '#FF79C6'
      }
    },
    
    // --- Types, Declarations, Variables (KD, KT, NB, VC, VG, VI, VM, NL) ---
    {
      scope: [
        'storage.type',
        'variable',
        'variable.declaration',
        'support.type.builtin',
        'entity.name.type',
        'support.type',
        'name.label',
      ],
      settings: {
        foreground: '#8BE9FD',
        fontStyle: 'italic'
      }
    },

    // --- Numbers and Literals (M, MB, MF, MH, MI, MO, IL) ---
    {
      scope: [
        'constant.numeric',
        'constant.language'
      ],
      settings: {
        foreground: '#BD93F9'
      }
    },

    // --- Strings and Characters (S, S1, S2, SB, SC, SE, SH, SI, SR, SX) ---
    {
      scope: [
        'string',
        'string.quoted.single',
        'string.quoted.double',
        'constant.character',
        'markup.inline.raw'
      ],
      settings: {
        foreground: 'white'
      }
    },

    // --- Functions, Classes, and Tags (NF, NC, NT, FM) ---
    {
      scope: [
        'entity.name.function',
        'entity.name.class',
        'support.function',
        'support.class',
        'entity.name.tag',
        'meta.function'
      ],
      settings: {
        foreground: '#50FA7B'
      }
    },

    // --- Attributes and Properties (NA) ---
    {
      scope: [
        'entity.other.attribute-name',
        'support.variable.property'
      ],
      settings: {
        foreground: '#50FA7B'
      }
    },

    // --- Generic Output (GO) ---
    {
      scope: 'generic.output',
      settings: {
        foreground: '#44475A'
      }
    },

    // --- Highlighted Line (HLL) ---
    {
      scope: 'meta.line.extension.astro-line-highlight', // Shiki's scope for highlighted lines
      settings: {
        background: '#F1FA8C40' // Transparent highlight color
      }
    },
    
    // --- Builtin Pseudo (BP) ---
    {
        scope: 'name.builtin.pseudo',
        settings: {
            foreground: '#F8F8F2',
            fontStyle: 'italic'
        }
    }
  ],
};

export default DraculaTheme;
