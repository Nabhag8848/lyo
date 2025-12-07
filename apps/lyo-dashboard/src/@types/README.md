# @types Folder Convention

## Why Use `@types` Instead of `types`?

The `@types` folder naming convention is used throughout this codebase for several important reasons:

### 1. **TypeScript Type Resolution Priority**

TypeScript has a special resolution mechanism for folders starting with `@`. When TypeScript encounters `@types`, it treats it as a **type-only directory**, which means:

- TypeScript automatically includes these files in type checking
- The `@` prefix signals to developers and tooling that this folder contains **only type definitions**
- It prevents accidental mixing of runtime code with type definitions

### 2. **Clear Separation of Concerns**

Using `@types` makes it immediately clear that:
- **`@types/`** = Type definitions, interfaces, type declarations (compile-time only)
- **`lib/`**, **`utils/`**, etc. = Runtime code and implementation

This separation helps developers understand:
- What files affect runtime behavior
- What files are purely for type safety
- Where to look for type definitions vs. implementations

### 3. **Consistency with TypeScript Ecosystem**

The `@types` naming aligns with:
- **npm `@types/*` packages** - The official TypeScript type definition packages (e.g., `@types/node`, `@types/react`)
- **TypeScript's built-in type resolution** - TypeScript looks for `@types` folders in `node_modules/@types/`
- **Industry conventions** - Many TypeScript projects use this pattern

### 4. **Better IDE Support**

IDEs and language servers recognize `@types` folders and:
- Provide better autocomplete for type definitions
- Show clearer organization in file explorers
- Help distinguish between types and runtime code

### 5. **Prevents Accidental Runtime Imports**

When types are in `@types/`, it's clearer that:
- These files should not contain runtime code
- They're excluded from the build output
- They're only used during development and type checking

## Structure

```
src/
├── @types/              # Global type definitions
│   ├── vite-env.d.ts   # Vite environment types
│   ├── user.d.ts       # User-related types
│   ├── index.ts        # Re-exports all types
│   └── README.md       # This file
├── app/
│   └── @types/         # App-specific types (if needed)
├── database/
│   └── @types/         # Database-specific types (if needed)
└── ...
```

## Usage

### Importing Types

```typescript
// ✅ Good: Import from @types
import { User } from '@/@types';
import type { User } from '@/@types/user';

// ❌ Bad: Don't mix types with runtime code
// import { User } from '@/lib/auth';
```

### Adding New Types

1. Create a new `.d.ts` or `.ts` file in the appropriate `@types/` folder
2. Export the type/interface
3. Re-export from `index.ts` for convenience
4. Import using `@/@types` or `@/path/to/@types`

## Examples in This Codebase

- **`apps/lyo-dashboard/src/@types/`** - Dashboard app type definitions
- **`apps/lyo-server/src/@types/`** - Server app global types
- **`apps/lyo-server/src/database/@types/`** - Database-specific types
- **`apps/lyo-server/src/app/@types/`** - App-specific types

## Benefits Summary

✅ **Clear intent** - Immediately obvious these are type definitions  
✅ **Better organization** - Types are separated from runtime code  
✅ **TypeScript optimization** - Better type resolution and checking  
✅ **Consistency** - Matches TypeScript ecosystem conventions  
✅ **Maintainability** - Easier to find and manage type definitions  

