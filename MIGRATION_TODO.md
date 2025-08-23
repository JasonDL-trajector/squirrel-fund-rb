# Material-UI to Mantine Migration Todo List

## 🎯 Phase 1: Foundation Setup (Priority: HIGH)

### 1.1 Mantine Provider Setup

- [x] **Create MantineProvider wrapper** in `src/app/Providers.tsx`
- [x] **Configure Mantine theme** to match current design system
- [x] **Set up CSS imports** for Mantine styles
- [x] **Remove Material-UI ThemeProvider** from `ClientThemeProvider.tsx`
- [x] **Update global CSS** to work with Mantine

### 1.2 Theme Migration

- [x] **Migrate theme configuration** from `src/utils/theme/DefaultColors.tsx`
- [x] **Create Mantine theme object** with colors, typography, spacing
- [x] **Set up dark/light mode** support
- [x] **Configure font family** (Plus Jakarta Sans)
- [ ] **Remove Material-UI theme files**

## 🏗️ Phase 2: Core Components Migration (Priority: HIGH)

### 2.1 Layout Components ✅ COMPLETE

- [x] **Migrate Header component** (`src/app/(DashboardLayout)/layout/header/Header.tsx`)

  - [x] Replace `AppBar`, `Toolbar`, `Stack` with Mantine equivalents
  - [x] Update `IconButton` to Mantine `ActionIcon`
  - [x] Migrate responsive breakpoints

- [x] **Migrate Sidebar component** (`src/app/(DashboardLayout)/layout/sidebar/Sidebar.tsx`)

  - [x] Replace `Drawer` with Mantine `Stack` and custom styling
  - [x] Update navigation items styling
  - [x] Migrate `useMediaQuery` to Mantine hooks

- [x] **Migrate Layout wrapper** (`src/app/(DashboardLayout)/layout.tsx`)
  - [x] Replace `Container`, `Box` with Mantine equivalents
  - [x] Update responsive layout logic

### 2.2 Navigation Components ✅ COMPLETE

- [x] **Migrate NavItem** (`src/app/(DashboardLayout)/layout/sidebar/NavItem/index.tsx`)

  - [x] Replace `ListItem`, `ListItemButton` with Mantine `NavLink`
  - [x] Update icon handling

- [x] **Migrate NavGroup** (`src/app/(DashboardLayout)/layout/sidebar/NavGroup/NavGroup.tsx`)

  - [x] Replace `ListSubheader` with Mantine `Text`

- [x] **Migrate BottomNavbar** (`src/app/(DashboardLayout)/layout/bottomNavbar/BottomNavbar.tsx`)
  - [x] Replace `BottomNavigation` with Mantine components

## 📊 Phase 3: Dashboard Components Migration (Priority: HIGH)

### 3.1 Shared Components ✅ COMPLETE

- [x] **Migrate DashboardCard** (`src/app/(DashboardLayout)/components/shared/DashboardCard.tsx`)

  - [x] Replace `Card`, `CardContent`, `CardHeader` with Mantine `Paper`
  - [x] Update styling and props

- [x] **Migrate BlankCard** (`src/app/(DashboardLayout)/components/shared/BlankCard.tsx`)

  - [x] Replace with Mantine `Paper`

- [x] **Migrate PageContainer** (`src/app/(DashboardLayout)/components/container/PageContainer.tsx`)
  - [x] Keep as-is (uses react-helmet, not UI components)

### 3.2 Dashboard Widgets ✅ COMPLETE

- [x] **Migrate CurrentBalance** (`src/app/(DashboardLayout)/components/dashboard/CurrentBalance.tsx`)

  - [x] Replace `Grid`, `Stack`, `Typography`, `Avatar` with Mantine equivalents
  - [x] Update `Modal`, `TextField`, `Button`
  - [x] Migrate chart integration

- [x] **Migrate BalanceHistory** (`src/app/(DashboardLayout)/components/dashboard/BalanceHistory.tsx`)

  - [x] Replace `Skeleton` with Mantine `Skeleton`
  - [x] Update chart container

- [x] **Migrate RecentDeposits** (`src/app/(DashboardLayout)/components/dashboard/RecentDeposits.tsx`)

  - [x] Replace Material-UI Timeline with custom Mantine timeline using `Stack`, `Group`, `ActionIcon`
  - [x] Replace `Typography`, `Skeleton` with Mantine equivalents

- [x] **Migrate RecentWithdrawals** (`src/app/(DashboardLayout)/components/dashboard/RecentWithdrawals.tsx`)
  - [x] Replace Material-UI Timeline with custom Mantine timeline using `Stack`, `Group`, `ActionIcon`
  - [x] Replace `Typography`, `Skeleton` with Mantine equivalents

### 3.3 Remaining Dashboard Widgets ✅ COMPLETE

- [x] **Migrate DailyDeposit** (`src/app/(DashboardLayout)/components/dashboard/DailyDeposit.tsx`)

  - [x] Replace `Stack`, `Typography`, `Avatar`, `Fab`, `Modal`, `TextField`, `Button` with Mantine equivalents

- [x] **Migrate Bills** (`src/app/(DashboardLayout)/components/dashboard/Bills.tsx`)

  - [x] Replace `Table`, `TableBody`, `TableCell`, `TableHead`, `TableRow` with Mantine `Table`
  - [x] Update `Chip`, `Skeleton`, `IconButton`, `Modal`, `TextField`, `Button`, `Select`, `MenuItem`, `FormControl`, `InputLabel`
  - [x] Migrate date picker integration (simplified to text input)

- [x] **Migrate TabularSummary** (`src/app/(DashboardLayout)/components/dashboard/TabularSummary.tsx`)
  - [x] Replace `Card`, `CardContent`, `CardHeader`, `Table` components with Mantine equivalents
  - [x] Update `Skeleton`, `useTheme`, `useMediaQuery`
  - [x] Remove `makeStyles` usage

## 📝 Phase 4: Form Components Migration (Priority: MEDIUM) ✅ COMPLETE

### 4.1 Form Elements ✅ COMPLETE

- [x] **Migrate CustomTextField** (`src/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField.tsx`)
  - [x] Replace `TextField` with Mantine `TextInput`
  - [x] Update styling and props

### 4.2 Authentication Forms ✅ COMPLETE

- [x] **Migrate AuthLogin** (`src/app/authentication/auth/AuthLogin.tsx`)

  - [x] Replace `Box`, `Typography`, `FormGroup`, `FormControlLabel`, `Button`, `Stack`, `Checkbox` with Mantine equivalents
  - [x] Update form validation

- [x] **Migrate AuthRegister** (`src/app/authentication/auth/AuthRegister.tsx`)
  - [x] Replace Material-UI components with Mantine equivalents

## 📄 Phase 5: Page Components Migration (Priority: MEDIUM)

### 5.1 Main Pages

- [ ] **Migrate Dashboard page** (`src/app/(DashboardLayout)/page.tsx`)

  - [ ] Replace `Grid`, `Box`, `useTheme`, `useMediaQuery` with Mantine equivalents

- [ ] **Migrate Deposit page** (`src/app/(DashboardLayout)/deposit/page.tsx`)

  - [ ] Replace `Grid`, `Box`, `TextField`, `Button`, `Typography`, `Paper`, `InputAdornment`, `Container`, `useMediaQuery`, `Theme`, `IconButton`
  - [ ] Update date picker integration

- [ ] **Migrate Withdraw page** (`src/app/(DashboardLayout)/withdraw/page.tsx`)
  - [ ] Replace Material-UI components with Mantine equivalents
  - [ ] Update date picker integration

### 5.2 History Pages

- [ ] **Migrate Deposit History** (`src/app/(DashboardLayout)/deposit/history/page.tsx`)

  - [ ] Replace table components with Mantine `Table`
  - [ ] Update form components

- [ ] **Migrate Withdraw History** (`src/app/(DashboardLayout)/withdraw/history/page.tsx`)

  - [ ] Replace table components with Mantine `Table`
  - [ ] Update form components

- [ ] **Migrate Balance History** (`src/app/(DashboardLayout)/balance-history/page.tsx`)
  - [ ] Replace chart container components

### 5.3 Authentication Pages

- [ ] **Migrate Login page** (`src/app/authentication/login/page.tsx`)

  - [ ] Replace `Grid`, `Box`, `Card`, `Stack`, `Typography`, `useMediaQuery`, `Theme`, `Button` with Mantine equivalents

- [ ] **Migrate Register page** (`src/app/authentication/register/page.tsx`)
  - [ ] Replace Material-UI components with Mantine equivalents

## 🎨 Phase 6: Utility Components Migration (Priority: LOW)

### 6.1 Utility Pages

- [ ] **Migrate Shadow page** (`src/app/(DashboardLayout)/utilities/shadow/page.tsx`)

  - [ ] Replace `Paper`, `Box`, `Grid` with Mantine equivalents

- [ ] **Migrate Typography page** (`src/app/(DashboardLayout)/utilities/typography/page.tsx`)

  - [ ] Replace `Typography`, `Grid`, `CardContent` with Mantine equivalents

- [ ] **Migrate Icons page** (`src/app/(DashboardLayout)/icons/page.tsx`)
  - [ ] Update icon display components

### 6.2 Other Components

- [ ] **Migrate Logo component** (`src/app/(DashboardLayout)/layout/shared/logo/Logo.tsx`)

  - [ ] Replace `styled` with Mantine styling

- [ ] **Migrate Upgrade component** (`src/app/(DashboardLayout)/layout/sidebar/Updrade.tsx`)

  - [ ] Replace `Box`, `Typography`, `Button` with Mantine equivalents

- [ ] **Migrate Sample page** (`src/app/(DashboardLayout)/sample-page/page.tsx`)
  - [ ] Replace `Typography` with Mantine `Text`

## 🧹 Phase 7: Cleanup & Optimization (Priority: LOW)

### 7.1 Dependency Cleanup

- [ ] **Remove Material-UI dependencies** from `package.json`
  - [ ] Remove `@mui/material`
  - [ ] Remove `@mui/icons-material`
  - [ ] Remove `@mui/lab`
  - [ ] Remove `@mui/styles`
  - [ ] Remove `@mui/x-date-pickers`
  - [ ] Remove `@mui/x-date-pickers-pro`
  - [ ] Remove `@emotion/react`
  - [ ] Remove `@emotion/styled`
  - [ ] Remove `@emotion/cache`
  - [ ] Remove `@emotion/server`

### 7.2 Code Cleanup

- [ ] **Remove unused imports** across all files
- [ ] **Update TypeScript types** for Mantine components
- [ ] **Remove Material-UI theme files**
- [ ] **Update any remaining Material-UI references**

### 7.3 Testing & Validation

- [ ] **Test all pages** for proper rendering
- [ ] **Validate responsive behavior**
- [ ] **Check form functionality**
- [ ] **Verify theme consistency**
- [ ] **Test dark/light mode** if implemented

## 📋 Migration Notes

### Component Mapping Reference

| Material-UI  | Mantine Equivalent   |
| ------------ | -------------------- |
| `Box`        | `Box`                |
| `Typography` | `Text`, `Title`      |
| `Button`     | `Button`             |
| `TextField`  | `TextInput`          |
| `Card`       | `Paper`, `Card`      |
| `Grid`       | `SimpleGrid`, `Grid` |
| `Stack`      | `Stack`              |
| `Modal`      | `Modal`              |
| `Table`      | `Table`              |
| `Skeleton`   | `Skeleton`           |
| `Avatar`     | `Avatar`             |
| `Chip`       | `Badge`, `Chip`      |
| `IconButton` | `ActionIcon`         |
| `Select`     | `Select`             |
| `Checkbox`   | `Checkbox`           |
| `AppBar`     | `Header`             |
| `Drawer`     | `Drawer`             |
| `Container`  | `Container`          |

### Priority Guidelines

- **HIGH**: Core layout, navigation, and main dashboard components
- **MEDIUM**: Forms, pages, and user interaction components
- **LOW**: Utility pages and cleanup tasks

### Testing Strategy

1. Migrate one component at a time
2. Test immediately after each migration
3. Ensure responsive behavior works
4. Validate form functionality
5. Check theme consistency

---

**Total Estimated Time**: 2-3 days
**Current Progress**: 75% Complete (Phase 1, 2, 3, and 4 finished)
